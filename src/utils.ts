/**
 * Formats a raw input string into a standard Russian phone number mask:
 * +7 (999) 999-99-99
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  
  if (!digits.length) {
    return '';
  }

  // If the user entered just "7" or "8", represent it as "+7"
  if (digits === '7' || digits === '8') {
    return '+7';
  }

  let phoneDigits = digits;
  if (digits.startsWith('7') || digits.startsWith('8')) {
    phoneDigits = digits.substring(1);
  }

  // Limit digits up to 10 characters (excluding country code)
  phoneDigits = phoneDigits.substring(0, 10);

  let formatted = '+7';

  if (phoneDigits.length > 0) {
    formatted += ' (' + phoneDigits.substring(0, 3);
  }
  if (phoneDigits.length > 3) {
    formatted += ') ' + phoneDigits.substring(3, 6);
  }
  if (phoneDigits.length > 6) {
    formatted += '-' + phoneDigits.substring(6, 8);
  }
  if (phoneDigits.length > 8) {
    formatted += '-' + phoneDigits.substring(8, 10);
  }

  return formatted;
}

/**
 * Validates if the phone number is fully filled (matches the complete mask length)
 */
export function isValidPhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  // A complete RU phone has exactly 11 digits (7 + 10 digits)
  return digits.length === 11;
}
