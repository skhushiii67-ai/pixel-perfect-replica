import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  CreditCard,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Check,
  X,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";
import { useToast } from "@/store/toast";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderData: {
    orderId: string;
    total: number;
    itemsCount: number;
    address: string;
    paymentMethod: string;
  }) => void;
};

const ADDRESSES = [
  {
    id: "a1",
    tag: "Home",
    line: "Flat 402, Sai Heights, Civil Lines, Nagpur 440001",
    landmark: "Near High Court",
  },
  {
    id: "a2",
    tag: "Office",
    line: "Plot 14, Infotech Tower, Gayatri Nagar, Nagpur 440022",
    landmark: "Opposite VNIT gate",
  },
];

const PAYMENT_METHODS = [
  { id: "upi", name: "UPI (Google Pay, PhonePe, Paytm)", icon: "⚡" },
  { id: "card", name: "Credit / Debit Card", icon: "💳" },
  { id: "wallet", name: "FreshCash Wallet (₹150 balance)", icon: "👛" },
  { id: "cod", name: "Cash on Delivery", icon: "💵" },
];

export function CheckoutModal({ isOpen, onClose, onOrderSuccess }: CheckoutModalProps) {
  const cart = useCart();
  const toast = useToast();

  const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0]!.id);
  const [slot, setSlot] = useState<"instant" | "scheduled">("instant");
  const [payment, setPayment] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isProcessing) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen) return null;

  const currentAddr = ADDRESSES.find((a) => a.id === selectedAddress) || ADDRESSES[0]!;
  const deliveryDiscount = slot === "scheduled" ? 10 : 0;
  const finalTotal = Math.max(0, cart.total - deliveryDiscount);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = "FM-" + Math.floor(100000 + Math.random() * 900000);
      cart.clear();
      onClose();
      onOrderSuccess({
        orderId,
        total: finalTotal,
        itemsCount: cart.itemCount,
        address: currentAddr.line,
        paymentMethod: PAYMENT_METHODS.find((p) => p.id === payment)?.name || "UPI",
      });
      toast(`Order placed successfully! Delivery partner assigned 🚀`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          if (!isProcessing) onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sheet animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
              <Zap className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-extrabold">Instant Checkout</h2>
              <p className="text-xs text-muted-foreground">FreshMate Nagpur Dark Store</p>
            </div>
          </div>
          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            aria-label="Close checkout"
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* 1. Address Section */}
          <div className="rounded-xl border border-border bg-background p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Delivery Address
              </span>
              <span className="text-[11px] font-semibold text-primary">Nagpur 440001</span>
            </div>

            <div className="grid gap-2">
              {ADDRESSES.map((addr) => (
                <label
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 transition-colors ${
                    selectedAddress === addr.id
                      ? "border-primary bg-primary-tint/40"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                    className="mt-1 accent-primary"
                  />
                  <div className="text-xs">
                    <span className="rounded bg-muted px-1.5 py-0.5 font-bold uppercase tracking-wide text-[10px]">
                      {addr.tag}
                    </span>
                    <p className="mt-1 font-semibold text-foreground">{addr.line}</p>
                    <p className="text-muted-foreground">{addr.landmark}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Delivery Speed */}
          <div className="rounded-xl border border-border bg-background p-3.5">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              <Clock className="h-3.5 w-3.5 text-primary" /> Delivery Speed
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSlot("instant")}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                  slot === "instant"
                    ? "border-primary bg-primary-tint/50 shadow-soft"
                    : "border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-1 font-bold text-xs text-primary">
                  <Zap className="h-3.5 w-3.5 fill-primary" /> 10-Minute Express
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Dark store rider arrives in ~8-12 mins
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSlot("scheduled")}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                  slot === "scheduled"
                    ? "border-primary bg-primary-tint/50 shadow-soft"
                    : "border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-1 font-bold text-xs text-foreground">
                  🌿 Eco Saver Slot
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Today 5:00 - 6:00 PM (Save ₹10)
                </p>
              </button>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="rounded-xl border border-border bg-background p-3.5">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              <CreditCard className="h-3.5 w-3.5 text-primary" /> Payment Options
            </span>

            <div className="grid gap-2">
              {PAYMENT_METHODS.map((pm) => (
                <label
                  key={pm.id}
                  onClick={() => setPayment(pm.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-2.5 text-xs transition-colors ${
                    payment === pm.id
                      ? "border-primary bg-primary-tint/40 font-bold"
                      : "border-border hover:bg-muted/50 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{pm.icon}</span>
                    <span>{pm.name}</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === pm.id}
                    onChange={() => setPayment(pm.id)}
                    className="accent-primary"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Security Assurance */}
          <div className="flex items-center gap-2 rounded-lg bg-muted/40 p-2.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <span>100% contactless delivery guaranteed with temperature check</span>
          </div>
        </div>

        {/* Footer Summary & Pay Button */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-muted-foreground">{cart.itemCount} Items in Order</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-foreground">{formatINR(finalTotal)}</span>
              {deliveryDiscount > 0 && (
                <span className="text-[11px] font-bold text-primary">₹{deliveryDiscount} eco saved</span>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessing || cart.itemCount === 0}
            onClick={handlePlaceOrder}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-extrabold text-primary-foreground shadow-soft transition-all hover:bg-primary-hover active:scale-[0.99] disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Confirming Order with Dark Store...
              </span>
            ) : (
              <span>Place Order & Pay {formatINR(finalTotal)} →</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
