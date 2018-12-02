// tslint:disable:no-any
import * as classNames from 'classnames';
import * as React from 'react';

import { shortAnimationTime } from 'vars';

interface IProps {
  isShown: boolean;
  onMoveUp?: any;
  onMoveDown?: any;
}

export class Sheet extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={classNames('Sheet', { Sheet__Hidden: !this.props.isShown })}>
        <div className="Sheet--Content">{this.props.children}</div>
      </div>
    );
  }
}
