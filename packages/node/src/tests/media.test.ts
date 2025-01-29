jest.mock('../utils/utils', () => ({
  determineMediaType: jest.fn(),
  uploadFileToS3: jest.fn(),
}));
import { AxiosError, AxiosInstance } from 'axios';
import AdCaptchaAPIClient, { APIError, APIResponse, PaginatedResponse } from '../client/AdCaptchaAPIClient';
import MediaDAO from '../daos/media';
import { MediaObject } from '../interfaces';
import { determineMediaType, MediaType, uploadFileToS3 } from '../utils/utils';

describe('MediaDAO', () => {
  let client: AdCaptchaAPIClient;
  let mediaDAO: MediaDAO;
  let mockHttpClient: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new AdCaptchaAPIClient('api-key');
    mediaDAO = new MediaDAO(client);

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

    mediaDAO.setHttpClient(mockHttpClient);

    (determineMediaType as jest.Mock).mockReturnValue('image/jpeg'); 
    (uploadFileToS3 as jest.Mock).mockResolvedValue(true); 
    mockHttpClient.post.mockResolvedValue({ data: { id: 'media-123' } });
  });

  describe('query', () => {
    it('should return paginated media results with filters', async () => {
      const mockResponse = {
        data: {
          total: 2,
          items: [
            { id: 'media-1', status: 'active' },
            { id: 'media-2', status: 'pending' },
          ],
        },
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await mediaDAO.query(
        { status: 'live', siteID: 'site-1' },
        1,
        10
      );

      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/q?page=1&pageSize=10',
        {
          params: {
            status: 'live',
            siteID: 'site-1',
          },
        }
      );
    });

    it('should handle query errors correctly', async () => {
      const mockError = {
        response: {
          data: { code: 400, message: 'Invalid filter parameters' },
        },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await mediaDAO.query(
        { status: 'live' },
        1,
        10
      );

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/q?page=1&pageSize=10',
        {
          params: {
            status: 'live',
          },
        }
      );
    });
  });

  describe('fetchAll', () => {
    it('should return paginated media results with filters', async () => {
      const mockResponse = {
        data: {
          total: 3,
          page: 1,
          pageSize: 10,
          items: [
            { id: 'media-1', type: 'video' },
            { id: 'media-2', type: 'image' },
          ],
        },
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await mediaDAO.fetchAll(
        2, 
        ['type:video', 'category:ads'], 
        15 
      );

      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media?page=2&pageSize=15',
        {
          params: {
            filters: ['type:video', 'category:ads'],
          },
        }
      );
    });

    it('should handle missing pageSize parameter', async () => {
      const mockResponse = {
        data: {
          total: 0,
          page: 1,
          pageSize: undefined,
          items: [],
        },
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await mediaDAO.fetchAll(
        1, 
        [] 
      );

      expect(result).toEqual({
        status: 'ok',
        data: expect.objectContaining({
          pageSize: undefined,
        }),
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media?page=1&pageSize=undefined',
        {
          params: {
            filters: [],
          },
        }
      );
    });

    it('should handle fetchAll errors correctly', async () => {
      const mockError = {
        response: {
          data: { code: 500, message: 'Server error' },
        },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await mediaDAO.fetchAll(
        1,
        ['invalid:filter'],
        10
      );

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media?page=1&pageSize=10',
        {
          params: {
            filters: ['invalid:filter'],
          },
        }
      );
    });

    it('should handle empty result set', async () => {
        const mockResponse = {
          data: {
            total: 0,
            page: 1,
            pageSize: 10,
            items: [],
          },
        };
        mockHttpClient.get.mockResolvedValue(mockResponse);
      
        const result = await mediaDAO.fetchAll(1, [], 10);
        
        expect(result).toEqual({
          status: 'ok',
          data: expect.objectContaining({
            total: 0,
            items: [],
          }),
        });
      });
  });

  describe('fetchAllArchived', () => {
    it('should return paginated archived media results', async () => {
      const mockResponse = {
        data: {
          total: 5,
          page: 2,
          pageSize: 20,
          items: [
            { id: 'archived-1', status: 'archived' },
            { id: 'archived-2', status: 'archived' },
          ],
        },
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await mediaDAO.fetchAllArchived(2, 20);

      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/archived?page=2&pageSize=20'
      );
    });

    it('should handle missing pageSize parameter', async () => {
      const mockResponse = {
        data: {
          total: 0,
          page: 1,
          pageSize: undefined,
          items: [],
        },
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await mediaDAO.fetchAllArchived(1);

      expect(result).toEqual({
        status: 'ok',
        data: expect.objectContaining({
          pageSize: undefined,
        }),
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/archived?page=1&pageSize=undefined'
      );
    });

    it('should handle archived media fetch errors', async () => {
      const mockError = {
        response: {
          data: { code: 403, message: 'Access denied' },
        },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await mediaDAO.fetchAllArchived(1, 10);

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/archived?page=1&pageSize=10'
      );
    });

    it('should handle empty archived media list', async () => {
        const mockResponse = {
          data: {
            total: 0,
            page: 1,
            pageSize: 10,
            items: [],
          },
        };
        mockHttpClient.get.mockResolvedValue(mockResponse);
      
        const result = await mediaDAO.fetchAllArchived(1, 10);
        
        expect(result).toEqual({
          status: 'ok',
          data: expect.objectContaining({
            total: 0,
            items: [],
          }),
        });
      });
  });

  describe('fetchByID', () => {
    it('should return media item by ID', async () => {
      const mockResponse = {
        data: {
            id: 'media-123',
            title: 'Test Media',
            status: 'active'
        } as unknown as MediaObject
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await mediaDAO.fetchByID('media-123');

      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/media-123'
      );
    });

    it('should handle not found errors', async () => {
      const mockError = {
        response: {
          data: { code: 404, message: 'Media not found' },
        },
      };
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await mediaDAO.fetchByID('invalid-id');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/media/invalid-id'
      );
    });

    it('should handle errors without response', async () => {
      const mockError = { request: {} }; 
      mockHttpClient.get.mockRejectedValue(mockError);

      const result = await mediaDAO.fetchByID('media-456');

      expect(result).toEqual({
        status: 'fail',
        data: undefined, 
      });
    });
  });

  describe('requestUploadCredentials', () => {
    it('should return signed URL with cleaned file key', async () => {
      const mockResponse = {
        data: {
          signedURL: 'https://s3.example.com/upload',
          s3Key: 'cleaned-key_123.jpg'
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await mediaDAO.requestUploadCredentials('file$Key_123.jpg');

      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data,
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/media/uploadCredentials',
        { fileKey: 'fileKey_123.jpg' } 
      );
    });

    it('should return a failure response when fileKey is empty', async () => {
      const result = await mediaDAO.requestUploadCredentials('');
      expect(result).toEqual({
          status: 'fail',
          data: {
              code: '400',
              title: 'Bad Request',
              message: 'fileKey is required'
          }
      });
      expect(mockHttpClient.post).not.toHaveBeenCalled();
  });

    it('should handle API errors', async () => {
      const mockError = {
        response: {
          data: { code: 403, message: 'Invalid file type' }
        }
      };
      mockHttpClient.post.mockRejectedValue(mockError);

      const result = await mediaDAO.requestUploadCredentials('invalid.key');

      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/media/uploadCredentials',
        { fileKey: 'invalid.key' }
      );
    });

    it('should handle network errors', async () => {
      const mockError = { request: {} }; 
      mockHttpClient.post.mockRejectedValue(mockError);

      const result = await mediaDAO.requestUploadCredentials('good-key');

      expect(result).toEqual({
        status: 'fail',
        data: undefined 
      });
    });

    it('should clean special characters from fileKey', async () => {
      const mockResponse = {
        data: { signedURL: 'url', s3Key: 'safe-key' }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      await mediaDAO.requestUploadCredentials('bad@chars#123.mp4');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/media/uploadCredentials',
        { fileKey: 'badchars123.mp4' } 
      );
    });
  });

  describe('createMedia', () => {
    const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const mockSiteIDs = ['site-1'];
    const mockKeywords = ['keyword1'];
    const mockStartDate = new Date();
    const mockEndDate = new Date();

    it('should return fail when mediaFile is missing', async () => {
      const result = await mediaDAO.createMedia(
        null as any, 
        mockSiteIDs,
        mockKeywords,
        mockStartDate,
        mockEndDate
      );
  
      expect(result).toEqual({
        status: 'fail',
        data: {
          code: '400',
          title: 'Bad Request',
          message: 'mediaFile is required'
        }
      });
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    });
  
    it('should return failure response when requestUploadCredentials encounters an error', async () => {
      const mockError: APIResponse<'fail', APIError> = { 
        status: 'fail', 
        data: { code: '403', title: 'Forbidden', message: 'Invalid file type' } 
      };
      jest.spyOn(mediaDAO, 'requestUploadCredentials').mockResolvedValue(mockError);
  
      const result = await mediaDAO.createMedia(
        mockFile,
        mockSiteIDs,
        mockKeywords,
        mockStartDate,
        mockEndDate
      );
  
      expect(result).toEqual(mockError);
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    });
   
    it('should handle API errors during media creation', async () => {
      const mockCredentials: APIResponse<'ok', { signedURL: string; s3Key: string; }> = { 
        status: 'ok', 
        data: { 
          signedURL: 'http://s3.example.com', 
          s3Key: 'test-key.jpg' 
        } 
      };
      jest.spyOn(mediaDAO, 'requestUploadCredentials').mockResolvedValue(mockCredentials);
  
      const mockError = {
        response: {
          data: { code: 500, message: 'Server Error' }
        }
      } as AxiosError;
      mockHttpClient.post.mockRejectedValue(mockError);
  
      const result = await mediaDAO.createMedia(
        mockFile,
        mockSiteIDs,
        mockKeywords,
        mockStartDate,
        mockEndDate
      );
  
      expect(result).toEqual({
        status: 'fail',
        data: mockError.response?.data
      });
    });
  
    it('should successfully create media when all steps succeed', async () => {
      const mockCredentials: APIResponse<'ok', { signedURL: string; s3Key: string; }> = { 
        status: 'ok', 
        data: { 
          signedURL: 'http://s3.example.com', 
          s3Key: 'test-key.jpg' 
        } 
      };
      jest.spyOn(mediaDAO, 'requestUploadCredentials').mockResolvedValue(mockCredentials);
  
      const mockMediaResponse: MediaObject = {
        id: 'media-123',
        name: 'test.jpg',
        type: 'image/jpeg', 
        keywords: ['test', 'media'],
        sites: [], 
        createdAt: new Date(),
        updatedAt: new Date(),
        archivedAt: new Date(), 
        scheduleStartAt: null,
        scheduleEndAt: null, 
        state: 'live', 
        metadata: {} 
      };
      mockHttpClient.post.mockResolvedValue({ data: mockMediaResponse });
  
      const result = await mediaDAO.createMedia(
        mockFile,
        mockSiteIDs,
        mockKeywords,
        mockStartDate,
        mockEndDate
      );
  
      expect(result).toEqual({
        status: 'ok',
        data: mockMediaResponse
      });
      expect(uploadFileToS3).toHaveBeenCalledWith(
        mockCredentials.data.signedURL,
        mockFile
      );
      expect(mockHttpClient.post).toHaveBeenCalledWith('/media', {
        name: mockFile.name,
        type: 'image/jpeg',
        s3Key: mockCredentials.data.s3Key,
        siteIDs: mockSiteIDs,
        keywords: mockKeywords,
        scheduleStartAt: mockStartDate,
        scheduleEndAt: mockEndDate,
      });
    });
  });
  
  describe('updateMedia', () => {
    const mockDate = new Date('2024-01-01T00:00:00Z');
    const mockMediaID = 'media-123';
  
    it('should successfully update media with all parameters', async () => {
        const mockResponse = {
          data: {
              id: mockMediaID,
              name: 'Updated Media',
              customerID: 'cust-456',
              siteIDs: ['site-1'],
              keywords: ['keyword1'],
              scheduleStartAt: mockDate.toISOString(),
              scheduleEndAt: mockDate.toISOString()
          } as unknown as MediaObject
        };
        mockHttpClient.put.mockResolvedValue(mockResponse);
      
        const result = await mediaDAO.updateMedia(
          mockMediaID,
          'Updated Media',
          'cust-456',
          ['site-1'],
          ['keyword1'],
          mockDate,
          mockDate
        );
      
        expect(result).toEqual({
          status: 'ok',
          data: mockResponse.data
        });
        
        expect(mockHttpClient.put).toHaveBeenCalledWith(
          `/media/${mockMediaID}`,
          expect.objectContaining({
            name: 'Updated Media',
            customerID: 'cust-456',
            siteIDs: ['site-1'],
            keywords: ['keyword1'],
            scheduleStartAt: mockDate,
            scheduleEndAt: mockDate   
          })
        );
      });
  
    it('should handle empty arrays and null dates', async () => {
      const mockResponse = {
        data: {
            id: mockMediaID,
            name: 'Minimal Update',
            customerID: 'cust-456'
        } as unknown as MediaObject
      };
      mockHttpClient.put.mockResolvedValue(mockResponse);
  
      const result = await mediaDAO.updateMedia(
        mockMediaID,
        'Minimal Update',
        'cust-456',
        [], 
        [], 
        null,
        null
      );
  
      expect(result).toEqual({
        status: 'ok',
        data: mockResponse.data
      });
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        `/media/${mockMediaID}`,
        expect.objectContaining({
          siteIDs: [],
          keywords: [],
          scheduleStartAt: null,
          scheduleEndAt: null
        })
      );
    });
  
    it('should handle validation errors', async () => {
      const mockError = {
        response: {
          data: { code: 400, message: 'Invalid customer ID' }
        }
      };
      mockHttpClient.put.mockRejectedValue(mockError);
  
      const result = await mediaDAO.updateMedia(
        mockMediaID,
        'Invalid Media',
        'bad-customer',
        [],
        [],
        null,
        null
      );
  
      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data
      });
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        `/media/${mockMediaID}`,
        expect.any(Object)
      );
    });
  
    it('should correctly format the request URL', async () => {
        const specialID = 'media@special&id';
        const mockResponse = {
            data: { id: specialID } as MediaObject
        };
        mockHttpClient.put.mockResolvedValue(mockResponse);
        
        await mediaDAO.updateMedia(
            specialID,
            'URL Test',
            'cust-456',
            [],
            [],
            null,
            null
        );
        expect(mockHttpClient.put).toHaveBeenCalledWith(
            `/media/${specialID}`, 
            expect.any(Object)
        );
    });

    it('should return validation error if mediaID is missing', async () => {
      const result = await mediaDAO.updateMedia(
          '',  
          'Updated Media Name',
          'customer-1',
          ['site-1'],
          ['keyword-1'],
          new Date(),
          new Date()
      );

      expect(result).toEqual({
          status: 'fail',
          data: { code: '400', title: 'Bad Request', message: 'mediaID is required' }
      });

      expect(mockHttpClient.put).not.toHaveBeenCalled();
  });
  });

  describe('unarchiveMedia', () => {
    const mockMediaID = 'media-123';
  
    it('should successfully unarchive media', async () => {
      mockHttpClient.post.mockResolvedValue({ data: {} });
  
      const result = await mediaDAO.unarchiveMedia(mockMediaID);
  
      expect(result).toEqual({
        status: 'ok',
        data: true
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        `/media/${mockMediaID}/unarchive`
      );
    });
  
    it('should handle API errors', async () => {
      const mockError = {
        response: {
          data: { code: 404, message: 'Media not found' }
        }
      };
      mockHttpClient.post.mockRejectedValue(mockError);
  
      const result = await mediaDAO.unarchiveMedia('invalid-id');
  
      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/media/invalid-id/unarchive'
      );
    });
  
    it('should return validation error if mediaID is missing', async () => {
      const result = await mediaDAO.unarchiveMedia('');

      expect(result).toEqual({
          status: 'fail',
          data: { code: '400', title: 'Bad Request', message: 'mediaID is required' }
      });

      expect(mockHttpClient.post).not.toHaveBeenCalled();
  });
  });

  describe('deleteMedia', () => {
    const mockMediaID = 'media-123';
  
    it('should successfully delete media', async () => {
      mockHttpClient.delete.mockResolvedValue({}); 
  
      const result = await mediaDAO.deleteMedia(mockMediaID);
  
      expect(result).toEqual({
        status: 'ok',
        data: true,
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith(`/media/${mockMediaID}`);
    });
  
    it('should handle API errors', async () => {
      const mockError = {
        response: {
          data: { code: 404, message: 'Media not found' },
        },
      };
      mockHttpClient.delete.mockRejectedValue(mockError);
  
      const result = await mediaDAO.deleteMedia('invalid-id');
  
      expect(result).toEqual({
        status: 'fail',
        data: mockError.response.data,
      });
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/media/invalid-id');
    });
  
    it('should return validation error if id is missing', async () => {
      const result = await mediaDAO.deleteMedia('');

      expect(result).toEqual({
          status: 'fail',
          data: { code: '400', title: 'Bad Request', message: 'id is required' }
      });

      expect(mockHttpClient.delete).not.toHaveBeenCalled();
    });
  });
});