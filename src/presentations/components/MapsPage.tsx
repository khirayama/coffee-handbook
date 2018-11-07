import * as classNames from 'classnames';
import * as queryString from 'query-string';
import * as React from 'react';

import { dictionary } from 'dictionary';
import { MapHeaderContainer } from 'presentations/components/MapHeader';
import { StoreCard } from 'presentations/components/StoreCard';
import { StoreMapView } from 'presentations/components/StoreMapView';
import { connect } from 'presentations/containers/Container';
import { changeLang, selectStore, updateCurrentPosition, updateView } from 'presentations/pages/Maps/actionCreators';
import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { tracker } from 'presentations/utils/tracker';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';
import { Store as AppStore } from 'utils/Store';

interface IProps extends IState {
  dispatch: IDispatch;
}

export class MapsPage extends React.Component<IProps, {}> {
  private mapRef: React.RefObject<StoreMapView>;

  private modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.mapRef = React.createRef();
    this.modalRef = React.createRef();
    this.onClickMap = this.onClickMap.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onClickStore = this.onClickStore.bind(this);
    this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
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
      const query: { key?: string; lang?: string } = queryString.parse(window.location.search);
      const storeKey: string | null = query.key || null;

      selectStore(this.props.dispatch, storeKey);
      if (query.lang) {
        changeLang(this.props.dispatch, query.lang || 'en');
      }
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
      <div className="MapsPage">
        <MapHeaderContainer />
        <div className="MapsPage--Content">
          <StoreMapView
            ref={this.mapRef}
            lang={props.lang}
            currentPos={props.ui.currentPos}
            stores={storeResource.find()}
            center={props.ui.pos}
            zoom={props.ui.zoom}
            onClickMap={this.onClickMap}
            onMoveEnd={this.onMoveEnd}
            onClickStore={this.onClickStore}
            onGetCurrentPosition={this.onGetCurrentPosition}
          />
          <div ref={this.modalRef} className={classNames('Modal', { Modal__Hidden: !store })}>
            {store ? <StoreCard store={store} dic={dic} /> : null}
          </div>
        </div>
      </div>
    );
  }

  private onClickMap(event: MouseEvent, map: mapboxgl.Map): void {
    const query: { [key: string]: string | string[] } = queryString.parse(window.location.search);
    if (query.key) {
      delete query.key;
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const search: string = queryString.stringify(query);
      const loc: string = `${window.location.pathname}${search ? `?${search}` : ''}`;
      const title: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
    }
    selectStore(this.props.dispatch, null);
  }

  private onMoveEnd(event: mapboxgl.MapboxEvent, map: mapboxgl.Map): void {
    updateView(this.props.dispatch, map.getCenter(), map.getZoom());
  }

  private onClickStore(event: React.MouseEvent<HTMLElement>, map: mapboxgl.Map, store: IStore): void {
    const query: { [key: string]: string | string[] } = queryString.parse(window.location.search);
    if (query.key !== store.key) {
      query.key = store.key;
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const search: string = queryString.stringify(query);
      const loc: string = `${window.location.pathname}${search ? `?${search}` : ''}`;
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

  private onGetCurrentPosition(currentPos: IPosition): void {
    updateCurrentPosition(this.props.dispatch, currentPos);
  }

  private centerStoreWithModal(store: IStore): void {
    const mapModalWidth: number = 384;
    const modalElement: HTMLElement = this.modalRef.current;
    const mapElement: HTMLElement = this.mapRef.current.ref.current;

    let offset: [number, number] = [0, 0];
    if (window.innerWidth > mapModalWidth * 2) {
      const mapWidth: number = mapElement.clientWidth;
      const modalWidth: number = modalElement.clientWidth;
      const diff: number = mapWidth / 2 - (mapWidth - modalWidth) / 2 - modalWidth;
      offset = [diff * -1, 0];
    } else {
      const mapHeight: number = mapElement.clientHeight;
      const modalHeight: number = modalElement.clientHeight;
      const diff: number = (mapHeight - modalHeight) / 2 + modalHeight - mapHeight / 2;
      offset = [0, diff * -1];
    }

    this.mapRef.current.map.flyTo({
      center: [store.lng, store.lat],
      offset,
    });
  }
}

// tslint:disable-next-line:variable-name
export const MapsPageContainer: React.ComponentClass = connect(MapsPage);
