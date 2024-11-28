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
  constructor(private adcaptchaService: AdcaptchaService) {}
  @Input() placementID: string = '';
  @Output() onComplete = new EventEmitter<void>();

  ngOnInit(): void {
    this.setupAdCAPTCHA();
  }

  // ngOnDestroy(): void {
  //   // Cleanup if necessary


  // }

  private setupAdCAPTCHA() {
    this.adcaptchaService
      .loadScript()
      .then(() => {
        console.log('CAPTCHA script loaded in AdcaptchaComponent');
        window.adcap.setupTriggers({
          onComplete: () => {
            console.log('CAPTCHA completed inside AdcaptchaComponent');
            if (this.onComplete) {
              this.onComplete.emit(); 
            }
          },
        });
      })
      .catch((error) => {
        console.error('Error loading CAPTCHA script:', error);
      });
  }
}