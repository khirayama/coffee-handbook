// tslint:disable:no-any
import * as queryString from 'query-string';

import { View, ViewElement } from 'presentations/components/View';

export class MapHeader extends View {
  public setEventListeners(): void {
    const $linkElements: ViewElement[] = this.$el.findAll('.MapHeader--LangList--Item a');
    $linkElements.forEach(($el: ViewElement) => {
      $el.on('click', (event: any) => {
        event.preventDefault();
        const search: string = $el.attr('search');
        const newQuery: { key?: string } = queryString.parse(search);
        const query: { key?: string } = queryString.parse(window.location.search);
        window.location.href = `${window.location.pathname}?${queryString.stringify({ ...query, ...newQuery })}`;
      });
    });
  }
}
