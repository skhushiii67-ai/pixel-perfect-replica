import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import type { Recipe } from "@/data/recipes";
import type { OrderDetails } from "@/components/OrderTrackingModal";

type UIContextValue = {
  activeRecipe: Recipe | null;
  openRecipe: (recipe: Recipe) => void;
  closeRecipe: () => void;

  activeProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  isCategoryExplorerOpen: boolean;
  categoryExplorerId: string;
  openCategoryExplorer: (categoryId?: string) => void;
  closeCategoryExplorer: () => void;

  isAiAssistantOpen: boolean;
  openAiAssistant: () => void;
  closeAiAssistant: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  isUserProfileOpen: boolean;
  openUserProfile: () => void;
  closeUserProfile: () => void;

  activeOrderTracking: OrderDetails | null;
  openOrderTracking: (order: OrderDetails) => void;
  closeOrderTracking: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCategoryExplorerOpen, setCategoryExplorerOpen] = useState(false);
  const [categoryExplorerId, setCategoryExplorerId] = useState("fruits-veg");
  const [isAiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [activeOrderTracking, setActiveOrderTracking] = useState<OrderDetails | null>(null);

  const value: UIContextValue = {
    activeRecipe,
    openRecipe: (recipe) => setActiveRecipe(recipe),
    closeRecipe: () => setActiveRecipe(null),

    activeProduct,
    openProductDetail: (product) => setActiveProduct(product),
    closeProductDetail: () => setActiveProduct(null),

    isCategoryExplorerOpen,
    categoryExplorerId,
    openCategoryExplorer: (catId) => {
      if (catId) setCategoryExplorerId(catId);
      setCategoryExplorerOpen(true);
    },
    closeCategoryExplorer: () => setCategoryExplorerOpen(false),

    isAiAssistantOpen,
    openAiAssistant: () => setAiAssistantOpen(true),
    closeAiAssistant: () => setAiAssistantOpen(false),

    isCheckoutOpen,
    openCheckout: () => setCheckoutOpen(true),
    closeCheckout: () => setCheckoutOpen(false),

    isUserProfileOpen,
    openUserProfile: () => setUserProfileOpen(true),
    closeUserProfile: () => setUserProfileOpen(false),

    activeOrderTracking,
    openOrderTracking: (order) => setActiveOrderTracking(order),
    closeOrderTracking: () => setActiveOrderTracking(null),
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
