import { IPosition } from 'presentations/pages/Shops/interfaces';
import { shortAnimationTime } from 'vars';

const SAVE_VIEW_KEY: string = '__UI_MAP_VIEW';

export function saveView(pos: IPosition, zoom: number): void {
  if (typeof window === 'object') {
    window.localStorage.setItem(
      SAVE_VIEW_KEY,
      JSON.stringify({
        pos,
        zoom,
      }),
    );
  }
}

export function loadView(): { pos: IPosition; zoom: number; currentPos: IPosition | null } {
  const defaultView: {
    currentPos: IPosition | null;
    pos: IPosition | null;
    zoom: number;
  } = {
    currentPos: null,
    pos: {
      lat: 35.664035,
      lng: 139.698212,
    },
    zoom: 8,
  };

  if (typeof window === 'object') {
    return JSON.parse(window.localStorage.getItem(SAVE_VIEW_KEY)) || defaultView;
  }

  return defaultView;
}

export function getMapOffset(): [number, number] {
  const modalElement: HTMLElement = window.document.querySelector('.Modal');
  const mapElement: HTMLElement = window.document.querySelector('.ShopMapView');

  const mapHeight: number = mapElement.clientHeight;
  const modalHeight: number = modalElement.clientHeight;
  const diff: number = (mapHeight - modalHeight) / 2 + modalHeight - mapHeight / 2;

  return [0, diff * -1];
}

export function waitNextTick(): Promise<void> {
  return new Promise(
    (resolve: () => void): void => {
      setTimeout(resolve, 0);
    },
  );
}

export function waitShortAnimationEnd(): Promise<void> {
  return new Promise(
    (resolve: () => void): void => {
      setTimeout(resolve, shortAnimationTime);
    },
  );
}
