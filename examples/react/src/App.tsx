import { useState } from 'react';
import './App.css';
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/react';
import axios from 'axios';
import Navbar from './components/navbar';

function App() {
  const [token, setToken] = useState('');

  const handleComplete = () => {
    const successToken = getSuccessToken();
    setToken(successToken);
  };

  async function handleVerifyToken() {
    try {
      const response = await axios.post('http://localhost:3001/verifyToken', {
        token: token,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <div className="flex">
            <AdCAPTCHA
              placementID={'PLC-01HSJWPRM0HMWRNJGWP604DR8Z'}
              onComplete={handleComplete}
            />
            <button
              type="button"
              disabled={!token}
              className="rounded-md ml-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleVerifyToken}
            >
              Verify Captcha
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
