import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Search, ShoppingCart, User, Zap, Moon, Sun, Sparkles } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";

const LOCATIONS = ["Nagpur 440001", "Nagpur 440010", "Pune 411001", "Mumbai 400001"];

export function Header() {
  const { itemCount, total, openCart, cartIconRef } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState(LOCATIONS[0]!);
  const [locOpen, setLocOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (itemCount > 0) setBump((b) => b + 1);
  }, [itemCount]);

  useEffect(() => {
    const saved = localStorage.getItem("freshmate.theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("freshmate.theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`sticky top-0 z-50 glass border-b border-border transition-all duration-300 ${
        scrolled ? "py-1.5 shadow-soft" : "py-3"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="FreshMate home">
          <span className="grid h-9 w-9 place-items-center rounded-xl fresh-gradient-bg text-lg">
            🥬
          </span>
          <span className="hidden text-lg font-extrabold sm:block">FreshMate</span>
        </Link>

        <div className="relative hidden shrink-0 md:block">
          <button
            type="button"
            onClick={() => setLocOpen((o) => !o)}
            aria-expanded={locOpen}
            className="flex items-center gap-1.5 rounded-full bg-primary-tint px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/15"
          >
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            10 mins
            <span className="text-muted-foreground">·</span>
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {location}
          </button>
          {locOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-popover p-2 shadow-lift">
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-subtle-foreground">
                Deliver to
              </p>
              {LOCATIONS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLocation(l);
                    setLocOpen(false);
                  }}
                  className={`block w-full rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    l === location ? "font-bold text-primary" : ""
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="relative flex-1"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search “high protein snacks”, “atta”, “chai”…"
            aria-label="Search groceries"
            className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-10 text-sm outline-none transition-shadow placeholder:text-subtle-foreground focus:shadow-soft"
          />
          <Sparkles
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ai-2"
            aria-hidden="true"
          />
        </form>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          type="button"
          className="hidden h-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-bold transition-colors hover:bg-muted lg:flex"
        >
          <User className="h-4 w-4" aria-hidden="true" />
          Login
        </button>

        <button
          type="button"
          ref={cartIconRef as React.RefObject<HTMLButtonElement>}
          onClick={openCart}
          aria-label={`Open cart, ${itemCount} items, ${formatINR(total)}`}
          className="relative flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover"
        >
          <span key={bump} className={itemCount ? "animate-badge-pop" : ""}>
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden tabular-nums sm:inline">
            {itemCount > 0 ? `${itemCount} · ${formatINR(total)}` : "Cart"}
          </span>
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground sm:hidden">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
