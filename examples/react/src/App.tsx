import React, { useState } from 'react';
import './App.css';
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/react';
import Navbar from './components/navbar';

function App() {
  const [token, setToken] = useState('');

  const handleComplete = () => {
    const successToken = getSuccessToken();
    setToken(successToken);
  };

  return (
    <div>
      <Navbar />
      <div className="App">
        <header className="App-header">
        <AdCAPTCHA
          placementID={'PLC-01HSJWPRM0HMWRNJGWP604DR8Z'}
          onComplete={handleComplete}
        />
        </header>
      </div>
    </div>
  );
}

export default App;
