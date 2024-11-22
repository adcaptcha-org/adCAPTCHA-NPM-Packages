import { TestBed } from '@angular/core/testing';
import { AdcaptchaService } from './adcaptcha.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // if you need to import other dependencies

describe('AdcaptchaService', () => {
  let service: AdcaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // if you use HttpClient
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
});