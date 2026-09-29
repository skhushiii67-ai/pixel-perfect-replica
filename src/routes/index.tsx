import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AiPromptStrip } from "@/components/AiPromptStrip";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OffersStrip } from "@/components/OffersStrip";
import { ProductRail, Reveal } from "@/components/ProductRail";
import { CountdownPill } from "@/components/CountdownPill";
import { rails } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshMate — Groceries delivered in 10 minutes" },
      {
        name: "description",
        content:
          "Fresh fruits, dairy, staples and snacks at your door in 10 minutes in Nagpur, with an AI that turns any recipe into a ready cart.",
      },
      { property: "og:title", content: "FreshMate — Groceries delivered in 10 minutes" },
      {
        property: "og:description",
        content:
          "Quick-commerce grocery delivery with smart search, recipe-to-cart and budget mode.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-6">
      <Reveal>
        <div className="pt-4">
          <HeroCarousel />
        </div>
      </Reveal>
      <Reveal delay={60}>
        <AiPromptStrip />
      </Reveal>
      <Reveal delay={120}>
        <CategoryGrid />
      </Reveal>
      <Reveal delay={60}>
        <ProductRail title="Picked for you" products={rails.pickedForYou} ai />
      </Reveal>
      <Reveal delay={60}>
        <ProductRail title="Buy again" products={rails.buyAgain} />
      </Reveal>
      <Reveal delay={60}>
        <ProductRail title="Trending near you" products={rails.trending} />
      </Reveal>
      <Reveal delay={60}>
        <ProductRail
          title="Deals of the day"
          products={rails.dealsOfTheDay}
          aside={<CountdownPill />}
        />
      </Reveal>
      <Reveal delay={60}>
        <ProductRail title="Under ₹99" products={rails.underNinetyNine} />
      </Reveal>
      <Reveal delay={60}>
        <OffersStrip />
      </Reveal>
    </div>
  );
}
