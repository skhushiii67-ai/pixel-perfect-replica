import { useState, useMemo, useEffect } from "react";
import { X, SlidersHorizontal, ArrowUpDown, Check, Search } from "lucide-react";
import { categories, type Category } from "@/data/categories";
import { products, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

type CategoryExplorerModalProps = {
  isOpen: boolean;
  initialCategoryId?: string;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
};

export function CategoryExplorerModal({
  isOpen,
  initialCategoryId,
  onClose,
  onSelectProduct,
}: CategoryExplorerModalProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>(
    initialCategoryId || categories[0]!.id,
  );
  const [selectedSubcat, setSelectedSubcat] = useState<string>("All");
  const [dietFilter, setDietFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"pop" | "price-asc" | "price-desc" | "rating">("pop");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCatId(initialCategoryId);
      setSelectedSubcat("All");
    }
  }, [initialCategoryId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === selectedCatId) || categories[0]!,
    [selectedCatId],
  );

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.category === selectedCatId);

    if (selectedSubcat !== "All") {
      list = list.filter((p) => p.subcategory === selectedSubcat);
    }

    if (dietFilter === "veg") {
      list = list.filter((p) => p.tags.includes("veg"));
    } else if (dietFilter === "organic") {
      list = list.filter((p) => p.tags.includes("organic"));
    } else if (dietFilter === "high-protein") {
      list = list.filter((p) => p.tags.includes("high-protein"));
    } else if (dietFilter === "deals") {
      list = list.filter((p) => p.units[0] && p.units[0].mrp > p.units[0].price);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q),
      );
    }

    list = list.filter((p) => p.price <= maxPrice);

    return list.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }, [selectedCatId, selectedSubcat, dietFilter, sortBy, maxPrice, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Category explorer"
        className="relative z-10 flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sheet animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl fresh-gradient-bg text-2xl">
              {currentCategory.emoji}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold">{currentCategory.name}</h2>
              <p className="text-xs text-muted-foreground">
                {filteredProducts.length} items available in 10 mins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-b border-border bg-card/60 px-4 py-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCatId(c.id);
                  setSelectedSubcat("All");
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedCatId === c.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-card hover:bg-muted text-foreground"
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Subcategories Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2.5 sm:px-6">
          {/* Subcategory Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedSubcat("All")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                selectedSubcat === "All"
                  ? "bg-foreground text-background"
                  : "bg-card border border-border hover:bg-muted"
              }`}
            >
              All
            </button>
            {currentCategory.subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubcat(sub)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  selectedSubcat === sub
                    ? "bg-foreground text-background"
                    : "bg-card border border-border hover:bg-muted text-foreground"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Quick Dietary and Sort Options */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setDietFilter("all")}
                className={`rounded-md px-2 py-1 font-semibold ${
                  dietFilter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("veg")}
                className={`rounded-md px-2 py-1 font-semibold ${
                  dietFilter === "veg" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                🥬 Veg
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("high-protein")}
                className={`rounded-md px-2 py-1 font-semibold ${
                  dietFilter === "high-protein" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                💪 Protein
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("deals")}
                className={`rounded-md px-2 py-1 font-semibold ${
                  dietFilter === "deals" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                🏷️ Deals
              </button>
            </div>

            <div className="flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="h-8 rounded-lg border border-border bg-card px-2 text-xs font-semibold outline-none"
              >
                <option value="pop">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <span className="text-4xl">🔍</span>
              <p className="mt-2 text-base font-bold">No products match your filter</p>
              <p className="text-xs text-muted-foreground">Try clearing dietary filters or subcategory selection</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubcat("All");
                  setDietFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
