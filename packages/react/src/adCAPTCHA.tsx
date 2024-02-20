// import React, { useEffect } from 'react';

// interface CaptchaProps {
//   onComplete: () => void;
// }

// export const adCAPTCHA: React.FC<CaptchaProps> = ({ onComplete }) => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://widget.adcaptcha.com/index.js";
//     script.defer = true;
//     document.body.appendChild(script);

//     window.adcap.setupTriggers({
//       onComplete: () => {
//         onComplete();
//       }
//     });
//   }, [onComplete]);

//   return (
//     <div data-adcaptcha="PLACEMENT_ID" />
//   );
// };

export const adCAPTCHA = () => {
  return null;
}
