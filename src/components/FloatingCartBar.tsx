import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";

export function FloatingCartBar() {
  const { itemCount, total, openCart, isOpen } = useCart();
  if (itemCount === 0 || isOpen) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-40 animate-slide-up-in md:hidden">
      <button
        type="button"
        onClick={openCart}
        className="flex w-full items-center justify-between rounded-2xl bg-primary px-4 py-3 text-sm font-extrabold text-primary-foreground shadow-lift"
      >
        <span className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          {itemCount} {itemCount === 1 ? "item" : "items"} · {formatINR(total)}
        </span>
        <span>View Cart →</span>
      </button>
    </div>
  );
}
