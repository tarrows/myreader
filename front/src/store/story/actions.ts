import { Action, Dispatch } from 'redux';
import { ActionCreator } from 'redux';

import hackerNewsApi from 'services/hackerNewsApi';
import { IStory, IStoryState } from './types';

const NS = '@myReader/story';

export const actionTypes = {
  FETCH_STORY_IDS_REQUEST: `${NS}/FETCH_STORY_IDS_REQUEST`,
  FETCH_STORY_IDS_SUCCESS: `${NS}/FETCH_STORY_IDS_SUCCESS`,
  FETCH_STORY_IDS_FAILURE: `${NS}/FETCH_STORY_IDS_FAILURE`,
  FETCH_STORIES_REQUEST: `${NS}/FETCH_STORIES_REQUEST`,
  FETCH_STORIES_SUCCESS: `${NS}/FETCH_STORIES_SUCCESS`,
  FETCH_STORIES_FAILURE: `${NS}/FETCH_STORIES_FAILURE`,
}

enum actionType {
  FETCH_STORY_IDS_REQUEST = "@myReader/story/FETCH_STORY_IDS_REQUEST",
  FETCH_STORY_IDS_SUCCESS = "@myReader/story/FETCH_STORY_IDS_SUCCESS",
  FETCH_STORY_IDS_FAILURE = "@myReader/story/FETCH_STORY_IDS_FAILURE",
  FETCH_STORIES_REQUEST = "@myReader/story/FETCH_STORIES_REQUEST",
  FETCH_STORIES_SUCCESS = "@myReader/story/FETCH_STORIES_SUCCESS",
  FETCH_STORIES_FAILURE = "@myReader/story/FETCH_STORIES_FAILURE",
}

export type Actions = IStoryAction;

export interface IStoryAction extends Action {
  type: string;
  payload: IStoryState;
} 

/*
const action: (act: IStoryAction) => (IStoryAction) =
  ({ type, payload }) => ({ type, payload });

const actions = {
  fetchStoryIds: (payload: IStoryState) => {
    return async (dispatch: Dispatch<IStoryAction>) => {
      dispatch(action({
        type: actionTypes.FETCH_STORY_IDS_REQUEST,
        payload: payload
      }));
  
      return hackerNewsApi.getTopStoryIds()
        .then(storyIds => {
          dispatch(action({
            type: actionTypes.FETCH_STORY_IDS_SUCCESS, 
            payload: { storyIds }
          }));
          dispatch(actions.fetchStories({ storyIds, page: 0}));
          return storyIds;
        })
        .catch(error => dispatch(action({
          type: actionTypes.FETCH_STORY_IDS_FAILURE, 
          payload: { error }
        })));
    };
  },

  fetchStoryIds: (payload: IStoryState) => {
    return async (dispatch: Dispatch<IStoryAction>) => {
      dispatch(action({
        type: actionTypes.FETCH_STORY_IDS_REQUEST,
        payload
      }));

      return hackerNewsApi.getTopStoryIds()
        .then(storyIds => {
          dispatch(action({
            type: actionTypes.FETCH_STORY_IDS_SUCCESS,
            payload: { storyIds }
          }));

          dispatch(
            actions.fetchStories({ storyIds, page: 0})
          );
          return storyIds;
        })
        .catch(error => dispatch(action({
          type: actionTypes.FETCH_STORY_IDS_FAILURE, 
          payload: { error }
        })));
    };
  },

  
};


action({
        type: actionTypes.FETCH_STORIES_SUCCESS,
        payload: { stories }
      })

*/

export const fetchStories = (payload: IStoryState) => {
  return async (dispatch: Dispatch<IStoryAction>) => {
    const { storyIds, page } = payload;
    if (storyIds && page) {
      dispatch(fetchStoriesRequest(storyIds, page));
      return hackerNewsApi.getStoriesByPage(storyIds, page)
      .then(stories => dispatch(fetchStoriesSuccess({ stories })))
      .catch(error => dispatch(fetchStoriesFailure({ error })));
    } else {
      return hackerNewsApi.getStoriesByPage([], 0)
      .then(stories => dispatch(fetchStoriesSuccess({ stories })))
      .catch(error => dispatch(fetchStoriesFailure({ erroro })));
    }      
  };
};

export interface IFetchStoriesRequestAction {
  readonly type: actionType.FETCH_STORIES_REQUEST;
  readonly payload: {
    readonly storyIds: number[];
    readonly page: number;
  }
}

const fetchStoriesRequest
= (storyIds: number[], page: number): IFetchStoriesRequestAction => {
  return {
    payload: { storyIds, page },
    type: actionType.FETCH_STORIES_REQUEST
  }
}

export interface IFetchStoriesSuccessAction {
  readonly type: actionType.FETCH_STORIES_SUCCESS;
  readonly payload: {
    readonly stories: string[]
  };
}

const fetchStoriesSuccess
 = (stories: string[]): IFetchStoriesSuccessAction => {
  return {
    payload: { stories },
    type: actionType.FETCH_STORIES_SUCCESS
  }
}

export interface IFetchStoriesFailureAction {
  readonly type: actionType.FETCH_STORIES_FAILURE;
  readonly payload: {
    readonly error: Error;
  };
}

const fetchStoriesFailure
 = (error: Error): IFetchStoriesFailureAction => {
  return {
    payload: { error },
    type: actionType.FETCH_STORIES_FAILURE
  }
}
