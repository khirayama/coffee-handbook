import * as React from 'react';

import { ShopFormContainer } from 'presentations/containers/ShopFormContainer';
import { connect, IContainerProps } from 'utils/Container';

export class ShopEditDesktopPage extends React.Component<IContainerProps, {}> {
  public render(): JSX.Element {
    return (
      <div className="ShopEditDesktopPage">
        <ShopFormContainer />
      </div>
    );
  }
}

// tslint:disable-next-line:variable-name
export const ShopEditDesktopPageContainer: React.ComponentClass = connect(ShopEditDesktopPage);
