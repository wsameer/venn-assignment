import { useState, useCallback } from 'react';
import { OnboardingService } from '@/lib/api/onboarding-service';
import type { ApiError } from '@/lib/api/types';

export const useCorporationValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

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

      setIsValidating(true);
      setValidationError(null);

      try {
        const result =
          await OnboardingService.validateCorporationNumber(corporationNumber);

        if (!result.valid) {
          setValidationError('Invalid corporation number');
          return false;
        }

        setValidationError(null);
        return true;
      } catch (error) {
        const apiError = error as ApiError;
        setValidationError(
          apiError.message || 'Failed to validate corporation number',
        );
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    [],
  );

  const clearValidationError = useCallback(() => {
    setValidationError(null);
  }, []);

  return {
    validateCorporationNumber,
    isValidating,
    validationError,
    clearValidationError,
  };
};
