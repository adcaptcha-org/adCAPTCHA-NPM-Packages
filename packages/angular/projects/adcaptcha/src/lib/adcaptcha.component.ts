import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AdcaptchaService } from './adcaptcha.service';

@Component({
  selector: 'lib-adcaptcha',
  standalone: true,
  imports: [],
  template: `
    <div [attr.data-adcaptcha]="placementID"></div>
  `,
  styleUrls: []
})
export class AdcaptchaComponent implements OnInit {
  @Input() placementID: string = '';
  @Output() onComplete = new EventEmitter<void>();

  constructor(private adcaptchaService: AdcaptchaService) {
    console.log('AdcaptchaComponent constructed++++++++++++++++');
  }

  private scriptLoaded: boolean = false;

  ngOnInit(): void {
    console.log('AdcaptchaComponent initialized----------------');
    this.setupAdCAPTCHA();
  }

  ngOnDestroy(): void {
    if (this.scriptLoaded) {
      // Optionally clean up if needed (e.g., removing event listeners)
      console.log('AdcaptchaComponent destroyed');
    }
  }

  private setupAdCAPTCHA() {
    this.adcaptchaService
      .loadScript()
      .then(() => {
        if (!window.adcap || typeof window.adcap.setupTriggers !== 'function') {
          throw new Error('AdCAPTCHA script loaded, but window.adcap is not initialized correctly.');
        }
        console.log('CAPTCHA script loaded in AdcaptchaComponent');
        this.scriptLoaded = true;
        window.adcap.setupTriggers({
          onComplete: () => {
            console.log('CAPTCHA completed inside AdcaptchaComponent');
            this.onComplete.emit(); 
          },
        });
      })
      .catch((error) => {
        console.error('Error loading CAPTCHA script:', error);
      });
  }
}