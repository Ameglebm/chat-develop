export function now(): Date {
  return new Date();
}

export function nowTimestamp(): number {
  return Date.now();
}

export function addMinutes(
  minutes: number,
): Date {
  return new Date(
    Date.now() + minutes * 60 * 1000,
  );
}

