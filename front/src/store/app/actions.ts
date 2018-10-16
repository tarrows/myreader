import { Action } from 'redux';

const NS = '@myReader/app';

export const actionTypes = {
  SET_THEME: `${NS}/SET_THEME`,
};

export type Actions = ITmpPayloadAction | ISetThemeAction;

export interface ITmpPayloadAction extends Action {
  type: string,
  payload: {
    count: number;
  }
}

export const tmp: (num: number) => ITmpPayloadAction = num => {
  return {
    payload: {
      count: num + 1
    },
    type: 'TMP'
  }
}

export interface ISetThemeAction extends Action {
  type: string
}

const actions = {
  setTheme: (payload = {}) => ({ type: actionTypes.SET_THEME, payload }),
};

export default actions;
