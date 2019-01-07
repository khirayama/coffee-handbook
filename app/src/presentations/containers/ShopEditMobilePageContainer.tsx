import * as React from 'react';

import { connect, IContainerProps } from 'utils/Container';

export class ShopEditMobilePage extends React.Component<IContainerProps, {}> {
  public render(): JSX.Element {
    return <div className="ShopEditMobilePage">Shop Edit Mobile Page</div>;
  }
}

// tslint:disable-next-line:variable-name
export const ShopEditMobilePageContainer: React.ComponentClass = connect(ShopEditMobilePage);
