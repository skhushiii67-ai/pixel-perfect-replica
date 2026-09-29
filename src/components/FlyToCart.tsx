import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

/**
 * Renders a product emoji flying along a curve from the product card
 * into the header cart icon whenever an item is added.
 */
export function FlyToCart() {
  const { flyRequest, clearFly, cartIconRef } = useCart();
  const [phase, setPhase] = useState<"start" | "end">("start");

  useEffect(() => {
    if (!flyRequest) return;
    setPhase("start");
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("end")));
    const t = setTimeout(clearFly, 750);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [flyRequest, clearFly]);

  if (!flyRequest) return null;

  const target = cartIconRef.current?.getBoundingClientRect();
  if (!target) return null;

  const from = flyRequest.from;
  const startX = from.left + from.width / 2;
  const startY = from.top + from.height / 2;
  const endX = target.left + target.width / 2;
  const endY = target.top + target.height / 2;

  const style =
    phase === "start"
      ? { left: startX, top: startY, transform: "translate(-50%,-50%) scale(1)", opacity: 1 }
      : {
          left: endX,
          top: endY,
          transform: "translate(-50%,-50%) scale(0.25)",
          opacity: 0.6,
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[90] grid h-12 w-12 place-items-center rounded-full bg-card text-2xl shadow-lift"
      style={{
        ...style,
        transition:
          "left 0.65s cubic-bezier(0.55,-0.4,0.35,1), top 0.65s cubic-bezier(0.6,0.05,0.3,1), transform 0.65s ease-in, opacity 0.65s ease-in",
      }}
    >
      {flyRequest.emoji}
    </div>
  );
}
