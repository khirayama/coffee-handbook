import * as React from 'react';

import { IShop } from 'presentations/pages/Shops/interfaces';

interface IProps {
  shop: IShop;
  onClickItem(event: React.MouseEvent<HTMLElement>, shop: IShop): void;
}

// tslint:disable-next-line:function-name
export function CandidateListItem(props: IProps): JSX.Element {
  const onClick: (event: React.MouseEvent<HTMLElement>) => void = (event: React.MouseEvent<HTMLElement>): void => {
    props.onClickItem(event, props.shop);
  };

  return (
    <li className="CandidateListItem" onClick={onClick} role="button">
      <div className="CandidateListItem--Name">{props.shop.name}</div>
      <div className="CandidateListItem--Address">{props.shop.address}</div>
    </li>
  );
}
