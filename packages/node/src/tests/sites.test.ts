import {  AxiosInstance } from 'axios';
import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';
import SitesDAO from '../daos/sites';

describe('SitesDAO', () => {
  let client: AdCaptchaAPIClient;
  let siteDAO: SitesDAO;
  let mockHttpClient: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new AdCaptchaAPIClient('api-key');
    siteDAO = new SitesDAO(client);
    mockHttpClient = {
        get: jest.fn(),
        defaults: {} as any,
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() },
        },
        getUri: jest.fn(),
        request: jest.fn(),
        delete: jest.fn(),
        head: jest.fn(),
        options: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    siteDAO.setHttpClient(mockHttpClient);
  });

  describe('fetchAll', () => {
    it('returns a successful response with data', async () => {
      const mockData = {
        data: {
          total: 100,
          items: [{ id: 'site-1', name: 'Site One' }, { id: 'site-2', name: 'Site Two' }],
        },
      };
      mockHttpClient.get.mockResolvedValue(mockData);

      const result = await siteDAO.fetchAll(1, 10);

      expect(result).toEqual({ status: 'ok', data: mockData.data });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/sites?page=1&pageSize=10');
    });

    it('returns a failure response on error', async () => {
      const mockError = {
        response: { data: { code: 400, message: 'Bad Request' } },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await siteDAO.fetchAll(1, 10);

      expect(result).toEqual({ status: 'fail', data: mockError.response.data });
    });
  });

  describe('fetchByID', () => {
    it('returns a successful response with site data', async () => {
      const mockSite = { id: 'site-1', name: 'Site One' };
      mockHttpClient.get.mockResolvedValue({ data: mockSite });

      const result = await siteDAO.fetchByID('site-1');

      expect(result).toEqual({ status: 'ok', data: mockSite });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/sites/site-1');
    });

    it('returns a failure response on error', async () => {
      const mockError = {
        response: { data: { code: 404, message: 'Not Found' } },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await siteDAO.fetchByID('site-1');

      expect(result).toEqual({ status: 'fail', data: mockError.response.data });
    });
  });

  describe('fetchStatsForSite', () => {
    it('returns a successful response with site stats', async () => {
      const mockStats = [
        { date: '2024-01-01', impressions: 1000 },
        { date: '2024-01-02', impressions: 1500 },
      ];
      mockHttpClient.get.mockResolvedValue({ data: mockStats });

      const result = await siteDAO.fetchStatsForSite('site-1', '7d');

      expect(result).toEqual({ status: 'ok', data: mockStats });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/sites/site-1/stats/7d');
    });

    it('returns a failure response when fetching stats fails', async () => {
      const mockError = {
        response: { data: { code: 500, message: 'Server Error' } },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await siteDAO.fetchStatsForSite('site-1', '7d');

      expect(result).toEqual({ status: 'fail', data: mockError.response.data });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/sites/site-1/stats/7d');
    });
  });

  describe('createSite', () => {
    it('successfully creates a site and returns the site object', async () => {
      const mockSite = {
        id: 'new-site',
        name: 'Test Site',
        url: 'https://example.com'
      };
      mockHttpClient.post.mockResolvedValue({ data: mockSite });

      const result = await siteDAO.createSite('Test Site', 'https://example.com');

      expect(result).toEqual({
        status: 'ok',
        data: mockSite
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/sites', {
        name: 'Test Site',
        url: 'https://example.com'
      });
    });

    it('returns a failure response when site creation fails', async () => {
      const mockError = {
        response: {
          data: { code: 400, message: 'Invalid URL format' }
        }
      };
      mockHttpClient.post.mockRejectedValue(mockError);

      const result = await siteDAO.createSite('Bad Site', 'invalid-url');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/sites', {
        name: 'Bad Site',
        url: 'invalid-url'
      });
    });
  });

  describe('updateSite', () => {
    it('successfully updates a site and returns the updated object', async () => {
      const mockUpdatedSite = {
        id: 'site-1',
        name: 'Updated Site',
        url: 'https://updated.com'
      };
      mockHttpClient.put.mockResolvedValue({ data: mockUpdatedSite });

      const result = await siteDAO.updateSite('site-1', 'Updated Site', 'https://updated.com');

      expect(result).toEqual({
        status: 'ok',
        data: mockUpdatedSite
      });
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/sites/site-1',
        { name: 'Updated Site', url: 'https://updated.com' }
      );
    });

    it('returns a failure response when site update fails', async () => {
      const mockError = {
        response: {
          data: { code: 404, message: 'Site not found' }
        }
      };
      mockHttpClient.put.mockRejectedValue(mockError);

      const result = await siteDAO.updateSite('invalid-id', 'Bad Update', 'invalid-url');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data
      });
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/sites/invalid-id',
        { name: 'Bad Update', url: 'invalid-url' }
      );
    });
  });

  describe('deleteSite', () => {
    it('successfully deletes a site and returns confirmation', async () => {
      mockHttpClient.delete.mockResolvedValue({ data: {} });

      const result = await siteDAO.deleteSite('site-1');

      expect(result).toEqual({
        status: 'ok',
        data: true
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/sites/site-1');
    });

    it('returns a failure response when site deletion fails', async () => {
      const mockError = {
        response: {
          data: { code: 403, message: 'Deletion forbidden' }
        }
      };
      mockHttpClient.delete.mockRejectedValue(mockError);

      const result = await siteDAO.deleteSite('invalid-id');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/sites/invalid-id');
    });
  });
});