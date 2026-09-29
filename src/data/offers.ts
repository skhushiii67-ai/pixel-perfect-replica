export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  emoji: string;
  tone: "fresh" | "sun" | "ai";
};

export const banners: Banner[] = [
  {
    id: "b1",
    title: "Farm-fresh in 10 minutes",
    subtitle: "Vegetables picked this morning, at your door before chai cools.",
    cta: "Shop fresh",
    emoji: "🥦",
    tone: "fresh",
  },
  {
    id: "b2",
    title: "Flat ₹100 off on ₹599",
    subtitle: "Monsoon stock-up sale on atta, dals and oils.",
    cta: "Grab the deal",
    emoji: "🛍️",
    tone: "sun",
  },
  {
    id: "b3",
    title: "Tell us the dish. We'll pack it.",
    subtitle: "Say “Paneer butter masala for 4” and get a ready cart.",
    cta: "Try recipe-to-cart",
    emoji: "✨",
    tone: "ai",
  },
];

export type Offer = {
  id: string;
  title: string;
  detail: string;
  code: string;
  emoji: string;
};

export const offers: Offer[] = [
  { id: "o1", title: "₹75 off first order", detail: "On orders above ₹299", code: "FRESH75", emoji: "🎁" },
  { id: "o2", title: "20% off on fruits", detail: "Max discount ₹120", code: "FRUIT20", emoji: "🍎" },
  { id: "o3", title: "Free delivery all week", detail: "On orders above ₹199", code: "ZEROSHIP", emoji: "🛵" },
];
