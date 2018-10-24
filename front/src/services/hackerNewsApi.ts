import ApiService from './Api';

/*
 * HackerNews API Reference:
 * https://github.com/HackerNews/API
 */

const JSON_QUERY = '.json?print=pretty';
const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const client = new ApiService({ baseURL: BASE_URL });

const PAGE_LIMIT = 20;

interface IPageValuesArgs<T> {
  begin: number;
  end: number;
  items: T[];
}

interface IResponse {
  id: number
}

const getPageSlice = (limit = PAGE_LIMIT, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }: IPageValuesArgs<IResponse>) => items.slice(begin, end);

const hackerNewsApi = {
  getTopStoryIds: () => client.get(`/topstories${JSON_QUERY}`),
  getStory: (id: number) => client.get(`/item/${id}${JSON_QUERY}`),
  getStoriesByPage: (ids: number[], page: number) => {
    const { begin, end } = getPageSlice(PAGE_LIMIT, page);
    const activeIds = getPageValues({ begin, end, items: ids.map(i => <IResponse>{id: i}) });
    const storyPromises = activeIds.map(id => hackerNewsApi.getStory(id.id));
    return Promise.all(storyPromises);
  }
};

export default hackerNewsApi;
