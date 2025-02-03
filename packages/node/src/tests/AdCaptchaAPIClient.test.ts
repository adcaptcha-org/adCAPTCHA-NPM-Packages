import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';  
import axios from 'axios';
import VerifyDAO from '../daos/verify';
import SitesDAO from '../daos/sites';
import MediaDAO from '../daos/media';
import PlacementsDAO from '../daos/placement';
import SitePlacementsDAO from '../daos/sitePlacements';

jest.mock('../daos/verify');
jest.mock('../daos/sites');
jest.mock('../daos/media');
jest.mock('../daos/placement');
jest.mock('../daos/sitePlacements');
jest.mock('axios');

const mockAxiosInstance = {
    defaults: {
      baseURL: 'https://api.adcaptcha.com/v1',  
      headers: {
        common: {
          'Authorization': '',  
        },
      },
    },
    create: jest.fn(() => mockAxiosInstance),
  };

describe('AdCaptchaAPIClient', () => {
  const mockApiKey = 'mock-api-key';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if no API key is provided', () => {
    expect(() => new AdCaptchaAPIClient('')).toThrow('API Key is required to instantiate WebAPIClient.');
  });

  it('should initialize correctly with an API key', () => {
    axios.create = jest.fn(() => mockAxiosInstance);
    const client = new AdCaptchaAPIClient(mockApiKey);

    expect(client.http.defaults.baseURL).toBe('https://api.adcaptcha.com/v1');
    expect(client.http.defaults.headers.common['Authorization']).toBe(`Bearer ${mockApiKey}`);
    expect(client.verify).toBeInstanceOf(VerifyDAO);
    expect(client.sites).toBeInstanceOf(SitesDAO);
    expect(client.media).toBeInstanceOf(MediaDAO);
    expect(client.placements).toBeInstanceOf(PlacementsDAO);
    expect(client.sitePlacements).toBeInstanceOf(SitePlacementsDAO);
  });

  it('should call axios.create with the correct configuration', () => {
    axios.create = jest.fn(() => mockAxiosInstance);

    new AdCaptchaAPIClient(mockApiKey);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.adcaptcha.com/v1',
      withCredentials: true,
    });
  });
});