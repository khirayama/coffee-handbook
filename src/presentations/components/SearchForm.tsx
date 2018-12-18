import * as React from 'react';

import { dic } from 'dic';

interface IProps {
  lang: string;
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
  onFocus(event: React.FormEvent<HTMLInputElement>): void;
}

// tslint:disable-next-line:function-name
export function SearchForm(props: IProps): JSX.Element {
  return (
    <form className="SearchForm" onSubmit={props.onSubmit}>
      <input
        className="SearchForm--Input"
        type="text"
        placeholder={dic.t('Containers.SearchForm.placeholder', props.lang)}
        onChange={props.onChange}
        onFocus={props.onFocus}
        value={props.value}
      />
    </form>
  );
}
