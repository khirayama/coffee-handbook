import * as classNames from 'classnames';
import * as React from 'react';

import { dictionary } from 'dictionary';
import { ShopCard } from 'presentations/components/ShopCard';
import { ShopMapView } from 'presentations/components/ShopMapView';
import { connect } from 'presentations/containers/Container';
import { CurrentPositionButtonContainer } from 'presentations/containers/CurrentPositionButton';
import { selectShop, unselectShop, updateCurrentPosition, updateView } from 'presentations/pages/Maps/actionCreators';
import { IAction, IDispatch, IPosition, IRawShop, IState, IShop } from 'presentations/pages/Maps/interfaces';
import { tracker } from 'presentations/utils/tracker';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';

interface IProps extends IState {
  dispatch: IDispatch;
}

export class MapsDesktopPage extends React.Component<IProps, {}> {
  private mapRef: React.RefObject<ShopMapView>;

  private modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.mapRef = React.createRef();
    this.modalRef = React.createRef();
    this.onClickMap = this.onClickMap.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onClickShop = this.onClickShop.bind(this);
  }

  public componentDidMount(): void {
    if (this.props.ui.selectedShopKey) {
      const shopResource: Resource<IRawShop, IShop> = new Resource(this.props.shops, this.props.lang);
      const shop: IShop = shopResource
        .where({
          key: this.props.ui.selectedShopKey,
        })
        .findOne();
      this.centerShopWithModal(shop);
    }

    window.addEventListener('popstate', () => {
      const shopKey: string = window.location.pathname.replace('/shops/', '');

      selectShop(this.props.dispatch, shopKey);
      if (shopKey) {
        const shopResource: Resource<IRawShop, IShop> = new Resource(this.props.shops, this.props.lang);
        const currentShop: IShop = shopResource
          .where({
            key: shopKey,
          })
          .findOne();
        this.centerShopWithModal(currentShop);
      }
    });
  }

  public render(): JSX.Element {
    const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
    const props: IState = this.props;
    const shopResource: Resource<IRawShop, IShop> = new Resource(this.props.shops, this.props.lang);
    const shop: IShop = shopResource
      .where({
        key: props.ui.selectedShopKey,
      })
      .findOne();

    return (
      <div className="MapsDesktopPage">
        <div className="MapsDesktopPage--Content">
          <CurrentPositionButtonContainer />
          <ShopMapView
            ref={this.mapRef}
            lang={props.lang}
            currentPos={props.ui.currentPos}
            selectedShopKey={props.ui.selectedShopKey}
            shops={shopResource.find()}
            center={props.ui.pos}
            zoom={props.ui.zoom}
            offset={props.ui.offset}
            onClickMap={this.onClickMap}
            onMoveEnd={this.onMoveEnd}
            onClickShop={this.onClickShop}
          />
          <div ref={this.modalRef} className={classNames('Modal', { Modal__Hidden: !shop })}>
            <main>
              <ShopCard shop={shop} dic={dic} />
            </main>
          </div>
        </div>
      </div>
    );
  }

  private onClickMap(event: MouseEvent): void {
    const shopKey: string = window.location.pathname.replace('/shops/', '');
    if (shopKey) {
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const loc: string = '/';
      const title: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
    }
    unselectShop(this.props.dispatch);
  }

  private onMoveEnd(event: mapboxgl.MapboxEvent, map: mapboxgl.Map): void {
    updateView(this.props.dispatch, map.getCenter(), map.getZoom(), [0, 0]);
  }

  private onClickShop(event: React.MouseEvent<HTMLElement>, shop: IShop): void {
    const shopKey: string = window.location.pathname.replace('/shops/', '');
    if (shopKey !== shop.key) {
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const loc: string = `/shops/${shop.key}`;
      const title: string = `${shop.name} | ${shop.address} | ${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);

      // Sending ga event
      tracker.setPage(loc);
      tracker.setLocation(loc);
      tracker.sendPageView();
    }
    selectShop(this.props.dispatch, shop.key);
    this.centerShopWithModal(shop);
  }

  private centerShopWithModal(shop: IShop): void {
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
        lng: shop.lng,
        lat: shop.lat,
      },
      this.props.ui.zoom,
      offset,
    );
  }
}

// tslint:disable-next-line:variable-name
export const MapsDesktopPageContainer: React.ComponentClass = connect(MapsDesktopPage);
