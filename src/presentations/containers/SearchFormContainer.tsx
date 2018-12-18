import * as queryString from 'query-string';
import * as React from 'react';

import { dic } from 'dic';
import { SearchForm } from 'presentations/components/SearchForm';
import { changeSheetShown, filterShop, searchShop } from 'presentations/pages/Maps/actionCreators';
import { IAction } from 'presentations/pages/Maps/interfaces';
import { connect, IContainerProps } from 'utils/Container';

interface IState {
  value: string;
}

// tslint:disable-next-line:variable-name
export const SearchFormContainer: React.ComponentClass = connect(
  class extends React.Component<IContainerProps, IState> {
    constructor(props: IContainerProps) {
      super(props);

      this.state = {
        value: '',
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.onFocus = this.onFocus.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    public render(): JSX.Element {
      return (
        <SearchForm
          lang={this.props.lang}
          value={this.state.value}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onFocus={this.onFocus}
        />
      );
    }

    private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      searchShop(this.props.dispatch, this.state.value, this.props.ui.pos).then((action: IAction) => {
        const lang: string = this.props.lang;
        const loc: string = `/?${queryString.stringify(action.payload.searchQuery)}`;
        const title: string = `${dic.t('name', lang)} | ${dic.t('siteDescription', lang)}`;
        window.document.title = title;
        window.history.pushState(null, title, loc);
        (window.document.activeElement as HTMLInputElement).blur();
        this.setState({ value: '' });
        // TODO: send pageview or send event
      });
    }

    private onFocus(): void {
      changeSheetShown(this.props.dispatch, true);
    }

    private onChange(event: React.FormEvent<HTMLInputElement>): void {
      const value: string = event.currentTarget.value;

      filterShop(this.props.dispatch, value, this.props.ui.pos);
      this.setState({ value });
    }
  },
);
