/**
 * Formats a phone number input to Canadian format (+1XXXXXXXXXX)
 * Automatically adds +1 prefix and removes any non-digit characters
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');

  const cleanDigits = digits.startsWith('1') ? digits.slice(1) : digits;

  const limitedDigits = cleanDigits.slice(0, 10);

  return limitedDigits ? `+1${limitedDigits}` : '';
}

/**
 * Formats phone number for display with visual separators
 * Example: +1 (123) 456-7890
 */
export function formatPhoneNumberDisplay(value: string): string {
  const digits = value.replace(/\D/g, '');

  const cleanDigits = digits.startsWith('1') ? digits.slice(1) : digits;

  if (cleanDigits.length === 0) return '';
  if (cleanDigits.length <= 3) return `+1 (${cleanDigits}`;
  if (cleanDigits.length <= 6) {
    return `+1 (${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3)}`;
  }

  return `+1 (${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3, 6)}-${cleanDigits.slice(6, 10)}`;
}
