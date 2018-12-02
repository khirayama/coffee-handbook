import * as React from 'react';

import { IShop } from 'presentations/pages/Maps/interfaces';

interface IProps {
  shop: IShop;
  onClickItem(event: React.MouseEvent<HTMLElement>, shop: IShop): void;
}

export class CandidateListItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const shop: IShop = this.props.shop;

    return (
      <li key={shop.key} className="CandidateList--Item" onClick={this.onClick} role="button">
        <div className="CandidateList--Item--Name">{shop.name}</div>
        <div className="CandidateList--Item--Address">{shop.address}</div>
      </li>
    );
  }

  private onClick(event: React.MouseEvent<HTMLElement>): void {
    this.props.onClickItem(event, this.props.shop);
  }
}
