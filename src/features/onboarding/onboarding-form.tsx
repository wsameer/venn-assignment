import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypoError } from '@/components/errors/typo-error';
import { useOnboardingForm } from './hooks/use-onboarding-form';
import { usePhoneFormatter } from './hooks/use-phone-formatter';
import { useCorporationValidation } from './hooks/use-corporation-validation';

export function OnboardingForm() {
  const {
    validateCorporationNumber,
    isValidating,
    validationError,
    clearValidationError,
  } = useCorporationValidation();
  const { form, isSubmitting, onSubmit } = useOnboardingForm(
    validateCorporationNumber,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const phone = watch('phone');
  const { handlePhoneChange, handlePhoneBlur, formatPhoneNumberDisplay } =
    usePhoneFormatter(setValue);

  const handleCorporationBlur = async (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();
    if (value && value.length === 9) {
      await validateCorporationNumber(value);
    }
  };

  const corporationError =
    errors.corporationNumber?.message || validationError || undefined;

  const corporationRegister = register('corporationNumber');

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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <TypoError message={errors.lastName?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          onChange={handlePhoneChange}
          onBlur={() => handlePhoneBlur(phone)}
          value={phone ? formatPhoneNumberDisplay(phone) : ''}
          placeholder="+1 (___) ___-____"
          className="w-full"
          aria-invalid={!!errors.phone}
          disabled={isSubmitting}
        />
        <TypoError message={errors.phone?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="corporationNumber" className="text-sm font-medium">
          Corporation Number
        </Label>
        <div className="relative">
          <Input
            {...corporationRegister}
            id="corporationNumber"
            maxLength={9}
            className="w-full"
            aria-invalid={!!corporationError}
            onBlur={(e) => {
              corporationRegister.onBlur(e);
              handleCorporationBlur(e);
            }}
            onChange={(e) => {
              clearValidationError();
              corporationRegister.onChange(e);
            }}
            disabled={isSubmitting}
          />
          {isValidating && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <TypoError message={corporationError} />
      </div>

      <Button
        type="submit"
        className="w-full h-12"
        size="sm"
        disabled={isSubmitting || isValidating}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit
            <ArrowRight />
          </>
        )}
      </Button>
    </form>
  );
}
