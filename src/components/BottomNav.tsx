import { Home, LayoutGrid, Sparkles, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/store/cart";

export function BottomNav() {
  const { itemCount, openCart } = useCart();

  const item = "flex h-full flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 glass border-t border-border md:hidden"
    >
      <a href="/" className={`${item} text-primary`}>
        <Home className="h-5 w-5" aria-hidden="true" />
        Home
      </a>
      <a href="#categories" className={`${item} text-muted-foreground`}>
        <LayoutGrid className="h-5 w-5" aria-hidden="true" />
        Categories
      </a>
      <a href="#ai" className={`${item} text-muted-foreground`}>
        <span className="grid h-8 w-8 place-items-center rounded-full ai-gradient-bg">
          <Sparkles className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
        </span>
        AI
      </a>
      <button type="button" onClick={openCart} className={`${item} relative text-muted-foreground`}>
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        Cart
        {itemCount > 0 && (
          <span className="absolute right-4 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
            {itemCount}
          </span>
        )}
      </button>
      <button type="button" className={`${item} text-muted-foreground`}>
        <User className="h-5 w-5" aria-hidden="true" />
        Profile
      </button>
    </nav>
  );
}
