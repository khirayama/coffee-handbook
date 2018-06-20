import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { IPictureComponent, Picture } from 'presentations/components/Picture';
import { IStoryCardComponent } from 'presentations/components/StoryCard';
import { logger } from 'presentations/utils/logger';

export interface IStoryListItemComponent extends IStoryCardComponent {
  key: string;
}

export interface IHomePage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
  coverStory: {
    key: string;
    title: string;
    squareImagePath: string;
    rectangleImagePath: string;
  } & IPictureComponent;
  storyList: IStoryListItemComponent[];
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);

  const pictureElements: NodeListOf<HTMLElement> = window.document.querySelectorAll('.Picture');
  for (const pictureElement of pictureElements) {
    new Picture(pictureElement); // tslint:disable-line:no-unused-expression
  }
});
