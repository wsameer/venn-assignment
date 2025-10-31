'use client';

import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  onboardingSchema,
  type OnboardingFormData,
} from '@/lib/schemas/onboarding-schema';
import { TypoError } from '@/components/errors/typo-error';
import {
  formatPhoneNumber,
  formatPhoneNumberDisplay,
} from '@/lib/phone-formatter';

export function OnboardingForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  });
  console.log('🚀 ~ OnboardingForm ~ errors:', errors);

  const phoneNumber = watch('phoneNumber');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phoneNumber', formatted, { shouldValidate: false });
  };

  const handlePhoneBlur = () => {
    setValue('phoneNumber', phoneNumber || '', { shouldValidate: true });
  };

  const onSubmit = (data: OnboardingFormData) => {
    console.log('Form submitted:', data);
    toast.success('Form submitted successfully!', {
      description: 'Your onboarding information has been received.',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </Label>
          <Input
            {...register('firstName')}
            id="firstName"
            className="w-full"
            aria-invalid={!!errors.firstName}
          />
          <TypoError message={errors.firstName?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </Label>
          <Input
            {...register('lastName')}
            id="lastName"
            className="w-full"
            aria-invalid={!!errors.lastName}
          />
          <TypoError message={errors.lastName?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          value={phoneNumber ? formatPhoneNumberDisplay(phoneNumber) : ''}
          placeholder="+1 (___) ___-____"
          className="w-full"
          aria-invalid={!!errors.phoneNumber}
        />
        <TypoError message={errors.phoneNumber?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="corporationNumber" className="text-sm font-medium">
          Corporation Number
        </Label>
        <Input
          {...register('corporationNumber')}
          id="corporationNumber"
          maxLength={9}
          className="w-full"
          aria-invalid={!!errors.corporationNumber}
        />
        <TypoError message={errors.corporationNumber?.message} />
      </div>
      <Button type="submit" className="w-full h-12" size="sm">
        Submit
        <ArrowRight />
      </Button>
    </form>
  );
}
