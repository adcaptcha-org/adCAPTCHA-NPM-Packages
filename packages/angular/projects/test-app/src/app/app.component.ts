import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  // placementID = "YOUR_PLACEMENT";
  // token: string | null = null;
  // respnseMessage: string | null = null;

  ngOnInit() {
    console.log('hello')
    // console.log('AdCAPTCHA:', AdCAPTCHA);
    // console.log('getSuccessToken:', getSuccessToken);

    // // Check if the methods exist
    // if (AdCAPTCHA) {
    //   console.log('AdCAPTCHA component is available.');
    // } else {
    //   console.log('AdCAPTCHA component is NOT available.');
    // }

    // if (getSuccessToken) {
    //   console.log('getSuccessToken function is available.');
    // } else {
    //   console.log('getSuccessToken function is NOT available.');
    // }
  }

  // onCaptchaComplete() {
  //   if (getSuccessToken) {
  //     this.token = getSuccessToken();
  //     console.log('Captcha completed. Token:', this.token);
  //   } else {
  //     console.error('getSuccessToken is not available.');
  //   }
  // }

  // onSubmit() {
  //   if(!this.token) {
  //     console.error('Captcha not completed.');
  //     return;
  //   }
  //   console.log('Form Submitted:', this.formData);
  //   alert(`Form Submitted!\nName: ${this.formData.name}\nEmail: ${this.formData.email}\nMessage: ${this.formData.message}`);
  // }
}
