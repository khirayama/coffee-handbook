import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { IPictureComponent, Picture } from 'presentations/components/Picture';
import { logger } from 'presentations/utils/logger';

export interface IIngredientTableRow {
  name: string;
  note: string;
  quantity: string;
}

export interface IStepListItem {
  summary: string;
  description: string;
  note: string;
}

export interface IRecipeTemplate extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
  contentTitle: {
    heading: string;
    recipeType: string;
  };
  coverPicture: {
    squareSrc: string;
    rectangleSrc: string;
  } & IPictureComponent;
  ingredientTable: IIngredientTableRow[];
  stepList: {
    recipeType: string;
    items: IStepListItem[];
  };
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);

  const pictureElements: NodeListOf<HTMLElement> = window.document.querySelectorAll('.Picture');
  for (const pictureElement of pictureElements) {
    new Picture(pictureElement); // tslint:disable-line:no-unused-expression
  }
});
