export type UnitOption = { label: string; price: number; mrp: number };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  units: UnitOption[];
  rating: number;
  reviewCount: number;
  emoji: string;
  tags: string[];
  nutrition: { energy: string; protein: string; carbs: string; fat: string };
  deliveryTime: number;
  inStock: boolean;
};

type Seed = [
  id: string,
  name: string,
  brand: string,
  category: string,
  subcategory: string,
  price: number,
  mrp: number,
  unit: string,
  rating: number,
  reviews: number,
  emoji: string,
  tags: string,
];

const seeds: Seed[] = [
  // Fruits & Veg
  ["p1", "Shimla Apple", "Fresh Harvest", "fruits-veg", "Fresh Fruits", 148, 199, "1 kg", 4.4, 2310, "🍎", "veg,seasonal"],
  ["p2", "Robusta Banana", "Fresh Harvest", "fruits-veg", "Fresh Fruits", 46, 58, "6 pcs", 4.3, 5120, "🍌", "veg,high-potassium"],
  ["p3", "Alphonso Mango", "Ratnagiri Farms", "fruits-veg", "Fresh Fruits", 420, 549, "1 kg", 4.6, 890, "🥭", "veg,seasonal,premium"],
  ["p4", "Nagpur Orange", "Fresh Harvest", "fruits-veg", "Fresh Fruits", 89, 120, "1 kg", 4.2, 1740, "🍊", "veg,vitamin-c"],
  ["p5", "Tomato Hybrid", "Daily Basket", "fruits-veg", "Fresh Vegetables", 32, 45, "500 g", 4.1, 8820, "🍅", "veg"],
  ["p6", "Onion", "Daily Basket", "fruits-veg", "Fresh Vegetables", 38, 50, "1 kg", 4.0, 9410, "🧅", "veg"],
  ["p7", "Potato", "Daily Basket", "fruits-veg", "Fresh Vegetables", 34, 44, "1 kg", 4.2, 7630, "🥔", "veg"],
  ["p8", "Baby Spinach", "Green Leaf", "fruits-veg", "Fresh Vegetables", 29, 40, "250 g", 4.3, 1120, "🥬", "veg,organic,iron-rich"],
  ["p9", "Coriander Bunch", "Green Leaf", "fruits-veg", "Herbs & Seasonings", 12, 20, "100 g", 4.1, 4300, "🌿", "veg"],
  ["p10", "Avocado", "Exotica", "fruits-veg", "Exotics", 179, 240, "2 pcs", 4.4, 620, "🥑", "veg,healthy-fats"],
  ["p11", "Broccoli", "Exotica", "fruits-veg", "Exotics", 74, 95, "400 g", 4.2, 980, "🥦", "veg,high-fibre"],
  ["p12", "Lemon", "Daily Basket", "fruits-veg", "Fresh Vegetables", 24, 35, "250 g", 4.0, 3210, "🍋", "veg"],

  // Dairy & Eggs
  ["p13", "Toned Milk", "Amul", "dairy-eggs", "Milk", 33, 35, "500 ml", 4.6, 21400, "🥛", "veg,daily"],
  ["p14", "Full Cream Milk", "Mother Dairy", "dairy-eggs", "Milk", 39, 42, "500 ml", 4.5, 15600, "🥛", "veg"],
  ["p15", "Malai Paneer", "Amul", "dairy-eggs", "Curd & Paneer", 94, 110, "200 g", 4.5, 6740, "🧀", "veg,high-protein"],
  ["p16", "Greek Yogurt", "Epigamia", "dairy-eggs", "Curd & Paneer", 65, 75, "125 g", 4.4, 3390, "🥣", "veg,high-protein"],
  ["p17", "Dahi Cup", "Mother Dairy", "dairy-eggs", "Curd & Paneer", 30, 35, "400 g", 4.3, 8800, "🍶", "veg,probiotic"],
  ["p18", "Amul Butter", "Amul", "dairy-eggs", "Butter & Cheese", 58, 62, "100 g", 4.7, 19200, "🧈", "veg"],
  ["p19", "Cheese Slices", "Britannia", "dairy-eggs", "Butter & Cheese", 125, 150, "200 g", 4.2, 2410, "🧀", "veg"],
  ["p20", "Farm Eggs", "Eggoz", "dairy-eggs", "Eggs", 89, 108, "6 pcs", 4.5, 7120, "🥚", "high-protein"],

  // Atta & Rice
  ["p21", "Chakki Atta", "Aashirvaad", "atta-rice", "Atta & Flours", 245, 285, "5 kg", 4.6, 32100, "🌾", "veg,staple"],
  ["p22", "Besan", "Rajdhani", "atta-rice", "Atta & Flours", 78, 95, "500 g", 4.3, 4120, "🫘", "veg,gluten-free"],
  ["p23", "Basmati Rice", "India Gate", "atta-rice", "Rice", 429, 520, "5 kg", 4.5, 11800, "🍚", "veg,gluten-free"],
  ["p24", "Sona Masoori Rice", "Daawat", "atta-rice", "Rice", 319, 380, "5 kg", 4.2, 5210, "🍚", "veg,gluten-free"],
  ["p25", "Toor Dal", "Tata Sampann", "atta-rice", "Dals & Pulses", 164, 195, "1 kg", 4.4, 9320, "🫘", "veg,high-protein"],
  ["p26", "Rajma Chitra", "Tata Sampann", "atta-rice", "Dals & Pulses", 148, 175, "1 kg", 4.3, 3210, "🫘", "veg,high-protein"],
  ["p27", "Moong Dal", "Organic Tattva", "atta-rice", "Dals & Pulses", 132, 160, "500 g", 4.4, 2110, "🫘", "veg,organic,high-protein"],
  ["p28", "Mustard Oil", "Fortune", "atta-rice", "Oils", 178, 210, "1 L", 4.3, 7800, "🫒", "veg"],
  ["p29", "Cold Pressed Groundnut Oil", "Anveshan", "atta-rice", "Oils", 399, 480, "1 L", 4.5, 1420, "🫒", "veg,organic"],

  // Snacks
  ["p30", "Classic Salted Chips", "Lay's", "snacks", "Chips & Namkeen", 20, 20, "52 g", 4.4, 41200, "🥔", "veg"],
  ["p31", "Aloo Bhujia", "Haldiram's", "snacks", "Chips & Namkeen", 52, 60, "200 g", 4.5, 18300, "🍘", "veg"],
  ["p32", "Nagpur Sev", "Chitale", "snacks", "Chips & Namkeen", 68, 80, "250 g", 4.3, 2200, "🍘", "veg,local"],
  ["p33", "Marie Gold Biscuits", "Britannia", "snacks", "Biscuits", 35, 40, "250 g", 4.4, 22800, "🍪", "veg"],
  ["p34", "Dark Fantasy Choco Fills", "Sunfeast", "snacks", "Biscuits", 85, 100, "300 g", 4.6, 16400, "🍫", "veg"],
  ["p35", "Dairy Milk Silk", "Cadbury", "snacks", "Chocolates", 160, 180, "150 g", 4.7, 29100, "🍫", "veg"],
  ["p36", "Roasted Almonds", "Nutraj", "snacks", "Chips & Namkeen", 289, 349, "500 g", 4.4, 3120, "🥜", "veg,high-protein"],
  ["p37", "Instant Noodles Masala", "Maggi", "snacks", "Instant Food", 60, 72, "4 packs", 4.5, 51200, "🍜", "veg"],
  ["p38", "Poha", "Swastik", "snacks", "Instant Food", 44, 55, "500 g", 4.2, 2940, "🥣", "veg,gluten-free"],

  // Beverages
  ["p39", "Red Label Tea", "Brooke Bond", "beverages", "Tea & Coffee", 265, 310, "1 kg", 4.5, 14200, "🍵", "veg"],
  ["p40", "Filter Coffee Powder", "Bru", "beverages", "Tea & Coffee", 192, 225, "200 g", 4.3, 6100, "☕", "veg"],
  ["p41", "Green Tea Bags", "Tetley", "beverages", "Tea & Coffee", 178, 220, "50 bags", 4.2, 3410, "🍵", "veg,organic"],
  ["p42", "Thums Up", "Coca-Cola", "beverages", "Soft Drinks", 45, 50, "750 ml", 4.4, 22100, "🥤", "veg"],
  ["p43", "Mixed Fruit Juice", "Real", "beverages", "Juices", 110, 130, "1 L", 4.1, 8700, "🧃", "veg"],
  ["p44", "Tender Coconut Water", "Cocojal", "beverages", "Juices", 60, 75, "200 ml", 4.3, 1210, "🥥", "veg,organic"],
  ["p45", "Horlicks Classic", "Horlicks", "beverages", "Health Drinks", 285, 330, "500 g", 4.4, 9900, "🥛", "veg,high-protein"],

  // Bakery
  ["p46", "Whole Wheat Bread", "Harvest Gold", "bakery", "Bread", 48, 55, "400 g", 4.3, 11200, "🍞", "veg,high-fibre"],
  ["p47", "Multigrain Bread", "The Health Factory", "bakery", "Bread", 89, 105, "350 g", 4.4, 1820, "🍞", "veg,high-protein"],
  ["p48", "Ladi Pav", "Modern", "bakery", "Buns & Pav", 35, 40, "6 pcs", 4.2, 5400, "🥖", "veg"],
  ["p49", "Butter Croissant", "Theobroma", "bakery", "Cakes", 95, 110, "2 pcs", 4.5, 940, "🥐", "veg"],
  ["p50", "Elaichi Rusk", "Britannia", "bakery", "Rusk", 55, 65, "300 g", 4.3, 7200, "🍞", "veg"],

  // Meat & Fish
  ["p51", "Chicken Curry Cut", "Licious", "meat-fish", "Chicken", 289, 349, "500 g", 4.5, 8200, "🍗", "high-protein"],
  ["p52", "Chicken Breast Boneless", "Licious", "meat-fish", "Chicken", 349, 420, "450 g", 4.6, 6100, "🍗", "high-protein"],
  ["p53", "Rohu Fish Curry Cut", "FreshToHome", "meat-fish", "Fish", 259, 320, "500 g", 4.2, 2300, "🐟", "high-protein"],
  ["p54", "Mutton Curry Cut", "Licious", "meat-fish", "Mutton", 599, 699, "500 g", 4.4, 1900, "🥩", "high-protein"],
  ["p55", "Chicken Seekh Kebab", "ITC Master Chef", "meat-fish", "Ready to Cook", 245, 299, "400 g", 4.3, 1420, "🍢", "high-protein"],

  // Personal Care
  ["p56", "Mysore Sandal Soap", "Mysore Sandal", "personal-care", "Bath & Body", 58, 65, "3 x 75 g", 4.6, 12400, "🧼", "veg"],
  ["p57", "Anti-Hairfall Shampoo", "Dove", "personal-care", "Hair Care", 289, 349, "650 ml", 4.4, 9800, "🧴", "veg"],
  ["p58", "Coconut Hair Oil", "Parachute", "personal-care", "Hair Care", 99, 115, "250 ml", 4.5, 18200, "🥥", "veg"],
  ["p59", "Toothpaste Cavity Shield", "Colgate", "personal-care", "Oral Care", 112, 130, "200 g", 4.5, 20100, "🪥", "veg"],
  ["p60", "Aloe Vera Face Wash", "Mamaearth", "personal-care", "Skin Care", 199, 249, "150 ml", 4.2, 5400, "🧴", "veg,organic"],

  // Cleaning
  ["p61", "Matic Front Load Detergent", "Surf Excel", "cleaning", "Detergents", 429, 499, "2 kg", 4.5, 8600, "🧺", "household"],
  ["p62", "Dishwash Gel Lemon", "Vim", "cleaning", "Dishwash", 179, 210, "1.8 L", 4.4, 11100, "🍋", "household"],
  ["p63", "Floor Cleaner Citrus", "Lizol", "cleaning", "Floor Cleaners", 189, 225, "975 ml", 4.4, 9300, "🧴", "household"],
  ["p64", "Air Freshener Lavender", "Godrej aer", "cleaning", "Fresheners", 220, 260, "240 ml", 4.1, 3200, "🌸", "household"],

  // Baby Care
  ["p65", "Baby Diapers Pants M", "Pampers", "baby-care", "Diapers", 649, 799, "56 pcs", 4.5, 14300, "🍼", "baby"],
  ["p66", "Baby Cereal Rice", "Nestle Cerelac", "baby-care", "Baby Food", 289, 330, "300 g", 4.4, 6700, "🥣", "veg,baby"],
  ["p67", "Baby Moisturising Lotion", "Himalaya", "baby-care", "Baby Bath", 215, 250, "400 ml", 4.3, 4100, "🧴", "baby"],
  ["p68", "Water Wipes", "Mother Sparsh", "baby-care", "Wipes", 249, 299, "80 pcs", 4.5, 2900, "🧻", "baby,organic"],
];

