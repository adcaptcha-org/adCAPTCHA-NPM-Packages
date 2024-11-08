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
    script.onload = function () {
      window.adcap.init();
      resolve();
    };
    script.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
