import { render, screen, waitFor } from '@testing-library/vue';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AdCaptcha from '../../src/components/adCAPTCHA.vue';
import * as util from '../../src/util';

describe('AdCaptcha Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete window.adcap;
  });

  it('renders a div with the correct data-adcaptcha attribute', async () => {
    const loadScriptMock = vi.fn(() => Promise.resolve());
    vi.spyOn(util, 'loadScript').mockImplementation(loadScriptMock);

    const placementID = 'test-placement-id';
    render(AdCaptcha, { props: { placementID } });

    const adCaptchaElement = await screen.findByTestId('adCaptcha');
    expect(adCaptchaElement).toBeDefined();
    expect(adCaptchaElement.getAttribute('data-adcaptcha')).toEqual(placementID);
    expect(util.loadScript).toHaveBeenCalledOnce();
  });

  describe('setKeywords', () => {
    it('test the setKeywords function', async () => {
      const keywords = ['test-keyword-1', 'test-keyword-2'];
      const setKeywords = vi.fn();
      global.window.adcap = { setKeywords };
      util.setKeywords(keywords);
      expect(setKeywords).toHaveBeenCalledWith(keywords);
    });

    it('test when is no window.adcap should not call setKeywords', async () => {
      const keywords = ['test-keyword-1', 'test-keyword-2'];
      const setKeywords = vi.fn();
      util.setKeywords(keywords);
      expect(setKeywords).not.toHaveBeenCalled();
    });
  });

  describe('getSuccessToken', () => {
    it('test the getSuccessToken function', async () => {
      const successToken = 'test-success-token';
      global.window.adcap = { successToken};
      const getSuccessToken = util.getSuccessToken();
      expect(getSuccessToken).toEqual(successToken);
      });

      it('test when is no window.adcap should return null', async () => {
        const token = util.getSuccessToken();
        expect(token).toBeNull();
      });
    });
});