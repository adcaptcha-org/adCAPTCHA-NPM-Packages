import { AxiosError, AxiosInstance } from 'axios';
import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';
import SitePlacementsDAO from '../daos/sitePlacements';
import { PaginatedResponse, APIError } from '../client/AdCaptchaAPIClient';
import { PlacementObject } from '../interfaces/index';

describe('SitePlacementsDAO', () => {
  let client: AdCaptchaAPIClient;
  let sitePlacementsDAO: SitePlacementsDAO;
  let mockHttpClient: jest.Mocked<AxiosInstance>;

  const mockPlacement: PlacementObject = {
    id: 'pl1',
    name: 'Test Placement',
    siteID: 'site1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    client = new AdCaptchaAPIClient('api-key');
    sitePlacementsDAO = new SitePlacementsDAO(client);

    mockHttpClient = {
      post: jest.fn(),
      defaults: {} as any,
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      getUri: jest.fn(),
      request: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    sitePlacementsDAO.setHttpClient(mockHttpClient);
  });

  describe('fetchAll', () => {
    const mockPlacements: PaginatedResponse<PlacementObject> = {
      items: [mockPlacement, { ...mockPlacement, id: 'pl2', name: 'Placement 2' }],
      meta: { totalCount: 2, page: 1, pageSize: 24 },
    };

    it('should fetch placements for a site with correct pagination', async () => {
      mockHttpClient.get.mockResolvedValueOnce({ data: mockPlacements });
      const result = await sitePlacementsDAO.fetchAll('site1', 1, 24);

      expect(result).toEqual({ status: 'ok', data: mockPlacements });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/sites/site1/placements', {
        params: { page: 1, pageSize: 24 },
      });
    });

    it('should handle API errors correctly', async () => {
      const errorResponse = { response: { status: 400, data: { code: '400', title: 'Bad Request', message: 'Invalid siteID' } } } as AxiosError<APIError>;

      mockHttpClient.get.mockRejectedValueOnce(errorResponse);
      const result = await sitePlacementsDAO.fetchAll('invalid-site-id');

      expect(result).toEqual({ status: 'fail', data: { code: '400', title: 'Bad Request', message: 'Invalid siteID' } });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/sites/invalid-site-id/placements', { params: { page: 1, pageSize: 24 } });
    });

    it('should return a validation error if siteID is not provided', async () => {
      const result = await sitePlacementsDAO.fetchAll('');
      expect(result).toEqual({ status: 'fail', data: { code: '400', title: 'Bad Request', message: 'siteID is required' } });
      expect(mockHttpClient.get).not.toHaveBeenCalled();
    });
  });

  describe('createPlacement', () => {
    it('should create a placement successfully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({ data: mockPlacement });
      const result = await sitePlacementsDAO.createPlacement('Test Placement', 'site1');

      expect(result).toEqual({ status: 'ok', data: mockPlacement });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/sites/site1/placements', { name: 'Test Placement', siteID: 'site1' });
    });

    it('should handle API errors correctly', async () => {
      const errorResponse = { response: { status: 400, data: { code: '400', title: 'Bad Request', message: 'Invalid input' } } } as AxiosError<APIError>;

      mockHttpClient.post.mockRejectedValueOnce(errorResponse);
      const result = await sitePlacementsDAO.createPlacement('Name', 'invalid-site-id');

      expect(result).toEqual({ status: 'fail', data: { code: '400', title: 'Bad Request', message: 'Invalid input' } });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/sites/invalid-site-id/placements', { name: 'Name', siteID: 'invalid-site-id' });
    });

    it('should return a validation error if name or siteID is missing', async () => {
        const result1 = await sitePlacementsDAO.createPlacement('', 'site1');
        const result2 = await sitePlacementsDAO.createPlacement('Test Placement', '');
        const result3 = await sitePlacementsDAO.createPlacement('', '');
    
        [result1, result2, result3].forEach((result) => {
          expect(result).toEqual({
            status: 'fail',
            data: {
              code: '400',
              title: 'Bad Request',
              message: 'name and siteID are required',
            },
          });
        });
    
        expect(mockHttpClient.post).not.toHaveBeenCalled();
      });
  });

  describe('updatePlacement', () => {
    const updatedPlacement = { ...mockPlacement, name: 'Updated Placement' };
  
    it('should update a placement successfully', async () => {
      mockHttpClient.put.mockResolvedValueOnce({ data: updatedPlacement });
      const result = await sitePlacementsDAO.updatePlacement('pl1', 'Updated Placement', 'site1');
  
      expect(result).toEqual({ status: 'ok', data: updatedPlacement });
      expect(mockHttpClient.put).toHaveBeenCalledWith('/sites/site1/placements/pl1', { name: 'Updated Placement' });
    });
  
    it('should return a validation error if siteID, placementID, or placementName is empty', async () => {
        const result1 = await sitePlacementsDAO.updatePlacement('', 'Updated Placement', 'site1');
        const result2 = await sitePlacementsDAO.updatePlacement('pl1', '', 'site1');
        const result3 = await sitePlacementsDAO.updatePlacement('pl1', 'Updated Placement', '');
        const result4 = await sitePlacementsDAO.updatePlacement('', '', '');
      
        [result1, result2, result3, result4].forEach((result) => {
          expect(result).toEqual({
            status: 'fail',
            data: {
              code: '400',
              title: 'Bad Request',
              message: 'siteID, placementID, and placementName are required',
            },
          });
        });
      
        expect(mockHttpClient.put).not.toHaveBeenCalled();
      });
  
    it('should handle API errors correctly when siteID is wrong', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { code: '404', title: 'Not Found', message: 'Site not found' },
        },
      } as unknown as AxiosError<APIError>;
  
      mockHttpClient.put.mockRejectedValueOnce(errorResponse);
      const result = await sitePlacementsDAO.updatePlacement('pl1', 'Updated Placement', 'invalid-site-id');
  
      expect(result).toEqual({
        status: 'fail',
        data: { code: '404', title: 'Not Found', message: 'Site not found' },
      });
  
      expect(mockHttpClient.put).toHaveBeenCalledWith('/sites/invalid-site-id/placements/pl1', { name: 'Updated Placement' });
    });
  
    it('should handle API errors correctly when placement ID is wrong', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { code: '404', title: 'Not Found', message: 'Placement not found' },
        },
      } as unknown as AxiosError<APIError>;
  
      mockHttpClient.put.mockRejectedValueOnce(errorResponse);
      const result = await sitePlacementsDAO.updatePlacement('invalid-id', 'Updated Placement', 'site1');
  
      expect(result).toEqual({
        status: 'fail',
        data: { code: '404', title: 'Not Found', message: 'Placement not found' },
      });
  
      expect(mockHttpClient.put).toHaveBeenCalledWith('/sites/site1/placements/invalid-id', { name: 'Updated Placement' });
    });
  });

  describe('deletePlacement', () => {
    it('should delete a placement successfully', async () => {
      mockHttpClient.delete.mockResolvedValueOnce({});
      const result = await sitePlacementsDAO.deletePlacement('pl1', 'site1');
  
      expect(result).toEqual({ status: 'ok', data: true });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/sites/site1/placements/pl1');
    });
  
    it('should return a validation error if siteID or placementID is empty', async  () => {
        const result1 = await sitePlacementsDAO.deletePlacement('', 'site1');
        const result2 = await sitePlacementsDAO.deletePlacement('pl1', '');
        const result3 = await sitePlacementsDAO.deletePlacement('', '');
    
        [result1, result2, result3].forEach((result) => {
        expect(result).toEqual({
            status: 'fail',
            data: { code: '400', title: 'Bad Request', message: 'siteID and placementID are required' },
        });
        });
    
        expect(mockHttpClient.delete).not.toHaveBeenCalled();
      });
  
    it('should handle API errors correctly when siteID is wrong', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { code: '404', title: 'Not Found', message: 'Site not found' },
        },
      } as unknown as AxiosError<APIError>;
  
      mockHttpClient.delete.mockRejectedValueOnce(errorResponse);
      const result = await sitePlacementsDAO.deletePlacement('pl1', 'invalid-site-id');
  
      expect(result).toEqual({
        status: 'fail',
        data: { code: '404', title: 'Not Found', message: 'Site not found' },
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/sites/invalid-site-id/placements/pl1');
    });
  
    it('should handle API errors correctly when placement ID is wrong', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { code: '404', title: 'Not Found', message: 'Placement not found' },
        },
      } as unknown as AxiosError<APIError>;
  
      mockHttpClient.delete.mockRejectedValueOnce(errorResponse);
      const result = await sitePlacementsDAO.deletePlacement('invalid-id', 'site1');
  
      expect(result).toEqual({
        status: 'fail',
        data: { code: '404', title: 'Not Found', message: 'Placement not found' },
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/sites/site1/placements/invalid-id');
    });
  });
});