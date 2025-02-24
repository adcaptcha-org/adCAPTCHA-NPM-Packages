import { AxiosError } from 'axios';
import BaseDAO from './dao';
import { APIError, APIResponse } from '../client/AdCaptchaAPIClient';
import { Verify } from '../interfaces/index';

export default class VerifyDAO extends BaseDAO {

  public async verifyToken(token: string): Promise< 
    | APIResponse<'ok', Verify>
    | APIResponse<'fail', APIError>
  > {
    try {
      const response = await this.root.http.post('/verify', { token });
      return { status: 'ok', data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }
}