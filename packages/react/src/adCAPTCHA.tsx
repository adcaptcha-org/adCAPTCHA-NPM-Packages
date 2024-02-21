import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    adcap: {
      setupTriggers: (config: { onComplete: () => void }) => void;
      init: (config: { apiURL: string }) => void;
      successToken: string;
    };
  }
}

interface MyComponentProps {
  placementID: string;
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://widget.adcaptcha.com/index.js";
    script.defer = true;
    script.type = 'module';
    script.async = true;
    script.onload = function () {
      if (window.adcap) {
        window.adcap.init({ apiURL: 'https://api.adcaptcha.com' });
        window.adcap.setupTriggers({
          onComplete: () => {
            const token = CaptchaSuccessToken();
          },
        });
      }
    };
    script.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

export const CaptchaSuccessToken = () => window.adcap?.successToken;

export const AdCAPTCHA: React.FC<MyComponentProps> = ({ placementID }) => {

  loadScript().then(() => {
        console.log('Script loaded');
      }).catch((error) => {
        console.error('Error loading script', error);
      });

  return (
    <div data-adcaptcha={placementID} data-testid="adCaptcha" />
  );
};

