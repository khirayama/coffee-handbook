import { IStore } from 'presentations/pages/Maps/interfaces';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    mapboxgl: any;
  }
}

interface IHandlers {
  onClick(event: MouseEvent, storeMarker: StoreMarker): void;
}

export class StoreMarker {
  public el: HTMLElement;

  public store: IStore;

  private map: mapboxgl.Map;

  private marker: mapboxgl.Marker;

  private handlers: IHandlers;

  constructor(map: mapboxgl.Map, store: IStore, handlers: IHandlers) {
    this.map = map;
    this.store = store;
    this.handlers = handlers;

    // TODO: Change color to display open status
    this.el = window.document.createElement('div');
    this.el.className = 'StoreMarker';
    this.el.innerHTML = `
        <span class="StoreMarker--Icon"></span>
        <span class="StoreMarker--Name">${this.store.name}</span>
    `;
    // tslint:disable-next-line:no-any
    import('mapbox-gl').then((mapboxgl: any) => {
      this.marker = new mapboxgl.Marker(this.el).setLngLat([this.store.lng, this.store.lat]).addTo(map);
    });

    this.showDetail();
    this.setEventListeners();
  }

  public setEventListeners(): void {
    this.map.on('move', () => {
      this.showDetail();
    });

    if (this.handlers.onClick) {
      this.el.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
        this.handlers.onClick(event, this);
      });
    }
  }

  public active(): void {
    this.el.classList.add('StoreMarker__Active');
  }

  public inactive(): void {
    this.el.classList.remove('StoreMarker__Active');
  }

  public remove(): void {
    this.marker.remove();
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
