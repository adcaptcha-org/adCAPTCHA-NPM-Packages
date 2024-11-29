import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AdcaptchaService } from '@adcaptcha/angular'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    AdcaptchaService, 
  ],
};
