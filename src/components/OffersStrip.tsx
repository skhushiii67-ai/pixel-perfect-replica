import { Copy } from "lucide-react";
import { offers } from "@/data/offers";
import { useToast } from "@/store/toast";

export function OffersStrip() {
  const toast = useToast();

  return (
    <section className="py-4">
      <h2 className="mb-3 text-lg font-extrabold sm:text-xl">Offers for you</h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {offers.map((o) => (
          <li
            key={o.id}
            className="flex items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary-tint p-4"
          >
            <span className="text-3xl" aria-hidden="true">
              {o.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{o.title}</p>
              <p className="text-xs text-muted-foreground">{o.detail}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(o.code);
                toast(`Code ${o.code} copied`);
              }}
              className="flex shrink-0 items-center gap-1 rounded-full bg-card px-3 py-1.5 text-xs font-bold shadow-soft transition-transform active:scale-95"
            >
              {o.code}
              <Copy className="h-3 w-3" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
