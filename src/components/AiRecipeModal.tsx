import { useState, useEffect } from "react";
import { Sparkles, Clock, Flame, Users, ChefHat, Check, X, ShoppingBag } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { getProductForIngredient } from "@/data/recipes";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import { formatINR } from "@/lib/format";

type AiRecipeModalProps = {
  recipe: Recipe | null;
  onClose: () => void;
};

export function AiRecipeModal({ recipe, onClose }: AiRecipeModalProps) {
  const { addBatch, openCart } = useCart();
  const toast = useToast();

  const [servings, setServings] = useState(4);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servingsDefault);
      setSelectedIds(recipe.ingredients.map((ing) => ing.productId));
    }
  }, [recipe]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (recipe) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [recipe, onClose]);

  if (!recipe) return null;

  const toggleIngredient = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const scaleFactor = servings / recipe.servingsDefault;

  // Calculate pricing
  const ingredientsWithProducts = recipe.ingredients.map((ing) => {
    const product = getProductForIngredient(ing);
    const unit = product ? product.units[0] : null;
    const price = unit ? Math.round(unit.price * Math.max(1, Math.round(scaleFactor))) : 0;
    const mrp = unit ? Math.round(unit.mrp * Math.max(1, Math.round(scaleFactor))) : 0;
    const isSelected = selectedIds.includes(ing.productId);
    return { ing, product, unit, price, mrp, isSelected };
  });

  const selectedItems = ingredientsWithProducts.filter((i) => i.isSelected && i.product);
  const totalCost = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const totalMrp = selectedItems.reduce((acc, curr) => acc + curr.mrp, 0);
  const totalSavings = Math.max(0, totalMrp - totalCost);

  const handleAddToCart = () => {
    if (selectedItems.length === 0) return;

    const batch = selectedItems.map((item) => ({
      product: item.product!,
      unitLabel: item.unit?.label,
      qty: Math.max(1, Math.round(scaleFactor)),
    }));

    addBatch(batch);
    toast(`Added ${selectedItems.length} recipe ingredients to your cart! 🍲`);
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sheet animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="relative border-b border-border bg-muted/40 p-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recipe modal"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card text-3xl shadow-soft">
              {recipe.emoji}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full ai-gradient-bg px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                  <Sparkles className="h-3 w-3" /> AI Recipe Cart
                </span>
                <span className="rounded-full bg-primary-tint px-2 py-0.5 text-[11px] font-semibold text-primary">
                  {recipe.difficulty}
                </span>
              </div>
              <h2 id="recipe-modal-title" className="mt-1 text-lg font-extrabold sm:text-xl">
                {recipe.title}
              </h2>
            </div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{recipe.description}</p>

          {/* Quick Metrics */}
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-2.5 text-xs font-semibold">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>{recipe.prepTime}</span>
            </div>
            {recipe.caloriesPerServing > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Flame className="h-3.5 w-3.5 text-accent" />
                <span>~{Math.round(recipe.caloriesPerServing * scaleFactor)} kcal</span>
              </div>
            )}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-muted-foreground">Servings:</span>
              <div className="flex items-center rounded-lg border border-border bg-muted/60 p-0.5">
                <button
                  type="button"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="grid h-6 w-6 place-items-center rounded-md text-sm font-bold hover:bg-card"
                  aria-label="Decrease servings"
                >
                  −
                </button>
                <span className="w-6 text-center font-bold">{servings}</span>
                <button
                  type="button"
                  onClick={() => setServings((s) => Math.min(12, s + 1))}
                  className="grid h-6 w-6 place-items-center rounded-md text-sm font-bold hover:bg-card"
                  aria-label="Increase servings"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Recipe Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Chef Tip */}
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs">
            <ChefHat className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-bold text-foreground">Chef's Secret</p>
              <p className="text-muted-foreground">{recipe.chefTip}</p>
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Ingredients Needed ({selectedItems.length}/{recipe.ingredients.length})
            </h3>
            <span className="text-[11px] text-subtle-foreground">
              Uncheck items you already have
            </span>
          </div>

          <ul className="space-y-2">
            {ingredientsWithProducts.map(({ ing, product, unit, price, mrp, isSelected }) => {
              if (!product) return null;
              return (
                <li
                  key={ing.productId}
                  onClick={() => toggleIngredient(ing.productId)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition-all ${
                    isSelected
                      ? "border-primary/40 bg-card shadow-soft"
                      : "border-border bg-muted/30 opacity-60"
                  }`}
                >
                  <div
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs transition-colors ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>

                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-xl">
                    {product.emoji}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ing.quantityNote} · {unit?.label}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{formatINR(price)}</p>
                    {mrp > price && (
                      <p className="text-[11px] text-subtle-foreground line-through">
                        {formatINR(mrp)}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer with Summary and Action */}
        <div className="border-t border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Total for {selectedItems.length} items</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-foreground">{formatINR(totalCost)}</span>
                {totalSavings > 0 && (
                  <span className="text-xs font-bold text-primary">
                    Save {formatINR(totalSavings)}
                  </span>
                )}
              </div>
            </div>
            <span className="rounded-full bg-primary-tint px-2.5 py-1 text-xs font-bold text-primary">
              ⚡ 10 min delivery
            </span>
          </div>

          <button
            type="button"
            disabled={selectedItems.length === 0}
            onClick={handleAddToCart}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-extrabold text-primary-foreground shadow-soft transition-all hover:bg-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Add {selectedItems.length} Items to Cart ({formatINR(totalCost)})
          </button>
        </div>
      </div>
    </div>
  );
}
