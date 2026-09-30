import { products, type Product } from "./products";

export type RecipeIngredient = {
  productId: string;
  name: string;
  quantityNote: string;
  unitLabel?: string;
  essential: boolean;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  servingsDefault: number;
  caloriesPerServing: number;
  difficulty: "Easy" | "Medium" | "Quick";
  chefTip: string;
  emoji: string;
  ingredients: RecipeIngredient[];
};

export const RECIPES: Recipe[] = [
  {
    id: "paneer-butter-masala",
    title: "Paneer Butter Masala",
    description: "Rich, creamy restaurant-style cottage cheese curry with velvety tomato gravy.",
    prepTime: "25 mins",
    servingsDefault: 4,
    caloriesPerServing: 380,
    difficulty: "Medium",
    chefTip: "Pan-fry paneer cubes lightly in butter before folding into the gravy for best texture.",
    emoji: "🍲",
    ingredients: [
      { productId: "p15", name: "Malai Paneer", quantityNote: "200 g pack", essential: true },
      { productId: "p5", name: "Tomato Hybrid", quantityNote: "500 g fresh", essential: true },
      { productId: "p6", name: "Onion", quantityNote: "1 kg pack", essential: true },
      { productId: "p18", name: "Amul Butter", quantityNote: "100 g", essential: true },
      { productId: "p9", name: "Coriander Bunch", quantityNote: "100 g garnish", essential: false },
    ],
  },
  {
    id: "healthy-breakfast",
    title: "Healthy High-Protein Breakfast",
    description: "Scrambled farm eggs, whole wheat toast, ripe bananas, and fresh milk.",
    prepTime: "12 mins",
    servingsDefault: 2,
    caloriesPerServing: 340,
    difficulty: "Easy",
    chefTip: "Whisk eggs with a splash of milk for ultra-fluffy scramble.",
    emoji: "🍳",
    ingredients: [
      { productId: "p20", name: "Farm Eggs", quantityNote: "6 pcs", essential: true },
      { productId: "p46", name: "Whole Wheat Bread", quantityNote: "400 g", essential: true },
      { productId: "p13", name: "Toned Milk", quantityNote: "500 ml", essential: true },
      { productId: "p2", name: "Robusta Banana", quantityNote: "6 pcs", essential: false },
    ],
  },
  {
    id: "party-snacks",
    title: "Weekend Party Snack Platter",
    description: "Crowd favorite crunchies, chilled beverages, and chocolates for the gang.",
    prepTime: "5 mins",
    servingsDefault: 10,
    caloriesPerServing: 280,
    difficulty: "Quick",
    chefTip: "Serve chips in a bowl dusted with a pinch of peri-peri or chaat masala.",
    emoji: "🎉",
    ingredients: [
      { productId: "p30", name: "Classic Salted Chips", quantityNote: "52 g pack", essential: true },
      { productId: "p31", name: "Aloo Bhujia", quantityNote: "200 g", essential: true },
      { productId: "p42", name: "Thums Up", quantityNote: "750 ml bottle", essential: true },
      { productId: "p35", name: "Dairy Milk Silk", quantityNote: "150 g bar", essential: false },
      { productId: "p37", name: "Instant Noodles Masala", quantityNote: "4 packs", essential: false },
    ],
  },
  {
    id: "weekly-staples",
    title: "Essential Family Grocery Kit",
    description: "Chakki fresh atta, unpolished pulses, aged basmati, pure mustard oil, and onions.",
    prepTime: "Staples",
    servingsDefault: 4,
    caloriesPerServing: 0,
    difficulty: "Quick",
    chefTip: "Rest your kneaded atta for 15 minutes for feather-light soft rotis.",
    emoji: "🌾",
    ingredients: [
      { productId: "p21", name: "Chakki Atta", quantityNote: "5 kg bag", essential: true },
      { productId: "p25", name: "Toor Dal", quantityNote: "1 kg pack", essential: true },
      { productId: "p23", name: "Basmati Rice", quantityNote: "5 kg bag", essential: true },
      { productId: "p28", name: "Mustard Oil", quantityNote: "1 L bottle", essential: true },
      { productId: "p7", name: "Potato", quantityNote: "1 kg", essential: false },
      { productId: "p6", name: "Onion", quantityNote: "1 kg", essential: false },
    ],
  },
  {
    id: "dal-khichdi",
    title: "Comfort Dal Khichdi",
    description: "Soothing yellow moong dal and aromatic rice tempered with golden cumin butter.",
    prepTime: "20 mins",
    servingsDefault: 3,
    caloriesPerServing: 310,
    difficulty: "Easy",
    chefTip: "Finish with a generous dollop of butter and a pinch of roasted jeera.",
    emoji: "🥣",
    ingredients: [
      { productId: "p27", name: "Moong Dal", quantityNote: "500 g", essential: true },
      { productId: "p24", name: "Sona Masoori Rice", quantityNote: "5 kg (uses 250g)", essential: true },
      { productId: "p18", name: "Amul Butter", quantityNote: "100 g", essential: true },
      { productId: "p5", name: "Tomato Hybrid", quantityNote: "500 g", essential: false },
    ],
  },
  {
    id: "chai-biscuit",
    title: "Classic Evening Chai & Bites",
    description: "Kadak Assam milk tea accompanied by crisp Marie gold and elaichi biscuits.",
    prepTime: "8 mins",
    servingsDefault: 4,
    caloriesPerServing: 180,
    difficulty: "Quick",
    chefTip: "Crush fresh ginger and cardamom straight into boiling water before adding tea leaves.",
    emoji: "☕",
    ingredients: [
      { productId: "p39", name: "Red Label Tea", quantityNote: "1 kg", essential: true },
      { productId: "p13", name: "Toned Milk", quantityNote: "500 ml", essential: true },
      { productId: "p33", name: "Marie Gold Biscuits", quantityNote: "250 g", essential: true },
      { productId: "p50", name: "Elaichi Rusk", quantityNote: "300 g", essential: false },
    ],
  },
  {
    id: "protein-power",
    title: "High-Protein Athlete Meal",
    description: "Lean chicken breast cuts, organic Greek yogurt, almonds, and farm fresh eggs.",
    prepTime: "22 mins",
    servingsDefault: 2,
    caloriesPerServing: 520,
    difficulty: "Medium",
    chefTip: "Sear chicken on high heat for 3 minutes per side to lock in all juices.",
    emoji: "💪",
    ingredients: [
      { productId: "p52", name: "Chicken Breast Boneless", quantityNote: "450 g", essential: true },
      { productId: "p20", name: "Farm Eggs", quantityNote: "6 pcs", essential: true },
      { productId: "p16", name: "Greek Yogurt", quantityNote: "125 g", essential: true },
      { productId: "p36", name: "Roasted Almonds", quantityNote: "500 g", essential: false },
    ],
  },
];

