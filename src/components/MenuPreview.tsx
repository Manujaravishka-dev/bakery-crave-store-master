import React from "react";
import { getFeaturedProducts } from "../lib/products";
import ProductCard from "./ProductCard";

export default function MenuPreview() {
  const featured = getFeaturedProducts();
  return (
    <section id="menu-preview" className="w-full bg-crave-pastel">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 justify-center text-[11px] font-bold tracking-[0.2em] text-crave-night/70">
            <span
              className="w-[7px] h-[7px] rounded-full bg-crave-rosa"
              aria-hidden="true"
            ></span>
            OUR MENU
          </p>
          <h2 className="font-playfair text-[clamp(34px,4.5vw,58px)] leading-[1.05] font-medium tracking-[-0.03em] mt-5 text-crave-night">
            A little taste of
            <br />
            <span className="italic text-crave-rosa">Twinkle Bakes.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-base leading-[1.7] text-crave-night/70 max-w-[480px] mx-auto">
            Freshly baked favourites, made with care for every sweet moment.
          </p>
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} sharp />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/menu"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-crave-night cursor-pointer"
          >
            <span className="underline-offset-4 transition-all duration-300 group-hover:underline">
              View Full Menu
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
