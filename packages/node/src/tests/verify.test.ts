import { AxiosInstance } from 'axios';
import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';
import VerifyDAO from '../daos/verify';

describe('VerifyDAO', () => {
  let client: AdCaptchaAPIClient;
  let verifyDAO: VerifyDAO;
  let mockHttpClient: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new AdCaptchaAPIClient('api-key');
    verifyDAO = new VerifyDAO(client);
    
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

    verifyDAO.setHttpClient(mockHttpClient);
  });

  describe('verifyToken', () => {
    it('should return failure for invalid token', async () => {
      const mockError = {
        response: {
          data: { code: 400, message: 'Invalid token' },
        },
      };
      mockHttpClient.post.mockRejectedValue(mockError);

      const result = await verifyDAO.verifyToken('fakeToken');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/verify', {
        token: 'fakeToken'
      });
    });

    it('should return failure for missing token', async () => {
      const mockError = {
        response: {
          data: { code: 400, message: 'Token missing' },
        },
      };
      mockHttpClient.post.mockRejectedValue(mockError);

      const result = await verifyDAO.verifyToken('');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/verify', {
        token: ''
      });
    });

    it('should return success for valid token', async () => {
      const mockResponse = {
        data: { verified: true, expiresAt: '2024-01-01T00:00:00Z' },
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await verifyDAO.verifyToken('validToken');

      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data,
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/verify', {
        token: 'validToken'
      });
    });
  });
});