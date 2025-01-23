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
        try {
          const response = await this.root.http.get<PlacementObject>(`/placements/${id}`);
      
          return { status: 'ok', data: response.data };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async createPlacement(
        name: string,
        siteID: string,
      ): Promise<
        APIResponse<'ok', PlacementObject> | APIResponse<'fail', APIError>
      > {
        try {
          const response = await this.root.http.post(
            `/sites/${siteID}/placements`,
            {
              name: name,
              siteID: siteID,
            },
          );
      
          return { status: 'ok', data: response.data };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async updatePlacement(
        placementID: string,
        placementName: string,
        siteID: string,
      ): Promise<
        APIResponse<'ok', PlacementObject> | APIResponse<'fail', APIError>
      > {
        try {
          const response = await this.root.http.put<PlacementObject>(
            `/sites/${siteID}/placements/${placementID}`,
            { name: placementName },
          );
      
          return { status: 'ok', data: response.data };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async deletePlacement(
        id: string,
        siteID: string,
      ): Promise<APIResponse<'ok', boolean> | APIResponse<'fail', APIError>> {
        try {
          await this.root.http.delete(`/sites/${siteID}/placements/${id}`);
      
          return { status: 'ok', data: true };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }
}