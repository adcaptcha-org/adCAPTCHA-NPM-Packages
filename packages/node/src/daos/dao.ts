import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';

export default class BaseDAO {
  protected root: AdCaptchaAPIClient;

  constructor(root: AdCaptchaAPIClient) {
    this.root = root;
  }
}