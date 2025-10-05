export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatTime(time: string): string {
  // Input: "09:30:00" or "09:30"
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, mins);
  date.setMinutes(date.getMinutes() + minutes);

  const newHours = String(date.getHours()).padStart(2, '0');
  const newMins = String(date.getMinutes()).padStart(2, '0');
  return `${newHours}:${newMins}:00`;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;
}

export function isDateAvailable(date: Date): boolean {
  const day = date.getDay();
  // Assuming Monday-Friday (1-5) are working days
  return day >= 1 && day <= 5;
}

export function getBusinessHours(): { start: string; end: string } {
  return {
    start: '08:30:00',
    end: '15:00:00', // 3 PM
  };
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  interval: number = 30
): string[] {
  const slots: string[] = [];
  let current = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  while (current < end) {
    slots.push(minutesToTime(current));
    current += interval;
  }

  return slots;
}

export function getHoursUntil(targetDate: Date, targetTime: string): number {
  const [hours, minutes] = targetTime.split(':').map(Number);
  const target = new Date(targetDate);
  target.setHours(hours, minutes, 0, 0);

  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.floor(diff / (1000 * 60 * 60));
}
