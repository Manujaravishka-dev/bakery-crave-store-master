import { formatRs, type Product } from "./products";

// Single configuration point for WhatsApp ordering.
// No WhatsApp number existed in the project, so it is defined once here.
// Use the shop's sales number in international format (no "+", spaces or dashes).
export const WHATSAPP_NUMBER = "442079460958";

// Single configuration point for the Contact page map.
// No real business address is configured anywhere in the project yet —
// update this value and the map will follow. Keep it in sync with the
// address displayed in the contact information section.
export const BUSINESS_MAP_QUERY = "123 High Street, London";

export function buildGoogleMapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS_MAP_QUERY)}&output=embed`;
}

export const WHATSAPP_CHAT_MESSAGE = [
  "Hello Twinkle Bakes! \u{1F382}",
  "I'd like to know more about your cakes.",
].join("\n");

export function buildWhatsAppChatUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_CHAT_MESSAGE)}`;
}

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
