import axios, { AxiosInstance } from 'axios';
import VerifyDAO from '../daos/verify'; 
import SitesDAO from '../daos/sites';
import MediaDAO from '../daos/media';
import PlacementsDAO from '../daos/placement';
import SitePlacementsDAO from '../daos/sitePlacements';

export type APIError = {
    code: string;
    title: string;
    message?: string;
    detail?: string;
    errorCode?: string;
  };

export type APIResponse<S, T> = {
    status: S;
    data: T;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: {
    totalCount: number;
    page: number;
    pageSize: number;
  };
};
  

export default class AdCaptchaAPIClient {
  public http: AxiosInstance;
  public verify: VerifyDAO;
  public sites: SitesDAO;
  public media: MediaDAO;
  public placements: PlacementsDAO;
  public sitePlacements: SitePlacementsDAO;

  constructor(apiKey: string) {
    if (!apiKey) {
        throw new Error('API Key is required to instantiate WebAPIClient.');
      }

    this.http = axios.create({
      baseURL: 'https://api.adcaptcha.com/v1',  
      withCredentials: true,
    });

    this.http.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    
    this.verify = new VerifyDAO(this);  
    this.sites = new SitesDAO(this);
    this.media = new MediaDAO(this);
    this.placements = new PlacementsDAO(this);
    this.sitePlacements = new SitePlacementsDAO(this);
  }
}

