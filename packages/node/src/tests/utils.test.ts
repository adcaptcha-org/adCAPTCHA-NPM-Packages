import { determineMediaType, MediaType, uploadFileToS3 } from '../utils/utils';
import axios from 'axios';

jest.mock('axios');

describe('utils functions', () => {

  describe('determineMediaType', () => {
    it('should return MediaType.Video for valid video MIME types', () => {
      expect(determineMediaType('video/mp4')).toBe(MediaType.Video);
      expect(determineMediaType('video/quicktime')).toBe(MediaType.Video);
      expect(determineMediaType('video/x-msvideo')).toBe(MediaType.Video);
      expect(determineMediaType('video/webm')).toBe(MediaType.Video);
    });

    it('should return MediaType.Image for valid image MIME types', () => {
      expect(determineMediaType('image/png')).toBe(MediaType.Image);
      expect(determineMediaType('image/jpeg')).toBe(MediaType.Image);
      expect(determineMediaType('image/avif')).toBe(MediaType.Image);
      expect(determineMediaType('image/webp')).toBe(MediaType.Image);
      expect(determineMediaType('image/jpg')).toBe(MediaType.Image);
      expect(determineMediaType('image/heic')).toBe(MediaType.Image);
    });

    it('should return null for unsupported MIME types', () => {
      expect(determineMediaType('application/pdf')).toBeNull();
      expect(determineMediaType('text/html')).toBeNull();
      expect(determineMediaType('audio/mp3')).toBeNull();
      expect(determineMediaType('application/zip')).toBeNull();
    });
  });

  describe('uploadFileToS3', () => {
    const mockFile = new File(['file'], 'test.jpg', { type: 'image/jpeg' });

    let consoleErrorSpy: jest.SpyInstance;
    // Suppress console.error output
    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn()); 
    });
  
    afterEach(() => {
      consoleErrorSpy.mockRestore(); 
    });

    it('should return true when the file is successfully uploaded', async () => {
      (axios.put as jest.Mock).mockResolvedValue({ status: 200 });

      const result = await uploadFileToS3('http://adCAPTCHA.example.com', mockFile);

      expect(result).toBe(true);
      expect(axios.put).toHaveBeenCalledWith(
        'http://adCAPTCHA.example.com', 
        mockFile, 
        { headers: { 'Content-Type': 'image/jpeg' } }
      );
    });

    it('should return false when the file upload fails', async () => {
      (axios.put as jest.Mock).mockRejectedValue(new Error('Upload failed'));

      const result = await uploadFileToS3('http://s3.example.com', mockFile);

      expect(result).toBe(false);
      expect(axios.put).toHaveBeenCalledWith(
        'http://s3.example.com', 
        mockFile, 
        { headers: { 'Content-Type': 'image/jpeg' } }
      );
    });
  });

});