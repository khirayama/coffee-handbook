import * as React from 'react';

import { ShopForm } from 'presentations/components/ShopForm';
import { connect, IContainerProps } from 'utils/Container';

export class ShopEditDesktopPage extends React.Component<IContainerProps, {}> {
  public render(): JSX.Element {
    return (
      <div className="ShopEditDesktopPage">
        <ShopForm />
      </div>
    );
  }
}

// tslint:disable-next-line:variable-name
export const ShopEditDesktopPageContainer: React.ComponentClass = connect(ShopEditDesktopPage);
