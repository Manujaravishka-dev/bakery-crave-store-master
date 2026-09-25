import React from "react";
import { formatRs, getProductById } from "../lib/products";
import { buildWhatsAppOrderUrl } from "../lib/shop-config";
import {
  useCart,
  cartSubtotal,
  setQty,
  removeLine,
  setCartOpen,
} from "../lib/cart-store";

export default function CartDrawer() {
  const cart = useCart();
  const lines = cart.lines
    .map((l) => ({ line: l, product: getProductById(l.id) }))
    .filter((x) => x.product !== undefined);
  const subtotal = cartSubtotal(cart);

  if (!cart.open) return null;

  const orderUrl =
    lines.length > 0
      ? buildWhatsAppOrderUrl(
          lines.map((x) => ({ product: x.product!, qty: x.line.qty }))
        )
      : "#";

  return (
    <div
      className="fixed inset-0 z-[70]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div
        className="absolute inset-0 bg-crave-night/60 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-crave-pastel flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-crave-night/10">
          <h2 className="font-playfair text-2xl text-crave-night">
            Your Cart{" "}
            <span className="text-base text-crave-night/50">
              ({lines.reduce((n, x) => n + x.line.qty, 0)})
            </span>
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="w-10 h-10 rounded-full border border-crave-night/15 flex items-center justify-center text-lg text-crave-night transition-colors hover:bg-crave-rosa hover:border-crave-rosa"
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-playfair italic text-2xl text-crave-night/70">
              Your cart is empty.
            </p>
            <a
              href="/menu"
              onClick={() => setCartOpen(false)}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-crave-night text-crave-pastel text-[13px] font-semibold transition-colors duration-300 hover:bg-crave-rosa hover:text-crave-night"
            >
              <span>Explore Menu</span>
              <span
                className="w-7 h-7 rounded-full bg-crave-pastel/20 flex items-center justify-center"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4">
              {lines.map(({ line, product }) => (
                <li
                  key={line.id}
                  className="flex gap-4 rounded-[20px] bg-white border border-crave-night/10 p-3"
                >
                  <img
                    src={product!.image}
                    alt={product!.name}
                    className="w-20 h-20 shrink-0 rounded-[14px] object-cover bg-crave-rosa/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-playfair text-base leading-snug text-crave-night truncate">
                      {product!.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-crave-night">
                      {formatRs(product!.price)}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-crave-night/15">
                        <button
                          onClick={() => setQty(line.id, line.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-crave-night hover:text-crave-rosa transition-colors"
                          aria-label={`Decrease quantity of ${product!.name}`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-crave-night">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => setQty(line.id, line.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-crave-night hover:text-crave-rosa transition-colors"
                          aria-label={`Increase quantity of ${product!.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeLine(line.id)}
                        className="text-xs text-crave-night/50 underline-offset-4 hover:underline hover:text-crave-night transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-5 sm:px-6 py-5 border-t border-crave-night/10 bg-white">
              <div className="flex items-center justify-between text-crave-night">
                <span className="text-sm font-medium">Subtotal:</span>
                <span className="text-lg font-semibold">
                  {formatRs(subtotal)}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-full border border-crave-night px-6 py-3 text-[13px] font-semibold text-crave-night transition-colors duration-300 hover:bg-crave-rosa hover:border-crave-rosa"
                >
                  Continue Shopping
                </button>
                <a
                  href={orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-full bg-crave-night px-6 py-3 text-[13px] font-semibold text-crave-pastel transition-colors duration-300 hover:bg-crave-rosa hover:text-crave-night"
                >
                  Place Order via WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
