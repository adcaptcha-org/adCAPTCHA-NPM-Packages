import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AdcaptchaService } from '@adcaptcha/angular';

@Component({
  selector: 'app-adcaptcha',
  templateUrl: './adcaptcha.component.html',
  styleUrls: ['./adcaptcha.component.css']
})
export class AdcaptchaComponent implements OnInit {
  @Input() placementID: string = '';
  @Output() onComplete: EventEmitter<void> = new EventEmitter();

  constructor(private adcaptchaService: AdcaptchaService) {}

  ngOnInit(): void {
    if (this.placementID) {
      this.setupAdCAPTCHA();
    }
  }

  setupAdCAPTCHA() {
    this.adcaptchaService.loadScript()
      .then(() => {
        // Assuming setupTriggers is a global method on adcap
        window.adcap.setupTriggers({
          onComplete: () => {
            this.onComplete.emit();
          }
        });
      })
      .catch((error) => {
        console.error('Error loading the script:', error);
      });
  }
}