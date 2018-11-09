import * as deepEqual from 'deep-equal';
import * as React from 'react';

import { IAction, IDispatch, IState } from 'presentations/pages/Maps/interfaces';
import { Store } from 'utils/Store';

interface IProps {
  store: Store<IState, IAction>;
}

interface IContext {
  store: Store<IState, IAction>;
}

const context: React.Context<IContext | null> = React.createContext(null);

export class Provider extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const ctx: IContext = {
      store: this.props.store,
    };

    return <context.Provider value={ctx}>{this.props.children}</context.Provider>;
  }
}

// tslint:disable-next-line:no-any
export function connect(component: any): React.ComponentClass<{}, {}> {
  class Container extends React.Component<{}, {}> {
    public static contextType: React.Context<IContext> = context;

    public context: {
      store: Store<IState, IAction>;
    };

    protected handleStateUpdate: () => void;

    constructor(props: {}) {
      super(props);

      this.handleStateUpdate = (): void => {
        this.setState(this.context.store.getState());
      };
    }

    public componentDidMount(): void {
      this.context.store.addChangeListener(this.handleStateUpdate);
    }

    public componentWillUnmount(): void {
      this.context.store.removeChangeListener(this.handleStateUpdate);
    }

    public render(): JSX.Element {
      const state: IState = this.context.store.getState();

      return React.createElement(component, {
        ...state,
        dispatch: this.context.store.dispatch.bind(this.context.store),
      });
    }

    protected getState(): IState {
      return this.context.store.getState();
    }
  }

  return Container;
}
