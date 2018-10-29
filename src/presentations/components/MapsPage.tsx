// tslint:disable:no-any
import * as classNames from 'classnames';
import * as queryString from 'query-string';
import * as React from 'react';

import { IRawStore } from 'data/stores';
import { dictionary } from 'dictionary';
import { MapHeader } from 'presentations/components/MapHeader';
import { StoreCard } from 'presentations/components/StoreCard';
import { IPosition, StoreMapView } from 'presentations/components/StoreMapView';
import { IAction, IDispatch, IState } from 'presentations/pages/Maps/reducer';
import { tracker } from 'presentations/utils/tracker';
import { IStore } from 'resources/Store';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';
import { Store as AppStore } from 'utils/Store';

interface IProps {
  store: AppStore<IState, IAction>;
}

export class MapsPage extends React.Component<IProps, IState> {
  private dispatch: IDispatch;

  private dic: Dictionary;

  private mapRef: React.RefObject<StoreMapView>;

  private modalRef: React.RefObject<HTMLDivElement>;

  private storeResource: Resource<IRawStore, IStore>;

  constructor(props: IProps) {
    super(props);

    this.state = this.props.store.getState();

    this.dic = new Dictionary(this.state.lang, dictionary);
    this.storeResource = new Resource(this.state.stores, this.state.lang);
    this.mapRef = React.createRef();
    this.modalRef = React.createRef();
    this.dispatch = this.props.store.dispatch.bind(this.props.store);
    this.onClickMap = this.onClickMap.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onClickStore = this.onClickStore.bind(this);
    this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
  }

  public componentDidMount(): void {
    this.props.store.addChangeListener(() => {
      this.setState(this.props.store.getState());
    });

    if (this.state.ui.selectedStoreKey) {
      const store: IStore = this.storeResource
        .where({
          key: this.state.ui.selectedStoreKey,
        })
        .findOne();
      this.centerStoreWithModal(store);
    }

    window.addEventListener('popstate', () => {
      const query: { [key: string]: string | string[] } = queryString.parse(window.location.search);
      const storeKey: any = query.key || null;

      this.dispatch({
        actionType: '__SELECT_STORE',
        payload: {
          storeKey,
        },
      });
      if (storeKey) {
        const currentStore: IStore = this.storeResource
          .where({
            key: storeKey,
          })
          .findOne();
        this.centerStoreWithModal(currentStore);
      }
    });
  }

  public render(): JSX.Element {
    const state: IState = this.props.store.getState();
    const store: IStore = this.storeResource
      .where({
        key: state.ui.selectedStoreKey,
      })
      .findOne();

    return (
      <div className="MapsPage">
        <MapHeader lang={state.lang} />
        <div className="MapsPage--Content">
          <StoreMapView
            ref={this.mapRef}
            lang={state.lang}
            currentPos={state.ui.currentPos}
            stores={this.storeResource.find()}
            center={state.ui.pos}
            zoom={state.ui.zoom}
            onClickMap={this.onClickMap}
            onMoveEnd={this.onMoveEnd}
            onClickStore={this.onClickStore}
            onGetCurrentPosition={this.onGetCurrentPosition}
          />
          <div ref={this.modalRef} className={classNames('Modal', { Modal__Hidden: !store })}>
            {store ? <StoreCard store={store} dic={this.dic} /> : null}
          </div>
        </div>
      </div>
    );
  }

  private onClickMap(event: any, map: any): void {
    const query: { [key: string]: string | string[] } = queryString.parse(window.location.search);
    if (query.key) {
      delete query.key;
      const search: string = queryString.stringify(query);
      const loc: string = `${window.location.pathname}${search ? `?${search}` : ''}`;
      const title: string = `${this.dic.t('Pages.Maps.MAP')} | ${this.dic.t('name')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
    }
    this.dispatch({
      actionType: '__SELECT_STORE',
      payload: {
        storeKey: null,
      },
    });
  }

  private onMoveEnd(event: any, map: any): void {
    this.dispatch({
      actionType: '__UPDATE_VIEW',
      payload: {
        pos: map.getCenter(),
        zoom: map.getZoom(),
      },
    });
  }

  private onClickStore(event: React.MouseEvent<HTMLElement>, map: any, store: IStore): void {
    const query: { [key: string]: string | string[] } = queryString.parse(window.location.search);
    if (query.key !== store.key) {
      query.key = store.key;
      const search: string = queryString.stringify(query);
      const loc: string = `${window.location.pathname}${search ? `?${search}` : ''}`;
      const title: string = `${store.name} | ${this.dic.t('Pages.Maps.MAP')} | ${this.dic.t('name')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);

      // Sending ga event
      tracker.setPage(loc);
      tracker.setLocation(loc);
      tracker.sendPageView();
    }
    this.dispatch({
      actionType: '__SELECT_STORE',
      payload: {
        storeKey: store.key,
      },
    });
    this.centerStoreWithModal(store);
  }

  private onGetCurrentPosition(currentPos: IPosition): void {
    this.dispatch({
      actionType: '__UPDATE_CURRENT_POSITION',
      payload: {
        currentPos,
      },
    });
  }

  private centerStoreWithModal(store: IStore): void {
    const mapModalWidth: number = 384;
    const modalElement: HTMLElement = this.modalRef.current;
    const mapElement: HTMLElement = (this.mapRef.current as any).ref.current;

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
