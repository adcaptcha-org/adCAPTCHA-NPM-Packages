import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AdCAPTCHA], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  placementID = "YOUR_PLACEMENT";
  token: string | null = null;
  respnseMessage: string | null = null;

  onCaptchaComplete() {
    this.token = getSuccessToken(); 
    console.log('Captcha completed. Token:', this.token);
  }

  onSubmit() {
    if(!this.token) {
      console.error('Captcha not completed.');
      return;
    }
    console.log('Form Submitted:', this.formData);
    alert(`Form Submitted!\nName: ${this.formData.name}\nEmail: ${this.formData.email}\nMessage: ${this.formData.message}`);
  }
}
