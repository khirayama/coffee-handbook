import * as React from 'react';

import { ShopFormContainer } from 'presentations/containers/ShopFormContainer';
import { connect, IContainerProps } from 'utils/Container';

export class ShopEditMobilePage extends React.Component<IContainerProps, {}> {
  public render(): JSX.Element {
    return (
      <div className="ShopEditMobilePage">
        <ShopFormContainer />
      </div>
    );
  }
}

// tslint:disable-next-line:variable-name
export const ShopEditMobilePageContainer: React.ComponentClass = connect(ShopEditMobilePage);
