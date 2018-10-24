import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { AxiosBasicCredentials } from 'axios';

const API_ROOT = process.env.URL || 'http://localhost:3000/';
const TIMEOUT = 20000;
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class ApiService {
  private client: AxiosInstance;

  constructor({
    baseURL = API_ROOT,
    timeout = TIMEOUT,
    headers = HEADERS
  }: {
    baseURL?: string;
    timeout?: number;
    headers?: {
      'Content-Type': string;
      Accept: string;
    }
  }, auth?: AxiosBasicCredentials){
    const client = axios.create({
      baseURL,
      timeout,
      headers,
      auth
    });

    client.interceptors.response.use(this.handleSuccess, this.handleError);
    this.client = client;
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError(error: AxiosError) {
    return Promise.reject(error);
  }

  get(path: string) {
    return this.client.get(path).then(response => response.data);
  }

  post(path: string, payload: any) {
    return this.client.post(path, payload).then(response => response.data);
  }
}

export default ApiService;
