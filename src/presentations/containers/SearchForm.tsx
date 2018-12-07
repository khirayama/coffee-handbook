import * as queryString from 'query-string';
import * as React from 'react';

import { dic } from 'dic';
import { connect, IContainerProps } from 'presentations/containers/Container';
import { changeSheetShown, filterShop, searchShop } from 'presentations/pages/Maps/actionCreators';
import { IAction } from 'presentations/pages/Maps/interfaces';

interface ISearchFormState {
  value: string;
}

export class SearchForm extends React.Component<IContainerProps, ISearchFormState> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: IContainerProps) {
    super(props);

    this.state = {
      value: '',
    };

    this.inputRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): JSX.Element {
    let placeholder: string = '';
    switch (this.props.lang) {
      case 'en': {
        placeholder = 'Fukuoka Roaster';
        break;
      }
      case 'ja': {
        placeholder = '福岡 焙煎機';
        break;
      }
      default:
    }

    return (
      <form className="SearchForm" onSubmit={this.onSubmit}>
        <input
          className="SearchForm--Input"
          type="text"
          ref={this.inputRef}
          placeholder={placeholder}
          onChange={this.onChange}
          onFocus={this.onFocus}
          value={this.state.value}
        />
      </form>
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
      this.setState({
        value: '',
      });
      // TODO: send pageview or send event
    });
  }

  private onFocus(): void {
    changeSheetShown(this.props.dispatch, true);
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    // TODO: valueもshop.stateに
    const value: string = event.currentTarget.value;

    filterShop(this.props.dispatch, value, this.props.ui.pos);
    this.setState({ value });
  }
}

// tslint:disable-next-line:variable-name
export const SearchFormContainer: React.ComponentClass = connect(SearchForm);
