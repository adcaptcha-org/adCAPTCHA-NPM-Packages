import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdcaptchaComponent } from './adcaptcha/adcaptcha.component';  // Import the AdcaptchaComponent
import { HttpClientModule } from '@angular/common/http';  // If you are using HttpClient for requests

@NgModule({
  declarations: [
    AppComponent,
    AdcaptchaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Import HttpClientModule if you're using axios or HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }