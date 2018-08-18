import { IPictureComponent } from 'presentations/components/Picture';
import { View, ViewElement } from 'presentations/components/View';

export interface IPictureGalleryComponent {
  pictures: IPictureComponent[];
}

export class PictureGallery extends View {
  private $coverPictureImageElement: ViewElement;

  private $listItemImageElements: ViewElement[];

  public init(): void {
    this.$coverPictureImageElement = this.$el.find('.PictureGallery--Cover img');
    this.$listItemImageElements = this.$el.findAll('.PictureGallery--List--Picture img');
  }

  public setEventListeners(): void {
    this.$listItemImageElements.forEach(($listItemElement: ViewElement) => {
      $listItemElement.on('click', () => {
        const src: string = $listItemElement.attr('src');
        this.$coverPictureImageElement.attr('src', src);
      });
    });
  }
}
