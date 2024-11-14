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
  
  export function loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://widget.adcaptcha.com/index.js";
      script.defer = true;
      script.type = 'module';
      script.async = true;
      script.onload = () => {
        window.adcap.init();
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);  
    });
  }
  
  export const setKeywords = (keywords: string[]) => {
    if (window.adcap) {
      window.adcap.setKeywords(keywords);
    }
  };
  
  export const getSuccessToken = () => window.adcap ? window.adcap.successToken : null;
  