function unitsFor(unit: string, price: number, mrp: number): UnitOption[] {
  const m = unit.match(/^(\d+(?:\.\d+)?)\s*(kg|g|ml|L|pcs|packs|bags)$/i);
  if (!m) return [{ label: unit, price, mrp }];
  const qty = parseFloat(m[1]!);
  const suffix = m[2]!;
  const factors = [0.5, 1, 2];
  return factors
    .map((f) => {
      const q = qty * f;
      if (q < 1 && /pcs|packs|bags/i.test(suffix)) return null;
      const label = `${Number.isInteger(q) ? q : q} ${suffix}`;
      return {
        label,
        price: Math.round(price * f),
        mrp: Math.round(mrp * f),
      };
    })
    .filter((u): u is UnitOption => u !== null);
}

export const products: Product[] = seeds.map(
  ([id, name, brand, category, subcategory, price, mrp, unit, rating, reviewCount, emoji, tags]) => ({
    id,
    name,
    brand,
    category,
    subcategory,
    price,
    mrp,
    units: unitsFor(unit, price, mrp),
    rating,
    reviewCount,
    emoji,
    tags: tags.split(","),
    nutrition: { energy: "—", protein: "—", carbs: "—", fat: "—" },
    deliveryTime: 8 + (parseInt(id.slice(1), 10) % 5),
    inStock: id !== "p54",
  }),
);

export const productById = (id: string) => products.find((p) => p.id === id);

const pick = (ids: string[]) => ids.map(productById).filter((p): p is Product => Boolean(p));

export const rails = {
  pickedForYou: pick(["p15", "p8", "p20", "p13", "p47", "p27", "p44", "p11"]),
  buyAgain: pick(["p13", "p21", "p18", "p37", "p6", "p46", "p5", "p33"]),
  trending: pick(["p3", "p35", "p51", "p1", "p34", "p42", "p16", "p30"]),
  dealsOfTheDay: pick(["p23", "p61", "p57", "p65", "p29", "p36", "p45", "p52"]),
  underNinetyNine: products.filter((p) => p.price < 99).slice(0, 10),
};
