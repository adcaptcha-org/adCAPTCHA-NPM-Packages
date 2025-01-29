import { AxiosError } from 'axios';
import BaseDAO from './dao';
import { APIError, APIResponse, PaginatedResponse } from '../client/AdCaptchaAPIClient';
import { PlacementObject } from '../interfaces/index';

export default class SitePlacementsDAO extends BaseDAO {

    public async fetchAll(
        siteID: string,
        page: number = 1,
        pageSize: number = 24
      ): Promise<
        APIResponse<'ok', PaginatedResponse<PlacementObject>> | APIResponse<'fail', APIError>
      > {
        if (!siteID) {
          return { status: 'fail', data: { code: '400', title: 'Bad Request', message: "siteID is required" } };
        }
        try {
          const response = await this.root.http.get<PaginatedResponse<PlacementObject>>(
            `/sites/${siteID}/placements`,
            {
              params: {
                page: page,
                pageSize: pageSize,
              },
            }
          );
      
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
        if (!name || !siteID) {
          return {
            status: 'fail',
            data: {
              code: '400',
              title: 'Bad Request',
              message: 'name and siteID are required',
            },
          };
        }
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
        if (!siteID || !placementID || !placementName) {
          return {
            status: 'fail',
            data: {
              code: '400',
              title: 'Bad Request',
              message: 'siteID, placementID, and placementName are required',
            },
          };
        }
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
        if (!siteID || !id) {
          return {
            status: 'fail',
            data: { code: '400', title: 'Bad Request', message: 'siteID and placementID are required' },
          };
        }
        try {
          await this.root.http.delete(`/sites/${siteID}/placements/${id}`);
      
          return { status: 'ok', data: true };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }
};