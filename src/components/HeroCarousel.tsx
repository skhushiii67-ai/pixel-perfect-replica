import { useEffect, useState } from "react";
import { banners } from "@/data/offers";

const tones: Record<string, string> = {
  fresh: "fresh-gradient-bg",
  sun: "bg-warning",
  ai: "ai-gradient-bg",
};

const textTone: Record<string, string> = {
  fresh: "text-primary-foreground",
  sun: "text-warning-foreground",
  ai: "text-primary-foreground",
};

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section aria-label="Offers" className="relative">
      <div className="relative h-44 overflow-hidden rounded-2xl sm:h-56">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            aria-hidden={idx !== i}
            className={`absolute inset-0 flex items-center justify-between gap-4 px-6 transition-opacity duration-700 sm:px-10 ${
              tones[b.tone]
            } ${textTone[b.tone]} ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="max-w-md">
              <h2 className="text-xl font-extrabold leading-tight sm:text-3xl">{b.title}</h2>
              <p className="mt-2 text-sm opacity-90 sm:text-base">{b.subtitle}</p>
              <button
                type="button"
                className="mt-4 rounded-full bg-card px-4 py-2 text-sm font-bold text-foreground shadow-soft transition-transform hover:scale-105"
              >
                {b.cta}
              </button>
            </div>
            <span
              aria-hidden="true"
              className="hidden text-7xl transition-transform duration-[6000ms] sm:block"
              style={{ transform: idx === i ? "scale(1.12)" : "scale(1)" }}
            >
              {b.emoji}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {banners.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            aria-label={`Show offer ${idx + 1}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-6 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
