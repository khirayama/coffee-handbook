// tslint:disable:no-any
import * as classNames from 'classnames';
import * as React from 'react';

import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { waitShortAnimationEnd } from 'presentations/utils/helpers';
import { shortAnimationTime } from 'vars';

interface IProps {
  onClickItem: any;
  onSnap: any;
  stores: IStore[];
  isShown: boolean;
}

interface IListItemProps {
  store: IStore;
  onClickItem: any;
  onTouchStart: any;
  onTouchMove: any;
  onTouchEnd: any;
}

export class StoreCardListItem extends React.Component<IListItemProps, {}> {
  constructor(props: IListItemProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClickMedia = this.onClickMedia.bind(this);
  }

  public render(): JSX.Element {
    const store: IStore = this.props.store;

    return (
      <li
        className="StoreCards--List--Item"
        data-storekey={store.key}
        onTouchStart={this.props.onTouchStart}
        onTouchMove={this.props.onTouchMove}
        onTouchEnd={this.props.onTouchEnd}
      >
        <div role="button" className="StoreCards--List--Item--Content" onClick={this.onClick}>
          <div className="StoreCards--List--Item--Content--Name">{store.name}</div>
          <div className="StoreCards--List--Item--Content--Address">{store.address}</div>
          <ul className="StoreCards--List--Item--Content--Media">
            {Object.keys(store.media).map((key: string) => {
              const val: string | null = store.media[key];
              if (val) {
                return (
                  <li
                    key={key}
                    className="StoreCards--List--Item--Content--Media--Item StoreCards--List--Item--Content--Media--Item__Active"
                  >
                    <a href={val} target="_blank" rel="noopener noreferrer" onClick={this.onClickMedia}>
                      <img src={`/images/icon_${key}.svg`} alt={key} />
                    </a>
                  </li>
                );
              }

              return (
                <li key={key} className="StoreCards--List--Item--Content--Media--Item">
                  <span>
                    <img src={`/images/icon_${key}.svg`} alt={key} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    );
  }

  private onClick(event: React.MouseEvent<HTMLElement>): void {
    if (this.props.onClickItem) {
      this.props.onClickItem(event, this.props.store);
    }
  }

  private onClickMedia(event: React.MouseEvent<HTMLElement>): void {
    event.stopPropagation();
  }
}

export class StoreCards extends React.Component<IProps, {}> {
  private ref: React.RefObject<HTMLUListElement> = React.createRef();

  private startX: number | null = null;

  private endX: number | null = null;

  private currentX: number | null = null;

  constructor(props: IProps) {
    super(props);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  public render(): JSX.Element {
    const stores: IStore[] = this.props.stores;

    return (
      <div className={classNames('StoreCards', { StoreCards__Hidden: !this.props.isShown })}>
        <ul className="StoreCards--List" ref={this.ref}>
          {stores.map((store: IStore) => {
            return (
              <StoreCardListItem
                key={store.key}
                store={store}
                onClickItem={this.props.onClickItem}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  private onTouchStart(event: React.TouchEvent<HTMLElement>): void {
    this.startX = event.touches[0].clientX;
  }

  private onTouchMove(event: React.TouchEvent<HTMLElement>): void {
    this.endX = event.touches[0].clientX;

    const el: HTMLElement = this.ref.current;
    const currentX: number = this.endX - this.startX + (this.currentX || 0);
    el.style.transition = 'none';
    el.style.transform = `translateX(${currentX}px)`;
  }

  private onTouchEnd(event: React.TouchEvent<HTMLElement>): void {
    const el: HTMLElement = this.ref.current;
    let targetElement: HTMLElement;

    if (this.startX !== null && this.endX !== null) {
      if (this.startX > this.endX) {
        targetElement = event.currentTarget.nextElementSibling as HTMLElement;
      } else {
        targetElement = event.currentTarget.previousElementSibling as HTMLElement;
      }

      if (!targetElement) {
        targetElement = event.currentTarget;
      }

      const storeKey: string = targetElement.dataset.storekey;
      const left: number = targetElement.offsetLeft * -1;
      el.style.transition = `transform ${shortAnimationTime}ms ease-in-out`;
      el.style.transform = `translateX(${left}px)`;

      this.currentX = left;
      this.startX = null;
      this.endX = null;

      waitShortAnimationEnd().then(() => {
        if (this.props.onSnap) {
          this.props.onSnap(storeKey);
        }
      });
    }
  }
}
