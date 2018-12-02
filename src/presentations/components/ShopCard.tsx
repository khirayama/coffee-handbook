// tslint:disable:react-no-dangerous-html
import * as classNames from 'classnames';
import * as React from 'react';

import { IShop } from 'presentations/pages/Maps/interfaces';
import { getNextStatusMessage } from 'presentations/utils/getNextStatusMessage';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { Dictionary } from 'utils/Dictionary';

interface IProps {
  shop: IShop;
  dic: Dictionary;
}

export class ShopCard extends React.Component<IProps, { isShownHours: boolean }> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isShownHours: false,
    };

    this.onClickOpenStatus = this.onClickOpenStatus.bind(this);
  }

  public shouldComponentUpdate(nextProps: IProps): boolean {
    // FYI: For animation of modal.
    if (nextProps.shop) {
      return true;
    }

    return false;
  }

  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const shop: IShop = this.props.shop;
    const dic: Dictionary = this.props.dic;

    if (!shop) {
      return null;
    }

    const now: Date = new Date();
    const currentDay: number = now.getDay();
    let openStatus: IOpenStatus | null = null;
    let nextStatusMessage: string | null = null;
    if (shop) {
      openStatus = getOpenStatus(now, shop.hours);
      nextStatusMessage = getNextStatusMessage(openStatus, dic);
    }

    return (
      <div className="ShopCard">
        <div className="ShopCard--Content">
          <div className="ShopCard--Content--Name">{shop.name}</div>
          <div className="ShopCard--Content--Address">{shop.address}</div>
          <div className="ShopCard--Content--OpenStatus" onClick={this.onClickOpenStatus} role="button">
            <div className="ShopCard--Content--OpenStatus--Status">
              {dic.t(`Pages.Maps.openStatus.${openStatus.status}`)}
            </div>
            <div className="ShopCard--Content--OpenStatus--NextStatus">{nextStatusMessage}</div>
            <i className="Icon">{this.state.isShownHours ? 'expand_less' : 'expand_more'}</i>
            <div className="ShopCard--Content--OpenStatus--Description">
              {dic.t(`Pages.Maps.openStatusDescription`)}
            </div>
          </div>
          <div
            className={classNames('ShopCard--Content--Hours', {
              'ShopCard--Content--Hours__Show': this.state.isShownHours,
            })}
          >
            <ul className="ShopCard--Content--Hours--List">
              {shop.hours.map((hours: string[][], i: number) => {
                if (hours.length) {
                  return (
                    <li
                      key={i}
                      className={classNames('ShopCard--Content--Hours--List--Item', {
                        'ShopCard--Content--Hours--List--Item__Active': currentDay === i,
                      })}
                    >
                      <span className="ShopCard--Content--Hours--List--Item--Day">{dic.t(`Pages.Maps.day.${i}`)}</span>
                      {hours.map((hour: string[], j: number) => {
                        return (
                          <span key={j} className="ShopCard--Content--Hours--List--Item--Time">
                            {hour.join(' - ')}
                          </span>
                        );
                      })}
                    </li>
                  );
                }

                return (
                  <li
                    key={i}
                    className={classNames('ShopCard--Content--Hours--List--Item', {
                      'ShopCard--Content--Hours--List--Item__Active': currentDay === i,
                    })}
                  >
                    <span className="ShopCard--Content--Hours--List--Item--Day">{dic.t(`Pages.Maps.day.${i}`)}</span>
                    <span className="ShopCard--Content--Hours--List--Item--Time">{dic.t(`Pages.Maps.closed`)}</span>
                  </li>
                );
              })}
            </ul>
            {shop.hoursNote ? <span className="ShopCard--Content--Hours--Note">{shop.hoursNote}</span> : null}
          </div>
          {shop.email ? (
            <a className="ShopCard--Content--Email" href={`mailto:${shop.email}`}>
              <i className="Icon">email</i>
              {shop.email}
            </a>
          ) : null}
          {shop.tel ? (
            <a className="ShopCard--Content--Tel" href={`tel:${shop.tel}`}>
              <i className="Icon">call</i>
              {shop.tel}
            </a>
          ) : null}
          <ul className="ShopCard--Content--Media">
            {Object.keys(shop.media).map((key: string) => {
              const val: string | null = shop.media[key];
              if (val) {
                return (
                  <li key={key} className="ShopCard--Content--Media--Item ShopCard--Content--Media--Item__Active">
                    <a href={val} target="_blank" rel="noopener noreferrer">
                      <img src={`/images/icon_${key}.svg`} alt={key} />
                    </a>
                  </li>
                );
              }

              return (
                <li key={key} className="ShopCard--Content--Media--Item">
                  <span>
                    <img src={`/images/icon_${key}.svg`} alt={key} />
                  </span>
                </li>
              );
            })}
          </ul>
          <ul className="ShopCard--Content--Services">
            {Object.keys(shop.services).map((key: string) => {
              const val: number | null = shop.services[key];
              if (val === 1) {
                return (
                  <li
                    key={key}
                    className="ShopCard--Content--Services--Item ShopCard--Content--Services--Item__Support"
                  >
                    <div className="ShopCard--Content--Services--Item--Content">
                      <div
                        className="ShopCard--Content--Services--Item--Content--Text"
                        dangerouslySetInnerHTML={{ __html: dic.t(`Pages.Maps.services.${key}`) }}
                      />
                    </div>
                  </li>
                );
              } else if (val === 2) {
                return (
                  <li
                    key={key}
                    className="ShopCard--Content--Services--Item ShopCard--Content--Services--Item__PartialSupport"
                  >
                    <div className="ShopCard--Content--Services--Item--Content">
                      <div
                        className="ShopCard--Content--Services--Item--Content--Text"
                        dangerouslySetInnerHTML={{ __html: dic.t(`Pages.Maps.services.${key}`) }}
                      />
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={key} className="ShopCard--Content--Services--Item">
                    <div className="ShopCard--Content--Services--Item--Content">
                      <div
                        className="ShopCard--Content--Services--Item--Content--Text"
                        dangerouslySetInnerHTML={{ __html: dic.t(`Pages.Maps.services.${key}`) }}
                      />
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          <div className="ShopCard--Content--ServicesDescription">
            <span className="ShopCard--Content--ServicesDescription--Label">
              {dic.t('Pages.Maps.serviceDescription.notation')}
            </span>
            <span className="ShopCard--Content--ServicesDescription--Text ShopCard--Content--ServicesDescription--Text__Support">
              {dic.t('Pages.Maps.serviceDescription.support')}
            </span>
            <span className="ShopCard--Content--ServicesDescription--Text ShopCard--Content--ServicesDescription--Text__PartialSupport">
              {dic.t('Pages.Maps.serviceDescription.partialSupport')}
            </span>
            <span className="ShopCard--Content--ServicesDescription--Text">
              {dic.t('Pages.Maps.serviceDescription.noSupport')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  private onClickOpenStatus(): void {
    this.setState({
      isShownHours: !this.state.isShownHours,
    });
  }
}
