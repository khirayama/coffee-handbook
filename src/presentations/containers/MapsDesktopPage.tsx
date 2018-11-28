import * as classNames from 'classnames';
import * as React from 'react';

import { dictionary } from 'dictionary';
import { StoreCard } from 'presentations/components/StoreCard';
import { StoreMapView } from 'presentations/components/StoreMapView';
import { connect } from 'presentations/containers/Container';
import { CurrentPositionButtonContainer } from 'presentations/containers/CurrentPositionButton';
import { selectStore, updateCurrentPosition, updateView } from 'presentations/pages/Maps/actionCreators';
import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { tracker } from 'presentations/utils/tracker';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';
import { Store as AppStore } from 'utils/Store';

interface IProps extends IState {
  dispatch: IDispatch;
}

export class MapsDesktopPage extends React.Component<IProps, {}> {
  private mapRef: React.RefObject<StoreMapView>;

  private modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.mapRef = React.createRef();
    this.modalRef = React.createRef();
    this.onClickMap = this.onClickMap.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
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
      const storeKey: string = window.location.pathname.replace('/stores/', '');

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
    const storeResource: Resource<IRawStore, IStore> = new Resource(this.props.stores, this.props.lang);
    const store: IStore = storeResource
      .where({
        key: props.ui.selectedStoreKey,
      })
      .findOne();

    return (
      <div className="MapsDesktopPage">
        <div className="MapsDesktopPage--Content">
          <CurrentPositionButtonContainer />
          <StoreMapView
            ref={this.mapRef}
            lang={props.lang}
            currentPos={props.ui.currentPos}
            selectedStoreKey={props.ui.selectedStoreKey}
            stores={storeResource.find()}
            center={props.ui.pos}
            zoom={props.ui.zoom}
            offset={props.ui.offset}
            onClickMap={this.onClickMap}
            onMoveEnd={this.onMoveEnd}
            onClickStore={this.onClickStore}
          />
          <div ref={this.modalRef} className={classNames('Modal', { Modal__Hidden: !store })}>
            <main>
              <StoreCard store={store} dic={dic} />
            </main>
          </div>
        </div>
      </div>
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
  }

  private onMoveEnd(event: mapboxgl.MapboxEvent, map: mapboxgl.Map): void {
    updateView(this.props.dispatch, map.getCenter(), map.getZoom(), [0, 0]);
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
    selectStore(this.props.dispatch, store.key);
    this.centerStoreWithModal(store);
  }

  private centerStoreWithModal(store: IStore): void {
    const mapModalWidth: number = 384;
    const modalElement: HTMLElement = this.modalRef.current;
    const mapElement: HTMLElement = this.mapRef.current.ref.current;

    const mapWidth: number = mapElement.clientWidth;
    const modalWidth: number = modalElement.clientWidth;
    const diff: number = mapWidth / 2 - (mapWidth - modalWidth) / 2 - modalWidth;
    const offset: [number, number] = [diff * -1, 0];

    updateView(
      this.props.dispatch,
      {
        lng: store.lng,
        lat: store.lat,
      },
      this.props.ui.zoom,
      offset,
    );
  }
}

// tslint:disable-next-line:variable-name
export const MapsDesktopPageContainer: React.ComponentClass = connect(MapsDesktopPage);
