// tslint:disable:export-name no-any
import { shortAnimationTime } from 'vars';
import { IPosition } from 'presentations/pages/Maps/interfaces';

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

export function waitShortAnimationEnd(): Promise<void> {
  return new Promise(
    (resolve: any): void => {
      setTimeout(resolve, shortAnimationTime);
    },
  );
}
