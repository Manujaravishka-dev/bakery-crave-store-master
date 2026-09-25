import React, { useState, useEffect, useCallback } from "react";

export type GalleryCategory =
  | "Birthday"
  | "Wedding"
  | "Custom Cakes"
  | "Cupcakes";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  name: string;
  category: GalleryCategory;
  /** Editorial sizing: "large" (2x2) | "tall" (1x2) | "wide" (2x1) | "standard" (1x1) */
  size: "large" | "tall" | "wide" | "standard";
}

// To replace an image later, just swap the `src` (local file in /public or URL).
// Local project images are reused; remote ones are high-quality Unsplash photos.
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "berry-celebration",
    src: "/image-3.jpg",
    alt: "Berry celebration cake",
    name: "Berry Celebration",
    category: "Birthday",
    size: "large",
  },
  {
    id: "chocolate-truffle",
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    alt: "Chocolate truffle layer cake",
    name: "Chocolate Truffle",
    category: "Custom Cakes",
    size: "standard",
  },
  {
    id: "vanilla-blush",
    src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=80",
    alt: "Vanilla blush wedding cake",
    name: "Vanilla Blush",
    category: "Wedding",
    size: "tall",
  },
  {
    id: "patisserie-table",
    src: "/header.webp",
    alt: "Fresh bakes from the counter",
    name: "Morning Counter",
    category: "Custom Cakes",
    size: "standard",
  },
  {
    id: "sparkler-birthday",
    src: "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=1200&q=80",
    alt: "Birthday cake with sparkler",
    name: "Make a Wish",
    category: "Birthday",
    size: "standard",
  },
  {
    id: "pink-cupcakes",
    src: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=80",
    alt: "Pink frosted cupcakes",
    name: "Blush Cupcakes",
    category: "Cupcakes",
    size: "wide",
  },
  {
    id: "candles-cake",
    src: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
    alt: "Birthday cake with candles",
    name: "Candlelight",
    category: "Birthday",
    size: "standard",
  },
  {
    id: "atelier-cake",
    src: "/image-4.webp",
    alt: "Signature atelier cake",
    name: "Atelier Signature",
    category: "Wedding",
    size: "tall",
  },
  {
    id: "berry-cupcakes",
    src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    alt: "Cupcakes topped with berries",
    name: "Berry Tops",
    category: "Cupcakes",
    size: "standard",
  },
  {
    id: "house-classic",
    src: "/image-6.jpg",
    alt: "Classic house bake",
    name: "House Classic",
    category: "Custom Cakes",
    size: "wide",
  },
  {
    id: "gold-hour",
    src: "/header.jpg",
    alt: "Golden celebration bake",
    name: "Golden Hour",
    category: "Wedding",
    size: "standard",
  },
];

const FILTERS = ["All", "Birthday", "Wedding", "Custom Cakes", "Cupcakes"] as const;
type Filter = (typeof FILTERS)[number];

const sizeClass: Record<GalleryItem["size"], string> = {
  large: "col-span-1 sm:col-span-2 row-span-2",
  wide: "col-span-1 sm:col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  standard: "col-span-1 row-span-1",
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, step]);

  // Reset selection when switching categories
  useEffect(() => {
    setLightboxIndex(null);
  }, [activeFilter]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="w-full">
      {/* Category filters */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 justify-start md:justify-center"
        role="tablist"
        aria-label="Filter gallery by category"
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                isActive
                  ? "bg-crave-rosa text-crave-night"
                  : "text-crave-night/60 hover:text-crave-night hover:bg-crave-rosa/25"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Editorial masonry-style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] sm:auto-rows-[260px] gap-4 md:gap-5">
        {filtered.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            aria-label={`Open preview of ${item.name}`}
            className={`group relative overflow-hidden rounded-[28px] bg-crave-rosa/20 text-left cursor-pointer ${sizeClass[item.size]}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-crave-night/0 transition-colors duration-300 group-hover:bg-crave-night/25"
            />
            <span className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="font-playfair italic text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                {item.name}
              </span>
              <span className="shrink-0 text-[10px] font-bold tracking-[0.18em] uppercase text-crave-night bg-crave-rosa/90 rounded-full px-3 py-1.5">
                {item.category}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-crave-night/80 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.name} preview`}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.src}
              alt={activeItem.alt}
              className="w-full max-h-[78vh] object-contain rounded-[24px] bg-crave-night"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-playfair italic text-2xl text-crave-pastel">
                  {activeItem.name}
                </p>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-crave-rosa mt-1">
                  {activeItem.category}
                </p>
              </div>
              <p className="text-xs text-crave-pastel/60 shrink-0">
                {lightboxIndex! + 1} / {filtered.length}
              </p>
            </div>

            <button
              onClick={close}
              aria-label="Close preview"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-crave-pastel text-crave-night flex items-center justify-center text-lg leading-none transition-colors hover:bg-crave-rosa"
            >
              ×
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 sm:-left-5 top-[38%] w-10 h-10 rounded-full bg-crave-pastel/90 text-crave-night flex items-center justify-center text-xl leading-none transition-colors hover:bg-crave-rosa"
                >
                  ←
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 sm:-right-5 top-[38%] w-10 h-10 rounded-full bg-crave-pastel/90 text-crave-night flex items-center justify-center text-xl leading-none transition-colors hover:bg-crave-rosa"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
