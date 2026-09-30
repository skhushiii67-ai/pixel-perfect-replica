import { categories } from "@/data/categories";
import { useUI } from "@/store/ui";

export function CategoryGrid() {
  const { openCategoryExplorer } = useUI();

  return (
    <section id="categories" className="py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-extrabold sm:text-xl">Shop by category</h2>
        <button
          type="button"
          onClick={() => openCategoryExplorer()}
          className="text-xs font-bold text-primary hover:underline"
        >
          See All &rarr;
        </button>
      </div>
      <ul className="grid grid-cols-5 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => openCategoryExplorer(c.id)}
              className="group flex w-full flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-primary-tint"
            >
              <span className="grid aspect-square w-full place-items-center rounded-xl bg-muted text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95 shadow-soft">
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
