import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Package,
  Bike,
  Sparkles,
  X,
  Share2,
} from "lucide-react";
import { formatINR } from "@/lib/format";
import { useToast } from "@/store/toast";

export type OrderDetails = {
  orderId: string;
  total: number;
  itemsCount: number;
  address: string;
  paymentMethod: string;
};

type OrderTrackingModalProps = {
  order: OrderDetails | null;
  onClose: () => void;
};

export function OrderTrackingModal({ order, onClose }: OrderTrackingModalProps) {
  const toast = useToast();
  const [secondsRemaining, setSecondsRemaining] = useState(540); // 9 minutes
  const [step, setStep] = useState(2); // 1: Confirmed, 2: Packing, 3: On the way, 4: Delivered

  // Countdown timer
  useEffect(() => {
    if (!order) return;
    const interval = setInterval(() => {
      setSecondsRemaining((sec) => {
        if (sec <= 1) {
          setStep(4);
          clearInterval(interval);
          return 0;
        }
        if (sec === 480) setStep(3); // rider picked up after 1 min
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [order]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (order) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [order, onClose]);

  if (!order) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Order Live Tracking"
        className="relative z-10 flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sheet animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <h2 className="text-sm font-extrabold">Live Order Tracking</h2>
              <p className="text-[11px] text-muted-foreground">Order #{order.orderId}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close tracking"
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* ETA Hero Banner */}
          <div className="rounded-2xl fresh-gradient-bg p-5 text-primary-foreground shadow-soft">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                ⚡ Express Delivery
              </span>
              <span className="text-xs font-semibold opacity-90">Nagpur Central Hub</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
                {timeString}
              </span>
              <span className="text-sm font-semibold opacity-90">mins remaining</span>
            </div>
            <p className="mt-1 text-xs opacity-90">
              {step === 4
                ? "Your order has arrived at your doorstep! 🎉"
                : step === 3
                  ? "Rider is 1.2 km away on Amravati Road"
                  : "Items packed and quality-checked at Ramdaspeth Dark Store"}
            </p>
          </div>

          {/* Animated Map Simulation */}
          <div className="relative h-36 w-full overflow-hidden rounded-2xl border border-border bg-slate-900 p-3">
            {/* Dark Store Point */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white shadow-lift">
                🏬
              </span>
              <span className="mt-1 text-[10px] font-bold text-slate-200">Dark Store</span>
            </div>

            {/* Path SVG */}
            <svg className="absolute inset-0 h-full w-full" strokeDasharray="6 4">
              <path
                d="M 50 72 Q 150 20, 240 72 T 420 72"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                className="opacity-70"
              />
            </svg>

            {/* Rider moving */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 flex flex-col items-center"
              style={{ left: step >= 3 ? "60%" : "30%" }}
            >
              <div className="relative">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-500 text-white shadow-lift animate-bounce">
                  🛵
                </span>
                <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping" />
              </div>
              <span className="mt-1 rounded bg-black/70 px-1 text-[9px] font-bold text-amber-300">
                Amit (Rider)
              </span>
            </div>

            {/* User Destination */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white shadow-lift">
                📍
              </span>
              <span className="mt-1 text-[10px] font-bold text-slate-200">Your Home</span>
            </div>
          </div>

          {/* 4-Stage Timeline */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Order Milestones
            </h3>

            <div className="space-y-3">
              {[
                { s: 1, title: "Order Confirmed", desc: "Received at Nagpur Hub", icon: CheckCircle2 },
                { s: 2, title: "Order Packed", desc: "Items picked and cold-bag sealed", icon: Package },
                { s: 3, title: "Out for Delivery", desc: "Rider Amit picked up order", icon: Bike },
                { s: 4, title: "Delivered", desc: "Safe contactless delivery", icon: MapPin },
              ].map((stage) => {
                const isPassed = step >= stage.s;
                const isCurrent = step === stage.s;
                const Icon = stage.icon;
                return (
                  <div key={stage.s} className="flex items-start gap-3">
                    <div
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs transition-colors ${
                        isPassed
                          ? "bg-primary text-primary-foreground font-bold"
                          : "border border-border bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-primary/20 animate-pulse" : ""}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-bold leading-tight ${
                          isPassed ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {stage.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Profile */}
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-muted text-2xl">
                👨‍🦱
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold">Amit Sharma</span>
                  <span className="rounded bg-primary-tint px-1.5 py-0.5 text-[10px] font-bold text-primary">
                    ⭐ 4.9
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">Vaccinated · Hero Electric Scooter</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toast("Calling delivery partner...")}
                aria-label="Call delivery partner"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background hover:bg-muted text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toast("Opening chat with rider...")}
                aria-label="Message rider"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background hover:bg-muted text-foreground transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Order Details Accordion */}
          <div className="rounded-2xl border border-border bg-card p-3.5 text-xs space-y-1.5">
            <div className="flex justify-between font-bold text-foreground">
              <span>Delivering to</span>
              <span className="text-primary truncate max-w-[200px]">{order.address}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Payment Mode</span>
              <span className="font-semibold text-foreground">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Paid</span>
              <span className="font-extrabold text-foreground">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-card p-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              toast("Order tracking link copied to clipboard!");
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" /> Share Status
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
