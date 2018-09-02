import * as leaflet from 'leaflet';

import { dictionary } from 'dictionary';
import { Map } from 'presentations/components/Map';
import { View } from 'presentations/components/View';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { IStore } from 'resources/Store';
import { Dictionary } from 'utils/Dictionary';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    options: {
      env: string;
      lang: string;
      gaCode: string;
      route: string;
    };
  }
}

function nextStatus(openStatus: IOpenStatus, dic: Dictionary): string {
  const now: Date = new Date();
  const currentDay: number = now.getDay();
  if (openStatus.openAt) {
    if (currentDay === openStatus.openAt.day) {
      return dic.t(`Pages.Maps.openAt`, openStatus.openAt.time);
    } else {
      return `${dic.t(`Pages.Maps.openAt`, openStatus.openAt.time)} ${dic.t(
        `Pages.Maps.day.${openStatus.openAt.day}`,
      )}`;
    }
  } else if (openStatus.closeAt) {
    return dic.t(`Pages.Maps.closeAt`, openStatus.closeAt.time);
  }
}

export class StoreMarker extends View {
  public props: {
    map: Map;
    store: IStore;
    onClick(): void;
  };

  private marker: leaflet.Marker;

  private dic: Dictionary;

  public init(): void {
    this.dic = new Dictionary(window.options.lang, dictionary);
    this.marker = leaflet
      .marker([this.props.store.lat, this.props.store.lng], {
        icon: leaflet.divIcon({
          className: 'StoreMarker',
        }),
      })
      .addTo(this.props.map.map);
  }

  public setEventListeners(): void {
    this.marker.on('click', () => {
      const store: IStore = this.props.store;

      const openStatus: IOpenStatus = getOpenStatus(new Date(), store.hours);
      const now: Date = new Date();
      const currentDay: number = now.getDay();

      const el: HTMLElement = window.document.querySelector('.Maps--Content--Modal');
      el.innerHTML = `
        <div class="Modal">
          <div class="Modal--Content">
            <h2 class="Modal--Name">${store.name}</h2>
            <div class="Modal--Address">${store.address}</div>
            <div class="Modal--OpenStatus">
              <span class="Modal--OpenStatus--Status">${this.dic.t(`Pages.Maps.openStatus.${openStatus.status}`)}</span>
              <span class="Modal--OpenStatus--NextStatus">${nextStatus(openStatus, this.dic)}</span>
            </div>
            <ul class="Modal--Hours">${store.hours
              .map((hours: string[][], i: number) => {
                if (hours.length) {
                  return hours.map((hour: string[]) => {
                    return `
                      <li class="Modal--Hours--Item ${currentDay === i ? 'Modal--Hours--Item__Active' : ''}">
                        <span class="Modal--Hours--Item--Day">${this.dic.t(`Pages.Maps.day.${i}`)}</span>
                        <span class="Modal--Hours--Item--Time">${hour.join(' - ')}</span>
                      </li>
                    `;
                  });
                } else {
                  return `
                    <li class="Modal--Hours--Item">
                      <span class="Modal--Hours--Item--Day">${this.dic.t(`Pages.Maps.day.${i}`)}</span>
                      <span class="Modal--Hours--Item--Time">${this.dic.t('Pages.Maps.closed')}</span>
                    </li>
                  `;
                }
              })
              .join('')}</ul>
            ${store.email ? `<a href="mailto:${store.email}">${store.email}</a>` : ''}
            ${store.tel ? `<a href="tel:${store.tel}">${store.tel}</a>` : ''}
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
