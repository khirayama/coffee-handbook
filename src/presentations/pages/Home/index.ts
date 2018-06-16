import { Picture } from 'presentations/components/Picture';

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date().toString()}.`);

  const pictureElements = window.document.querySelectorAll('.Picture');
  for (let i = 0; i < pictureElements.length; i++) {
    const pictureElement = pictureElements[i];
    new Picture(pictureElement); // eslint-disable-line no-new
  }
});
