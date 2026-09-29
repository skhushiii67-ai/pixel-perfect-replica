import { categories } from "@/data/categories";

const links = {
  Company: ["About us", "Careers", "Blog", "Press"],
  Help: ["Order support", "Delivery areas", "Returns & refunds", "Contact us"],
  Legal: ["Terms of use", "Privacy policy", "Refund policy", "FSSAI licence"],
};

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-card pb-24 pt-10 md:pb-10">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-xl fresh-gradient-bg text-lg">
              🥬
            </span>
            FreshMate
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Groceries at your door in 10 minutes, with an AI that plans the meal for you.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-lg border border-border px-3 py-2 text-xs font-semibold">
               App Store
            </span>
            <span className="rounded-lg border border-border px-3 py-2 text-xs font-semibold">
              ▶ Google Play
            </span>
          </div>
        </div>

        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <h3 className="text-sm font-bold">{heading}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {items.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-[1280px] border-t border-border px-4 pt-6">
        <h3 className="text-sm font-bold">Shop by category</h3>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {categories.map((c) => (
            <li key={c.id}>
              <a href="#categories" className="transition-colors hover:text-foreground">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-subtle-foreground">
          © {new Date().getFullYear()} FreshMate Retail Pvt. Ltd. · Nagpur, Maharashtra
        </p>
      </div>
    </footer>
  );
}
