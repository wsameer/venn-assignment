import { useState, useCallback } from 'react';
import { OnboardingService } from '@/lib/api/onboarding-service';
import type { ApiError } from '@/lib/api/types';

// List of valid corporation numbers (do not hardcode it, only for testing
// purpose):
// [
// "826417395",
// "158739264",
// "123456789",
// "591863427",
// "312574689",
// "265398741",
// "762354918",
// "468721395",
// "624719583",
// ]

export const useCorporationValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [lastValidatedValue, setLastValidatedValue] = useState<string | null>(
    null,
  );
  const [isValidated, setIsValidated] = useState(false);

  /**
   * Validates corporation number with the API
   * @param corporationNumber - The corporation number to validate
   * @returns true if valid, false otherwise
   */
  const validateCorporationNumber = useCallback(
    async (corporationNumber: string): Promise<boolean> => {
      if (!corporationNumber || corporationNumber.length !== 9) {
        return true;
      }

      // skip API call if value is already validated
      if (
        lastValidatedValue === corporationNumber &&
        isValidated &&
        !validationError
      ) {
        return true;
      }

      setIsValidating(true);
      setValidationError(null);

      try {
        const result =
          await OnboardingService.validateCorporationNumber(corporationNumber);

        if (!result.valid) {
          setValidationError(result.message);
          setLastValidatedValue(corporationNumber);
          setIsValidated(true);
          return false;
        }

        setValidationError(null);
        setLastValidatedValue(corporationNumber);
        setIsValidated(true);
        return true;
      } catch (error) {
        const apiError = error as ApiError;
        setValidationError(
          apiError.message || 'Failed to validate corporation number',
        );
        setLastValidatedValue(corporationNumber);
        setIsValidated(true);
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    [lastValidatedValue, isValidated, validationError],
  );

  const clearValidationError = useCallback(() => {
    setValidationError(null);
    setLastValidatedValue(null);
    setIsValidated(false);
  }, []);

  return {
    validateCorporationNumber,
    isValidating,
    validationError,
    clearValidationError,
    isValidated,
    lastValidatedValue,
  };
};
