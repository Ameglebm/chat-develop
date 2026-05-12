export function normalizeText(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}

export function capitalize(
  value: string,
): string {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

