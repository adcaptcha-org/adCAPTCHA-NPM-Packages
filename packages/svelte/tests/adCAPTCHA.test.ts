import { render, waitFor } from '@testing-library/svelte';
import {vi, describe, it, expect, beforeEach} from 'vitest';
import * as util from '../src/lib/util.ts';
import AdCaptcha from '../src/lib/AdCaptcha.svelte';

describe('adCaptcha testing components', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete window.adcap;
    });

    it('checks if window is defined in happy-dom', () => {
        expect(typeof window).toBe('object'); 
    });

    describe('AdCaptcha', () => {
        it('renders with the provided placementID, calls loadScript on mount', async () => {
            const loadScriptMock = vi.spyOn(util, 'loadScript').mockResolvedValue({});
            const placementID = 'test-placement-id';
            render(AdCaptcha, { placementID });
            const { container } = render(AdCaptcha, { placementID });
            const adCaptchaElement = container.querySelector(`[data-adcaptcha="${placementID}"]`);
            expect(adCaptchaElement).not.toBeNull();
            if (adCaptchaElement) {
                expect(adCaptchaElement.getAttribute('data-adcaptcha')).toBe(placementID);
            }
            await waitFor(() => {
                expect(loadScriptMock).toHaveBeenCalled();
            });
        });

        it('checks if window.adcap is defined before setupTriggers, calls setupTriggers when onComplete is provided', async () => {
            const onCompleteMock = vi.fn();
            const placementID = 'test-placement-id';
            window.adcap = {
                setupTriggers: vi.fn(),
                setKeywords: vi.fn(),
                init: vi.fn(),
                successToken: 'test-success-token',
            };
            render(AdCaptcha, { placementID, onComplete: onCompleteMock });
            await waitFor(() => {
                expect(window.adcap).toBeDefined();
                if (window.adcap) {
                    expect(window.adcap.setupTriggers).toHaveBeenCalledWith({ onComplete: onCompleteMock });
                }
            });
        });
    });

    describe('setKeywords', () => {
        it('test the setKeywords function', async () => {
            const keywords = ['test1', 'test2'];
            const setKeywords = vi.fn();
            global.window.adcap = { 
                setKeywords,
                setupTriggers: vi.fn(),
                init: vi.fn(),
                successToken: 'test-success-token'
            };
            util.setKeywords(keywords);
            expect(setKeywords).toHaveBeenCalledWith(keywords);
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
            global.window.adcap = { 
                successToken,
                setupTriggers: vi.fn(),
                setKeywords: vi.fn(),
                init: vi.fn()
            };
            const getSuccessToken = util.getSuccessToken();
            expect(getSuccessToken).toEqual(successToken);
            });
        it('test when is no window.adcap should return null', async () => {
            const token = util.getSuccessToken();
            expect(token).toBeNull();
        });
    });
});