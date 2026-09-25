import { useSyncExternalStore } from "react";
import { getProductById } from "./products";

export interface CartLine {
  id: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
}

const STORAGE_KEY = "twinkle-bakes-cart";

function loadLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // Drop lines for products that no longer exist.
    return parsed.filter(
      (l) => getProductById(l.id) && Number.isFinite(l.qty) && l.qty > 0
    );
  } catch {
    return [];
  }
}

let state: CartState = { lines: loadLines(), open: false };
const listeners = new Set<() => void>();

function emit(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
  } catch {
    // Storage unavailable — cart still works in memory.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartState {
  return state;
}

export function useCart(): CartState {
  return useSyncExternalStore(subscribe, getSnapshot, () => state);
}

export function cartCount(s: CartState): number {
  return s.lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(s: CartState): number {
  return s.lines.reduce((sum, l) => {
    const p = getProductById(l.id);
    return p ? sum + p.price * l.qty : sum;
  }, 0);
}

export function addToCart(id: string, qty = 1, openDrawer = true): void {
  const existing = state.lines.find((l) => l.id === id);
  const lines = existing
    ? state.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
    : [...state.lines, { id, qty }];
  emit({ lines, open: openDrawer ? true : state.open });
}

export function setQty(id: string, qty: number): void {
  const lines =
    qty <= 0
      ? state.lines.filter((l) => l.id !== id)
      : state.lines.map((l) => (l.id === id ? { ...l, qty } : l));
  emit({ ...state, lines });
}

export function removeLine(id: string): void {
  emit({ ...state, lines: state.lines.filter((l) => l.id !== id) });
}

export function clearCart(): void {
  emit({ ...state, lines: [] });
}

export function setCartOpen(open: boolean): void {
  if (state.open === open) return;
  emit({ ...state, open });
}
