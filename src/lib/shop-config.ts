import { formatRs, type Product } from "./products";

// Single configuration point for WhatsApp ordering.
// No WhatsApp number existed in the project, so it is defined once here.
// Use the shop's sales number in international format (no "+", spaces or dashes).
export const WHATSAPP_NUMBER = "442079460958";

export interface OrderLine {
  product: Product;
  qty: number;
}

export function buildWhatsAppOrderUrl(lines: OrderLine[]): string {
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const itemLines = lines.map((l, i) => {
    const unit = formatRs(l.product.price);
    const pricePart = l.qty > 1 ? `${unit} x ${l.qty}` : unit;
    return `${i + 1}. ${l.product.name}\n   Qty: ${l.qty}\n   Price: ${pricePart}`;
  });

  const message = [
    "Hello Twinkle Bakes! \u{1F382}",
    "",
    "I'd like to place an order:",
    "",
    ...itemLines,
    "",
    "--------------------",
    `Total: ${formatRs(total)}`,
    "",
    "Please confirm availability and order details.",
    "Thank you!",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
