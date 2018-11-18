// tslint:disable:no-any
import * as React from 'react';

import { StoreMarker } from 'presentations/components/StoreMarker';
import { IPosition, IStore } from 'presentations/pages/Maps/interfaces';
import { secret } from 'secret';

interface IProps {
  lang: string;
  stores: IStore[];
  currentPos: IPosition | null;
  center: IPosition;
  zoom: number;
  onClickMap: any;
  onMoveEnd: any;
  onClickStore: any;
  onGetCurrentPosition: any;
}

const geolocationUtils: {
  getCurrentPosition(): Promise<IPosition>;
} = {
  getCurrentPosition: (): Promise<IPosition> => {
    return new Promise(
      (resolve: any): void => {
        window.navigator.geolocation.watchPosition(
          (pos: any): void => {
            resolve({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err: any): void => {
            // Noop
          },
          {
            enableHighAccuracy: true,
          },
        );
      },
    );
  },
};

export class StoreMapView extends React.Component<IProps, {}> {
  public map: mapboxgl.Map;

  public ref: React.RefObject<HTMLDivElement>;

  private currentPositionMarker: any = null;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();
    this.onClickCurrentPositionButton = this.onClickCurrentPositionButton.bind(this);
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

  public render(): JSX.Element {
    return (
      <>
        <div className="StoreMapView" ref={this.ref} />
        <div
          className="MapsPage--Content--CurrentPositionButton"
          onClick={this.onClickCurrentPositionButton}
          role="button"
        >
          <i className="Icon">my_location</i>
        </div>
      </>
    );
  }

  private setEventListeners(): void {
    this.map.on('click', (event: MouseEvent) => {
      this.props.onClickMap(event, this.map);
    });

    this.map.on('moveend', (event: mapboxgl.MapboxEvent) => {
      this.props.onMoveEnd(event, this.map);
    });
  }

  private addStores(): void {
    this.props.stores.forEach((store: IStore) => {
      const storeMarker: StoreMarker = new StoreMarker(this.map, store, {
        onClick: (event: any): void => {
          this.props.onClickStore(event, this.map, store);
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

  private onClickCurrentPositionButton(event: React.MouseEvent<HTMLElement>): void {
    if (this.props.currentPos) {
      this.map.panTo(this.props.currentPos);
    }

    geolocationUtils.getCurrentPosition().then((currentPos: IPosition) => {
      this.props.onGetCurrentPosition(currentPos, this.map);
      if (this.props.currentPos && this.currentPositionMarker === null) {
        this.addCurrentPosition();
      } else if (this.currentPositionMarker) {
        this.currentPositionMarker.setLngLat(currentPos);
      }
    });
  }
}
