import React, { useEffect, useState } from "react";
import { useCart, cartCount, setCartOpen } from "../lib/cart-store";

export default function CartButton() {
  const cart = useCart();
  // localStorage cart state only exists in the browser, so the badge/count
  // must not render until after mount — otherwise the first client render
  // differs from the SSR HTML and React discards the header tree on hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const count = mounted ? cartCount(cart) : 0;

  return (
    <button
      onClick={() => setCartOpen(true)}
      aria-label={`Open cart${count > 0 ? `, ${count} items` : ""}`}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-crave-night/15 text-crave-night transition-colors duration-300 hover:bg-crave-rosa hover:border-crave-rosa shrink-0"
    >
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 7h15l-1.5 9h-12z" />
        <path d="M6 7l-1-4H2" />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-crave-night text-crave-pastel text-[11px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
