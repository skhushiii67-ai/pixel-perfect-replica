import { Sparkles } from "lucide-react";

export function AiBadge({ label = "AI" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-bold">
      <Sparkles className="h-3 w-3 text-ai-2" aria-hidden="true" />
      <span className="ai-gradient-text">{label}</span>
    </span>
  );
}
