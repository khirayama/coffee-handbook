import * as React from 'react';

import { dictionary } from 'dictionary';
import { connect } from 'presentations/containers/Container';
import { searchStore } from 'presentations/pages/Maps/actionCreators';
import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { Dictionary } from 'utils/Dictionary';

interface IProps extends IState {
  dispatch: IDispatch;
}

interface ISearchFormState {
  value: string;
}

export class SearchForm extends React.Component<IProps, ISearchFormState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
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
        <input className="SearchForm--Input" type="text" placeholder={placeholder} onChange={this.onChange} />
      </form>
    );
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    searchStore(this.props.dispatch, this.state.value, this.props.ui.pos).then((action: IAction) => {
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const loc: string = `/?q=${action.payload.searchQuery}`;
      const title: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
      (window.document.activeElement as HTMLInputElement).blur();
      // TODO: send pageview or send event
    });
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    const value: string = event.currentTarget.value;
    this.setState({
      value,
    });
  }
}

// tslint:disable-next-line:variable-name
export const SearchFormContainer: React.ComponentClass = connect(SearchForm);
