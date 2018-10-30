import * as deepEqual from 'deep-equal';
import * as React from 'react';

import { IDispatch, IState } from 'presentations/pages/Maps/interfaces';
import { store, Store } from 'utils/Store';

export class Container<P, S> extends React.Component<P, S & IState> {
  protected handleStateUpdate: () => void;

  protected dispatch: IDispatch;

  constructor(props: P) {
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

  public shouldComponentUpdate(prevProps: P, prevState: IState): boolean {
    return !deepEqual(this.props, prevProps) || !deepEqual(this.state, prevState);
  }

  public componentWillUnmount(): void {
    store.removeChangeListener(this.handleStateUpdate);
  }

  protected getState(): IState {
    return store.getState();
  }
}
