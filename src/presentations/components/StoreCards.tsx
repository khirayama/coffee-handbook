// tslint:disable:no-any
import * as classNames from 'classnames';
import * as React from 'react';

import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';

interface IProps {
  onClickItem: any;
  onSnap: any;
  stores: IStore[];
  isShown: boolean;
}

interface IListItemProps {
  onClickItem: any;
  store: IStore;
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
      <li className="StoreCards--List--Item">
        <div role="button" className="StoreCards--List--Item--Content" onClick={this.onClick} data-storekey={store.key}>
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
  private timerId: any = null;

  private prevScrollLeft: number = 0;

  private ref: React.RefObject<HTMLUListElement> = React.createRef();

  constructor(props: IProps) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  public render(): JSX.Element {
    const stores: IStore[] = this.props.stores;

    return (
      <div className={classNames('StoreCards', { StoreCards__Hidden: !this.props.isShown })}>
        <ul className="StoreCards--List" ref={this.ref} onScroll={this.onScroll}>
          {stores.map((store: IStore) => {
            return <StoreCardListItem key={store.key} onClickItem={this.props.onClickItem} store={store} />;
          })}
        </ul>
      </div>
    );
  }

  private onScroll(event: React.UIEvent<HTMLElement>): void {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        const el: HTMLElement = this.ref.current;
        const tmp: number = el.scrollLeft;
        if (this.prevScrollLeft !== tmp) {
          this.prevScrollLeft = tmp;
        } else {
          clearInterval(this.timerId);
          this.timerId = null;
          const rect: any = el.getBoundingClientRect();
          const targetElement: HTMLElement = window.document.elementFromPoint(
            rect.left + window.innerWidth / 2,
            rect.top,
          ) as HTMLElement;
          const storeKey: string = targetElement ? targetElement.dataset.storekey || null : null;
          this.props.onSnap(storeKey);
        }
      }, 20);
    }
  }
}
