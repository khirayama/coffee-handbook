// tslint:disable:no-any
import * as classNames from 'classnames';
import * as React from 'react';

import { updateSheetMode } from 'presentations/pages/Maps/actionCreators';
import {
  IAction,
  IDispatch,
  IPosition,
  IRawStore,
  ISheetModes,
  IState,
  IStore,
} from 'presentations/pages/Maps/interfaces';
import { shortAnimationTime } from 'vars';

interface IProps {
  defaultHeight: number;
  mode: ISheetModes;
  onMoveUp?: any;
  onMoveDown?: any;
}

export class Sheet extends React.Component<IProps, {}> {
  private ref: React.RefObject<HTMLDivElement>;

  private startY: number = 0;

  private endY: number = 0;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div
        style={{ top: this.props.mode === 'default' ? `calc(100% - ${this.props.defaultHeight}px)` : '' }}
        ref={this.ref}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        className={classNames(
          'Sheet',
          { Sheet__Opened: this.props.mode === 'opened' },
          { Sheet__Closed: this.props.mode === 'closed' },
          { Sheet__None: this.props.mode === 'none' },
        )}
      >
        <div className="Sheet--Mark" />
        <div className="Sheet--Content">{this.props.children}</div>
      </div>
    );
  }

  private onTouchStart(event: React.TouchEvent<HTMLElement>): void {
    event.stopPropagation();
    this.startY = event.touches[0].clientY;
    this.ref.current.style.transition = 'none';
  }

  private onTouchMove(event: React.TouchEvent<HTMLElement>): void {
    event.stopPropagation();
    this.endY = event.touches[0].clientY;
    this.ref.current.style.transform = `translateY(${this.endY - this.startY}px)`;
  }

  private onTouchEnd(event: React.TouchEvent<HTMLElement>): void {
    event.stopPropagation();
    const diff: number = this.endY - this.startY;
    this.ref.current.style.transition = `top ${shortAnimationTime}ms ease-in-out, transform ${shortAnimationTime}ms ease-in-out, border-radius ${shortAnimationTime}ms ease-in-out`;
    this.ref.current.style.transform = 'translateY(0px)';
    if (diff < 0) {
      if (this.props.onMoveUp) {
        this.props.onMoveUp();
      }
    } else {
      if (this.props.onMoveDown) {
        this.props.onMoveDown();
      }
    }
  }
}
