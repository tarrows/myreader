import { actionTypes } from './actions';
import { IStoryActions } from './actions';
import { IStoryState } from './types';

export const getInitialState = (): IStoryState => ({
  error: undefined,
  isFetching: false,
  page: 0,
  stories: [],
  storyIds: [],
});

const story = (state: IStoryState, { type, payload }: IStoryActions): IStoryState => {
  switch (type) {
    case actionTypes.FETCH_STORY_IDS_REQUEST:
    case actionTypes.FETCH_STORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_STORY_IDS_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.FETCH_STORIES_SUCCESS:
      console.log("payload:", payload);
      if (state.stories && state.page) {
        return {
          ...state,
          stories: [...state.stories],
          page: state.page + 1,
          isFetching: false,
        }
      }
    default:
      return state;
  }
}

export default story;
