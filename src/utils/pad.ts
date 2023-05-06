export const pad = (value: number, length: number, char = "0"): string =>
  value.toString().padStart(length, char);
