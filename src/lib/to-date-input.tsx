export function toDateInputValue(value: unknown): string {
  if (!value) return "";
  const date = new Date(value as string | Date);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}
