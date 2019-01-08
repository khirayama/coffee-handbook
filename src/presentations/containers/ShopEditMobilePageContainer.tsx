import * as React from 'react';

import { ShopForm } from 'presentations/components/ShopForm';
import { connect, IContainerProps } from 'utils/Container';

export class ShopEditMobilePage extends React.Component<IContainerProps, {}> {
  public render(): JSX.Element {
    return (
      <div className="ShopEditMobilePage">
        <ShopForm />
      </div>
    );
  }
}

// tslint:disable-next-line:variable-name
export const ShopEditMobilePageContainer: React.ComponentClass = connect(ShopEditMobilePage);
