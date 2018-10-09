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
          iconSize: [16, 16],
          iconAnchor: [8, 16],
          html: `
            <span class="StoreMarker--Icon"></span>
            <span class="StoreMarker--Name">${this.props.store.name}</span>
          `,
        }),
      })
      .addTo(this.props.map.map);

    this.showDetail();
  }

  public setEventListeners(): void {
    this.props.map.map.on('moveend', () => {
      this.showDetail();
    });

    if (this.props.onClick) {
      this.marker.on('click', this.props.onClick);
    }
  }

  private showDetail(): void {
    const zoom: number = this.props.map.getZoom();
    if (zoom > 11) {
      this.marker._icon.classList.remove('StoreMarker__Mark');
    } else {
      this.marker._icon.classList.add('StoreMarker__Mark');
    }
  }
}
