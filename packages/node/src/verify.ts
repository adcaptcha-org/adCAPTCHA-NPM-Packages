import axios from 'axios';

export async function Verify(apiKey: string, token: string) {
  try {
    const response = await axios.post('https://api.adcaptcha.com/verify', { token }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
    return error;
  }
}
