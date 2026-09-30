import { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Wallet,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  LogOut,
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import { formatINR } from "@/lib/format";
import { useToast } from "@/store/toast";
import { useCart } from "@/store/cart";
import { products } from "@/data/products";

type UserProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PAST_ORDERS = [
  {
    id: "FM-842911",
    date: "Yesterday, 7:15 PM",
    items: [
      { name: "Toned Milk (500 ml)", emoji: "🥛" },
      { name: "Chakki Atta (5 kg)", emoji: "🌾" },
      { name: "Amul Butter (100 g)", emoji: "🧈" },
    ],
    productIds: ["p13", "p21", "p18"],
    total: 336,
    status: "Delivered in 9 mins",
  },
  {
    id: "FM-651239",
    date: "28 Sep, 9:20 AM",
    items: [
      { name: "Shimla Apple (1 kg)", emoji: "🍎" },
      { name: "Robusta Banana (6 pcs)", emoji: "🍌" },
    ],
    productIds: ["p1", "p2"],
    total: 194,
    status: "Delivered in 11 mins",
  },
];

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const toast = useToast();
  const { addBatch, openCart } = useCart();
  const [walletBalance, setWalletBalance] = useState(150);
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReorder = (productIds: string[]) => {
    const itemsToAdd = productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((product) => ({ product, qty: 1 }));

    addBatch(itemsToAdd);
    toast("Reordered items added to cart!");
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="User profile"
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sheet animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
          <h2 className="text-base font-extrabold">My Account</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* User Card */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl fresh-gradient-bg text-2xl font-black text-primary-foreground shadow-soft">
              K
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold truncate">Khushi</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                  ⭐ VIP Gold
                </span>
              </div>
              <p className="text-xs text-muted-foreground">+91 98765 43210 · Nagpur</p>
              <p className="text-[11px] font-semibold text-primary mt-0.5">
                Unlimited Free Delivery Active
              </p>
            </div>
          </div>

          {/* Wallet Banner */}
          <div className="flex items-center justify-between rounded-2xl ai-gradient-border p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary shadow-soft">
                <Wallet className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">FreshCash Balance</p>
                <p className="text-lg font-extrabold text-foreground">{formatINR(walletBalance)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setWalletBalance((b) => b + 100);
                toast("₹100 added to FreshCash Wallet!");
              }}
              className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover active:scale-95 transition-all"
            >
              + Add ₹100
            </button>
          </div>

          {/* Quick Dietary Preference */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥬</span>
              <div>
                <p className="font-bold">Strict Vegetarian Mode</p>
                <p className="text-[11px] text-muted-foreground">Hide meat and egg options</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setVegOnly(!vegOnly);
                toast(vegOnly ? "Vegetarian filter disabled" : "Vegetarian filter enabled!");
              }}
              className={`h-6 w-11 rounded-full transition-colors relative ${
                vegOnly ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle pure veg mode"
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  vegOnly ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {/* Past Orders */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Past Orders
            </h4>
            {PAST_ORDERS.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-border bg-card p-3.5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Order #{order.id}</span>
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    {order.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">{order.date}</p>

                <div className="flex items-center gap-2 py-1">
                  {order.items.map((it) => (
                    <span
                      key={it.name}
                      title={it.name}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-lg"
                    >
                      {it.emoji}
                    </span>
                  ))}
                  <span className="text-muted-foreground text-xs font-semibold ml-1">
                    {order.items.length} items · {formatINR(order.total)}
                  </span>
                </div>

                <div className="flex items-center justify-end border-t border-border pt-2">
                  <button
                    type="button"
                    onClick={() => handleReorder(order.productIds)}
                    className="flex items-center gap-1.5 rounded-lg bg-primary-tint px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 active:scale-95 transition-all"
                  >
                    <RotateCcw className="h-3 w-3" /> Reorder All
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Support & Refer */}
          <div className="rounded-xl border border-border bg-card p-3 text-xs space-y-2">
            <button
              type="button"
              onClick={() => toast("Share link: get ₹100 when a friend places their first order!")}
              className="flex w-full items-center justify-between py-1 text-left font-semibold hover:text-primary transition-colors"
            >
              <span>🎁 Refer & Earn ₹100 FreshCash</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="h-px bg-border" />
            <button
              type="button"
              onClick={() => toast("24x7 Nagpur Support: support@freshmate.in or call 1800-FRESH")}
              className="flex w-full items-center justify-between py-1 text-left font-semibold hover:text-primary transition-colors"
            >
              <span>🎧 24x7 Customer Support & Help</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-card p-4">
          <button
            type="button"
            onClick={() => {
              toast("Logged out successfully");
              onClose();
            }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 text-xs font-bold text-destructive hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
