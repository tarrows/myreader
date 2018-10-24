export interface IStoryState {
  storyIds?: number[];
  stories?: IStory[];
  page?: number;
  isFetching?: boolean;
  error?: string;
};

export interface IStory {
  id: number;
};
