export interface IStoryState {
  storyIds?: number[];
  stories?: IStory[];
  page?: number;
  isFetching?: boolean;
  error?: Error;
};

export interface IStory {
  id: number;
};
