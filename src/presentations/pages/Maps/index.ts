import * as leaflet from 'leaflet';

import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { getOpenStatusMessage } from 'presentations/utils/getOpenStatusMessage';
import { logger } from 'presentations/utils/logger';
import { IStore, Store } from 'resources/Store';

export interface IMapsPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
}

interface IPosition {
  lat: number;
  lng: number;
}

class MapView {
  public map: leaflet.Map;

  private props: {
    onClick(): void;
  };

  constructor(el: HTMLElement, props?: { onClick(): void }) {
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
    return (
      JSON.parse(window.localStorage.getItem('__MAP_CENTER')) || {
        pos: [35.664035, 139.698212],
        zoom: 8,
      }
    );
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

  private setEventHandlers(): void {
    this.map.on('moveend', () => {
      this.saveView();
    });

    if (this.props.onClick) {
      this.map.on('click', this.props.onClick);
    }
  }
}

class StoreView {
  private store: IStore;

  private map: MapView;

  private props: {
    onClick(): void;
  };

  private marker: leaflet.Marker;

  constructor(store: IStore, map: MapView, props: { onClick(): void }) {
    this.store = store;
    this.map = map;
    this.props = props;
    this.marker = leaflet
      .marker([store.lat, store.lng], {
        icon: leaflet.divIcon({
          className: 'icon',
        }),
      })
      .addTo(this.map.map);

    this.setEventHandlers();
  }

  private setEventHandlers(): void {
    this.marker.on('click', () => {
      const store: IStore = this.store;

      const openStatus: {
        openStatus: number;
        nextOpen: {
          day: number;
          time: string;
        } | null;
      } = getOpenStatusMessage(new Date(), store.hours);

      const el: HTMLElement = window.document.querySelector('.Maps--Content--Modal');
      el.innerHTML = `
        <div class="Modal">
          <div class="Modal--Content">
            <h2 class="Modal--Name">${store.name}</h2>
            <div class="Modal--Address">${store.address}</div>
            <div class="Modal--OpenStatus">${openStatus.openStatus}</div>
            <ul class="Modal--Hours">${store.hours
              .map((hours: string[][]) => hours.map((hour: string[]) => hour.join('-')))
              .join('<br>')}</ul>
            ${store.email ? `<div class="Modal--Email">${store.email}</div>` : ''}
            ${store.tel ? `<div class="Modal--Tel">${store.tel}</div>` : ''}
            <ul>
              ${Object.keys(store.media)
                .map(
                  (key: string): string => {
                    return store.media[key]
                      ? `
                        <li>
                          <a target='__blank' class="Modal--Media Modal--Media__Active" href="${store.media[key]}">${
                          key[0]
                        }</a>
                        </li>
                      `
                      : `
                        <li>
                          <div class="Modal--Media">${key[0]}</div>
                        </li>
                      `;
                  },
                )
                .join('')}
            </ul>
            <ul>
              ${Object.keys(store.services)
                .map(
                  (key: string): string => {
                    return store.services[key]
                      ? `<li><div class="Modal--Media Modal--Media__Active">${key[0]}</div></li>`
                      : `<li><div class="Modal--Media">${key[0]}</div></li>`;
                  },
                )
                .join('')}
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

class ModalView {
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

  const stores: IStore[] = Store(window.options.lang).find();

  const modalElement: HTMLElement = window.document.querySelector('.Maps--Content--Modal');
  const modal: ModalView = new ModalView(modalElement);

  const mapElement: HTMLElement = window.document.querySelector('.Maps--Content--Map');
  const map: MapView = new MapView(mapElement, {
    onClick: (): void => modal.close(),
  });
  stores.forEach((store: IStore) => {
    new StoreView(store, map, {
      onClick: (): void => modal.open(),
    });
  });
});
