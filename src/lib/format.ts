/** Currency + misc formatting helpers (INR / India). */

export function formatINR(paise: number): string {
  return "₹" + paise.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function discountPercent(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms = 250) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
