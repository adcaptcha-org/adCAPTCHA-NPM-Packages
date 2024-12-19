import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private adcaptchaService: AdcaptchaService) {}

  private scriptLoaded: boolean = false;

  ngOnInit(): void {
    this.setupAdCAPTCHA();
  }

  ngOnDestroy(): void {}

  private setupAdCAPTCHA() {
    this.adcaptchaService
      .loadScript()
      .then(() => {
        if (!window.adcap || typeof window.adcap.setupTriggers !== 'function') {
          throw new Error('AdCAPTCHA script loaded, but window.adcap is not initialized correctly.');
        }
        this.scriptLoaded = true;
        window.adcap.setupTriggers({
          onComplete: () => {
            this.onComplete.emit(); 
          },
        });
      })
      .catch((error) => {
        console.error('Error loading CAPTCHA script:', error);
      });
  }
}
