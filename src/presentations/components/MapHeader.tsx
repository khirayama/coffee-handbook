// tslint:disable:react-a11y-anchors
import * as classNames from 'classnames';
import * as queryString from 'query-string';
import * as React from 'react';

import { dictionary } from 'dictionary';
import { Container } from 'presentations/containers/Container';
import { changeLang } from 'presentations/pages/Maps/actionCreators';
import { IRawStore, IStore } from 'presentations/pages/Maps/interfaces';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';

interface IProps {
  lang: string;
}

export class MapHeader extends Container<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const props: IProps = this.props;

    return (
      <header className="MapHeader">
        <a className="MapHeader--Link" href={`/about?lang=${this.state.lang}`}>
          <img className="MapHeader--Link--Image" src={`/images/icon_${props.lang}_square.png`} alt="COFFEE HANDBOOK" />
        </a>
        <ul className="MapHeader--LangList">
          <li
            className={classNames('MapHeader--LangList--Item', {
              'MapHeader--LangList--Item__Active': props.lang === 'en',
            })}
          >
            <a href="?lang=en" onClick={this.onClick}>
              ENGLISH
            </a>
          </li>
          <li
            className={classNames('MapHeader--LangList--Item', {
              'MapHeader--LangList--Item__Active': props.lang === 'ja',
            })}
          >
            <a href="?lang=ja" onClick={this.onClick}>
              日本語
            </a>
          </li>
        </ul>
      </header>
    );
  }

  private onClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault();
    const dic: Dictionary = new Dictionary(this.state.lang, dictionary);
    const search: string = event.currentTarget.search;
    const newQuery: { key?: string; lang?: string } = queryString.parse(search);
    const query: { key?: string; lang?: string } = queryString.parse(window.location.search);

    if (newQuery.lang !== query.lang) {
      const storeResource: Resource<IRawStore, IStore> = new Resource(this.state.stores, this.state.lang);
      const store: IStore = storeResource
        .where({
          key: this.state.ui.selectedStoreKey,
        })
        .findOne();
      const loc: string = `${window.location.pathname}?${queryString.stringify({ ...query, ...newQuery })}`;
      const title: string = store
        ? `${store.name} | ${dic.t('Pages.Maps.MAP')} | ${dic.t('name')}`
        : `${dic.t('Pages.Maps.MAP')} | ${dic.t('name')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);

      changeLang(this.dispatch, newQuery.lang || 'en');
    }
  }
}
