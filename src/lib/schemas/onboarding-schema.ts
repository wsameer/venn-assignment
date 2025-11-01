import { z } from 'zod';

const CANADIAN_PHONE_REGEX = /^\+1\d{10}$/;

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less')
    .regex(
      NAME_REGEX,
      'First name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .refine((val) => val.length >= 2, {
      message: 'First name must be at least 2 characters',
    }),

  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less')
    .regex(
      NAME_REGEX,
      'Last name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .refine((val) => val.length >= 2, {
      message: 'Last name must be at least 2 characters',
    }),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(CANADIAN_PHONE_REGEX, 'Please enter a valid Canadian phone number'),

  corporationNumber: z
    .string()
    .trim()
    .min(1, 'Corporation number is required')
    .length(9, 'Corporation number must be exactly 9 characters'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
