import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  onboardingSchema,
  type OnboardingFormData,
} from '@/lib/schemas/onboarding-schema';
import { OnboardingService } from '@/lib/api/onboarding-service';
import type { ApiError, ProfileDetailsResponse } from '@/lib/api/types';

export const useOnboardingForm = (
  validateCorporationNumber?: (value: string) => Promise<boolean>,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onBlur',
  });

  /**
   * Handles form submission
   * @param data the subbmitted data from the form
   */
  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);

    try {
      if (validateCorporationNumber && data.corporationNumber?.length === 9) {
        const isValid = await validateCorporationNumber(data.corporationNumber);
        if (!isValid) {
          setIsSubmitting(false);
          return;
        }
      }

      const result = await OnboardingService.submitProfileDetails(data);

      if (result === 'OK') {
        toast.success('Form submitted successfully!', {
          description: 'Your onboarding information has been received.',
        });

        form.reset();
      } else {
        toast.error('Submission failed', {
          description:
            (result as ProfileDetailsResponse).message || 'Please try again.',
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast.error('Submission failed', {
        description: apiError.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
