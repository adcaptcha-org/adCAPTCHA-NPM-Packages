import { AxiosError } from 'axios';
import BaseDAO from './dao';
import { APIError, APIResponse, PaginatedResponse } from '../client/AdCaptchaAPIClient';
import { MediaObject, MediaSate } from '../interfaces/index';

export default class MediaDAO extends BaseDAO {

    public async query(
        filters: { status: MediaSate; siteID?: string },
        page: number,
        pageSize?: number
      ): Promise<
        | APIResponse<'ok', PaginatedResponse<MediaObject>>
        | APIResponse<'fail', APIError>
      > {
        try {
          const response = await this.root.http.get<PaginatedResponse<MediaObject>>(
            `/media/q?page=${page}&pageSize=${pageSize}`,
            {
              params: filters,
            }
          );
          return { status: 'ok', data: response.data };
        } catch (error: unknown) {
          const axiosError = error as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async fetchAll(
        page: number,
        selectedFilters: string[],
        pageSize?: number
        ): Promise<
        | APIResponse<'ok', PaginatedResponse<MediaObject>>
        | APIResponse<'fail', APIError>
        > 
        {
            try {
                const response = await this.root.http.get<PaginatedResponse<MediaObject>>(
                `/media?page=${page}&pageSize=${pageSize}`,
                {
                    params: { filters: selectedFilters },
                }
                );
                return { status: 'ok', data: response.data };
            } catch (error: unknown) {
                const axiosError = error as AxiosError;
                return { status: 'fail', data: axiosError.response?.data as APIError };
            }
         }

    public async fetchAllArchived(
        page: number,
        pageSize?: number
        ): Promise<
        | APIResponse<'ok', PaginatedResponse<MediaObject>>
        | APIResponse<'fail', APIError>
        > {
        try {
            const response = await this.root.http.get<PaginatedResponse<MediaObject>>(
            `/media/archived?page=${page}&pageSize=${pageSize}`
            );
            return { status: 'ok', data: response.data };
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async fetchByID(
        id: string,
      ): Promise<APIResponse<'ok', MediaObject> | APIResponse<'fail', APIError>> {
        try {
          const response = await this.root.http.get<MediaObject>(`/media/${id}`);
          return { status: 'ok', data: response.data };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    //craate a function to upload
    public async requestUploadCredentials(
      fileKey: string
    ): Promise<APIResponse<'ok', { signedURL: string; s3Key: string }> | APIResponse<'fail', APIError>> {
      try {
        if (!fileKey) {
          throw new Error('fileKey is required');
        }
  
        const cleanedFileKey = fileKey.replace(/[^a-zA-Z0-9-_.]/g, '');
  
        const response = await this.root.http.post<{ signedURL: string; s3Key: string }>(
          `/media/upload-credentials`,
          {
            fileKey: cleanedFileKey,
          }
        );
    
        return { status: 'ok', data: response.data };
      } catch (err: unknown) {
        const axiosError = err as AxiosError;
        return { status: 'fail', data: axiosError.response?.data as APIError };
      }
    }

    public async createMedia(
        mediaName: string,
        mediaType: string,
        s3Key: string,
        siteIDs: string[] = [],
        keywords: string[] = [],
        scheduleStartAt: Date | null,
        scheduleEndAt: Date | null,
      ): Promise<APIResponse<'ok', MediaObject> | APIResponse<'fail', APIError>> {
        try {
          const response = await this.root.http.post<MediaObject>('/media', {
            name: mediaName,
            type: mediaType,
            s3Key,
            siteIDs,
            keywords,
            scheduleStartAt,
            scheduleEndAt,
          });
      
          return { status: 'ok', data: response.data };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async updateMedia(
        mediaID: string,
        mediaName: string,
        customerID: string,
        siteIDs: string[] = [],
        keywords: string[] = [],
        scheduleStartAt: Date | null,
        scheduleEndAt: Date | null,
        ): Promise<APIResponse<'ok', MediaObject> | APIResponse<'fail', APIError>> {
        try {
            const response = await this.root.http.put<MediaObject>(
            `/media/${mediaID}`,
            {
                name: mediaName,
                customerID: customerID,
                siteIDs,
                keywords,
                scheduleStartAt,
                scheduleEndAt,
            },
            );
        
            return { status: 'ok', data: response.data };
        } catch (err: unknown) {
            const axiosError = err as AxiosError;
            return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }

    public async deleteMedia(
        id: string,
      ): Promise<APIResponse<'ok', boolean> | APIResponse<'fail', APIError>> {
        try {
          await this.root.http.delete(`/media/${id}`);
      
          return { status: 'ok', data: true };
        } catch (err: unknown) {
          const axiosError = err as AxiosError;
          return { status: 'fail', data: axiosError.response?.data as APIError };
        }
    }
}