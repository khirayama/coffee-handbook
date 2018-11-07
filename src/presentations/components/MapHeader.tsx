// tslint:disable:react-a11y-anchors
import * as classNames from 'classnames';
import * as React from 'react';

import { config } from 'config';
import { dictionary } from 'dictionary';
import { connect } from 'presentations/containers/Container';
import { IDispatch, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';

interface IProps extends IState {
  dispatch: IDispatch;
}

export class MapHeader extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const props: IProps = this.props;
    const storeKey: string | null = props.ui.selectedStoreKey;
    const dic: Dictionary = new Dictionary(props.lang, dictionary);

    return (
      <header className="MapHeader">
        <a className="MapHeader--Link" href="/about">
          <img className="MapHeader--Link--Image" src={`/images/icon_${props.lang}_square.png`} alt={dic.t('name')} />
        </a>
        <ul className="MapHeader--LangList">
          <li
            className={classNames('MapHeader--LangList--Item', {
              'MapHeader--LangList--Item__Active': props.lang === 'en',
            })}
          >
            <a href={storeKey ? `${config.url.en}/stores/${props.ui.selectedStoreKey}` : config.url.en}>ENGLISH</a>
          </li>
          <li
            className={classNames('MapHeader--LangList--Item', {
              'MapHeader--LangList--Item__Active': props.lang === 'ja',
            })}
          >
            <a href={storeKey ? `${config.url.ja}/stores/${props.ui.selectedStoreKey}` : config.url.ja}>日本語</a>
          </li>
        </ul>
      </header>
    );
  }
}

// tslint:disable-next-line:variable-name
export const MapHeaderContainer: React.ComponentClass = connect(MapHeader);
