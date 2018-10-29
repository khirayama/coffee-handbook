// tslint:disable:react-a11y-anchors
import * as classNames from 'classnames';
import * as queryString from 'query-string';
import * as React from 'react';

interface IProps {
  lang: string;
}

export class MapHeader extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const props: IProps = this.props;

    return (
      <header className="MapHeader">
        <a className="MapHeader--Link" href="/about">
          <img className="MapHeader--Link--Image" src="/images/icon_en_square.png" alt="COFFEE HANDBOOK" />
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
    const search: string = event.currentTarget.search;
    const newQuery: { key?: string } = queryString.parse(search);
    const query: { key?: string } = queryString.parse(window.location.search);
    window.location.href = `${window.location.pathname}?${queryString.stringify({ ...query, ...newQuery })}`;
  }
}
