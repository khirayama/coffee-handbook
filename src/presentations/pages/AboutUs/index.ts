import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';

export interface IAboutUsPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
}
