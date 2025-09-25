import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AdCAPTCHA from '../src/adCAPTCHA';
import { loadScript } from '../src/util';

jest.mock('../src/util', () => ({
  loadScript: jest.fn(() => Promise.resolve()),
}));

describe('AdCAPTCHA', () => {
  const mockedLoadScript = loadScript as jest.MockedFunction<typeof loadScript>;

  beforeEach(() => {
    mockedLoadScript.mockClear();
    (window as unknown as { adcap?: typeof window.adcap }).adcap = {
      setupTriggers: jest.fn(),
      setKeywords: jest.fn(),
      init: jest.fn(),
      successToken: '',
    } as typeof window.adcap;
  });

  afterEach(() => {
    delete (window as unknown as { adcap?: typeof window.adcap }).adcap;
  });

  it('renders AdCAPTCHA with the provided placement ID', () => {
    const placementID = 'test-placement-id';

    const { container } = render(<AdCAPTCHA placementID={placementID} />);

    const adCaptchaElement = container.querySelector(`[data-adcaptcha="${placementID}"]`);
    expect(adCaptchaElement).not.toBeNull();
  });

  it('initialises the widget with the provided config', async () => {
    const placementID = 'test-placement-id';
    const config = { theme: 'dark' };

    render(<AdCAPTCHA placementID={placementID} config={config} />);

    await waitFor(() => {
      expect(mockedLoadScript).toHaveBeenCalledWith(config);
    });
  });
});
