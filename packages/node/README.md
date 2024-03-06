# adCAPTCHA React

This package provides a Node component for adCAPTCHA.

## Installation

```bash
npm install @adcaptcha/node
```

## Usage

```jsx
import { verify } from '@adcaptcha/react';

try {
  const response = await verify(apiKey, token)
} catch (error) {
  console.log(error)
  return;
}
```

#### API Key
The API Key is your unique identifier that you will need for the verification step to work. To obtain your API Key, you will need to generate one from the [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

#### Token
The token is return when the captcha has successfully been solved by calling ```getSuccessToken()```.