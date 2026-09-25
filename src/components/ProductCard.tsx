import React from "react";
import { formatRs, type Product } from "../lib/products";
import { addToCart } from "../lib/cart-store";

export default function ProductCard({
  product,
  sharp = false,
}: {
  product: Product;
  sharp?: boolean;
}) {
  const radius = sharp ? "rounded-none" : "rounded-[24px]";
  const pill = sharp ? "rounded-none" : "rounded-full";
  return (
    <article
      className={`flex flex-col overflow-hidden ${radius} bg-white border border-crave-night/10`}
    >
      <a
        href={`/menu/${product.id}`}
        className="group relative block overflow-hidden aspect-[4/3] bg-crave-rosa/20"
        aria-label={`View details of ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold tracking-[0.16em] uppercase text-crave-night bg-crave-rosa ${pill} px-3 py-1.5`}
          >
            {product.badge}
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-crave-night/50">
          {product.category}
        </p>
        <h3 className="font-playfair text-xl mt-1.5 text-crave-night">
          <a href={`/menu/${product.id}`} className="hover:underline">
            {product.name}
          </a>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-crave-night/70 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-3 text-base font-semibold text-crave-night">
          {formatRs(product.price)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`/menu/${product.id}`}
            className={`inline-flex flex-1 items-center justify-center whitespace-nowrap ${pill} border border-crave-night px-4 py-2.5 text-xs font-semibold text-crave-night transition-colors duration-300 hover:bg-crave-rosa hover:border-crave-rosa`}
          >
            View Details
          </a>
          <button
            onClick={() => addToCart(product.id)}
            className={`inline-flex flex-1 items-center justify-center whitespace-nowrap ${pill} bg-crave-night px-4 py-2.5 text-xs font-semibold text-crave-pastel transition-colors duration-300 hover:bg-crave-rosa hover:text-crave-night`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
