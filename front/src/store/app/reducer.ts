import { actionTypes } from './actions';
import { Actions } from './actions';

const getInitialState = () => ({
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
