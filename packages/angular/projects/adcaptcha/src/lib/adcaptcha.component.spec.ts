import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdcaptchaComponent } from './adcaptcha.component';
import { AdcaptchaService } from './adcaptcha.service';

describe('AdcaptchaComponent', () => {
  let component: AdcaptchaComponent;
  let fixture: ComponentFixture<AdcaptchaComponent>;
  let adcaptchaService: jasmine.SpyObj<AdcaptchaService>;

  beforeEach(async () => {
    const adcaptchaServiceMock = jasmine.createSpyObj('AdcaptchaService', [
      'loadScript',
      'setKeywords',
      'getSuccessToken',
    ]);

    await TestBed.configureTestingModule({
      imports: [AdcaptchaComponent],
      providers: [
        { provide: AdcaptchaService, useValue: adcaptchaServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdcaptchaComponent);
    component = fixture.componentInstance;
    adcaptchaService = TestBed.inject(
      AdcaptchaService
    ) as jasmine.SpyObj<AdcaptchaService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind placementID to data-adcaptcha attribute', async () => {
    adcaptchaService.loadScript.and.returnValue(Promise.resolve()); 
  
    component.placementID = 'test-placement-id';
    fixture.detectChanges();
    await fixture.whenStable(); 
  
    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(divElement.getAttribute('data-adcaptcha')).toBe('test-placement-id');
  });

  it('should call setupTriggers with onComplete if onComplete is provided', async () => {
    window.adcap = {
      setupTriggers: jasmine.createSpy('setupTriggers'),
      setKeywords: jasmine.createSpy('setKeywords'),
      init: jasmine.createSpy('init'),
      successToken: 'mock-token',
    };
    const onCompleteSpy = jasmine.createSpy('onComplete');
    component.onComplete = onCompleteSpy;
    adcaptchaService.loadScript.and.returnValue(Promise.resolve());
    await component['setupAdCAPTCHA']();
    expect(window.adcap.setupTriggers).toHaveBeenCalledWith({
      onComplete: onCompleteSpy,
    });
  });

  it('should call setKeywords with correct arguments', () => {
    const keywords = ['test', 'angular'];
    component.setKeywords(keywords);

    expect(adcaptchaService.setKeywords).toHaveBeenCalledWith(keywords);
  });

  it('should return successToken from getSuccessToken', () => {
    adcaptchaService.getSuccessToken.and.returnValue('mock-token');
    const token = component.getSuccessToken();

    expect(token).toBe('mock-token');
    expect(adcaptchaService.getSuccessToken).toHaveBeenCalled();
  });

  
  it('should log error if script loading fails', fakeAsync(() => {
    const consoleErrorSpy = spyOn(console, 'error');
    const mockError = 'Script load error';

    adcaptchaService.loadScript.and.returnValue(Promise.reject(mockError));

    component['setupAdCAPTCHA'](); 
    tick(); 

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading the script:', mockError);
  }));
});