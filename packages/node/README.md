# adCAPTCHA Node

This package provides a Node component for adCAPTCHA. The verify component is used to verify a success token which is exposed after a successful completion of a captcha.

## Installation

```bash
npm install @adcaptcha/node
```

## Usage

#### API Key
The API Key is your secret key that you will need for the verification step to work. To obtain your API Key, you will need to generate one from the [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

[Documentation](https://docs.adcaptcha.com/wordpress) to learn how to create an API Key.

#### Token
The token is exposed when the captcha has successfully been solved. [Example](/packages/react/README.md) how to get the success token. 


```jsx
import { verify } from '@adcaptcha/node';

const apiKey = "secret_key"; // Do not store in your code, should be kept secret (e.g. environment variables).
const token = "captcha_success_token";

try {
  const response = await verify(apiKey, token)
} catch (error) {
  console.log(error)
  return;
}
```

## Response from verify

  | Status Code | Message       |
  |-------------|---------------|
  | 200         | Token verified|
  | 400         | Token missing|
  | 400         | Invalid token|
  | 400         | Token already verified|
