import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

/** A cart line: product + chosen unit label. */
export type CartLine = {
  productId: string;
  unitLabel: string;
  qty: number;
};

export type Coupon = { code: string; label: string; discount: number };

const COUPONS: Coupon[] = [
  { code: "FRESH75", label: "₹75 off first order", discount: 75 },
  { code: "FRUIT20", label: "20% off fruits (max ₹120)", discount: 120 },
  { code: "ZEROSHIP", label: "Free delivery", discount: 0 },
];

export const FREE_DELIVERY_THRESHOLD = 199;
export const DELIVERY_FEE = 29;
export const HANDLING_FEE = 9;

const STORAGE_KEY = "freshmate.cart.v1";

type FlyRequest = { id: number; emoji: string; from: DOMRect } | null;

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (product: Product, unitLabel?: string, origin?: DOMRect) => void;
  setQty: (productId: string, unitLabel: string, qty: number) => void;
  remove: (productId: string, unitLabel: string) => void;
  clear: () => void;
  qtyOf: (productId: string, unitLabel?: string) => number;
  detailed: Array<{ line: CartLine; product: Product; price: number; mrp: number }>;
  itemCount: number;
  itemTotal: number;
  mrpTotal: number;
  deliveryFee: number;
  handlingFee: number;
  gst: number;
  couponDiscount: number;
  coupon: Coupon | null;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  total: number;
  savings: number;
  flyRequest: FlyRequest;
  clearFly: () => void;
  cartIconRef: React.RefObject<HTMLElement | null>;
};

const CartContext = createContext<CartContextValue | null>(null);

function priceFor(product: Product, unitLabel: string) {
  const unit = product.units.find((u) => u.label === unitLabel) ?? product.units[0]!;
  return unit;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [flyRequest, setFlyRequest] = useState<FlyRequest>(null);
  const cartIconRef = useRef<HTMLElement | null>(null);
  const flyId = useRef(0);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lines?: CartLine[]; coupon?: Coupon | null };
        if (Array.isArray(parsed.lines)) setLines(parsed.lines);
        if (parsed.coupon) setCoupon(parsed.coupon);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, coupon }));
    } catch {
      /* storage full or unavailable */
    }
  }, [lines, coupon]);

  const add = useCallback((product: Product, unitLabel?: string, origin?: DOMRect) => {
    const label = unitLabel ?? product.units[0]!.label;
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === product.id && l.unitLabel === label);
      if (i === -1) return [...prev, { productId: product.id, unitLabel: label, qty: 1 }];
      const next = [...prev];
      next[i] = { ...next[i]!, qty: next[i]!.qty + 1 };
      return next;
    });
    if (origin) {
      flyId.current += 1;
      setFlyRequest({ id: flyId.current, emoji: product.emoji, from: origin });
    }
  }, []);

  const setQty = useCallback((productId: string, unitLabel: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.productId === productId && l.unitLabel === unitLabel))
        : prev.map((l) =>
            l.productId === productId && l.unitLabel === unitLabel ? { ...l, qty } : l,
          ),
    );
  }, []);

  const remove = useCallback(
    (productId: string, unitLabel: string) => setQty(productId, unitLabel, 0),
    [setQty],
  );

  const detailed = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          if (!product) return null;
          const unit = priceFor(product, line.unitLabel);
          return { line, product, price: unit.price, mrp: unit.mrp };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines],
  );

  const itemTotal = detailed.reduce((s, d) => s + d.price * d.line.qty, 0);
  const mrpTotal = detailed.reduce((s, d) => s + d.mrp * d.line.qty, 0);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const freeDelivery = itemTotal >= FREE_DELIVERY_THRESHOLD || coupon?.code === "ZEROSHIP";
  const deliveryFee = itemCount === 0 || freeDelivery ? 0 : DELIVERY_FEE;
  const handlingFee = itemCount === 0 ? 0 : HANDLING_FEE;

  const couponDiscount = useMemo(() => {
    if (!coupon || itemCount === 0) return 0;
    if (coupon.code === "ZEROSHIP") return 0;
    if (coupon.code === "FRUIT20") {
      const fruits = detailed
        .filter((d) => d.product.category === "fruits-veg")
        .reduce((s, d) => s + d.price * d.line.qty, 0);
      return Math.min(Math.round(fruits * 0.2), 120);
    }
    return itemTotal >= 299 ? coupon.discount : 0;
  }, [coupon, detailed, itemTotal, itemCount]);

  const gst = Math.round((itemTotal - couponDiscount) * 0.05);
  const total = Math.max(0, itemTotal - couponDiscount + deliveryFee + handlingFee + gst);
  const savings = mrpTotal - itemTotal + couponDiscount;

  const applyCoupon = useCallback(
    (code: string) => {
      const found = COUPONS.find((c) => c.code === code.trim().toUpperCase());
      if (!found) return { ok: false, message: "That code isn't valid" };
      setCoupon(found);
      return { ok: true, message: `${found.label} applied` };
    },
    [],
  );

  const qtyOf = useCallback(
    (productId: string, unitLabel?: string) =>
      lines
        .filter((l) => l.productId === productId && (!unitLabel || l.unitLabel === unitLabel))
        .reduce((s, l) => s + l.qty, 0),
    [lines],
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    add,
    setQty,
    remove,
    clear: () => setLines([]),
    qtyOf,
    detailed,
    itemCount,
    itemTotal,
    mrpTotal,
    deliveryFee,
    handlingFee,
    gst,
    couponDiscount,
    coupon,
    applyCoupon,
    removeCoupon: () => setCoupon(null),
    total,
    savings,
    flyRequest,
    clearFly: () => setFlyRequest(null),
    cartIconRef,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { COUPONS };
