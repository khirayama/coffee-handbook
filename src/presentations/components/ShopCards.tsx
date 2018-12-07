// tslint:disable:no-any
import * as classNames from 'classnames';
import * as React from 'react';

import { IShop } from 'presentations/pages/Maps/interfaces';
import { waitShortAnimationEnd } from 'presentations/utils/helpers';
import { shortAnimationTime } from 'vars';

interface IProps {
  onClickItem: any;
  onSnap: any;
  shops: IShop[];
  isShown: boolean;
}

interface IListItemProps {
  shop: IShop;
  onClickItem: any;
  onTouchStart: any;
  onTouchMove: any;
  onTouchEnd: any;
}

export class ShopCardListItem extends React.Component<IListItemProps, {}> {
  constructor(props: IListItemProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClickMedia = this.onClickMedia.bind(this);
  }

  public render(): JSX.Element {
    const shop: IShop = this.props.shop;

    return (
      <li
        className="ShopCards--List--Item"
        data-shopkey={shop.key}
        onTouchStart={this.props.onTouchStart}
        onTouchMove={this.props.onTouchMove}
        onTouchEnd={this.props.onTouchEnd}
      >
        <div role="button" className="ShopCards--List--Item--Content" onClick={this.onClick}>
          <div className="ShopCards--List--Item--Content--Name">{shop.name}</div>
          <div className="ShopCards--List--Item--Content--Address">{shop.address}</div>
          <ul className="ShopCards--List--Item--Content--Media">
            {Object.keys(shop.media).map((key: string) => {
              const val: string | null = shop.media[key];
              if (val) {
                return (
                  <li
                    key={key}
                    className="ShopCards--List--Item--Content--Media--Item ShopCards--List--Item--Content--Media--Item__Active"
                  >
                    <a href={val} target="_blank" rel="noopener noreferrer" onClick={this.onClickMedia}>
                      <img src={`/images/icon_${key}.svg`} alt={key} />
                    </a>
                  </li>
                );
              }

              return (
                <li key={key} className="ShopCards--List--Item--Content--Media--Item">
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
      this.props.onClickItem(event, this.props.shop);
    }
  }

  private onClickMedia(event: React.MouseEvent<HTMLElement>): void {
    event.stopPropagation();
  }
}

export class ShopCards extends React.Component<IProps, {}> {
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
    const shops: IShop[] = this.props.shops;

    return (
      <div className={classNames('ShopCards', { ShopCards__Hidden: !this.props.isShown })}>
        <ul className="ShopCards--List" ref={this.ref}>
          {shops.map((shop: IShop) => {
            return (
              <ShopCardListItem
                key={shop.key}
                shop={shop}
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

      const shopKey: string = targetElement.dataset.shopkey;
      const left: number = targetElement.offsetLeft * -1;
      el.style.transition = `transform ${shortAnimationTime}ms ease-in-out`;
      el.style.transform = `translateX(${left}px)`;

      this.currentX = left;
      this.startX = null;
      this.endX = null;

      waitShortAnimationEnd().then(() => {
        if (this.props.onSnap) {
          this.props.onSnap(shopKey);
        }
      });
    }
  }
}
