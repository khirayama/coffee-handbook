import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { logger } from 'presentations/utils/logger';

export interface IMapsPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);
});
