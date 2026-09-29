import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section id="categories" className="py-4">
      <h2 className="mb-3 text-lg font-extrabold sm:text-xl">Shop by category</h2>
      <ul className="grid grid-cols-5 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="group flex w-full flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-primary-tint"
            >
              <span className="grid aspect-square w-full place-items-center rounded-xl bg-muted text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95">
                {c.emoji}
              </span>
              <span className="text-center text-[11px] font-semibold leading-tight">{c.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
