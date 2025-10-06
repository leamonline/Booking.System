/**
 * Format UK phone number
 * Accepts various formats and returns formatted version
 */
export function formatUKPhone(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Handle 11-digit UK mobile (07xxx xxxxxx)
  if (digits.startsWith('07') && digits.length === 11) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  // Handle 10-digit UK landline
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  // Handle 11-digit UK landline (0xxxx xxxxxx)
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  return value;
}

/**
 * Validate UK phone number
 */
export function isValidUKPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');

  // UK mobiles: 07xxx xxxxxx (11 digits)
  if (digits.startsWith('07') && digits.length === 11) {
    return true;
  }

  // UK landlines: Various formats, typically 10-11 digits starting with 0
  if (digits.startsWith('0') && (digits.length === 10 || digits.length === 11)) {
    return true;
  }

  return false;
}
