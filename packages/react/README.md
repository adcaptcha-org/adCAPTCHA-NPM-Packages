# adCAPTCHA React

This package provides a React component for adCAPTCHA. The AdCAPTCHA component is used to show a CAPTCHA on your website, by adding the necessary script and html. After a successful completion of a captcha a success token is exposed which should be validated (using [@adcaptcha/node](/packages/node/README.md)) to make sure it is real and that it hasn’t already been used before.

## Installation

```bash
npm install @adcaptcha/react
```

## Usage

#### Placement ID
A Placement ID is used to specify what media will be shown in a CAPTCHA. To create a Placement ID, visit [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

[Documentation](https://docs.adcaptcha.com/wordpress) to learn how to create a Placement ID.

#### onComplete
This is a callback that will execute after successfully completing a CAPTCHA. In this example we are using it to get the success token, but can also be used perform different actions e.g. to remove the disabled attribute from submission buttons and change styling rules.

```jsx
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/react';

function App() {
  const [token, setToken] = useState(null);

  const handleComplete = () => {
    const successToken = getSuccessToken(); // This returns a success token after successfully completing a CAPTCHA.
    setToken(successToken); // need to save the success token to then verify it.
  };

  // <adCAPTCHA /> shows the captcha on your website.
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
