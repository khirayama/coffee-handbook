// tslint:disable:react-a11y-role-has-required-aria-props react-a11y-no-onchange react-this-binding-issue
import * as React from 'react';

import { IProps as IShopFormProps, ShopForm } from 'presentations/components/ShopForm';
import { IState } from 'presentations/pages/ShopEdit/interfaces';
import { changeValue } from 'presentations/pages/ShopEdit/actionCreators';
import { connect, IContainerProps } from 'utils/Container';

// tslint:disable-next-line:variable-name
export const ShopFormContainer: React.ComponentClass = connect(
  class extends React.Component<IContainerProps, IState> {
    constructor(props: IContainerProps) {
      super(props);

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    public render(): JSX.Element {
      const props: IShopFormProps = this.translateProps(this.props);

      return <ShopForm {...props} onChange={this.onChange} onSubmit={this.onSubmit} />;
    }

    private translateProps(props: IContainerProps): IShopFormProps {
      // tslint:disable-next-line:no-any
      const tmp: any = { ...props };
      delete tmp.dispatch;
      delete tmp.children;

      return tmp;
    }

    private onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void {
      const name: string = event.currentTarget.name;
      const value: string = event.currentTarget.value;

      changeValue(this.props.dispatch, name, value);

      // const newState: IState = JSON.parse(JSON.stringify(this.props));
      // // tslint:disable-next-line:no-any
      // let tmp: any = newState;
      // const accessKeys: string[] = name.split('.');
      // for (let i: number = 0; i < accessKeys.length - 1; i += 1) {
      //   const accessKey: string = accessKeys[i];
      //   tmp = tmp[accessKey];
      // }
      // tmp[accessKeys[accessKeys.length - 1]] = value;
      // this.setState(newState);
    }

    private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      console.log(this.props);
    }
  },
);
