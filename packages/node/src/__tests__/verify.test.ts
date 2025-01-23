import AdCaptchaAPIClient from '../client/AdCaptchaAPIClient';
import VerifyDAO from '../daos/verify';
import axios from 'axios';

jest.mock('axios', () => {
    const actualAxios = jest.requireActual('axios');
    return {
      ...actualAxios,
      create: jest.fn(() => ({
        post: jest.fn().mockResolvedValue({
          data: { status: 'ok', data: 'Token verified' }, 
        }),
      })),
    };
  });
describe('VerifyDAO', () => {
  let client: AdCaptchaAPIClient;
  let verifyDAO: VerifyDAO;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new AdCaptchaAPIClient('fakeApiKey');
    verifyDAO = new VerifyDAO(client);
    
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify token successfully', async () => {
    const mockResponse = { data: { status: "ok", data: 'Token verified' } };
    (axios.create as jest.Mock).mockReturnValueOnce({
      post: jest.fn().mockResolvedValue(mockResponse),
    });
    const response = await client.verify.verifyToken('valid-token');
    console.log(response);
    expect(response).toEqual(mockResponse.data); 
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.adcaptcha.com/v1/verify', 
      { token: 'valid-token' }, 
      { headers: { Authorization: 'Bearer fakeApiKey' } }
    ); 
  });

//   it('should handle API errors correctly', async () => {
//     const mockError = { response: { status: 400, data: { error: 'Invalid token' } } };
//     (axios.post as jest.Mock).mockRejectedValue(mockError);

//     const response = await verifyDAO.verifyToken('invalid-token');

//     expect(response).toEqual(mockError.response.data); 
//     expect(axios.post).toHaveBeenCalledWith(
//       'https://api.adcaptcha.com/verify', 
//       { token: 'invalid-token' }, 
//       { headers: { Authorization: 'Bearer fakeApiKey' } }
//     ); 
//   });

//   it('should throw error when no API key is provided', async () => {
//     const noApiKeyClient = new WebAPIClient('');
//     const noApiKeyVerifyDAO = new VerifyDAO(noApiKeyClient);

//     try {
//       await noApiKeyVerifyDAO.verifyToken('valid-token');
//     } catch (error) {
//       expect(error).toEqual(new Error('API Key is required to instantiate WebAPIClient.'));
//     }
//   });
});