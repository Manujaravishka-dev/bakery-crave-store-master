import React, { useState } from "react";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "../lib/products";
import ProductCard from "./ProductCard";

type Filter = "All" | ProductCategory;

export default function MenuGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="w-full">
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 justify-start md:justify-center"
        role="tablist"
        aria-label="Filter menu by category"
      >
        {(["All", ...PRODUCT_CATEGORIES] as Filter[]).map((c) => {
          const isActive = filter === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(c)}
              className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                isActive
                  ? "bg-crave-rosa text-crave-night"
                  : "text-crave-night/60 hover:text-crave-night hover:bg-crave-rosa/25"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
