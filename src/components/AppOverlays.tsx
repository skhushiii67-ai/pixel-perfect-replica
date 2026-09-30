import { Sparkles } from "lucide-react";
import { useUI } from "@/store/ui";
import { AiRecipeModal } from "./AiRecipeModal";
import { AiAssistantDrawer } from "./AiAssistantDrawer";
import { CategoryExplorerModal } from "./CategoryExplorerModal";
import { ProductDetailModal } from "./ProductDetailModal";
import { CheckoutModal } from "./CheckoutModal";
import { OrderTrackingModal } from "./OrderTrackingModal";
import { UserProfileModal } from "./UserProfileModal";

export function AppOverlays() {
  const ui = useUI();

  return (
    <>
      {/* Floating AI Concierge Pill (Desktop) */}
      <button
        type="button"
        onClick={ui.openAiAssistant}
        aria-label="Ask FreshBot AI Chef"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full ai-gradient-bg px-4 py-3 text-xs font-extrabold text-primary-foreground shadow-lift hover:scale-105 active:scale-95 transition-all animate-fade-up group"
      >
        <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
        <span>Ask FreshBot AI</span>
        <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
      </button>

      {/* Global Modals & Drawers */}
      <AiRecipeModal recipe={ui.activeRecipe} onClose={ui.closeRecipe} />
      <AiAssistantDrawer isOpen={ui.isAiAssistantOpen} onClose={ui.closeAiAssistant} />
      <CategoryExplorerModal
        isOpen={ui.isCategoryExplorerOpen}
        initialCategoryId={ui.categoryExplorerId}
        onClose={ui.closeCategoryExplorer}
      />
      <ProductDetailModal product={ui.activeProduct} onClose={ui.closeProductDetail} />
      <CheckoutModal
        isOpen={ui.isCheckoutOpen}
        onClose={ui.closeCheckout}
        onOrderSuccess={(order) => {
          ui.openOrderTracking(order);
        }}
      />
      <OrderTrackingModal order={ui.activeOrderTracking} onClose={ui.closeOrderTracking} />
      <UserProfileModal isOpen={ui.isUserProfileOpen} onClose={ui.closeUserProfile} />
    </>
  );
}
