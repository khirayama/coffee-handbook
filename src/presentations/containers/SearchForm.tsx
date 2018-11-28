import * as React from 'react';
import * as queryString from 'query-string';

import { dictionary } from 'dictionary';
import { connect } from 'presentations/containers/Container';
import { searchStore, selectStore, updateView } from 'presentations/pages/Maps/actionCreators';
import { IAction, IDispatch, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { ISearchResult, storeSearchEngine } from 'StoreSearchEngine';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';

interface IProps extends IState {
  dispatch: IDispatch;
}

interface ISearchFormState {
  value: string;
  candidates: IStore[];
}

interface ICandidateListItemProps {
  store: IStore;
  onClickItem(event: React.MouseEvent<HTMLElement>, store: IStore): void;
}

class CandidateListItem extends React.Component<ICandidateListItemProps, {}> {
  constructor(props: ICandidateListItemProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const store: IStore = this.props.store;

    return (
      <li key={store.key} className="SearchForm--CandidateList--Item" onClick={this.onClick} role="button">
        <div className="SearchForm--CandidateList--Item--Name">{store.name}</div>
        <div className="SearchForm--CandidateList--Item--Address">{store.address}</div>
      </li>
    );
  }

  private onClick(event: React.MouseEvent<HTMLElement>): void {
    this.props.onClickItem(event, this.props.store);
  }
}

export class SearchForm extends React.Component<IProps, ISearchFormState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
      candidates: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickCandidateItem = this.onClickCandidateItem.bind(this);
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
          placeholder={placeholder}
          onChange={this.onChange}
          value={this.state.value}
        />
        <ul className="SearchForm--CandidateList">
          {this.state.candidates.map((store: IStore) => {
            return <CandidateListItem key={store.key} store={store} onClickItem={this.onClickCandidateItem} />;
          })}
        </ul>
      </form>
    );
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    searchStore(this.props.dispatch, this.state.value, this.props.ui.pos).then((action: IAction) => {
      const dic: Dictionary = new Dictionary(this.props.lang, dictionary);
      const loc: string = `/?${queryString.stringify(action.payload.searchQuery)}`;
      const title: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
      window.document.title = title;
      window.history.pushState(null, title, loc);
      (window.document.activeElement as HTMLInputElement).blur();
      this.setState({
        value: '',
        candidates: [],
      });
      // TODO: send pageview or send event
    });
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    const value: string = event.currentTarget.value;

    const result: ISearchResult = storeSearchEngine.search(value, this.props.ui.pos);
    const candidates: IRawStore[] = result.results.length
      ? result.results.map((res: { key: string; score: number; store: IRawStore }) => res.store)
      : this.props.stores;
    const storeResource: Resource<IRawStore, IStore> = new Resource<IRawStore, IStore>(candidates, this.props.lang);
    this.setState({
      value,
      candidates: storeResource.find(),
    });
  }

  private onClickCandidateItem(event: React.MouseEvent<HTMLElement>, store: IStore): void {
    selectStore(this.props.dispatch, store.key);
    updateView(
      this.props.dispatch,
      {
        lat: store.lat,
        lng: store.lng,
      },
      this.props.ui.zoom,
      [0, 0],
    );
    this.setState({
      value: '',
      candidates: [],
    });
  }
}

// tslint:disable-next-line:variable-name
export const SearchFormContainer: React.ComponentClass = connect(SearchForm);
