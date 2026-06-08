export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const TAX_RATE = 0.075;

export function calculateTax(amount: number): number {
  return amount * TAX_RATE;
}
