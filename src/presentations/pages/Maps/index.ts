import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { Map } from 'presentations/components/Map';
import { INavigationComponent } from 'presentations/components/Navigation';
import { StoreMarker } from 'presentations/components/StoreMarker';
import { logger } from 'presentations/utils/logger';
import { IStore, Store } from 'resources/Store';

export interface IMapsPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
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

  const mapElement: HTMLElement = window.document.querySelector('.Map');
  const map: Map = new Map(mapElement, {
    onClick: (): void => modal.close(),
  });
  stores.forEach((store: IStore) => {
    new StoreMarker(null, {
      map,
      store,
      onClick: (): void => modal.open(),
    });
  });
});
