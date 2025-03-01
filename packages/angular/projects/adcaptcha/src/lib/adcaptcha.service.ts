import { Injectable } from '@angular/core';

declare global {
  interface Window {
    adcap: {
      setupTriggers: (config: { onComplete: () => void }) => void;
      setKeywords: (keywords: string[]) => void;
      init: () => void;
      successToken: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdcaptchaService {

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://widget.adcaptcha.com/index.js";
      script.defer = true;
      script.type = 'module';
      script.async = true;
      script.onload = () => {
        if (window.adcap) {
          window.adcap.init();
          resolve();
        } else {
          reject(new Error('window.adcap is not available'));
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setKeywords(keywords: string[]): void {
    window.adcap.setKeywords(keywords);
  }

  getSuccessToken(): string {
    return window.adcap.successToken;
  }
}
