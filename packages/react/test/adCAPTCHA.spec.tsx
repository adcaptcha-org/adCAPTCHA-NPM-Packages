import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { AdCAPTCHA } from '../src/adCAPTCHA';

jest.mock('../src/adCAPTCHA', () => ({
  ...jest.requireActual('../src/adCAPTCHA'),
  loadScript: jest.fn().mockResolvedValue({}),
}));

describe('AdCAPTCHA', () => {
  it('renders AdCAPTCHA with the provided placement ID and loads the script', async () => {
    const placementID = 'test-placement-id';
    render(<AdCAPTCHA placementID={placementID} />);

    await waitFor(() => {
        expect(screen.getByTestId('adCaptcha')).toBeDefined();
    });
  });
});