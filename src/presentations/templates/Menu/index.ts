import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { IRecipeLink } from 'presentations/components/RecipeLink';

export interface IRecipeItemComponent {
  name: string;
  defaults: {
    href: string;
  } | null;
  hot: {
    href: string;
  } | null;
  iced: {
    href: string;
  } | null;
}

export interface IMenuPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
  categoryTitle: {
    heading: string;
  };
  items: IRecipeItemComponent[];
}
