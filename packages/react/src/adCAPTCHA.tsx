import React, { useEffect, useState } from 'react';

interface MyComponentProps {
  placementID: string;
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://widget.adcaptcha.com/index.js";
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export const AdCAPTCHA: React.FC<MyComponentProps> = ({ placementID }) => {

  useEffect(() => {
    loadScript().then(() => {
      console.log('Script loaded');
    }).catch((error) => {
      console.error('Error loading script', error);
    });
  }, []);

  return (
    <div data-adcaptcha={placementID} data-testid="adCaptcha" />
  );
};

