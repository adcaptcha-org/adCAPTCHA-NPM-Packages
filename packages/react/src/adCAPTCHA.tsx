import React, { useEffect, useRef } from 'react';
import { AdCAPTCHAInitConfig, loadScript } from './util';

interface AdCAPTCHAProps {
  placementID: string;
  onComplete?: () => void;
  config?: AdCAPTCHAInitConfig;
}

const AdCAPTCHA = (props: AdCAPTCHAProps) => {
  const onCompleteRef = useRef<(() => void) | undefined>();
  onCompleteRef.current = props.onComplete;
  const initConfigRef = useRef<AdCAPTCHAInitConfig | undefined>();
  initConfigRef.current = props.config;

  useEffect(() => {
    async function setupTriggers() {
      loadScript(initConfigRef.current).then(() => {
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
