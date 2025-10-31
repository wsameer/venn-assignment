import { describe, it, expect } from 'vitest';
import { formatPhoneNumber, formatPhoneNumberDisplay } from './phone-formatter';

describe('formatPhoneNumber', () => {
  describe('basic formatting', () => {
    it('should add +1 prefix to a 10-digit number starting with 1', () => {
      expect(formatPhoneNumber('1234567890')).toBe('+1234567890');
    });

    it('should add +1 prefix to a 10-digit number not starting with 1', () => {
      expect(formatPhoneNumber('2345678901')).toBe('+12345678901');
    });

    it('should return empty string for empty input', () => {
      expect(formatPhoneNumber('')).toBe('');
    });

    it('should handle single digit', () => {
      expect(formatPhoneNumber('5')).toBe('+15');
    });

    it('should handle partial numbers', () => {
      expect(formatPhoneNumber('123')).toBe('+123');
      expect(formatPhoneNumber('12345')).toBe('+12345');
    });
  });

  describe('removing non-digit characters', () => {
    it('should remove not allowed special characters', () => {
      expect(formatPhoneNumber('+1 (123) 456-7890')).toBe('+11234567890');
    });
  });

  describe('handling country code prefix', () => {
    it('should remove leading 1 and add +1 prefix', () => {
      expect(formatPhoneNumber('11234567890')).toBe('+11234567890');
    });

    it('should handle +1 prefix in input', () => {
      expect(formatPhoneNumber('+11234567890')).toBe('+11234567890');
    });
  });

  describe('length limiting', () => {
    it('should limit to 10 digits after country code', () => {
      expect(formatPhoneNumber('12345678901234')).toBe('+12345678901');
    });

    it('should handle exactly 11 digits (1 + 10 digits)', () => {
      expect(formatPhoneNumber('11234567890')).toBe('+11234567890');
    });

    it('should truncate excess digits', () => {
      expect(formatPhoneNumber('123456789012345')).toBe('+12345678901');
    });
  });

  describe('edge cases', () => {
    it('should handle only non-digit characters', () => {
      expect(formatPhoneNumber('---')).toBe('');
      expect(formatPhoneNumber('()- ')).toBe('');
    });

    it('should handle just the digit 1', () => {
      expect(formatPhoneNumber('1')).toBe('');
    });
  });
});

describe('formatPhoneNumberDisplay', () => {
  describe('basic display formatting', () => {
    it('should format complete 10-digit number with separators', () => {
      expect(formatPhoneNumberDisplay('+11234567890')).toBe(
        '+1 (123) 456-7890',
      );
    });

    it('should return empty string for empty input', () => {
      expect(formatPhoneNumberDisplay('')).toBe('');
    });
  });

  describe('removing non-digit characters', () => {
    it('should handle input with spaces', () => {
      expect(formatPhoneNumberDisplay('123 456 7890')).toBe('+1 (234) 567-890');
    });

    it('should handle input with dashes', () => {
      expect(formatPhoneNumberDisplay('123-456-7890')).toBe('+1 (234) 567-890');
    });

    it('should handle mixed separators', () => {
      expect(formatPhoneNumberDisplay('(123) 456-7890')).toBe(
        '+1 (234) 567-890',
      );
    });
  });
});
