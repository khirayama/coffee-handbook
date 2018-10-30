import * as deepEqual from 'deep-equal';
import * as React from 'react';

import { IAction, IDispatch, IPosition, IState } from 'presentations/pages/Maps/interfaces';
import { store, Store } from 'utils/Store';

export interface IContainerProps {
  params?: { [key: string]: string };
  query?: { [key: string]: null | string | number | boolean };
}

export class Container<P, S> extends React.Component<P & IContainerProps, S & IState> {
  protected handleStateUpdate: () => void;

  protected dispatch: IDispatch;

  // tslint:disable-next-line:no-any
  protected actions: any = {};

  constructor(props: P & IContainerProps) {
    super(props);

    this.state = {
      ...store.getState(),
    };

    this.handleStateUpdate = (): void => {
      this.setState(store.getState());
    };
    this.dispatch = store.dispatch.bind(store);

    store.addChangeListener(this.handleStateUpdate);
  }

  public shouldComponentUpdate(prevProps: IContainerProps, prevState: IState): boolean {
    return !deepEqual(this.props, prevProps) || !deepEqual(this.state, prevState);
  }

  public componentWillUnmount(): void {
    store.removeChangeListener(this.handleStateUpdate);
  }

  protected getState(): IState {
    return store.getState();
  }
}
