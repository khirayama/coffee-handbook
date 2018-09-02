import * as leaflet from 'leaflet';

import { Map } from 'presentations/components/Map';
import { View } from 'presentations/components/View';
import { getOpenStatusMessage, IOpenStatus } from 'presentations/utils/getOpenStatusMessage';
import { IStore } from 'resources/Store';

export class StoreMarker extends View {
  public props: {
    map: Map;
    store: IStore;
    onClick(): void;
  };

  private marker: leaflet.Marker;

  public init(): void {
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

      const openStatus: IOpenStatus = getOpenStatusMessage(new Date(), store.hours);

      const el: HTMLElement = window.document.querySelector('.Maps--Content--Modal');
      el.innerHTML = `
        <div class="Modal">
          <div class="Modal--Content">
            <h2 class="Modal--Name">${store.name}</h2>
            <div class="Modal--Address">${store.address}</div>
            <div class="Modal--OpenStatus">${openStatus.status}</div>
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