export function findRecipeForPrompt(query: string): Recipe {
  const q = query.toLowerCase().trim();
  if (q.includes("paneer") || q.includes("butter masala")) return RECIPES[0]!;
  if (q.includes("breakfast") || q.includes("egg") || q.includes("300")) return RECIPES[1]!;
  if (q.includes("snack") || q.includes("party") || q.includes("10")) return RECIPES[2]!;
  if (q.includes("staple") || q.includes("family") || q.includes("weekly") || q.includes("atta")) return RECIPES[3]!;
  if (q.includes("khichdi") || q.includes("dal")) return RECIPES[4]!;
  if (q.includes("chai") || q.includes("tea") || q.includes("coffee")) return RECIPES[5]!;
  if (q.includes("protein") || q.includes("gym") || q.includes("chicken")) return RECIPES[6]!;

  // Dynamic fallback matching any keywords
  const matched = RECIPES.find((r) =>
    r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q),
  );
  if (matched) return matched;

  // Otherwise synthesize or pick first
  return {
    id: "custom-" + Date.now(),
    title: query.length > 3 ? query.charAt(0).toUpperCase() + query.slice(1) : "Chef's Special Basket",
    description: `AI-customized cart curated for "${query}" with balanced fresh ingredients.`,
    prepTime: "15 mins",
    servingsDefault: 4,
    caloriesPerServing: 350,
    difficulty: "Easy",
    chefTip: "Always season to taste with a touch of freshly chopped herbs at the end.",
    emoji: "✨",
    ingredients: [
      { productId: "p13", name: "Toned Milk", quantityNote: "500 ml", essential: true },
      { productId: "p5", name: "Tomato Hybrid", quantityNote: "500 g", essential: true },
      { productId: "p6", name: "Onion", quantityNote: "1 kg", essential: true },
      { productId: "p18", name: "Amul Butter", quantityNote: "100 g", essential: false },
    ],
  };
}

export function getProductForIngredient(ing: RecipeIngredient): Product | undefined {
  return products.find((p) => p.id === ing.productId);
}
