import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { AiBadge } from "./AiBadge";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
      className={shown ? "animate-fade-up" : "opacity-0"}
    >
      {children}
    </div>
  );
}

export function ProductRail({
  title,
  products,
  ai = false,
  aside,
}: {
  title: string;
  products: Product[];
  ai?: boolean;
  aside?: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 520, behavior: "smooth" });
  };

  return (
    <section className="py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
          {ai && <AiBadge />}
          {aside}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollBy(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollBy(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[150px] shrink-0 snap-start sm:w-[180px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
