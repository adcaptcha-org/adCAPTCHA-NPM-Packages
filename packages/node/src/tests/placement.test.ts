import { AxiosError, AxiosInstance } from 'axios';
import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';
import PlacementDAO from '../daos/placement';
import { PaginatedResponse, APIError } from '../client/AdCaptchaAPIClient';
import { PlacementObject } from '../interfaces/index';

describe('PlacementDAO', () => {
  let client: AdCaptchaAPIClient;
  let placementDAO: PlacementDAO;
  let mockHttpClient: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
      jest.clearAllMocks();
      client = new AdCaptchaAPIClient('api-key');
      placementDAO = new PlacementDAO(client);
      
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
  
      placementDAO.setHttpClient(mockHttpClient);
    });

  describe('fetchAll', () => {
    const mockPlacements: PaginatedResponse<PlacementObject> = {
      items: [
        {
            id: 'pl1', name: 'Placement 1', siteID: 'site1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        { id: 'pl2', name: 'Placement 2', siteID: 'site2', createdAt: new Date(), updatedAt: new Date() }
      ], 
      meta: { totalCount: 2, page: 1, pageSize: 10 }
    };

    it('should fetch placements with correct pagination', async () => {
      mockHttpClient.get.mockResolvedValueOnce({ data: mockPlacements });
      const result = await placementDAO.fetchAll(2);
      expect(result).toEqual({
        status: 'ok',
        data: mockPlacements
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/placements?page=2');
    });

    it('should handle API errors correctly', async () => {
      const errorResponse = {
          response: {
              status: 400,
              data: { code: 400, message: 'Invalid page number' }
          }
      } as unknown as AxiosError<APIError>;
      mockHttpClient.get.mockRejectedValueOnce(errorResponse);
      const result = await placementDAO.fetchAll(-1);
      expect(result).toEqual({
        status: 'fail',
        data: errorResponse.response?.data
      });
    });

    it('should use correct API endpoint structure', async () => {
      mockHttpClient.get.mockResolvedValueOnce({ data: mockPlacements });
      await placementDAO.fetchAll(5);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/placements?page=5');
    });
  });

  describe('fetchByID', () => {
    const mockPlacement: PlacementObject = {
      id: 'pl1',
      name: 'Test Placement',
      siteID: 'site1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  
    it('should fetch a placement by ID successfully', async () => {
      mockHttpClient.get.mockResolvedValue({ data: mockPlacement });
      const result = await placementDAO.fetchByID('pl1');
      
      expect(result).toEqual({
        status: 'ok',
        data: mockPlacement
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith('/placements/pl1');
    });
  
    it('should handle 404 not found error', async () => {
      const errorResponse: AxiosError<APIError> = {
        response: {
          status: 404,
          data: { code: "404", title: 'Not Found', message: 'Placement not found' }, 
          statusText: 'Not Found',
          headers: {},
          config: {} as any
        },
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed',
        toJSON: () => ({})
      };
    
      mockHttpClient.get.mockRejectedValue(errorResponse);
      const result = await placementDAO.fetchByID('invalid-id');
    
      expect(result).toEqual({
        status: 'fail',
        data: { code: "404", title: 'Not Found', message: 'Placement not found' } 
      });
    });
  });
});