import { AxiosError } from 'axios';
import BaseDAO from './dao';
import { APIError, APIResponse, PaginatedResponse } from '../client/AdCaptchaAPIClient';
import { SiteObject, SiteStatsObject } from '../interfaces/index';

export default class SitesDAO extends BaseDAO {

  public async fetchAll(page: number, pageSize?: number): Promise< 
    | APIResponse<'ok', PaginatedResponse<SiteObject>>
    | APIResponse<'fail', APIError>
  > {
    try {
      const response = await this.root.http.get<PaginatedResponse<SiteObject>>(`/sites?page=${page}&pageSize=${pageSize}`);
      return { status: 'ok', data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }

  public async fetchByID(id: string): Promise< 
    | APIResponse<'ok', SiteObject>
    | APIResponse<'fail', APIError>
  > {
    try {
      const response = await this.root.http.get<SiteObject>(`/sites/${id}`);
      return { status: 'ok', data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }

  public async fetchStatsForSite(
    id: string,
    dateRange: string
  ): Promise<
    | APIResponse<'ok', SiteStatsObject[]>
    | APIResponse<'fail', APIError>
  > {
    try {
      const response = await this.root.http.get<SiteStatsObject[]>(
        `/sites/${id}/stats/${dateRange}`
      );
      return { status: 'ok', data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }

  public async createSite(
    siteName: string,
    siteUrl: string
  ): Promise<
    | APIResponse<'ok', SiteObject>
    | APIResponse<'fail', APIError>
  > {
    try {
      const response = await this.root.http.post<SiteObject>('/sites', {
        name: siteName,
        url: siteUrl
      });
  
      return { status: 'ok', data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }

  public async updateSite(
    siteID: string,
    siteName: string,
    siteUrl: string
  ): Promise<
    | APIResponse<'ok', SiteObject>
    | APIResponse<'fail', APIError>
  > {
    try {
      const response = await this.root.http.put<SiteObject>(
        `/sites/${siteID}`,
        { name: siteName, url: siteUrl }
      );
  
      return { status: 'ok', data: response.data };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }
  
  public async deleteSite(
    id: string
  ): Promise<
    | APIResponse<'ok', boolean>
    | APIResponse<'fail', APIError>
  > {
    try {
      await this.root.http.delete(`/sites/${id}`);
  
      return { status: 'ok', data: true };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return { status: 'fail', data: axiosError.response?.data as APIError };
    }
  }
}