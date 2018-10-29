// tslint:disable:no-any
import { IStore } from 'resources/Store';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    mapboxgl: any;
  }
}

export class StoreMarker {
  public el: HTMLElement;

  public store: IStore;

  private map: any;

  private marker: any;

  private handlers: any;

  constructor(map: any, store: IStore, handlers: any) {
    this.map = map;
    this.store = store;
    this.handlers = handlers;

    this.el = document.createElement('div');
    this.el.className = 'StoreMarker';
    this.el.innerHTML = `
        <span class="StoreMarker--Icon"></span>
        <span class="StoreMarker--Name">${this.store.name}</span>
    `;
    this.marker = new window.mapboxgl.Marker(this.el).setLngLat([this.store.lng, this.store.lat]).addTo(map);

    this.showDetail();
    this.setEventListeners();
  }

  public setEventListeners(): void {
    this.map.on('move', () => {
      this.showDetail();
    });

    if (this.handlers.onClick) {
      this.el.addEventListener('click', (event: any) => {
        event.stopPropagation();
        this.handlers.onClick(event, this);
      });
    }
  }

  private showDetail(): void {
    const zoom: number = this.map.getZoom();
    if (zoom > 11) {
      this.el.classList.remove('StoreMarker__Mark');
    } else {
      this.el.classList.add('StoreMarker__Mark');
    }
  }
}
