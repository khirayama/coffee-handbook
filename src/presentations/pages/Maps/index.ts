import * as queryString from 'query-string';

import { ILayout } from 'presentations/application/Layout';
import { Map } from 'presentations/components/Map';
import { MapHeader } from 'presentations/components/MapHeader';
import { Modal } from 'presentations/components/Modal';
import { StoreCard } from 'presentations/components/StoreCard';
import { StoreMarker } from 'presentations/components/StoreMarker';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { logger } from 'presentations/utils/logger';
import { IStore, Store } from 'resources/Store';
import { IStoreResponse, storeService } from 'services/storeService';

// TODO: current position を geo location api で取得できるように
// TODO: mapsの時間をclient sideで

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

const mapModalWidth: number = 384;

export interface IMapsPage extends ILayout {
  store: IStore;
  currentDay: number;
  openStatus: IOpenStatus;
  nextStatusMessage: string;
}

// tslint:disable:max-func-body-length
window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);
  let storeCard: StoreCard;
  let query: { key?: string };

  const lang: string = window.options.lang;

  const stores: IStore[] = Store(lang).find();

  const mapHeaderElement: HTMLElement = window.document.querySelector('.MapHeader');
  new MapHeader(mapHeaderElement);

  const modalElement: HTMLElement = window.document.querySelector('.Modal');
  const modal: Modal = new Modal(modalElement);

  const mapElement: HTMLElement = window.document.querySelector('.Map');
  const map: Map = new Map(mapElement, {
    onClick: (): void => {
      const currentQuery: { key?: string } = queryString.parse(window.location.search);
      delete currentQuery.key;
      window.history.pushState(null, 'Maps', `${window.location.pathname}?${queryString.stringify(currentQuery)}`);
      if (storeCard) {
        storeCard.hideHours();
      }
      modal.close();
    },
  });

  query = queryString.parse(window.location.search);
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

      if (window.innerWidth > mapModalWidth * 2) {
        const mapWidth: number = mapElement.clientWidth;
        const modalWidth: number = modalElement.clientWidth;
        const diff: number = mapWidth / 2 - (mapWidth - modalWidth) / 2 - modalWidth;
        map.panBy(diff, 0, {
          animate: false,
          duration: 0,
        });
      } else {
        const mapHeight: number = mapElement.clientHeight;
        const modalHeight: number = modalElement.clientHeight;
        const diff: number = (mapHeight - modalHeight) / 2 + modalHeight - mapHeight / 2;
        map.panBy(0, diff, {
          animate: false,
          duration: 0,
        });
      }
    });
  }

  stores.forEach((store: IStore) => {
    const storeMarker: StoreMarker = new StoreMarker(null, {
      map,
      store,
      onClick: (): void => {
        const currentQuery: { key?: string } = queryString.parse(window.location.search);
        currentQuery.key = store.key;
        window.history.pushState(
          null,
          store.name,
          `${window.location.pathname}?${queryString.stringify(currentQuery)}`,
        );
        storeService.find(store.key).then((res: IStoreResponse) => {
          modalElement.querySelector('.StoreCard').innerHTML = res.html;
          const storeCardElement: HTMLElement = modalElement.querySelector('.StoreCard');
          storeCard = new StoreCard(storeCardElement);
          modal.open();
        });
      },
    });
  });

  window.addEventListener('popstate', () => {
    query = queryString.parse(window.location.search);
    if (query.key) {
      storeService.find(query.key).then((res: IStoreResponse) => {
        modalElement.querySelector('.StoreCard').innerHTML = res.html;
        const storeCardElement: HTMLElement = modalElement.querySelector('.StoreCard');
        storeCard = new StoreCard(storeCardElement);
        modal.open();
      });
    } else {
      if (storeCard) {
        storeCard.hideHours();
      }
      modal.close();
    }
  });
});
