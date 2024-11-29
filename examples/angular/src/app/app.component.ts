import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environments';
import { AdcaptchaComponent, AdcaptchaService } from "@adcaptcha/angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AdcaptchaComponent], 
  providers: [AdcaptchaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  token: string | null = null;
  placementID: string = environment.placementID;
  constructor(private adcaptchaService: AdcaptchaService) {}

  ngOnInit() {
    this.adcaptchaService.loadScript().then(() => {
      console.log('CAPTCHA script loaded');
    }).catch((error) => {
      console.error('Error loading CAPTCHA script:', error);
    });
  }

  handleComplete() {
    this.token = this.adcaptchaService.getSuccessToken();
    console.log('CAPTCHA completed successfully, token:', this.token);
  }

  onSubmit(contactForm: any): void {
    if (this.token) {
      console.log(`Form submitted with token: ${this.token}, Form Data:`, this.formData);
    } else {
      console.error('Form not submitted. Please complete the CAPTCHA.');
    }
    
    contactForm.reset();
  }
}
