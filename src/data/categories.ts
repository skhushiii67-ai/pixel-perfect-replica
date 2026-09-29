export type Category = {
  id: string;
  name: string;
  emoji: string;
  subcategories: string[];
};

export const categories: Category[] = [
  {
    id: "fruits-veg",
    name: "Fruits & Veg",
    emoji: "🥬",
    subcategories: ["Fresh Fruits", "Fresh Vegetables", "Herbs & Seasonings", "Exotics"],
  },
  {
    id: "dairy-eggs",
    name: "Dairy & Eggs",
    emoji: "🥛",
    subcategories: ["Milk", "Curd & Paneer", "Butter & Cheese", "Eggs"],
  },
  {
    id: "atta-rice",
    name: "Atta & Rice",
    emoji: "🌾",
    subcategories: ["Atta & Flours", "Rice", "Dals & Pulses", "Oils"],
  },
  {
    id: "snacks",
    name: "Snacks",
    emoji: "🍿",
    subcategories: ["Chips & Namkeen", "Biscuits", "Chocolates", "Instant Food"],
  },
  {
    id: "beverages",
    name: "Beverages",
    emoji: "🥤",
    subcategories: ["Tea & Coffee", "Soft Drinks", "Juices", "Health Drinks"],
  },
  {
    id: "bakery",
    name: "Bakery",
    emoji: "🍞",
    subcategories: ["Bread", "Buns & Pav", "Cakes", "Rusk"],
  },
  {
    id: "meat-fish",
    name: "Meat & Fish",
    emoji: "🍗",
    subcategories: ["Chicken", "Fish", "Mutton", "Ready to Cook"],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    emoji: "🧴",
    subcategories: ["Bath & Body", "Hair Care", "Oral Care", "Skin Care"],
  },
  {
    id: "cleaning",
    name: "Cleaning",
    emoji: "🧼",
    subcategories: ["Detergents", "Dishwash", "Floor Cleaners", "Fresheners"],
  },
  {
    id: "baby-care",
    name: "Baby Care",
    emoji: "🍼",
    subcategories: ["Diapers", "Baby Food", "Baby Bath", "Wipes"],
  },
];
