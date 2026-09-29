import { Minus, Plus } from "lucide-react";

export function QtyStepper({
  qty,
  onInc,
  onDec,
  size = "md",
  label,
}: {
  qty: number;
  onInc: () => void;
  onDec: () => void;
  size?: "sm" | "md";
  label: string;
}) {
  const h = size === "sm" ? "h-9" : "h-11";
  return (
    <div
      className={`flex ${h} w-full items-center justify-between rounded-full bg-primary text-primary-foreground shadow-soft`}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label={`Remove one ${label}`}
        className="grid h-full w-11 place-items-center rounded-full transition-transform active:scale-90"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`Add one more ${label}`}
        className="grid h-full w-11 place-items-center rounded-full transition-transform active:scale-90"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
