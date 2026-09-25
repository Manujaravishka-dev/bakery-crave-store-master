// Read-only review data/service layer for the public website.
//
// Reviews are created and managed from the backend/admin side — customers
// cannot submit reviews from the public site. This module only fetches and
// exposes reviews that are allowed to be publicly visible.
//
// To integrate Firebase/Supabase/a REST API later, implement ReviewService
// against the backend and swap it in — the UI only depends on the interface.
// Only reviews with a publicly visible status ("approved", "active" or
// "published") should ever be displayed.

export type ReviewStatus = "approved" | "active" | "published" | "pending";

export interface Review {
  id: string;
  name: string;
  rating: number; // 1–5
  comment: string;
  cakeType?: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface ReviewService {
  getApprovedReviews(): Promise<Review[]>;
}

const PUBLIC_STATUSES: ReviewStatus[] = ["approved", "active", "published"];

export function isPubliclyVisible(review: Review): boolean {
  return PUBLIC_STATUSES.includes(review.status);
}

// Seed data, also used for server-side rendering so approved reviews are
// present in the HTML before client JS runs.
export const APPROVED_REVIEWS: Review[] = [
  {
    id: "review-amara",
    name: "Amara O.",
    rating: 5,
    comment:
      "The cake was absolutely beautiful and tasted even better. Everyone loved it!",
    cakeType: "Birthday Cake",
    status: "approved",
    createdAt: "2026-08-14",
  },
  {
    id: "review-daniel",
    name: "Daniel K.",
    rating: 5,
    comment:
      "Ordered our wedding cake here and it was flawless — elegant, moist and gone in minutes.",
    cakeType: "Wedding Cake",
    status: "approved",
    createdAt: "2026-07-02",
  },
  {
    id: "review-priya",
    name: "Priya S.",
    rating: 4,
    comment:
      "The cupcakes were soft, fresh and beautifully boxed. My kids ask for them every weekend.",
    cakeType: "Cupcakes",
    status: "approved",
    createdAt: "2026-09-05",
  },
];

// In-memory implementation standing in for the backend/admin-managed store.
// Only publicly visible reviews are ever returned.
class LocalReviewService implements ReviewService {
  async getApprovedReviews(): Promise<Review[]> {
    return APPROVED_REVIEWS.filter(isPubliclyVisible);
  }
}

export const reviewService: ReviewService = new LocalReviewService();
