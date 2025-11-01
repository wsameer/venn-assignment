import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCorporationValidation } from '../use-corporation-validation';
import { OnboardingService } from '@/lib/api';

vi.mock('@/lib/api');

describe('useCorporationValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useCorporationValidation());

    expect(result.current.isValidating).toBe(false);
    expect(result.current.validationError).toBeNull();
    expect(result.current.isValidated).toBe(false);
    expect(result.current.lastValidatedValue).toBeNull();
  });

  it('returns true for empty corporation number', async () => {
    const { result } = renderHook(() => useCorporationValidation());

    let isValid = false;
    await act(async () => {
      isValid = await result.current.validateCorporationNumber('');
    });

    expect(isValid).toBe(true);
  });

  it('returns true for corporation number with wrong length', async () => {
    const { result } = renderHook(() => useCorporationValidation());

    let isValid = false;
    await act(async () => {
      isValid = await result.current.validateCorporationNumber('12345');
    });

    expect(isValid).toBe(true);
  });

  it('validates valid corporation number', async () => {
    vi.mocked(OnboardingService.validateCorporationNumber).mockResolvedValue({
      valid: true,
      corporationNumber: '826417395',
    });

    const { result } = renderHook(() => useCorporationValidation());

    let isValid = false;
    await act(async () => {
      isValid = await result.current.validateCorporationNumber('826417395');
    });

    expect(isValid).toBe(true);
    expect(result.current.isValidated).toBe(true);
    expect(result.current.validationError).toBeNull();
    expect(result.current.lastValidatedValue).toBe('826417395');
  });

  it('returns false for invalid corporation number', async () => {
    vi.mocked(OnboardingService.validateCorporationNumber).mockResolvedValue({
      valid: false,
      message: 'Invalid corporation number',
    });

    const { result } = renderHook(() => useCorporationValidation());

    let isValid = false;
    await act(async () => {
      isValid = await result.current.validateCorporationNumber('999999999');
    });

    expect(isValid).toBe(false);
    expect(result.current.validationError).toBe('Invalid corporation number');
    expect(result.current.isValidated).toBe(true);
  });

  it('skips API call for cached valid result', async () => {
    vi.mocked(OnboardingService.validateCorporationNumber).mockResolvedValue({
      valid: true,
      corporationNumber: '826417395',
    });

    const { result } = renderHook(() => useCorporationValidation());

    await act(async () => {
      await result.current.validateCorporationNumber('826417395');
    });

    vi.clearAllMocks();

    await act(async () => {
      await result.current.validateCorporationNumber('826417395');
    });

    expect(OnboardingService.validateCorporationNumber).not.toHaveBeenCalled();
  });
});
