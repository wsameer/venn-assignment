import { useCallback } from 'react';
import type { UseFormSetValue, FieldValues, Path } from 'react-hook-form';
import {
  formatPhoneNumber,
  formatPhoneNumberDisplay,
} from '@/lib/phone-formatter';

export const usePhoneFormatter = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
) => {
  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setValue('phone' as Path<T>, formatted as never, {
        shouldValidate: false,
      });
    },
    [setValue],
  );

  const handlePhoneBlur = useCallback(
    (currentValue: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue('phone' as Path<T>, (currentValue || '') as any, {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  return {
    handlePhoneChange,
    handlePhoneBlur,
    formatPhoneNumberDisplay,
  };
};
