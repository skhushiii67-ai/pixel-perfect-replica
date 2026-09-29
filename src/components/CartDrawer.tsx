import { useEffect, useState } from "react";
import { Sparkles, Tag, Trash2, Truck, X } from "lucide-react";
import {
  FREE_DELIVERY_THRESHOLD,
  useCart,
} from "@/store/cart";
import { formatINR } from "@/lib/format";
import { useToast } from "@/store/toast";
import { QtyStepper } from "./QtyStepper";

const TIPS = [10, 20, 30, 50];

export function CartDrawer() {
  const cart = useCart();
  const toast = useToast();
  const [code, setCode] = useState("");
  const [tip, setTip] = useState(0);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.closeCart();
    };
    if (cart.isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cart.isOpen, cart]);

  if (!cart.isOpen) return null;

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - cart.itemTotal);
  const progress = Math.min(100, (cart.itemTotal / FREE_DELIVERY_THRESHOLD) * 100);
  const grandTotal = cart.total + tip;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={cart.closeCart}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-sheet animate-in slide-in-from-right duration-300"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h2 className="text-base font-extrabold">Your cart</h2>
            <p className="text-xs text-muted-foreground">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} · delivery in 10 mins
            </p>
          </div>
          <button
            type="button"
            onClick={cart.closeCart}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.itemCount === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="text-6xl" aria-hidden="true">
              🛒
            </span>
            <p className="text-base font-bold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add milk, atta or fresh veggies and we'll be there in 10 minutes.
            </p>
            <button
              type="button"
              onClick={cart.closeCart}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="rounded-xl border border-border bg-card p-3">
                <p className="flex items-center gap-2 text-xs font-semibold">
                  <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
                  {remaining > 0
                    ? `Add ${formatINR(remaining)} more for free delivery`
                    : "Yay! Free delivery unlocked"}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full fresh-gradient-bg transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <ul className="mt-3 space-y-2">
                {cart.detailed.map(({ line, product, price }, i) => (
                  <li
                    key={`${line.productId}-${line.unitLabel}`}
                    style={{ animationDelay: `${i * 45}ms` }}
                    className="animate-fade-up flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted text-2xl">
                      {product.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{line.unitLabel}</p>
                      <p className="text-sm font-bold">{formatINR(price * line.qty)}</p>
                    </div>
                    <div className="w-24">
                      <QtyStepper
                        size="sm"
                        label={product.name}
                        qty={line.qty}
                        onInc={() => cart.setQty(line.productId, line.unitLabel, line.qty + 1)}
                        onDec={() => cart.setQty(line.productId, line.unitLabel, line.qty - 1)}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => cart.remove(line.productId, line.unitLabel)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-subtle-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Coupon */}
              <div className="mt-4 rounded-xl border border-border bg-card p-3">
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Coupon
                </p>
                {cart.coupon ? (
                  <div className="flex items-center justify-between rounded-lg bg-primary-tint px-3 py-2">
                    <span className="text-sm font-bold text-primary">{cart.coupon.code}</span>
                    <button
                      type="button"
                      onClick={() => {
                        cart.removeCoupon();
                        toast("Coupon removed");
                      }}
                      className="text-xs font-semibold text-muted-foreground underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="FRESH75"
                      aria-label="Coupon code"
                      className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm uppercase outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const res = cart.applyCoupon(code);
                        toast(res.message);
                        if (res.ok) setCode("");
                      }}
                      className="h-10 rounded-lg bg-foreground px-4 text-sm font-bold text-background transition-transform active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* AI savings panel (static preview until the AI service lands) */}
              <div className="ai-gradient-border mt-3 rounded-xl p-3">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Sparkles className="h-4 w-4 text-ai-2" aria-hidden="true" />
                  <span className="ai-gradient-text">Smart savings</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Swap suggestions arrive with the AI assistant in the next step.
                </p>
              </div>

              {/* Instructions + tip */}
              <div className="mt-3 rounded-xl border border-border bg-card p-3">
                <label
                  htmlFor="delivery-instructions"
                  className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
                >
                  Delivery instructions
                </label>
                <input
                  id="delivery-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Ring the bell twice"
                  className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none"
                />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Tip your delivery partner
                </p>
                <div className="mt-2 flex gap-2">
                  {TIPS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTip(tip === t ? 0 : t)}
                      className={`h-9 flex-1 rounded-full border text-sm font-semibold transition-colors ${
                        tip === t
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      ₹{t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill */}
              <dl className="mt-3 space-y-1.5 rounded-xl border border-border bg-card p-3 text-sm">
                <Row label="Item total" value={formatINR(cart.itemTotal)} />
                {cart.couponDiscount > 0 && (
                  <Row
                    label="Coupon discount"
                    value={`− ${formatINR(cart.couponDiscount)}`}
                    accent
                  />
                )}
                <Row
                  label="Delivery fee"
                  value={cart.deliveryFee === 0 ? "FREE" : formatINR(cart.deliveryFee)}
                  accent={cart.deliveryFee === 0}
                />
                <Row label="Handling fee" value={formatINR(cart.handlingFee)} />
                <Row label="GST & charges" value={formatINR(cart.gst)} />
                {tip > 0 && <Row label="Delivery tip" value={formatINR(tip)} />}
                <div className="!mt-3 flex justify-between border-t border-border pt-2 text-base font-extrabold">
                  <dt>To pay</dt>
                  <dd>{formatINR(grandTotal)}</dd>
                </div>
                {cart.savings > 0 && (
                  <p className="rounded-lg bg-primary-tint px-2 py-1.5 text-center text-xs font-bold text-primary">
                    You saved {formatINR(cart.savings)} on this order 🎉
                  </p>
                )}
              </dl>
            </div>

            <div className="border-t border-border bg-card p-4">
              <button
                type="button"
                onClick={() => toast("Checkout arrives in the next step")}
                className="flex h-13 w-full items-center justify-between rounded-xl bg-primary px-5 py-4 text-sm font-extrabold text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover"
              >
                <span>{cart.itemCount} items</span>
                <span>Proceed to Pay {formatINR(grandTotal)} →</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "font-bold text-primary" : "font-semibold"}>{value}</dd>
    </div>
  );
}
