# adCAPTCHA React

This package provides a React component for adCAPTCHA.

## Installation

```bash
npm install @adcaptcha/react
```

## Usage

```jsx
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/react';

function App() {

  const handleComplete = () => {
    console.log('APP: COMPLETE!', getSuccessToken());
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