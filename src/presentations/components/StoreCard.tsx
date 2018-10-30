// tslint:disable:react-no-dangerous-html
import * as classNames from 'classnames';
import * as React from 'react';

import { IStore } from 'presentations/pages/Maps/interfaces';
import { getNextStatusMessage } from 'presentations/utils/getNextStatusMessage';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { Dictionary } from 'utils/Dictionary';

interface IProps {
  store: IStore;
  dic: Dictionary;
}

export class StoreCard extends React.Component<IProps, { isShownHours: boolean }> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isShownHours: false,
    };

    this.onClickOpenStatus = this.onClickOpenStatus.bind(this);
  }

  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const store: IStore = this.props.store;
    const dic: Dictionary = this.props.dic;

    const now: Date = new Date();
    const currentDay: number = now.getDay();
    let openStatus: IOpenStatus | null = null;
    let nextStatusMessage: string | null = null;
    if (store) {
      openStatus = getOpenStatus(now, store.hours);
      nextStatusMessage = getNextStatusMessage(openStatus, dic);
    }

    return (
      <div className="StoreCard">
        <div className="StoreCard--Content">
          <div className="StoreCard--Content--Name">{store.name}</div>
          <div className="StoreCard--Content--Address">{store.address}</div>
          <div className="StoreCard--Content--OpenStatus" onClick={this.onClickOpenStatus} role="button">
            <div className="StoreCard--Content--OpenStatus--Status">
              {dic.t(`Pages.Maps.openStatus.${openStatus.status}`)}
            </div>
            <div className="StoreCard--Content--OpenStatus--NextStatus">{nextStatusMessage}</div>
            <i className="Icon">{this.state.isShownHours ? 'expand_less' : 'expand_more'}</i>
            <div className="StoreCard--Content--OpenStatus--Description">
              {dic.t(`Pages.Maps.openStatusDescription`)}
            </div>
          </div>
          <div
            className={classNames('StoreCard--Content--Hours', {
              'StoreCard--Content--Hours__Show': this.state.isShownHours,
            })}
          >
            <ul className="StoreCard--Content--Hours--List">
              {store.hours.map((hours: string[][], i: number) => {
                if (hours.length) {
                  return (
                    <li
                      key={i}
                      className={classNames('StoreCard--Content--Hours--List--Item', {
                        'StoreCard--Content--Hours--List--Item__Active': currentDay === i,
                      })}
                    >
                      <span className="StoreCard--Content--Hours--List--Item--Day">{dic.t(`Pages.Maps.day.${i}`)}</span>
                      {hours.map((hour: string[], j: number) => {
                        return (
                          <span key={j} className="StoreCard--Content--Hours--List--Item--Time">
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
                    className={classNames('StoreCard--Content--Hours--List--Item', {
                      'StoreCard--Content--Hours--List--Item__Active': currentDay === i,
                    })}
                  >
                    <span className="StoreCard--Content--Hours--List--Item--Day">{dic.t(`Pages.Maps.day.${i}`)}</span>
                    <span className="StoreCard--Content--Hours--List--Item--Time">{dic.t(`Pages.Maps.closed`)}</span>
                  </li>
                );
              })}
            </ul>
            {store.hoursNote ? <span className="StoreCard--Content--Hours--Note">{store.hoursNote}</span> : null}
          </div>
          {store.email ? (
            <a className="StoreCard--Content--Email" href={`mailto:${store.email}`}>
              <i className="Icon">email</i>
              {store.email}
            </a>
          ) : null}
          {store.tel ? (
            <a className="StoreCard--Content--Tel" href={`mailto:${store.tel}`}>
              <i className="Icon">call</i>
              {store.tel}
            </a>
          ) : null}
          <ul className="StoreCard--Content--Media">
            {Object.keys(store.media).map((key: string) => {
              const val: string | null = store.media[key];
              if (val) {
                return (
                  <li key={key} className="StoreCard--Content--Media--Item StoreCard--Content--Media--Item__Active">
                    <a href={val} target="_blank">
                      <img src={`images/icon_${key}.svg`} alt={key} />
                    </a>
                  </li>
                );
              }

              return (
                <li key={key} className="StoreCard--Content--Media--Item">
                  <span>
                    <img src={`images/icon_${key}.svg`} alt={key} />
                  </span>
                </li>
              );
            })}
          </ul>
          <ul className="StoreCard--Content--Services">
            {Object.keys(store.services).map((key: string) => {
              const val: number | null = store.services[key];
              if (val === 1) {
                return (
                  <li
                    key={key}
                    className="StoreCard--Content--Services--Item StoreCard--Content--Services--Item__Support"
                  >
                    <div className="StoreCard--Content--Services--Item--Content">
                      <div
                        className="StoreCard--Content--Services--Item--Content--Text"
                        dangerouslySetInnerHTML={{ __html: dic.t(`Pages.Maps.services.${key}`) }}
                      />
                    </div>
                  </li>
                );
              } else if (val === 2) {
                return (
                  <li
                    key={key}
                    className="StoreCard--Content--Services--Item StoreCard--Content--Services--Item__PartialSupport"
                  >
                    <div className="StoreCard--Content--Services--Item--Content">
                      <div
                        className="StoreCard--Content--Services--Item--Content--Text"
                        dangerouslySetInnerHTML={{ __html: dic.t(`Pages.Maps.services.${key}`) }}
                      />
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={key} className="StoreCard--Content--Services--Item">
                    <div className="StoreCard--Content--Services--Item--Content">
                      <div
                        className="StoreCard--Content--Services--Item--Content--Text"
                        dangerouslySetInnerHTML={{ __html: dic.t(`Pages.Maps.services.${key}`) }}
                      />
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          <div className="StoreCard--Content--ServicesDescription">
            <span className="StoreCard--Content--ServicesDescription--Label">
              {dic.t('Pages.Maps.serviceDescription.notation')}
            </span>
            <span className="StoreCard--Content--ServicesDescription--Text StoreCard--Content--ServicesDescription--Text__Support">
              {dic.t('Pages.Maps.serviceDescription.support')}
            </span>
            <span className="StoreCard--Content--ServicesDescription--Text StoreCard--Content--ServicesDescription--Text__PartialSupport">
              {dic.t('Pages.Maps.serviceDescription.partialSupport')}
            </span>
            <span className="StoreCard--Content--ServicesDescription--Text">
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
