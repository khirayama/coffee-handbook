import * as React from 'react';

import { IStore } from 'presentations/pages/Maps/interfaces';

interface IProps {
  store: IStore;
  onClickItem(event: React.MouseEvent<HTMLElement>, store: IStore): void;
}

export class CandidateListItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const store: IStore = this.props.store;

    return (
      <li key={store.key} className="CandidateList--Item" onClick={this.onClick} role="button">
        <div className="CandidateList--Item--Name">{store.name}</div>
        <div className="CandidateList--Item--Address">{store.address}</div>
      </li>
    );
  }

  private onClick(event: React.MouseEvent<HTMLElement>): void {
    this.props.onClickItem(event, this.props.store);
  }
}
