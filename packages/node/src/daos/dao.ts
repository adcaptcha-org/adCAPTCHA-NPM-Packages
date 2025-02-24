import { AxiosInstance } from 'axios';
import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';

export default class BaseDAO {
  protected root: AdCaptchaAPIClient;
  public setHttpClient(httpClient: AxiosInstance) {
    this.root.http = httpClient;
  }

  constructor(root: AdCaptchaAPIClient) {
    this.root = root;
  }
}