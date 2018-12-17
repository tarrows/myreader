import { Action, Dispatch } from 'redux';
// import { ActionCreator } from 'redux';

import hackerNewsApi from 'services/hackerNewsApi';
import { IStoryResponse } from 'services/hackerNewsApi';
import { IStoryState } from './types';

const NS = '@myReader/story';

export const actionTypes = {
  FETCH_STORIES_FAILURE: `${NS}/FETCH_STORIES_FAILURE`,
  FETCH_STORIES_REQUEST: `${NS}/FETCH_STORIES_REQUEST`,
  FETCH_STORIES_SUCCESS: `${NS}/FETCH_STORIES_SUCCESS`,
  FETCH_STORY_IDS_FAILURE: `${NS}/FETCH_STORY_IDS_FAILURE`,
  FETCH_STORY_IDS_REQUEST: `${NS}/FETCH_STORY_IDS_REQUEST`,
  FETCH_STORY_IDS_SUCCESS: `${NS}/FETCH_STORY_IDS_SUCCESS`,
}

enum actionType {
  FETCH_STORY_IDS_REQUEST = "@myReader/story/FETCH_STORY_IDS_REQUEST",
  FETCH_STORY_IDS_SUCCESS = "@myReader/story/FETCH_STORY_IDS_SUCCESS",
  FETCH_STORY_IDS_FAILURE = "@myReader/story/FETCH_STORY_IDS_FAILURE",
  FETCH_STORIES_REQUEST = "@myReader/story/FETCH_STORIES_REQUEST",
  FETCH_STORIES_SUCCESS = "@myReader/story/FETCH_STORIES_SUCCESS",
  FETCH_STORIES_FAILURE = "@myReader/story/FETCH_STORIES_FAILURE",
}

export type IStoryActions = IStoryAction
| IfetchStoryIdsRequestAction
| IfetchStoryIdsSuccessAction
| IfetchStoryIdsFailureAction
| IFetchStoriesRequestAction
| IFetchStoriesSuccessAction
| IFetchStoriesFailureAction;

export interface IStoryAction extends Action {
  type: string;
  payload: IStoryState;
} 

export interface IfetchStoryIdsRequestAction extends Action {
  readonly type: actionType.FETCH_STORY_IDS_REQUEST;
  readonly payload: {};
}

const fetchStoryIdsRequest = (): IfetchStoryIdsRequestAction => {
  return {
    payload: {},
    type: actionType.FETCH_STORY_IDS_REQUEST
  };
};

export interface IfetchStoryIdsSuccessAction extends Action {
  readonly type: actionType.FETCH_STORY_IDS_SUCCESS;
  readonly payload: {
    readonly storyIds: number[];
    readonly page: number;
  };
}

const fetchStoryIdsSuccess = (storyIds: number[]): IfetchStoryIdsSuccessAction => {
  return {
    payload: { storyIds, page: 0 },
    type: actionType.FETCH_STORY_IDS_SUCCESS
  };
};

export interface IfetchStoryIdsFailureAction extends Action {
  readonly type: actionType.FETCH_STORY_IDS_FAILURE;
  readonly payload: {
    readonly error: Error;
  };
};

const fetchStoryIdsFailure = (error: Error): IfetchStoryIdsFailureAction => {
  return {
    payload: { error },
    type: actionType.FETCH_STORY_IDS_FAILURE
  };
};

export const fetchStoryIds = (payload?: IStoryState) => {
  return async (dispatch: Dispatch<IStoryActions>) => {
    dispatch(fetchStoryIdsRequest());

    return hackerNewsApi.getTopStoryIds()
    .then(response => {
      dispatch(fetchStoryIdsSuccess(response.ids));
      // dispatch(fetchStories({response.ids, page: 0}))
      return response.ids;
    })
    .catch(error => {
      dispatch(fetchStoryIdsFailure(error))
    });
  }
};

export const fetchStories = (payload: IStoryState) => {
  return async (dispatch: Dispatch<IStoryActions>) => {
    const { storyIds, page } = payload;
    if (storyIds && page) {
      dispatch(fetchStoriesRequest(storyIds, page));
      return hackerNewsApi.getStoriesByPage(storyIds, page)
      .then(stories => dispatch(fetchStoriesSuccess(stories)))
      .catch((error: Error) => dispatch(fetchStoriesFailure(error)));
    } else {
      return hackerNewsApi.getStoriesByPage([], 0)
      .then(stories => dispatch(fetchStoriesSuccess(stories)))
      .catch(error => dispatch(fetchStoriesFailure(error)));
    }      
  };
};

export interface IFetchStoriesRequestAction extends Action {
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

export interface IFetchStoriesSuccessAction extends Action {
  readonly type: actionType.FETCH_STORIES_SUCCESS;
  readonly payload: {
    readonly stories: IStoryResponse[]
  };
}

const fetchStoriesSuccess
 = (stories: IStoryResponse[]): IFetchStoriesSuccessAction => {
  return {
    payload: { stories },
    type: actionType.FETCH_STORIES_SUCCESS
  }
}

export interface IFetchStoriesFailureAction extends Action {
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
