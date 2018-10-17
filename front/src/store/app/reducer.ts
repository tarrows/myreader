import { actionTypes } from './actions';
import { Actions } from './actions';
import { IAppState } from './types';

const getInitialState: () => IAppState = () => ({
  theme: 'dark'
});

const app = (state = getInitialState(), action: Actions) => {
  const { type } = action;
  switch (type) {
    case actionTypes.SET_THEME:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default app;
