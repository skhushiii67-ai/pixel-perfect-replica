import { useState } from "react";
import { Mic, Sparkles } from "lucide-react";
import { useToast } from "@/store/toast";

const chips = [
  "Paneer butter masala for 4",
  "Healthy breakfast under ₹300",
  "Party snacks for 10",
  "Weekly staples for a family",
];

export function AiPromptStrip() {
  const [value, setValue] = useState("");
  const toast = useToast();

  return (
    <section id="ai" className="py-4">
      <div className="ai-gradient-border rounded-2xl p-5 shadow-soft">
        <p className="flex items-center gap-2 text-base font-extrabold">
          <Sparkles className="h-5 w-5 text-ai-2" aria-hidden="true" />
          <span className="ai-gradient-text">What are you cooking today?</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe the dish and FreshMate builds the cart with the right quantities.
        </p>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast("Recipe-to-cart arrives in the AI step");
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. Dal khichdi for 3 people"
            aria-label="Describe what you're cooking"
            className="h-12 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none"
          />
          <button
            type="button"
            aria-label="Speak your recipe"
            onClick={() => toast("Voice input arrives with the AI assistant")}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full ai-gradient-bg px-5 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
          >
            Build cart
          </button>
        </form>

        <ul className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => setValue(c)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted"
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
