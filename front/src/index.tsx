import App from 'components/App';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import setGlobalStyles from 'styles/globals';
import registerServiceWorker from './registerServiceWorker';

setGlobalStyles();

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
