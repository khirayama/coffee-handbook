import * as classNames from 'classnames';
import * as React from 'react';

import { dictionary } from 'dictionary';
import { Sheet } from 'presentations/components/Sheet';
import { StoreCard } from 'presentations/components/StoreCard';
import { StoreCards } from 'presentations/components/StoreCards';
import { StoreMapView } from 'presentations/components/StoreMapView';
import { connect } from 'presentations/containers/Container';
import { CurrentPositionButtonContainer } from 'presentations/containers/CurrentPositionButton';
import { SearchFormContainer } from 'presentations/containers/SearchForm';
import { selectStore, selectTargetStore, updateSheetMode, updateView } from 'presentations/pages/Maps/actionCreators';
import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { waitShortAnimationEnd } from 'presentations/utils/helpers';
import { tracker } from 'presentations/utils/tracker';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';
import { Store as AppStore } from 'utils/Store';

interface IProps extends IState {
  dispatch: IDispatch;
}

export class MapsMobilePage extends React.Component<IProps, {}> {
  private mapRef: React.RefObject<StoreMapView>;

  private modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.mapRef = React.createRef();
    this.modalRef = React.createRef();
    this.onClickMap = this.onClickMap.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onSnap = this.onSnap.bind(this);
    this.onMoveUpSheet = this.onMoveUpSheet.bind(this);
    this.onMoveDownSheet = this.onMoveDownSheet.bind(this);
    this.onClickStore = this.onClickStore.bind(this);
  }

  public componentDidMount(): void {
    if (this.props.ui.selectedStoreKey) {
      const storeResource: Resource<IRawStore, IStore> = new Resource(this.props.stores, this.props.lang);
      const store: IStore = storeResource
        .where({
          key: this.props.ui.selectedStoreKey,
        })
        .findOne();
      this.centerStoreWithModal(store);
    }

    window.addEventListener('popstate', () => {
      // TODO: Support searchQuery
      let storeKey: string = window.location.pathname.replace('/stores/', '');
      if (storeKey === '/') {
        storeKey = null;
      }

      selectStore(this.props.dispatch, storeKey);
      if (storeKey) {
        const storeResource: Resource<IRawStore, IStore> = new Resource(this.props.stores, this.props.lang);
        const currentStore: IStore = storeResource
          .where({
            key: storeKey,
          })
          .findOne();
        this.centerStoreWithModal(currentStore);
      }
    });
  }

  public render(): JSX.Element {
    const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
    const props: IState = this.props;
    const targetStoreKeys: string[] = props.ui.targetStoreKeys;
    const storeResource: Resource<IRawStore, IStore> = new Resource(props.stores, props.lang);
    const store: IStore = storeResource
      .where({
        key: props.ui.selectedStoreKey,
      })
      .findOne();
    const stores: IStore[] = storeResource.find();
    // FIXME: Inefficiency. But I want to keep an order of targetStoreKeys.
    const targetStores: IStore[] = targetStoreKeys.length
      ? targetStoreKeys.map((targetStoreKey: string) => {
          return stores.filter((candidateStore: IStore) => candidateStore.key === targetStoreKey)[0];
        })
      : stores;

    return (
      <div className="MapsMobilePage">
        <div className="MapsMobilePage--Content">
          {!targetStoreKeys.length ? <CurrentPositionButtonContainer /> : null}
          <Sheet mode={this.props.ui.sheetMode} onMoveUp={this.onMoveUpSheet} onMoveDown={this.onMoveDownSheet}>
            <SearchFormContainer />
          </Sheet>
          {targetStoreKeys.length && !props.ui.selectedStoreKey ? (
            <StoreCards stores={targetStores} onClickItem={this.onClickStore} onSnap={this.onSnap} />
          ) : null}
          <div ref={this.modalRef} className={classNames('Modal', { Modal__Hidden: !store })}>
            <main>
              <StoreCard store={store} dic={dic} />
            </main>
          </div>
          <StoreMapView
            ref={this.mapRef}
            lang={props.lang}
            currentPos={props.ui.currentPos}
            selectedStoreKey={props.ui.selectedStoreKey}
            stores={targetStores}
            center={props.ui.pos}
            zoom={props.ui.zoom}
            offset={props.ui.offset}
            onClickMap={this.onClickMap}
            onMoveEnd={this.onMoveEnd}
            onClickStore={this.onClickStore}
          />
        </div>
      </div>
    );
  }

  private onMoveEnd(event: mapboxgl.MapboxEvent, map: mapboxgl.Map): void {
    updateView(this.props.dispatch, map.getCenter(), map.getZoom(), [0, 0]);
  }

  private onSnap(storeKey: string): void {
    const storeResource: Resource<IRawStore, IStore> = new Resource(this.props.stores, this.props.lang);
    const store: IStore = storeResource
      .where({
        key: storeKey,
      })
      .findOne();
    selectTargetStore(this.props.dispatch, storeKey);
    updateView(
      this.props.dispatch,
      {
        lng: store.lng,
        lat: store.lat,
      },
      this.props.ui.zoom,
      [0, 0],
    );
  }

  private onClickMap(event: MouseEvent): void {
    const storeKey: string = window.location.pathname.replace('/stores/', '');
    if (storeKey) {
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const loc: string = '/';
      const title: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
    }
    selectStore(this.props.dispatch, null);
    waitShortAnimationEnd().then(() => {
      const mode: string = this.props.ui.sheetMode;
      if (mode === 'default') {
        updateSheetMode(this.props.dispatch, 'closed');
      } else {
        updateSheetMode(this.props.dispatch, 'default');
      }
    });
  }

  private onClickStore(event: React.MouseEvent<HTMLElement>, store: IStore): void {
    const storeKey: string = window.location.pathname.replace('/stores/', '');
    if (storeKey !== store.key) {
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const loc: string = `/stores/${store.key}`;
      const title: string = `${store.name} | ${store.address} | ${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);

      // Sending ga event
      tracker.setPage(loc);
      tracker.setLocation(loc);
      tracker.sendPageView();
    }
    updateSheetMode(this.props.dispatch, 'none');
    waitShortAnimationEnd().then(() => {
      selectStore(this.props.dispatch, store.key);
      this.centerStoreWithModal(store);
    });
  }

  private onMoveUpSheet(): void {
    const mode: string = this.props.ui.sheetMode;
    if (mode === 'default') {
      updateSheetMode(this.props.dispatch, 'opened');
    } else if (mode === 'closed') {
      updateSheetMode(this.props.dispatch, 'opened');
    }
  }

  private onMoveDownSheet(): void {
    const mode: string = this.props.ui.sheetMode;
    if (mode === 'opened') {
      updateSheetMode(this.props.dispatch, 'default');
    } else if (mode === 'default') {
      updateSheetMode(this.props.dispatch, 'closed');
    }
  }

  private centerStoreWithModal(store: IStore): void {
    setTimeout(() => {
      const modalElement: HTMLElement = this.modalRef.current;
      const mapElement: HTMLElement = this.mapRef.current.ref.current;

      const mapHeight: number = mapElement.clientHeight;
      const modalHeight: number = modalElement.clientHeight;
      const diff: number = (mapHeight - modalHeight) / 2 + modalHeight - mapHeight / 2;
      const offset: [number, number] = [0, diff * -1];

      updateView(
        this.props.dispatch,
        {
          lng: store.lng,
          lat: store.lat,
        },
        this.props.ui.zoom,
        offset,
      );
    }, 0);
  }
}

// tslint:disable-next-line:variable-name
export const MapsMobilePageContainer: React.ComponentClass = connect(MapsMobilePage);
