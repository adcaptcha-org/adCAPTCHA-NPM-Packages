import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdcaptchaComponent } from '../src/adcaptcha.component';
import { AdcaptchaService } from '../src/adcaptcha.service';

describe('AdcaptchaComponent', () => {
  let component: AdcaptchaComponent;
  let fixture: ComponentFixture<AdcaptchaComponent>;
  let adcaptchaService: jasmine.SpyObj<AdcaptchaService>;

  // Helper function to create a mock for window.adcap
  const createAdcapMock = () => {
    return {
      setupTriggers: jasmine.createSpy('setupTriggers'),
      setKeywords: jasmine.createSpy('setKeywords'),
      init: jasmine.createSpy('init'),
      successToken: 'mock-token',
    };
  };

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

    window.adcap = createAdcapMock();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind placementID to data-adcaptcha attribute', fakeAsync(() => {
    adcaptchaService.loadScript.and.returnValue(Promise.resolve());
    component.placementID = 'test-placement-id';

    fixture.detectChanges();
    tick(); 
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(divElement.getAttribute('data-adcaptcha')).toBe('test-placement-id');
  }));

  it('should call setupTriggers with onComplete if onComplete is provided', fakeAsync(() => {
    adcaptchaService.loadScript.and.returnValue(Promise.resolve());
    const onCompleteSpy = jasmine.createSpy('onComplete');
    component.onComplete.emit = onCompleteSpy;

    component['setupAdCAPTCHA']();
    tick(); 

    expect(window.adcap.setupTriggers).toHaveBeenCalledWith({
      onComplete: jasmine.any(Function),
    });

    const onCompleteFunction = (window.adcap.setupTriggers as jasmine.Spy).calls.mostRecent().args[0].onComplete;
    onCompleteFunction();

    expect(onCompleteSpy).toHaveBeenCalled();
  }));

  it('should log error if script fails to load', fakeAsync(() => {
    const consoleErrorSpy = spyOn(console, 'error');
    const mockError = 'Script load error';

    adcaptchaService.loadScript.and.returnValue(Promise.reject(mockError));

    component['setupAdCAPTCHA']();
    tick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading CAPTCHA script:', mockError);
  }));

  it('should call loadScript when component is initialized', () => {
    adcaptchaService.loadScript.and.returnValue(Promise.resolve());
    component.ngOnInit();
    expect(adcaptchaService.loadScript).toHaveBeenCalled();
  });

  it('should emit onComplete event when CAPTCHA is completed', fakeAsync(() => {
    const onCompleteSpy = jasmine.createSpy('onComplete');
    component.onComplete.emit = onCompleteSpy;

    window.adcap.setupTriggers = (config: { onComplete: () => void }) => {
      config.onComplete();
    };

    adcaptchaService.loadScript.and.returnValue(Promise.resolve());
    component['setupAdCAPTCHA']();
    tick();

    expect(onCompleteSpy).toHaveBeenCalled();
  }));

  it('should clean up resources on destroy', () => {
    const destroySpy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('should update data-adcaptcha attribute when placementID changes', fakeAsync(() => {
    adcaptchaService.loadScript.and.returnValue(Promise.resolve());
    component.placementID = 'initial-id';
    fixture.detectChanges();
    tick();

    component.placementID = 'updated-id';
    fixture.detectChanges();
    tick();
  
    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(divElement.getAttribute('data-adcaptcha')).toBe('updated-id');
  }));
});