import { TestBed } from '@angular/core/testing';
import { AdcaptchaService } from './adcaptcha.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('AdcaptchaService', () => {
  let service: AdcaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AdcaptchaService]
    });
    service = TestBed.inject(AdcaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the script successfully', (done) => {
    const scriptLoadSpy = spyOn(service, 'loadScript').and.returnValue(Promise.resolve());
    service.loadScript().then(() => {
      expect(scriptLoadSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should reject loadScript with error', (done) => {
    const errorMessage = 'Script load error';
    const scriptLoadSpy = spyOn(service, 'loadScript').and.returnValue(Promise.reject(errorMessage));

    service.loadScript().catch((error) => {
      expect(error).toBe(errorMessage);
      done();
    });
  });

  it('should call setKeywords with correct arguments', () => {
    window.adcap = {
      setKeywords: jasmine.createSpy('setKeywords'),
      setupTriggers: jasmine.createSpy('setupTriggers'),
      init: jasmine.createSpy('init'),
      successToken: '',
    };
  
    const keywords = ['keyword1', 'keyword2'];
    service.setKeywords(keywords);
  
    expect(window.adcap.setKeywords).toHaveBeenCalledWith(keywords);
  });

  it('should return the success token', () => {
    const mockToken = 'mock-success-token';
    window.adcap = {
      setKeywords: jasmine.createSpy('setKeywords'),
      setupTriggers: jasmine.createSpy('setupTriggers'),
      init: jasmine.createSpy('init'),
      successToken: mockToken,
    };
  
    const token = service.getSuccessToken();
  
    expect(token).toBe(mockToken);
  });
});
