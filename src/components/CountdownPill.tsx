import { useEffect, useState } from "react";

/** Counts down to midnight — used by the "Deals of the day" rail. */
export function CountdownPill() {
  const [left, setLeft] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = String(Math.floor(diff / 3.6e6)).padStart(2, "0");
      const m = String(Math.floor((diff % 3.6e6) / 6e4)).padStart(2, "0");
      const s = String(Math.floor((diff % 6e4) / 1000)).padStart(2, "0");
      setLeft(`${h}:${m}:${s}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (!left) return null;

  return (
    <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold tabular-nums text-accent-foreground">
      Ends in {left}
    </span>
  );
}
