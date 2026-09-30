import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Search,
  ShoppingCart,
  User,
  Zap,
  Moon,
  Sun,
  Sparkles,
  X,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { formatINR } from "@/lib/format";
import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { useToast } from "@/store/toast";

const LOCATIONS = ["Nagpur 440001", "Nagpur 440010", "Pune 411001", "Mumbai 400001"];
const TRENDING_SEARCHES = ["Milk", "Paneer", "Atta", "Potato", "Chips", "Banana", "Eggs"];

export function Header() {
  const { itemCount, total, openCart, cartIconRef, add } = useCart();
  const { openUserProfile, openProductDetail, openCategoryExplorer, openAiAssistant } = useUI();
  const toast = useToast();

  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState(LOCATIONS[0]!);
  const [locOpen, setLocOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [bump, setBump] = useState(0);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  // Click outside search listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("freshmate.theme", next ? "dark" : "light");
  };

  const matchingProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        .slice(0, 5)
    : [];

  const matchingCategories = searchQuery.trim()
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <header
      className={`sticky top-0 z-50 glass border-b border-border transition-all duration-300 ${
        scrolled ? "py-1.5 shadow-soft" : "py-3"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4">
        {/* Brand */}
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="FreshMate home">
          <span className="grid h-9 w-9 place-items-center rounded-xl fresh-gradient-bg text-lg shadow-soft">
            🥬
          </span>
          <span className="hidden text-lg font-extrabold sm:block">FreshMate</span>
        </Link>

        {/* Location selector */}
        <div className="relative hidden shrink-0 md:block">
          <button
            type="button"
            onClick={() => setLocOpen((o) => !o)}
            aria-expanded={locOpen}
            className="flex items-center gap-1.5 rounded-full bg-primary-tint px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/15"
          >
            <Zap className="h-3.5 w-3.5 fill-primary" aria-hidden="true" />
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
                    toast(`Location set to ${l}`);
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

        {/* Search Bar with Live Results Dropdown */}
        <div ref={searchContainerRef} className="relative flex-1">
          <form
            className="relative w-full"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (matchingProducts.length > 0) {
                openProductDetail(matchingProducts[0]!);
                setSearchOpen(false);
              }
            }}
          >
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search “high protein snacks”, “atta”, “chai”…"
              aria-label="Search groceries"
              className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-10 text-xs sm:text-sm outline-none transition-shadow placeholder:text-subtle-foreground focus:shadow-soft"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={openAiAssistant}
                title="Ask AI Assistant"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ai-2 hover:scale-110 transition-transform"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </form>

          {/* Search Dropdown Overlay */}
          {searchOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[80vh] overflow-y-auto rounded-2xl border border-border bg-card p-3 shadow-lift animate-in fade-in-50 zoom-in-95 duration-150">
              {searchQuery.trim() === "" ? (
                <div>
                  <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Popular Searches
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5 p-1">
                    {TRENDING_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSearchQuery(item);
                        }}
                        className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary-tint hover:text-primary transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-border pt-2 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        openAiAssistant();
                      }}
                      className="flex w-full items-center justify-between rounded-xl ai-gradient-border p-2.5 text-xs font-bold"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-ai-2" />
                        <span className="ai-gradient-text">Need a custom recipe or diet cart?</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Matching Categories */}
                  {matchingCategories.length > 0 && (
                    <div>
                      <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Matching Categories
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {matchingCategories.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              openCategoryExplorer(c.id);
                              setSearchOpen(false);
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-primary-tint px-3 py-1 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
                          >
                            <span>{c.emoji}</span>
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Products */}
                  <div>
                    <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Products ({matchingProducts.length})
                    </p>
                    {matchingProducts.length === 0 ? (
                      <p className="p-3 text-center text-xs text-muted-foreground">
                        No products found for "{searchQuery}". Try searching for milk, atta, or paneer!
                      </p>
                    ) : (
                      <div className="mt-1 space-y-1">
                        {matchingProducts.map((p) => {
                          const unit = p.units[0]!;
                          return (
                            <div
                              key={p.id}
                              className="flex items-center justify-between rounded-xl p-2 hover:bg-muted/50 transition-colors cursor-pointer"
                              onClick={() => {
                                openProductDetail(p);
                                setSearchOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-xl">
                                  {p.emoji}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate text-xs font-bold text-foreground">
                                    {p.name}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground">
                                    {p.brand} · {unit.label}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 ml-2">
                                <span className="text-xs font-extrabold text-foreground">
                                  {formatINR(unit.price)}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    add(p, unit.label);
                                    toast(`${p.name} added to cart`);
                                  }}
                                  className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover active:scale-95"
                                >
                                  <Plus className="h-3 w-3" /> ADD
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User Login / Profile Button */}
        <button
          type="button"
          onClick={openUserProfile}
          className="hidden h-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-bold transition-colors hover:bg-muted lg:flex"
        >
          <User className="h-4 w-4" aria-hidden="true" />
          Khushi
        </button>

        {/* Cart Button */}
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
