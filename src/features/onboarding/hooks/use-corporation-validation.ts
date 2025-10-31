import { useCallback, useState } from 'react';

export const useCorporationValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateCorporationNumber = useCallback(
    async (corpNumber: string): Promise<boolean> => {
      if (!corpNumber || corpNumber.length !== 9) {
        return true;
      }

      setIsValidating(true);
      setValidationError(null);

      try {
        const result = await OnboardingService.
      } catch (error) {
        const apiError = error as ApiError;
      }
    },
    [],
  );
};
