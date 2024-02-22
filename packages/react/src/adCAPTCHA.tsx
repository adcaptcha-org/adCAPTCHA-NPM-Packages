import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

declare global {
  interface Window {
    adcap: {
      setupTriggers: (config: { onComplete: () => void }) => void;
      init: (config: { apiURL: string }) => void;
      successToken: string;
    };
  }
}

export interface AdCAPTCHAHandles {
  getCaptchaSuccessToken: typeof CaptchaSuccessToken;
}

interface AdCAPTCHAProps {
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
      }
      resolve();
    };
    script.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

export const CaptchaSuccessToken = () => window.adcap?.successToken;

export const AdCAPTCHA = forwardRef<AdCAPTCHAHandles, AdCAPTCHAProps>((props, ref) => {
  const { placementID } = props;

  useImperativeHandle(ref, () => ({
    getCaptchaSuccessToken: CaptchaSuccessToken,
  }));

  useEffect(() => {
    loadScript().then(() => {
      console.log('Script loaded');
    }).catch((error) => {
      console.error('Error loading script', error);
    });
  }, []);

  return (
    <div data-adcaptcha={placementID} />
  );
});

AdCAPTCHA.displayName = 'adCAPTCHA';