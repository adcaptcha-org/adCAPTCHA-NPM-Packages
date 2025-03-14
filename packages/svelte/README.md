# adCAPTCHA Svelte

This package provides a Svelte component for adCAPTCHA. The AdCAPTCHA component is used to show a CAPTCHA on your website, by adding the necessary script and html. After a successful completion of a captcha a success token is exposed which should be validated (using [@adcaptcha/node](/packages/node/README.md)) to make sure it is real and that it hasn’t already been used before.


## Installation

```bash
npm install @adcaptcha/svelte
```

## Usage

#### Placement ID
A Placement ID is used to specify what media will be shown in a CAPTCHA. To create a Placement ID, visit [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

[Documentation](https://docs.adcaptcha.com/wordpress/setup) to learn how to create a Placement ID.

#### onComplete
This is a callback that will execute after successfully completing a CAPTCHA. In this example we are using it to get the success token, but can also be used perform different actions e.g. to remove the disabled attribute from submission buttons and change styling rules.

#### setKeywords
If you would like to target specific media for a captcha using keywords, you can do this 
by calling "window.adcap.setKeywords()" with an array of strings. The adCAPTCHA widget 
will then prioritise media that match the keywords you have provided.

Make sure to also add the keywords to the specified media in the [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

```jsx
<script lang="ts">
    import { adCAPTCHA as AdCAPTCHA , getSuccessToken } from "@adcaptcha/svelte";

    let token: string | null = null;
    const PLACEMENT_ID = import.meta.env.VITE_SVELTE_APP_PLACEMENT_ID || "";

    const handleComplete = () => {
      token = getSuccessToken();
    };
</script>
  <div>
    <AdCAPTCHA placementID={PLACEMENT_ID} onComplete={handleComplete} />
  </div>
```
