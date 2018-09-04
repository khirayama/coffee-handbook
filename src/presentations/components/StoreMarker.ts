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
        }),
      })
      .addTo(this.props.map.map);
  }

  public setEventListeners(): void {
    if (this.props.onClick) {
      this.marker.on('click', this.props.onClick);
    }
  }
}
