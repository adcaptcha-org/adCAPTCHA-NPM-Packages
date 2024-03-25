import { useState } from 'react';
import { AdCAPTCHA, getSuccessToken } from '@adcaptcha/react';
import axios from 'axios';
import Navbar from './components/navbar';
import ResponseMessage from './components/responseMessage';

function App() {
  const [token, setToken] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleComplete = () => {
    const successToken = getSuccessToken();
    setToken(successToken);
  };

  async function handleVerifyToken() {
    try {
      const response = await axios.post('http://localhost:3001/verifyToken', {
        token: token,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="text-center">
        <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
          {responseMessage ? (
            <ResponseMessage 
              responseMessage={responseMessage}
            />
          ) : null}
          <div className="flex mt-10">
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
