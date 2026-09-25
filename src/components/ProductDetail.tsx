import React, { useState } from "react";
import { formatRs, type Product } from "../lib/products";
import { addToCart } from "../lib/cart-store";

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      <div className="relative overflow-hidden rounded-[28px] bg-crave-rosa/20 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.16em] uppercase text-crave-night bg-crave-rosa rounded-full px-3 py-1.5">
            {product.badge}
          </span>
        )}
      </div>

      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-crave-night/50">
          {product.category}
        </p>
        <h1 className="font-playfair text-[clamp(32px,4vw,52px)] leading-tight font-medium tracking-[-0.02em] mt-3 text-crave-night">
          {product.name}
        </h1>
        <p className="mt-3 text-xl font-semibold text-crave-night">
          {formatRs(product.price)}
        </p>
        <p className="mt-5 text-[15px] md:text-base leading-[1.8] text-crave-night/70">
          {product.details}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center rounded-full border border-crave-night/20"
            aria-label="Quantity"
          >
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center text-lg text-crave-night transition-colors hover:text-crave-rosa"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold text-crave-night">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="w-11 h-11 flex items-center justify-center text-lg text-crave-night transition-colors hover:text-crave-rosa"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => addToCart(product.id, qty)}
            className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-crave-night text-crave-pastel text-[13px] font-semibold shadow-xl shadow-crave-night/10 transition-colors duration-300 hover:bg-crave-rosa hover:text-crave-night"
          >
            Add to Cart
          </button>
        </div>

        <a
          href="/menu"
          className="mt-8 inline-block text-sm text-crave-night/60 underline-offset-4 hover:underline hover:text-crave-night transition-colors"
        >
          ← Back to full menu
        </a>
      </div>
    </div>
  );
}
