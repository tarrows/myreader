import { createStore } from 'redux';
import { Store } from 'redux';

import { IAppState } from './app/types';
import middleware from './middleware';
import reducer from './reducer';

export interface IApplicationState {
  app: IAppState;
}

const configureStore: (initial: IApplicationState) => Store = initial => {
  const store = createStore(reducer, initial, middleware);
  return store;
}

export default configureStore;
