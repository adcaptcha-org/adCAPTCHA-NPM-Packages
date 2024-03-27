import React, { useEffect, useRef } from 'react';
import { loadScript } from './util';

interface AdCAPTCHAProps {
  placementID: string;
  onComplete?: () => void;
}

const AdCAPTCHA = (props: AdCAPTCHAProps) => {
  const onCompleteRef = useRef<(() => void) | undefined>();
  onCompleteRef.current = props.onComplete;

  useEffect(() => {
    async function setupTriggers() {
      loadScript().then(() => {
        if (!onCompleteRef.current) return;

        window.adcap.setupTriggers({
            onComplete: onCompleteRef.current,
        });
      });
    }

    setupTriggers();
  }, []);

  return (
    <div data-adcaptcha={props.placementID} />
  );
}

export const setKeywords = (keywords: string[]) => {
  window.adcap.setKeywords(keywords);
}

export const getSuccessToken = () => window.adcap.successToken;

export default AdCAPTCHA;
