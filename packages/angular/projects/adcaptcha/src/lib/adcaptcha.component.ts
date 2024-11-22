import { Component, Input, OnInit } from '@angular/core';
import { AdcaptchaService } from './adcaptcha.service';

@Component({
  selector: 'lib-adcaptcha',
  template: `<div [attr.data-adcaptcha]="placementID"></div>`
})
export class AdcaptchaComponent implements OnInit {

  @Input() placementID: string = '';
  @Input() onComplete?: () => void;

  constructor(private adcaptchaService: AdcaptchaService) {}

  ngOnInit(): void {
    this.setupAdCAPTCHA();
  }

  private setupAdCAPTCHA() {
    this.adcaptchaService.loadScript().then(() => {
      if (this.onComplete) {
        window.adcap.setupTriggers({
          onComplete: this.onComplete,
        });
      }
    }).catch(error => {
      console.error('Error loading the script:', error);
    });
  }

  setKeywords(keywords: string[]): void {
    this.adcaptchaService.setKeywords(keywords);
  }

  getSuccessToken(): string {
    return this.adcaptchaService.getSuccessToken();
  }
}