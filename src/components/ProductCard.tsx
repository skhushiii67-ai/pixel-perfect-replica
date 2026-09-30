import { useRef } from "react";
import { Star, Clock } from "lucide-react";
import type { Product } from "@/data/products";
import { discountPercent, formatINR } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import { useUI } from "@/store/ui";
import { QtyStepper } from "./QtyStepper";

export function ProductCard({ product }: { product: Product }) {
  const { add, setQty, qtyOf } = useCart();
  const { openProductDetail } = useUI();
  const toast = useToast();
  const imgRef = useRef<HTMLDivElement>(null);
  const unit = product.units[0]!;
  const qty = qtyOf(product.id, unit.label);
  const off = discountPercent(unit.price, unit.mrp);

  const handleAdd = () => {
    add(product, unit.label, imgRef.current?.getBoundingClientRect());
    toast(`${product.name} added to cart`);
  };

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-3 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div
        ref={imgRef}
        onClick={() => openProductDetail(product)}
        className="relative mb-3 grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-lg bg-muted"
        title="View details"
      >
        <span
          aria-hidden="true"
          className="text-5xl transition-transform duration-300 group-hover:scale-105"
        >
          {product.emoji}
        </span>
        {off > 0 && (
          <span className="absolute left-0 top-2 rounded-r-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
            {off}% OFF
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-foreground/80 py-1 text-center text-[11px] font-semibold text-background">
            Out of stock
          </span>
        )}
      </div>

      <p className="flex items-center gap-1 text-[11px] font-medium text-subtle-foreground">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {product.deliveryTime} mins
      </p>
      <h3
        onClick={() => openProductDetail(product)}
        className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug hover:text-primary transition-colors"
      >
        {product.name}
      </h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{unit.label}</p>

      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
        <span className="font-semibold text-foreground">{product.rating}</span>
        <span>({product.reviewCount.toLocaleString("en-IN")})</span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div>
          <p className="text-sm font-bold">{formatINR(unit.price)}</p>
          {off > 0 && (
            <p className="text-xs text-subtle-foreground line-through">{formatINR(unit.mrp)}</p>
          )}
        </div>
        <div className="w-24">
          {qty === 0 ? (
            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleAdd}
              className="h-9 w-full rounded-full border border-primary bg-primary-tint text-sm font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ADD
            </button>
          ) : (
            <QtyStepper
              size="sm"
              label={product.name}
              qty={qty}
              onInc={handleAdd}
              onDec={() => setQty(product.id, unit.label, qty - 1)}
            />
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="mb-3 aspect-square rounded-lg shimmer" />
      <div className="h-3 w-1/2 rounded shimmer" />
      <div className="mt-2 h-3 w-3/4 rounded shimmer" />
      <div className="mt-4 h-9 rounded-full shimmer" />
    </div>
  );
}
