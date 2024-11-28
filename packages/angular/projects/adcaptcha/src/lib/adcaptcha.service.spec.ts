import { TestBed } from '@angular/core/testing';

import { AdcaptchaService } from './adcaptcha.service';

describe('AdcaptchaService', () => {
  let service: AdcaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdcaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
