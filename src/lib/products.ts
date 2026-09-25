// Single source of truth for the Twinkle Bakes cake-shop catalog.
// Note: the legacy mockup (src/api/mockup.json) is bread-focused with USD
// pricing, so this catalog defines the cake-shop range in Rs.
// Images reuse existing project assets (/public) and the cake photography
// already used by the Gallery.

export type ProductCategory =
  | "Cakes"
  | "Birthday Cakes"
  | "Wedding Cakes"
  | "Cupcakes"
  | "Pastries"
  | "Cookies";

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number; // Rs.
  image: string;
  category: ProductCategory;
  badge?: string;
  featured?: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Cakes",
  "Birthday Cakes",
  "Wedding Cakes",
  "Cupcakes",
  "Pastries",
  "Cookies",
];

export const PRODUCTS: Product[] = [
  {
    id: "chocolate-dream-cake",
    name: "Chocolate Dream Cake",
    description: "Rich chocolate layers with smooth chocolate frosting.",
    details:
      "Three layers of moist dark chocolate sponge filled and finished with silky chocolate frosting. Baked fresh on order — perfect for celebrations big and small. Serves 10–12.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    category: "Cakes",
    badge: "Bestseller",
    featured: true,
  },
  {
    id: "vanilla-celebration-cake",
    name: "Vanilla Celebration Cake",
    description: "Classic vanilla sponge with creamy buttercream swirls.",
    details:
      "Light Madagascan vanilla sponge layered with vanilla buttercream and finished with elegant piped swirls. A timeless crowd-pleaser. Serves 8–10.",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=80",
    category: "Cakes",
  },
  {
    id: "red-velvet-royale",
    name: "Red Velvet Royale",
    description: "Velvety cocoa crumb with tangy cream-cheese frosting.",
    details:
      "Our signature red velvet with a tender cocoa crumb, layered with tangy cream-cheese frosting and finished with crumbs and fresh berries. Serves 10–12.",
    price: 5200,
    image: "/image-4.webp",
    category: "Cakes",
  },
  {
    id: "lemon-drizzle-cake",
    name: "Lemon Drizzle Cake",
    description: "Zesty lemon sponge with a crisp citrus glaze.",
    details:
      "Bright, buttery lemon sponge soaked with citrus syrup and finished with a crisp drizzle glaze. Light, fresh and made for afternoon tea. Serves 8–10.",
    price: 3200,
    image:
      "https://www.recipetineats.com/tachyon/2021/06/French-Lemon-Tart_5-main-SQ.jpg",
    category: "Cakes",
  },
  {
    id: "confetti-birthday-cake",
    name: "Confetti Birthday Cake",
    description: "Funfetti layers with vanilla frosting and sprinkles.",
    details:
      "Party-ready funfetti sponge with fluffy vanilla frosting, rainbow sprinkles and a hand-piped birthday message. Serves 10–12.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=1200&q=80",
    category: "Birthday Cakes",
    badge: "Popular",
    featured: true,
  },
  {
    id: "candlelight-pinata-cake",
    name: "Candlelight Piñata Cake",
    description: "Chocolate shell cake hiding a sweet surprise inside.",
    details:
      "A showstopper chocolate piñata cake filled with candies and treats — crack it open at the party. Includes candles. Serves 12–15.",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
    category: "Birthday Cakes",
  },
  {
    id: "blush-tier-wedding-cake",
    name: "Blush Tier Wedding Cake",
    description: "Three-tier blush cake with delicate piped florals.",
    details:
      "Our signature three-tier wedding cake in soft blush tones with hand-piped buttercream florals. Fully customisable flavours per tier. Serves 40–50. Please order 2 weeks ahead.",
    price: 15000,
    image: "/header.webp",
    category: "Wedding Cakes",
    featured: true,
  },
  {
    id: "ivory-pearl-wedding-cake",
    name: "Ivory Pearl Wedding Cake",
    description: "Elegant ivory tiers with pearl detailing.",
    details:
      "Timeless ivory tiers with delicate pearl detailing and fresh seasonal flowers. Flavours and size tailored to your day. Serves 30–40. Please order 2 weeks ahead.",
    price: 12000,
    image: "/header.jpg",
    category: "Wedding Cakes",
  },
  {
    id: "blush-cupcake-box",
    name: "Blush Cupcake Box",
    description: "Box of 6 signature pink frosted cupcakes.",
    details:
      "Six fluffy vanilla cupcakes crowned with our signature blush frosting. Beautifully boxed — ideal for gifting and parties.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=80",
    category: "Cupcakes",
    featured: true,
  },
  {
    id: "berry-cupcake-box",
    name: "Berry Cupcake Box",
    description: "Box of 6 cupcakes topped with fresh berries.",
    details:
      "Six vanilla-bean cupcakes with whipped frosting and fresh seasonal berries. Light, fruity and always a favourite.",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    category: "Cupcakes",
  },
  {
    id: "butter-croissant-box",
    name: "Butter Croissant Box",
    description: "Box of 4 flaky all-butter croissants.",
    details:
      "Laminated over three days for shattering layers and deep buttery flavour. Baked fresh every morning. Box of 4.",
    price: 1200,
    image: "/image-6.jpg",
    category: "Pastries",
  },
  {
    id: "choc-chip-cookie-box",
    name: "Choc Chip Cookie Box",
    description: "Box of 6 gooey chocolate-chip cookies.",
    details:
      "Crisp edges, molten centres and pools of dark chocolate. Baked in small batches daily. Box of 6.",
    price: 950,
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2024/08/chocolate-chip-cookie-recipe.jpg",
    category: "Cookies",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured).slice(0, 4);
}

export function formatRs(price: number): string {
  return `Rs. ${price.toLocaleString("en-US")}`;
}
