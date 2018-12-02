import { IShop } from 'presentations/pages/Maps/interfaces';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    mapboxgl: any;
  }
}

interface IHandlers {
  onClick(event: MouseEvent, shopMarker: ShopMarker): void;
}

export class ShopMarker {
  public el: HTMLElement;

  public shop: IShop;

  private map: mapboxgl.Map;

  private marker: mapboxgl.Marker;

  private handlers: IHandlers;

  constructor(map: mapboxgl.Map, shop: IShop, handlers: IHandlers) {
    this.map = map;
    this.shop = shop;
    this.handlers = handlers;

    // TODO: Change color to display open status
    this.el = window.document.createElement('div');
    this.el.className = 'ShopMarker';
    this.el.innerHTML = `
        <span class="ShopMarker--Icon"></span>
        <span class="ShopMarker--Name">${this.shop.name}</span>
    `;
    // tslint:disable-next-line:no-any
    import('mapbox-gl').then((mapboxgl: any) => {
      this.marker = new mapboxgl.Marker(this.el).setLngLat([this.shop.lng, this.shop.lat]).addTo(map);
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
    this.el.classList.add('ShopMarker__Active');
  }

  public inactive(): void {
    this.el.classList.remove('ShopMarker__Active');
  }

  public remove(): void {
    if (this.marker) {
      this.marker.remove();
    }
  }

  private showDetail(): void {
    const zoom: number = this.map.getZoom();
    if (zoom > 11) {
      this.el.classList.remove('ShopMarker__Mark');
    } else {
      this.el.classList.add('ShopMarker__Mark');
    }
  }
}
