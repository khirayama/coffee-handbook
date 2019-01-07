// tslint:disable:no-any
import * as React from 'react';

import { Store } from 'utils/Store';

interface IProps {
  store: Store<any, any>;
}

interface IContext {
  store: Store<any, any>;
}

export interface IContainerProps {
  [key: string]: any;
  dispatch: any;
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

export function connect(component: React.ComponentClass<IContainerProps, {}>): React.ComponentClass<{}, {}> {
  class Container extends React.Component<{}, {}> {
    public static contextType: React.Context<IContext> = context;

    public context: {
      store: Store<any, any>;
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
      const state: any = this.context.store.getState();

      return React.createElement(component, {
        ...state,
        dispatch: this.context.store.dispatch.bind(this.context.store),
      });
    }

    protected getState(): any {
      return this.context.store.getState();
    }
  }

  return Container;
}
