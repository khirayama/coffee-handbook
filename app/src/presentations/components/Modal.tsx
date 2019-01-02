import * as classNames from 'classnames';
import * as React from 'react';

interface IProps {
  isShown: boolean;
  children: React.ReactNode;
}

// tslint:disable-next-line:function-name
export function Modal(props: IProps): JSX.Element {
  return <div className={classNames('Modal', { Modal__Hidden: !props.isShown })}>{props.children}</div>;
}
