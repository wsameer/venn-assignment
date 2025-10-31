import { z } from 'zod';

// Regex basially checks for format - +1XXXXXXXXXX (10 digits after +1)
const canadianPhoneRegex = /^\+1\d{10}$/;

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name cannot be more than 50 characters'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name cannot be more than 50 characters'),

  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(canadianPhoneRegex, "You ain't 🇨🇦 bro!"),

  corporationNumber: z
    .string()
    .min(1, 'Corporation number is required')
    .length(9, 'Corporation number must be exactly 9 characters'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
