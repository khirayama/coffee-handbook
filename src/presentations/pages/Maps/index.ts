import * as queryString from 'query-string';

import { ILayout } from 'presentations/application/Layout';
import { Map } from 'presentations/components/Map';
import { StoreCard } from 'presentations/components/StoreCard';
import { StoreMarker } from 'presentations/components/StoreMarker';
import { View } from 'presentations/components/View';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { logger } from 'presentations/utils/logger';
import { IStore, Store } from 'resources/Store';
import { IStoreResponse, storeService } from 'services/storeService';

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

class Modal extends View {
  public open(): void {
    this.$el.addClass('Modal__Open');
  }

  public close(): void {
    this.$el.removeClass('Modal__Open');
  }
}

export interface IMapsPage extends ILayout {
  store: IStore;
  currentDay: number;
  openStatus: IOpenStatus;
  nextStatusMessage: string;
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);
  let storeCard: StoreCard;

  const lang: string = window.options.lang;

  const stores: IStore[] = Store(lang).find();

  const modalElement: HTMLElement = window.document.querySelector('.Modal');
  const modal: Modal = new Modal(modalElement);

  const mapElement: HTMLElement = window.document.querySelector('.Map');
  const map: Map = new Map(mapElement, {
    onClick: (): void => {
      // tslint:disable-line:no-suspicious-comment TODO: window.searchのkeyを消す
      window.history.pushState(null, 'Maps', `${window.location.pathname}`);
      if (storeCard) {
        storeCard.hideHours();
      }
      modal.close();
    },
  });

  const query: { key?: string } = queryString.parse(window.location.search);
  if (query.key) {
    storeService.find(query.key).then((res: IStoreResponse) => {
      const storeCardElement: HTMLElement = modalElement.querySelector('.StoreCard');
      storeCard = new StoreCard(storeCardElement);

      map.setView({ lat: null, lng: null }, 0);
      map.setView(
        {
          lat: res.lat,
          lng: res.lng,
        },
        15,
        {
          animate: false,
        },
      );
      const mapHeight: number = mapElement.clientHeight;
      const modalHeight: number = modalElement.clientHeight;
      const diff: number = (mapHeight - modalHeight) / 2 + modalHeight - mapHeight / 2;
      map.panBy(0, diff, {
        animate: false,
        duration: 0,
      });
    });
  }

  stores.forEach((store: IStore) => {
    const storeMarker: StoreMarker = new StoreMarker(null, {
      map,
      store,
      onClick: (): void => {
        // tslint:disable-line:no-suspicious-comment TODO: window.searchのkeyを足す
        window.history.pushState(null, store.name, `${window.location.pathname}?key=${store.key}`);
        storeService.find(store.key).then((res: IStoreResponse) => {
          modalElement.innerHTML = res.html;
          const storeCardElement: HTMLElement = modalElement.querySelector('.StoreCard');
          storeCard = new StoreCard(storeCardElement);
          modal.open();
        });
      },
    });
  });
});
