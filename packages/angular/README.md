# adCAPTCHA Angular

This package provides an Angular component for adCAPTCHA. The AdCAPTCHA component is used to show a CAPTCHA on your website by adding the necessary script and HTML. After the successful completion of a CAPTCHA, a success token is exposed which should be validated (using [@adcaptcha/node](/packages/node/README.md)) to ensure it is legitimate and hasn't been used before.

## Installation

To install the Angular package, run the following command:

```bash
npm install @adcaptcha/angular
```

## Usage

A Placement ID is used to specify which media will be shown in the CAPTCHA. To create a Placement ID, visit the [AdCAPTCHA dashboard](https://app.adcaptcha.com/login).

[Documentation](https://docs.adcaptcha.com/wordpress) to learn how to create a Placement ID.

#### onComplete
This is a callback that will execute after successfully completing a CAPTCHA. In this example we are using it to get the success token, but can also be used perform different actions e.g. to remove the disabled attribute from submission buttons and change styling rules.

#### setKeywords
If you would like to target specific media for a captcha using keywords, you can do this 
by calling "window.adcap.setKeywords()" with an array of strings. The adCAPTCHA widget 
will then prioritise media that match the keywords you have provided.

Make sure to also add the keywords to the specified media in the [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

## Example Usage

```jsx
//app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  
  token: string | null = null;
  placementID: string = "your-placement-ID";
  constructor(private adcaptchaService: AdcaptchaService) {}

  ngOnInit() {
    this.adcaptchaService.loadScript().then(() => {
      console.log('CAPTCHA script loaded');
    }).catch((error) => {
      console.error('Error loading CAPTCHA script:', error);
    });
  }

  handleComplete() {
    // Returns a success token after successfully completing captcha
    // Save the success token to then verify it
    this.token = this.adcaptchaService.getSuccessToken();
  }
}
```

```html
<!-- app.component.html -->
<div class="container">
  <form #contactForm="ngForm" autocomplete="on">
   
    <!-- The adCAPTCHA component is used to show the CAPTCHA on your website -->
    <lib-adcaptcha 
      [placementID]="placementID" 
      (onComplete)="handleComplete()">
    </lib-adcaptcha>
   
    <button type="submit" [disabled]="contactForm.invalid">Submit</button>
  </form>
</div>
```
