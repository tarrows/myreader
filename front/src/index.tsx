import App from 'components/App';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store';
import setGlobalStyles from 'styles/globals';
import registerServiceWorker from './registerServiceWorker';

setGlobalStyles();

const renderApp = () => {
  const initialState = {
    app: {
      theme: ''
    }
  };
  const store = configureStore(initialState);

  store.dispatch({ type: '@myReader/@@INIT' });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
};

renderApp();

registerServiceWorker();
