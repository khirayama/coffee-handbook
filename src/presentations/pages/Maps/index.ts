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
  lat: 33.5794,
  lng: 130.381028,
  name: 'Saredo Coffee',
  address: '福岡県福岡市中央区六本松3-11-33エステートビル101',
  hours: 'OPEN 11:00 - 20:00・Drink O/S 19:00・CLOSED 水曜日',
  email: null,
  tel: '0927911313',
  media: {
    web: 'https://www.saredocoffee.com/',
    ec: 'https://www.saredocoffee.com/shop',
    facebook: 'https://www.facebook.com/SaredoCoffee/',
    twitter: null,
    instagram: 'https://www.instagram.com/saredocoffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/saredocoffee/',
    googleMaps: 'https://goo.gl/maps/jfZhdSXprhn',
  },
  facilities: {
    roaster: true,
    power: false,
    wifi: true,
    // credit: {
    //   visa: false,
    //   masterCard: false,
    //   unionPay: false,
    //   amex: false,
    //   jcb: false,
    //   diners: false,
    //   discover: false,
    // },
    cash: true,
    credit: null,
  },
  permanentClosed: false,
}];

class Map {
  public map: leaflet.Map;

  private props: any;

  constructor(el: HTMLElement, props?: any) {
    const view: {
      pos: IPosition;
      zoom: number;
    } = this.loadView();

    this.map = leaflet.map(el).setView(view.pos, view.zoom);
    this.props = props;
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

    if (this.props.onClick) {
      this.map.on('click', this.props.onClick);
    }
  }
}

class Store {
  private store: any;

  private map: Map;

  private props: any;

  private marker: leaflet.Marker;

  constructor(store: any, map: Map, props: any) {
    this.store = store;
    this.map = map;
    this.props = props;
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

      const store: any = this.store;

      const el: HTMLElement = window.document.querySelector('.Maps--Content--Modal');
      el.innerHTML = `
        <div class="Modal">
          <div class="Modal--Content">
            <h2 class="Modal--Name">${store.name}</h2>
            <div class="Modal--Address">${store.address}</div>
            <div class="Modal--Hours">${store.hours}</div>
            ${(store.email) ? `<div class="Modal--Email">${store.email}</div>` : ''}
            ${(store.tel) ? `<div class="Modal--Tel">${store.tel}</div>` : ''}
            <ul>
              ${((Object.keys(store.media)).map((key: string): string => (store.media[key]) ? `<li><div class="Modal--Media Modal--Media__Active">${key[0]}</div></li>` : `<li><div class="Modal--Media">${key[0]}</div></li>`)).join('')}
            </ul>
          </div>
        </div>
      `;
    });

    if (this.props.onClick) {
      this.marker.on('click', this.props.onClick);
    }
  }
}

class Modal {
  private el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  public open(): void {
    this.el.classList.add('Maps--Content--Modal__Open');
  }

  public close(): void {
    this.el.classList.remove('Maps--Content--Modal__Open');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);

  const modalElement: HTMLElement = window.document.querySelector('.Maps--Content--Modal');
  const modal: Modal = new Modal(modalElement);

  const mapElement: HTMLElement = window.document.querySelector('.Maps--Content--Map');
  const map: Map = new Map(mapElement, {
    onClick: () => modal.close(),
  });
  stores.forEach((store: any) => {
    new Store(store, map, {
      onClick: () => modal.open(),
    });
  });
});
