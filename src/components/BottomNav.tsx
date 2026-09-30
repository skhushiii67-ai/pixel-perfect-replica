import { Home, LayoutGrid, Sparkles, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";

export function BottomNav() {
  const { itemCount, openCart } = useCart();
  const { openCategoryExplorer, openAiAssistant, openUserProfile } = useUI();

  const item =
    "flex h-full flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 glass border-t border-border md:hidden"
    >
      <a href="/" className={`${item} text-primary`}>
        <Home className="h-5 w-5" aria-hidden="true" />
        Home
      </a>
      <button
        type="button"
        onClick={() => openCategoryExplorer()}
        className={`${item} text-muted-foreground hover:text-foreground`}
      >
        <LayoutGrid className="h-5 w-5" aria-hidden="true" />
        Categories
      </button>
      <button
        type="button"
        onClick={openAiAssistant}
        className={`${item} text-muted-foreground hover:text-foreground`}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full ai-gradient-bg shadow-soft">
          <Sparkles className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
        </span>
        AI
      </button>
      <button
        type="button"
        onClick={openCart}
        className={`${item} relative text-muted-foreground hover:text-foreground`}
      >
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        Cart
        {itemCount > 0 && (
          <span className="absolute right-4 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
            {itemCount}
          </span>
        )}
      </button>
      <button
        type="button"
        onClick={openUserProfile}
        className={`${item} text-muted-foreground hover:text-foreground`}
      >
        <User className="h-5 w-5" aria-hidden="true" />
        Profile
      </button>
    </nav>
  );
}
