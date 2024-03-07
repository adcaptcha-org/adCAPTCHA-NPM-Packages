# adCAPTCHA React

This package provides a React component for adCAPTCHA. The AdCAPTCHA component is used to show a captcha on your website, by adding the necessary script and html. After a successful completion of a captcha a success token is exposed which should be validated (using [@adcaptcha/node](/packages/node/README.md)) to make sure it is real and that it hasn’t already been used before.

## Installation

```bash
npm install @adcaptcha/react
```

## Usage

#### Placement ID
A Placement ID is used to specify what media will be shown in a captcha. To create a Placement ID, visit [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

[Documentation](https://docs.adcaptcha.com/wordpress) to learn how to create a Placement ID.

```jsx
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/react';

function App() {
  const [token, setToken] = useState(null);

  const handleComplete = () => {
    setToken(getSuccessToken());
  };

  return (
    <div className="App">
      <AdCAPTCHA
        placementID={'PLC-01HN2YE5YQACAFM1YEWBDR2419'}
        onComplete={handleComplete}
      />
    </div>
  );
}
```
