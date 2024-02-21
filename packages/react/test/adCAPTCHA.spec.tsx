import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { AdCAPTCHA } from '../src/adCAPTCHA';

jest.mock('../src/adCAPTCHA', () => ({
  ...jest.requireActual('../src/adCAPTCHA'),
  loadScript: jest.fn().mockResolvedValue({}),
}));

describe('AdCAPTCHA', () => {
  it('renders AdCAPTCHA with the provided placement ID', async () => {
    const placementID = 'test-placement-id';
    render(<AdCAPTCHA placementID={placementID} />);

    await waitFor(() => {
      const adCaptchaElement = screen.getByTestId('adCaptcha');
      expect(adCaptchaElement).toBeDefined();
      expect(adCaptchaElement.getAttribute('data-adcaptcha')).toEqual(placementID);
    });
  });
});