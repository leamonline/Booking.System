import type { SizeCategory, Service } from '@/types/database';

export function getServicePrice(service: Service, size: SizeCategory): number {
  const priceMap: Record<SizeCategory, keyof Service> = {
    extra_small: 'price_extra_small',
    small: 'price_small',
    medium: 'price_medium',
    large: 'price_large',
    extra_large: 'price_extra_large',
    giant: 'price_giant',
  };

  const priceKey = priceMap[size];
  return (service[priceKey] as number) || 0;
}

export function calculateDuration(
  service: Service,
  size: SizeCategory,
  coatType?: string
): number {
  // Base duration from service
  let duration = service.base_duration_minutes;

  // Size multipliers
  const sizeMultipliers: Record<SizeCategory, number> = {
    extra_small: 0.8,
    small: 1.0,
    medium: 1.3,
    large: 1.6,
    extra_large: 2.0,
    giant: 2.5,
  };

  duration *= sizeMultipliers[size];

  // Coat type adjustments
  if (coatType === 'curly' || coatType === 'double') {
    duration *= 1.25; // 25% more time for curly/doodle coats
  }

  return Math.round(duration);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(cents / 100);
}

export function calculateMattingFee(minutes: number): number {
  return minutes * 2 * 100; // £2/minute in pence
}

export function calculateCancellationFee(
  totalCents: number,
  hoursUntilAppointment: number
): number {
  if (hoursUntilAppointment >= 48) {
    return 0; // Free cancellation
  } else if (hoursUntilAppointment >= 24) {
    return Math.floor(totalCents * 0.5); // 50% fee
  } else {
    return totalCents; // 100% fee
  }
}

export function calculateDeposit(totalCents: number, percentage: number = 0.5): number {
  return Math.floor(totalCents * percentage);
}
