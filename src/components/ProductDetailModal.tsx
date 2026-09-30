import { useState, useEffect } from "react";
import { Star, Clock, ShieldCheck, Zap, X, Heart, Sparkles, Check } from "lucide-react";
import type { Product, UnitOption } from "@/data/products";
import { formatINR, discountPercent } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import { QtyStepper } from "./QtyStepper";

type ProductDetailModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { add, setQty, qtyOf } = useCart();
  const toast = useToast();

  const [selectedUnit, setSelectedUnit] = useState<UnitOption | null>(null);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedUnit(product.units[0] || null);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product || !selectedUnit) return null;

  const qty = qtyOf(product.id, selectedUnit.label);
  const off = discountPercent(selectedUnit.price, selectedUnit.mrp);

  const handleAdd = () => {
    add(product, selectedUnit.label);
    toast(`${product.name} (${selectedUnit.label}) added to cart!`);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sheet animate-in zoom-in-95 duration-200"
      >
        {/* Header / Hero Graphic */}
        <div className="relative flex flex-col items-center justify-center border-b border-border bg-muted/40 p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsWishlist(!isWishlist);
              toast(isWishlist ? "Removed from wishlist" : "Saved to wishlist ❤️");
            }}
            aria-label="Add to wishlist"
            className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-destructive"
          >
            <Heart
              className={`h-4 w-4 ${isWishlist ? "fill-destructive text-destructive" : ""}`}
            />
          </button>

          <span className="text-8xl select-none filter drop-shadow-md transition-transform hover:scale-110 duration-300">
            {product.emoji}
          </span>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-tint px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"
              >
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1 rounded-full bg-card border border-border px-2.5 py-0.5 text-[10px] font-bold text-foreground">
              <Clock className="h-3 w-3 text-primary" /> {product.deliveryTime} mins delivery
            </span>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">{product.brand}</p>
            <h2 className="text-lg font-extrabold text-foreground sm:text-xl">{product.name}</h2>

            <div className="mt-1.5 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 font-bold text-amber-700 dark:text-amber-400">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                {product.rating}
              </span>
              <span className="text-muted-foreground">
                ({product.reviewCount.toLocaleString("en-IN")} verified ratings)
              </span>
            </div>
          </div>

          {/* Unit selection */}
          <div className="rounded-xl border border-border bg-background p-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Pack Size
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {product.units.map((u) => {
                const isSelected = selectedUnit.label === u.label;
                const unitOff = discountPercent(u.price, u.mrp);
                return (
                  <button
                    key={u.label}
                    type="button"
                    onClick={() => setSelectedUnit(u)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                      isSelected
                        ? "border-primary bg-primary-tint/50 shadow-soft"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">{u.label}</span>
                    <span className="text-sm font-extrabold text-primary">{formatINR(u.price)}</span>
                    {unitOff > 0 && (
                      <span className="text-[10px] text-accent font-semibold">{unitOff}% OFF</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FreshMate Guarantees */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-start gap-2 rounded-xl border border-border bg-card p-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-bold">100% Quality Checked</p>
                <p className="text-[11px] text-muted-foreground">Handpicked farm fresh daily</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-border bg-card p-3">
              <Zap className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-bold">Cold-Chain Packed</p>
                <p className="text-[11px] text-muted-foreground">Delivered crisp & fresh</p>
              </div>
            </div>
          </div>

          {/* AI Smart Suggestion */}
          <div className="rounded-xl border border-ai-2/30 bg-card p-3 text-xs">
            <p className="flex items-center gap-1.5 font-bold ai-gradient-text">
              <Sparkles className="h-4 w-4 text-ai-2" /> Pair with fresh herbs
            </p>
            <p className="mt-1 text-muted-foreground">
              Most customers buy this with fresh coriander or curd to enhance flavors.
            </p>
          </div>
        </div>

        {/* Footer with Price and Stepper */}
        <div className="flex items-center justify-between border-t border-border bg-card p-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-foreground">
                {formatINR(selectedUnit.price)}
              </span>
              {off > 0 && (
                <span className="text-xs text-subtle-foreground line-through">
                  {formatINR(selectedUnit.mrp)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <div className="w-36">
            {qty === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                className="flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-primary text-sm font-extrabold text-primary-foreground shadow-soft transition-all hover:bg-primary-hover active:scale-95"
              >
                ADD TO CART
              </button>
            ) : (
              <QtyStepper
                size="md"
                label={product.name}
                qty={qty}
                onInc={handleAdd}
                onDec={() => setQty(product.id, selectedUnit.label, qty - 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
