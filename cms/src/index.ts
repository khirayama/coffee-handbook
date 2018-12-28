import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from 'App';

window.addEventListener('DOMContentLoaded', () => {
  console.log('Start app.');

  ReactDOM.render(React.createElement(App), window.document.querySelector('.app'));
});
