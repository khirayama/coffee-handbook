// tslint:disable:no-any
import * as deepEqual from 'deep-equal';
import * as React from 'react';

import { ShopMarker } from 'presentations/components/ShopMarker';
import { IPosition, IShop } from 'presentations/pages/Maps/interfaces';
import { secret } from 'secret';

interface IProps {
  lang: string;
  selectedShopKey: string | null;
  shops: IShop[];
  currentPos: IPosition | null;
  center: IPosition;
  zoom: number;
  offset: [number, number];
  onClickMap: any;
  onMoveEnd: any;
  onClickShop: any;
}

export class ShopMapView extends React.Component<IProps, {}> {
  public map: mapboxgl.Map;

  public ref: React.RefObject<HTMLDivElement>;

  private currentPositionMarker: any = null;

  private shopMarkers: { [key: string]: ShopMarker } = {};

  private currentShopMarker: ShopMarker | null;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();
  }

  public async componentDidMount(): Promise<void> {
    const el: HTMLElement = this.ref.current;
    const mapboxgl: any = await import('mapbox-gl');
    mapboxgl.accessToken = secret.mapboxToken;
    // FYI: https://www.mapbox.com/ios-sdk/maps/overview/interacting-with-the-map/
    // I want to do implement One-Finger zoom. But it is not supported now in JS. That document is for iOS.
    this.map = new mapboxgl.Map({
      // FYI: https://www.mapbox.com/mapbox-gl-js/api/
      container: el,
      minZoom: 1, // どこまで引けるか
      maxZoom: 18, // どこまで近づけるか
      style: 'mapbox://styles/mapbox/light-v9',
      center: this.props.center,
      zoom: this.props.zoom,
    });

    if (this.props.currentPos && this.currentPositionMarker === null) {
      this.addCurrentPosition();
    }
    this.removeShops();
    this.addShops();
    this.centering();
    this.setEventListeners();
  }

  public componentDidUpdate(prevProps: IProps): void {
    if (this.props.currentPos && this.currentPositionMarker === null) {
      this.addCurrentPosition();
    } else if (this.currentPositionMarker !== null) {
      this.currentPositionMarker.setLngLat(this.props.currentPos);
    }

    this.centering();
    if (!deepEqual(prevProps.shops, this.props.shops)) {
      this.removeShops();
      this.addShops();
    }

    const selectedShopKey: string | null = this.props.selectedShopKey;
    if (selectedShopKey) {
      if (this.currentShopMarker) {
        this.currentShopMarker.inactive();
      }

      this.currentShopMarker = this.shopMarkers[selectedShopKey];
      if (this.currentShopMarker) {
        this.currentShopMarker.active();
      }
    } else {
      if (this.currentShopMarker) {
        this.currentShopMarker.inactive();
        this.currentShopMarker = null;
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div className="ShopMapView">
        <div className="ShopMapView--Map" ref={this.ref} />
      </div>
    );
  }

  private setEventListeners(): void {
    this.map.on('click', (event: MouseEvent) => {
      this.props.onClickMap(event);
    });

    this.map.on('moveend', (event: mapboxgl.MapboxEvent) => {
      this.props.onMoveEnd(event, this.map);
    });
  }

  private addShops(): void {
    this.props.shops.forEach((shop: IShop) => {
      const shopMarker: ShopMarker = new ShopMarker(this.map, shop, {
        onClick: (event: any): void => {
          this.props.onClickShop(event, shop);
        },
      });
      this.shopMarkers[shop.key] = shopMarker;
    });
  }

  private removeShops(): void {
    Object.keys(this.shopMarkers).forEach((shopKey: string) => {
      const shopMarker: ShopMarker = this.shopMarkers[shopKey];
      if (shopMarker) {
        shopMarker.remove();
        this.shopMarkers[shopKey] = null;
      }
    });
  }

  private async addCurrentPosition(): Promise<void> {
    const currentPos: IPosition | null = this.props.currentPos;
    if (currentPos) {
      const el: HTMLDivElement = document.createElement('div');
      el.className = 'CurrentPostionMarker';
      el.innerHTML = '<span class="CurrentPostionMarker--Icon"></span>';
      const mapboxgl: any = await import('mapbox-gl');
      this.currentPositionMarker = new mapboxgl.Marker(el).setLngLat([currentPos.lng, currentPos.lat]).addTo(this.map);
    }
  }

  private centering(): void {
    const center: IPosition = this.map.getCenter();
    if (
      this.props.center.lat !== center.lat ||
      this.props.center.lng !== center.lng ||
      this.props.offset[0] !== 0 ||
      this.props.offset[1] !== 0
    ) {
      this.map.panTo(this.props.center, {
        offset: this.props.offset,
        duration: 200,
      });
    } else if (this.props.center.lat !== center.lat || this.props.center.lng !== center.lng) {
      this.map.panTo(this.props.center, {
        duration: 200,
      });
    }
  }
}
