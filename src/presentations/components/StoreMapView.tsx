// tslint:disable:no-any
import * as React from 'react';

import { StoreMarker } from 'presentations/components/StoreMarker';
import { IPosition, IStore } from 'presentations/pages/Maps/interfaces';
import { secret } from 'secret';

// TODO: Use mapbox from npm package

interface IProps {
  lang: string;
  stores: IStore[];
  currentPos: IPosition | null;
  center: IPosition;
  zoom: number;
  offset: [number, number];
  onClickMap: any;
  onMoveEnd: any;
  onClickStore: any;
}

export class StoreMapView extends React.Component<IProps, {}> {
  public map: mapboxgl.Map;

  public ref: React.RefObject<HTMLDivElement>;

  private currentPositionMarker: any = null;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();
  }

  public componentDidMount(): void {
    const el: HTMLElement = this.ref.current;
    window.mapboxgl.accessToken = secret.mapboxToken;
    // FYI: https://www.mapbox.com/ios-sdk/maps/overview/interacting-with-the-map/
    // I want to do implement One-Finger zoom. But it is not supported now in JS. That document is for iOS.
    this.map = new window.mapboxgl.Map({
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
    this.addStores();
    this.setEventListeners();
  }

  public componentDidUpdate(): void {
    if (this.props.currentPos && this.currentPositionMarker === null) {
      this.addCurrentPosition();
    } else if (this.currentPositionMarker !== null) {
      this.currentPositionMarker.setLngLat(this.props.currentPos);
    }

    const center: IPosition = this.map.getCenter();
    if (this.props.center.lat !== center.lat || this.props.center.lng !== center.lng) {
      if (this.props.offset[0] !== 0 || this.props.offset[1] !== 0) {
        this.map.flyTo({
          center: this.props.center,
          offset: this.props.offset,
        });
      } else {
        this.map.panTo(this.props.center);
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div className="StoreMapView">
        <div className="StoreMapView--Map" ref={this.ref} />
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

  private addStores(): void {
    this.props.stores.forEach((store: IStore) => {
      const storeMarker: StoreMarker = new StoreMarker(this.map, store, {
        onClick: (event: any): void => {
          this.props.onClickStore(event, store);
        },
      });
    });
  }

  private addCurrentPosition(): void {
    const currentPos: IPosition | null = this.props.currentPos;
    if (currentPos) {
      const el: HTMLDivElement = document.createElement('div');
      el.className = 'CurrentPostionMarker';
      el.innerHTML = '<span class="CurrentPostionMarker--Icon"></span>';
      this.currentPositionMarker = new window.mapboxgl.Marker(el)
        .setLngLat([currentPos.lng, currentPos.lat])
        .addTo(this.map);
    }
  }
}
