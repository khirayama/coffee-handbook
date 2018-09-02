import * as leaflet from 'leaflet';

import { View } from 'presentations/components/View';

interface IPosition {
  lat: number;
  lng: number;
}

interface IView {
  pos: IPosition;
  zoom: number;
}

export class Map extends View {
  public map: leaflet.Map;

  public props: {
    onClick(): void;
  };

  public init(): void {
    const view: IView = this.loadView();

    this.map = leaflet.map(this.el).setView(view.pos, view.zoom);
    const tiles: leaflet.TileLayer = leaflet.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 100,
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
    });
    this.map.addLayer(tiles);
  }

  public setEventListeners(): void {
    this.map.on('moveend', () => {
      this.saveView();
    });

    if (this.props.onClick) {
      this.map.on('click', this.props.onClick);
    }
  }

  private getCenter(): IPosition {
    return this.map.getCenter();
  }

  private getZoom(): number {
    return this.map.getZoom();
  }

  private loadView(): IView {
    const defaultView: IView = {
      pos: {
        lat: 35.664035,
        lng: 139.698212,
      },
      zoom: 8,
    };

    return JSON.parse(window.localStorage.getItem('__MAP_CENTER')) || defaultView;
  }

  private saveView(): void {
    window.localStorage.setItem(
      '__MAP_CENTER',
      JSON.stringify({
        pos: this.getCenter(),
        zoom: this.getZoom(),
      }),
    );
  }
}
