import * as classNames from 'classnames';
import * as React from 'react';

import { dictionary } from 'dictionary';
import { Sheet } from 'presentations/components/Sheet';
import { StoreCard } from 'presentations/components/StoreCard';
import { StoreMapView } from 'presentations/components/StoreMapView';
import { connect } from 'presentations/containers/Container';
import { CurrentPositionButtonContainer } from 'presentations/containers/CurrentPositionButton';
import { SearchFormContainer } from 'presentations/containers/SearchForm';
import {
  selectStore,
  updateCurrentPosition,
  updateSheetMode,
  updateView,
} from 'presentations/pages/Maps/actionCreators';
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
    const targetRawStores: IRawStore[] = props.ui.targetStoreKeys.length
      ? props.stores.filter((candidateStore: IRawStore) => {
          return props.ui.targetStoreKeys.indexOf(candidateStore.key) !== -1;
        })
      : props.stores;
    const targetStoreResource: Resource<IRawStore, IStore> = new Resource(targetRawStores, props.lang);
    const storeResource: Resource<IRawStore, IStore> = new Resource(props.stores, props.lang);
    const store: IStore = storeResource
      .where({
        key: props.ui.selectedStoreKey,
      })
      .findOne();
    const targetStores: IStore[] = targetStoreResource.find();

    return (
      <div className="MapsMobilePage">
        <div className="MapsMobilePage--Content">
          <CurrentPositionButtonContainer />
          <Sheet mode={this.props.ui.sheetMode} onMoveUp={this.onMoveUpSheet} onMoveDown={this.onMoveDownSheet}>
            <SearchFormContainer />
          </Sheet>
          {props.ui.targetStoreKeys.length && !props.ui.selectedStoreKey ? (
            <ul className="StoreCardList">
              {targetStores.map((targetStore: IStore) => {
                return <li key={targetStore.key}>{targetStore.name}</li>;
              })}
            </ul>
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
