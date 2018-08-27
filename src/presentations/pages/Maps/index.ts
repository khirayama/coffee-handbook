// tslint:disable:no-any
import * as leaflet from 'leaflet';

import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { logger } from 'presentations/utils/logger';

export interface IMapsPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
}

interface IPosition {
  lat: number;
  lng: number;
}

const stores: any[] = [{
  name: 'Saredo Coffee',
  address: '福岡県福岡市中央区六本松3-11-33エステートビル101',
  lat: 33.5794,
  lng: 130.381028,
}];

class Map {
  public map: leaflet.Map;

  constructor(el: HTMLElement) {
    const view: {
      pos: IPosition;
      zoom: number;
    } = this.loadView();

    this.map = leaflet.map(el).setView(view.pos, view.zoom);
    const tiles: leaflet.TileLayer = leaflet.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 100,
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
    });
    this.map.addLayer(tiles);

    this.setEventHandlers();
  }

  private getCenter(): IPosition {
    return this.map.getCenter();
  }

  private getZoom(): number {
    return this.map.getZoom();
  }

  private loadView(): { pos: IPosition; zoom: number } {
    return JSON.parse(window.localStorage.getItem('__MAP_CENTER')) || {
      pos: [35.664035, 139.698212],
      zoom: 8,
    };
  }

  private saveView(): void {
    window.localStorage.setItem('__MAP_CENTER', JSON.stringify({
      pos: this.getCenter(),
      zoom: this.getZoom(),
    }));
  }

  private setEventHandlers(): void {
    this.map.on('moveend', () => {
      this.saveView();
    });
  }
}

class Store {
  private store: any;

  private map: Map;

  private marker: leaflet.Marker;

  constructor(store: any, map: Map) {
    this.store = store;
    this.map = map;
    this.marker = leaflet
      .marker([store.lat, store.lng], {
        icon: leaflet.divIcon({
          className: 'icon',
        }),
      }).addTo(this.map.map);

    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.marker.on('click', () => {
      console.log(this.store);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);

  const mapElement: HTMLElement = window.document.querySelector('.Maps--Content--Map');
  const map: Map = new Map(mapElement);
  stores.forEach((store: any) => {
    new Store(store, map);
  });
});
