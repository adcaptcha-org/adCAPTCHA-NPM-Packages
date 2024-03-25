import React from 'react';
import { loadScript } from './util';

interface AdCAPTCHAProps {
  placementID: string;
  onComplete?: () => void;
}

const AdCAPTCHA = (props: AdCAPTCHAProps) => {
  loadScript().then(() => {
    if (!props.onComplete) return;

    window.adcap.setupTriggers({
      onComplete: props.onComplete,
    });
  });

  return (
    <div data-adcaptcha={props.placementID} />
  );
}

export const setKeywords = (keywords: string[]) => {
  window.adcap.setKeywords(keywords);
}

export const getSuccessToken = () => window.adcap.successToken;

export default AdCAPTCHA;
