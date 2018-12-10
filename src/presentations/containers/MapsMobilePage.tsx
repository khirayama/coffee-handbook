import * as React from 'react';

import { dic } from 'dic';
import { CandidateList } from 'presentations/components/CandidateList';
import { CandidateListItem } from 'presentations/components/CandidateListItem';
import { FreeSpace } from 'presentations/components/FreeSpace';
import { Modal } from 'presentations/components/Modal';
import { Sheet } from 'presentations/components/Sheet';
import { ShopCard } from 'presentations/components/ShopCard';
import { ShopCards } from 'presentations/components/ShopCards';
import { ShopMapView } from 'presentations/components/ShopMapView';
import { CurrentPositionButtonContainer } from 'presentations/containers/CurrentPositionButton';
import { SearchFormContainer } from 'presentations/containers/SearchForm';
import {
  searchShop,
  selectShop,
  selectTargetShop,
  unselectShop,
  updateView,
} from 'presentations/pages/Maps/actionCreators';
import { IPosition, IRawShop, IShop } from 'presentations/pages/Maps/interfaces';
import { getMapOffset, waitNextTick, waitShortAnimationEnd } from 'presentations/utils/helpers';
import { tracker } from 'presentations/utils/tracker';
import { shopSearchEngine } from 'ShopSearchEngine';
import { connect, IContainerProps } from 'utils/Container';
import { Resource } from 'utils/Resource';

export class MapsMobilePage extends React.Component<IContainerProps, {}> {
  constructor(props: IContainerProps) {
    super(props);

    this.onClickMap = this.onClickMap.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onSnap = this.onSnap.bind(this);
    this.onClickShop = this.onClickShop.bind(this);
    this.onClickCandidateItem = this.onClickCandidateItem.bind(this);
  }

  public componentDidMount(): void {
    if (this.props.ui.selectedShopKey) {
      waitNextTick().then(() => {
        const shopResource: Resource<IRawShop, IShop> = new Resource(this.props.shops, this.props.lang);
        const shop: IShop = shopResource
          .where({
            key: this.props.ui.selectedShopKey,
          })
          .findOne();
        const offset: [number, number] = getMapOffset();
        updateView(
          this.props.dispatch,
          {
            lng: shop.lng,
            lat: shop.lat,
          },
          this.props.ui.zoom,
          offset,
        );
      });
    }
  }

  public render(): JSX.Element {
    const props: IContainerProps = this.props;
    const targetShopKeys: string[] = props.ui.targetShopKeys;
    const shopResource: Resource<IRawShop, IShop> = new Resource(props.shops, props.lang);
    const shop: IShop = shopResource
      .where({
        key: props.ui.selectedShopKey,
      })
      .findOne();
    const shops: IShop[] = shopResource.find();
    // FIXME: Inefficiency. But I want to keep an order of targetShopKeys.
    const targetShops: IShop[] = targetShopKeys.length
      ? targetShopKeys.map((targetShopKey: string) => {
          return shops.filter((candidateShop: IShop) => candidateShop.key === targetShopKey)[0];
        })
      : shops;

    return (
      <div className="MapsMobilePage">
        <div className="MapsMobilePage--Content">
          <div className="MapsMobilePage--Content--SearchForm">
            <SearchFormContainer />
          </div>
          <CurrentPositionButtonContainer />
          <Sheet isShown={props.ui.isShownSheet}>
            <div className="MapsMobilePage--Content--SheetContent">
              {targetShopKeys.length ? (
                <CandidateList>
                  {targetShops.map((targetShop: IShop) => {
                    return (
                      <CandidateListItem
                        key={targetShop.key}
                        shop={targetShop}
                        onClickItem={this.onClickCandidateItem}
                      />
                    );
                  })}
                </CandidateList>
              ) : (
                <FreeSpace />
              )}
            </div>
          </Sheet>
          <ShopCards
            isShown={props.ui.isShownShopCards}
            shops={targetShops}
            onClickItem={this.onClickShop}
            onSnap={this.onSnap}
          />
          <Modal isShown={props.ui.isShownModal}>
            <ShopCard shop={shop} lang={this.props.lang} />
          </Modal>
          <ShopMapView
            lang={props.lang}
            currentPos={props.ui.currentPos}
            selectedShopKey={props.ui.selectedShopKey}
            shops={targetShops}
            center={props.ui.pos}
            zoom={props.ui.zoom}
            offset={props.ui.offset}
            onClickMap={this.onClickMap}
            onMoveEnd={this.onMoveEnd}
            onClickShop={this.onClickShop}
          />
        </div>
      </div>
    );
  }

  private onMoveEnd(event: mapboxgl.MapboxEvent, map: mapboxgl.Map): void {
    updateView(this.props.dispatch, map.getCenter(), map.getZoom(), [0, 0]);
  }

  private onSnap(shopKey: string): void {
    const shopResource: Resource<IRawShop, IShop> = new Resource(this.props.shops, this.props.lang);
    const shop: IShop = shopResource
      .where({
        key: shopKey,
      })
      .findOne();
    selectTargetShop(
      this.props.dispatch,
      shopKey,
      {
        lng: shop.lng,
        lat: shop.lat,
      },
      this.props.ui.zoom,
      [0, 0],
    );
  }

  private onClickMap(event: MouseEvent): void {
    const shopKey: string = window.location.pathname.replace('/shops/', '');
    if (shopKey) {
      const loc: string = '/';
      const title: string = `${dic.t('name', this.props.lang)} | ${dic.t('siteDescription', this.props.lang)}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
    }
    unselectShop(this.props.dispatch);
  }

  private onClickShop(event: React.MouseEvent<HTMLElement>, shop: IShop): void {
    const shopKey: string = window.location.pathname.replace('/shops/', '');
    if (shopKey !== shop.key) {
      const loc: string = `/shops/${shop.key}`;
      const title: string = `${shop.name} | ${shop.address} | ${dic.t('name', this.props.lang)} | ${dic.t(
        'siteDescription',
        this.props.lang,
      )}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);

      // Sending ga event
      tracker.setPage(loc);
      tracker.setLocation(loc);
      tracker.sendPageView();
    }
    waitShortAnimationEnd().then(() => {
      selectShop(this.props.dispatch, shop.key);

      waitNextTick().then(() => {
        const offset: [number, number] = getMapOffset();
        updateView(
          this.props.dispatch,
          {
            lng: shop.lng,
            lat: shop.lat,
          },
          this.props.ui.zoom,
          offset,
        );
      });
    });
  }

  private onClickCandidateItem(event: React.MouseEvent<HTMLElement>, shop: IShop): void {
    selectShop(this.props.dispatch, shop.key);
    updateView(
      this.props.dispatch,
      {
        lat: shop.lat,
        lng: shop.lng,
      },
      this.props.ui.zoom,
      [0, 0],
    );
    this.setState({
      value: '',
      candidates: [],
    });
  }
}

// tslint:disable-next-line:variable-name
export const MapsMobilePageContainer: React.ComponentClass = connect(MapsMobilePage);
