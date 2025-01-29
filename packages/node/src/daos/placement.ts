import { AxiosError } from 'axios';
import BaseDAO from './dao';
import { APIError, APIResponse, PaginatedResponse } from '../client/AdCaptchaAPIClient';
import { PlacementObject } from '../interfaces/index';

export default class PlacementsDAO extends BaseDAO {

    public async fetchAll(
        page: number,
        ): Promise<
        | APIResponse<'ok', PaginatedResponse<PlacementObject>>
        | APIResponse<'fail', APIError>
        > {
          if (!page) {
            return {
              status: 'fail',
              data: { code: '400', title: 'Bad Request', message: 'page is required' },
            };
          }
        try {
            const response = await this.root.http.get<PaginatedResponse<PlacementObject>>(
            `/placements?page=${page}`
            );
        
            return { status: 'ok', data: response.data };
        } catch (err: unknown) {
            const axiosError = err as AxiosError;
            return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async fetchByID(
        id: string,
      ): Promise<APIResponse<'ok', PlacementObject> | APIResponse<'fail', APIError>> {
        if (!id) {
          return {
            status: 'fail',
            data: { code: '400', title: 'Bad Request', message: 'id is required' },
          };
        }
        try {
          const response = await this.root.http.get<PlacementObject>(`/placements/${id}`);
      
          return { status: 'ok', data: response.data };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }
}