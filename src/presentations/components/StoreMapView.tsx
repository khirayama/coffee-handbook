// tslint:disable:no-any
import * as React from 'react';

import { StoreMarker } from 'presentations/components/StoreMarker';
import { IStore } from 'resources/Store';
import { secret } from 'secret';

export interface IPosition {
  lat: number;
  lng: number;
}

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
  isPermittedGettingLocation(): Promise<boolean>;
  getCurrentPosition(): Promise<IPosition>;
} = {
  isPermittedGettingLocation: (): Promise<boolean> => {
    return new Promise(
      (resolve: any): void => {
        const nav: any = window.navigator;
        if (nav.permissions) {
          nav.permissions
            .query({
              name: 'geolocation',
            })
            .then((permission: any) => {
              resolve(permission.state === 'granted');
            });
        } else {
          resolve(false);
        }
      },
    );
  },
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

  private ref: React.RefObject<HTMLDivElement>;

  private currentPositionMarker: any = null;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();
    this.onClickCurrentPositionButton = this.onClickCurrentPositionButton.bind(this);
  }

  public componentDidMount(): void {
    const el: HTMLElement = this.ref.current;
    window.mapboxgl.accessToken = secret.mapboxToken;
    this.map = new window.mapboxgl.Map({
      // FYI: https://www.mapbox.com/mapbox-gl-js/api/
      container: el,
      minZoom: 1, // どこまで引けるか
      maxZoom: 18, // どこまで近づけるか
      style: 'mapbox://styles/mapbox/light-v9',
      center: this.props.center,
      zoom: this.props.zoom,
    });

    geolocationUtils.isPermittedGettingLocation().then((isPermitted: boolean) => {
      if (isPermitted) {
        geolocationUtils.getCurrentPosition().then((currentPos: IPosition) => {
          this.props.onGetCurrentPosition(currentPos);
          if (this.props.currentPos && this.currentPositionMarker === null) {
            // TODO: Update marker according to current position
            this.addCurrentPosition();
          }
        });
      }
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
    this.map.on('click', (event: any) => {
      this.props.onClickMap(event, this.map);
    });

    this.map.on('moveend', (event: any) => {
      this.props.onMoveEnd(event, this.map);
    });
  }

  private addStores(): void {
    this.props.stores.forEach((store: any) => {
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
        // TODO: Update marker according to current position
        this.addCurrentPosition();
      }
    });
  }
}
