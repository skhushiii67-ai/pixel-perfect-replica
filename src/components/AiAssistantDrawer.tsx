import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Mic, MicOff, Plus, ShoppingBag } from "lucide-react";
import { products, type Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import { formatINR } from "@/lib/format";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  suggestedProducts?: Product[];
  timestamp: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "bot",
    text: "Namaste! I'm FreshBot, your AI grocery & recipe assistant. 🥬 Ask me for dinner ideas, healthy swaps, budget meal kits, or ingredients for any dish!",
    timestamp: "Just now",
  },
];

const PROMPT_CHIPS = [
  "High protein snacks under ₹200",
  "Quick dinner for 2 with paneer",
  "Healthy breakfast without eggs",
  "Healthy alternatives to maida",
];

export function AiAssistantDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { add } = useCart();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI intelligent answer generation
    setTimeout(() => {
      const q = query.toLowerCase();
      let replyText = "";
      let matchedProducts: Product[] = [];

      if (q.includes("protein") || q.includes("gym")) {
        replyText =
          "Here are our top high-protein recommendations packed with clean nutrition! Paneer, farm eggs, Greek yogurt and almonds give you clean macros.";
        matchedProducts = products.filter((p) =>
          ["p15", "p20", "p16", "p36"].includes(p.id),
        );
      } else if (q.includes("paneer") || q.includes("dinner")) {
        replyText =
          "For a quick 2-person dinner, you can whip up Paneer Bhurji or Matar Paneer in 15 minutes. Here are the fresh ingredients ready for instant dispatch!";
        matchedProducts = products.filter((p) =>
          ["p15", "p5", "p6", "p18"].includes(p.id),
        );
      } else if (q.includes("breakfast") || q.includes("morning")) {
        replyText =
          "Here is an energizing, balanced breakfast basket with whole wheat fibre, probiotic yogurt, and fresh fruit:";
        matchedProducts = products.filter((p) =>
          ["p46", "p13", "p2", "p16"].includes(p.id),
        );
      } else if (q.includes("snack") || q.includes("munch")) {
        replyText =
          "Craving something savory and crunchy? Haldiram's bhujia, Chitale Nagpur sev, and dark chocolates are favorites in your area!";
        matchedProducts = products.filter((p) =>
          ["p31", "p32", "p34", "p35"].includes(p.id),
        );
      } else if (q.includes("substitute") || q.includes("alternative") || q.includes("maida")) {
        replyText =
          "Great question! For a healthier alternative to refined maida or white rice, 100% Chakki Atta and Besan (gram flour) provide complex carbs and low GI nutrition:";
        matchedProducts = products.filter((p) =>
          ["p21", "p22", "p47"].includes(p.id),
        );
      } else {
        replyText = `I found these fresh top-rated essentials for "${query}". Delivered to your doorstep in 10 minutes!`;
        matchedProducts = products.filter((p) =>
          p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
        ).slice(0, 4);
        if (matchedProducts.length === 0) {
          matchedProducts = products.slice(0, 3);
        }
      }

      const botMsg: Message = {
        id: "b-" + Date.now(),
        sender: "bot",
        text: replyText,
        suggestedProducts: matchedProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      toast("Listening... Speak your grocery query");
      setTimeout(() => {
        setIsListening(false);
        handleSend("High protein dinner under ₹300");
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[85]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="FreshMate AI Assistant"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-sheet animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl ai-gradient-bg text-primary-foreground shadow-soft">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-extrabold">FreshBot AI</h2>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-muted-foreground">Smart Recipe & Grocery Concierge</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI Assistant"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "bot" && (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg ai-gradient-bg text-primary-foreground text-xs font-bold">
                  AI
                </span>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-soft ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                    : "border border-border bg-card text-foreground rounded-tl-none"
                }`}
              >
                <p>{m.text}</p>

                {/* Suggested Products attached to message */}
                {m.suggestedProducts && m.suggestedProducts.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-border pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Recommended Ingredients:
                    </p>
                    <div className="grid gap-2">
                      {m.suggestedProducts.map((p) => {
                        const unit = p.units[0]!;
                        return (
                          <div
                            key={p.id}
                            className="flex items-center justify-between rounded-xl border border-border bg-background/80 p-2 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xl shrink-0">{p.emoji}</span>
                              <div className="min-w-0 truncate">
                                <p className="font-bold truncate text-foreground">{p.name}</p>
                                <p className="text-[11px] text-muted-foreground">
                                  {unit.label} · {formatINR(unit.price)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                add(p, unit.label);
                                toast(`Added ${p.name} to cart`);
                              }}
                              className="ml-2 flex shrink-0 items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover active:scale-95"
                            >
                              <Plus className="h-3 w-3" /> Add
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <span className="mt-1 block text-right text-[10px] opacity-60">{m.timestamp}</span>
              </div>
              {m.sender === "user" && (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary text-xs font-bold">
                  <User className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-lg ai-gradient-bg text-primary-foreground text-xs font-bold">
                AI
              </span>
              <div className="rounded-2xl border border-border bg-card px-3 py-2 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-ai-2 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-ai-2 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ai-2 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="border-t border-border bg-card/60 px-4 py-2">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-subtle-foreground">
            Suggested Prompts
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSend(chip)}
                className="shrink-0 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-primary-tint hover:border-primary/40 hover:text-primary transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-border bg-card p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask recipe, diet swap, or ingredients..."
            aria-label="Ask FreshBot"
            className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-xs sm:text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleVoiceToggle}
            aria-label={isListening ? "Stop listening" : "Voice input"}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all ${
              isListening
                ? "border-destructive bg-destructive/15 text-destructive animate-pulse"
                : "border-border bg-background hover:bg-muted"
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:bg-primary-hover active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </div>
  );
}
