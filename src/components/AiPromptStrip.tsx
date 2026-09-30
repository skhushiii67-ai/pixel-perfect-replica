import { useState } from "react";
import { Mic, Sparkles, Bot, ArrowRight } from "lucide-react";
import { useToast } from "@/store/toast";
import { useUI } from "@/store/ui";
import { findRecipeForPrompt } from "@/data/recipes";

const chips = [
  "Paneer butter masala for 4",
  "Healthy breakfast under ₹300",
  "Party snacks for 10",
  "Weekly staples for a family",
  "Comfort Dal Khichdi",
  "Classic Evening Chai & Bites",
];

export function AiPromptStrip() {
  const [value, setValue] = useState("");
  const toast = useToast();
  const { openRecipe, openAiAssistant } = useUI();

  const handleBuildCart = (query: string) => {
    const q = query.trim();
    if (!q) {
      toast("Please enter a dish or recipe idea");
      return;
    }
    const recipe = findRecipeForPrompt(q);
    openRecipe(recipe);
  };

  return (
    <section id="ai" className="py-4">
      <div className="ai-gradient-border rounded-2xl p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="flex items-center gap-2 text-base font-extrabold">
              <Sparkles className="h-5 w-5 text-ai-2" aria-hidden="true" />
              <span className="ai-gradient-text">What are you cooking today?</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Describe any dish and FreshMate calculates exact ingredient quantities in seconds.
            </p>
          </div>

          <button
            type="button"
            onClick={openAiAssistant}
            className="flex items-center gap-1.5 rounded-full border border-ai-2/40 bg-card px-3.5 py-1.5 text-xs font-bold text-foreground shadow-soft hover:bg-muted transition-all"
          >
            <Bot className="h-3.5 w-3.5 text-ai-2" />
            <span>Chat with AI Chef</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleBuildCart(value);
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. Paneer butter masala for 4, Dal khichdi, Breakfast…"
            aria-label="Describe what you're cooking"
            className="h-12 flex-1 rounded-full border border-border bg-background px-4 text-xs sm:text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            aria-label="Speak your recipe"
            onClick={() => {
              openAiAssistant();
              toast("Opening voice assistant...");
            }}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
            title="Voice recipe assistant"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full ai-gradient-bg px-5 text-xs sm:text-sm font-bold text-primary-foreground shadow-soft transition-transform active:scale-95"
          >
            Build cart ✨
          </button>
        </form>

        <ul className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  setValue(c);
                  handleBuildCart(c);
                }}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold transition-all hover:border-primary/40 hover:bg-primary-tint hover:text-primary active:scale-95"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
