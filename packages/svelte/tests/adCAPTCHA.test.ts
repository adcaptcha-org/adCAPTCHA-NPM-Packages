import { render, screen, waitFor } from '@testing-library/svelte';
import {vi, describe, it, expect, beforeEach} from 'vitest';
import * as util from '../src/lib/util.ts';
import AdCaptcha from '../src/lib/AdCaptcha.svelte';

describe('adCaptcha testing components', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete window.adcap;
    });

    // it('renders a div with the correct data-adcaptcha attribute', async () => {
    //     const loadScriptMock = vi.fn(() => Promise.resolve());
    //     vi.spyOn(util, 'loadScript').mockImplementation(loadScriptMock);
    
    //     const placementID = 'test-placement-id';
    //     render(AdCaptcha, { placementID });
    
    //     const adCaptchaElement = await screen.findByTestId('adCaptcha');
    //     expect(adCaptchaElement).toBeDefined();
    //     expect(adCaptchaElement.getAttribute('data-adcaptcha')).toEqual(placementID);
    //     expect(util.loadScript).toHaveBeenCalledOnce();
    // });
    
    // it('calls the handleComplete function on CAPTCHA completion', async () => {
    //     const handleCompleteMock = vi.fn();
    //     render(AdCaptcha, { placementID: 'test-placement-id', onComplete: handleCompleteMock });

    //     global.window.adcap = { getSuccessToken: vi.fn(() => 'mockToken') };
    //     await waitFor(() => handleCompleteMock()); 
    //     expect(handleCompleteMock).toHaveBeenCalledOnce();
    // });

    describe('setKeywords', () => {
        it('test the setKeywords function', async () => {
            const keywords = ['test1', 'test2'];
            const setKeywords = vi.fn();
            global.window.adcap = { setKeywords };
            util.setKeywords(keywords);
            expect(setKeywords).toHaveBeenCalledWith(keywords);
            // check if util.setKeywords is a function
            expect(typeof util.setKeywords).toBe('function');
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