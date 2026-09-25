import React, { useEffect, useRef, useState } from "react";
import {
  APPROVED_REVIEWS,
  isPubliclyVisible,
  reviewService,
  type Review,
} from "../lib/reviews";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= value
              ? "fill-crave-rosa stroke-crave-night"
              : "fill-transparent stroke-crave-night/30"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

const CARD_SIZES = "shrink-0 grow-0 basis-[86%] sm:basis-[47%] lg:basis-[32%] snap-start";

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className={`flex flex-col bg-white border border-crave-night/10 rounded-none p-6 md:p-7 ${CARD_SIZES}`}
    >
      <Stars value={review.rating} />
      <p className="mt-4 flex-1 font-playfair italic text-lg leading-relaxed text-crave-night">
        “{review.comment}”
      </p>
      <div className="mt-5 pt-4 border-t border-crave-rosa/60">
        <p className="text-sm font-semibold text-crave-night">{review.name}</p>
        {review.cakeType && (
          <p className="mt-0.5 text-[11px] font-bold tracking-[0.18em] uppercase text-crave-night/50">
            {review.cakeType}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Reviews() {
  // Seed with the approved reviews so cards render in SSR HTML immediately.
  const [reviews, setReviews] = useState<Review[] | null>(APPROVED_REVIEWS);
  const [error, setError] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("article, div[data-skeleton]");
    const cardWidth = firstCard ? firstCard.offsetWidth : track.clientWidth * 0.8;
    const gap = 20;
    track.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  };

  useEffect(() => {
    let cancelled = false;
    // Re-fetch from the backend; only publicly visible reviews are shown.
    reviewService
      .getApprovedReviews()
      .then((items) => {
        if (!cancelled) setReviews(items.filter(isPubliclyVisible));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="reviews" className="w-full bg-crave-pastel">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 justify-center text-[11px] font-bold tracking-[0.2em] text-crave-night/70">
            <span
              className="w-[7px] h-[7px] rounded-full bg-crave-rosa"
              aria-hidden="true"
            ></span>
            SWEET WORDS
          </p>
          <h2 className="font-playfair text-[clamp(34px,4.5vw,58px)] leading-[1.05] font-medium tracking-[-0.03em] mt-5 text-crave-night">
            What our <span className="italic text-crave-rosa">customers say.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-base leading-[1.7] text-crave-night/70 max-w-[520px] mx-auto">
            A few lovely words from people who made Twinkle Bakes part of their
            special moments.
          </p>
        </div>

        {error ? (
          <p role="alert" className="mt-10 text-center text-sm text-crave-night/60">
            We couldn&apos;t load reviews right now. Please try again later.
          </p>
        ) : reviews === null ? (
          <div
            className="mt-10 md:mt-12 flex flex-nowrap gap-4 md:gap-5 overflow-hidden"
            aria-label="Loading reviews"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                data-skeleton
                className={`bg-white border border-crave-night/10 rounded-none p-6 md:p-7 animate-pulse ${CARD_SIZES}`}
                aria-hidden="true"
              >
                <div className="h-4 w-24 bg-crave-rosa/50" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full bg-crave-night/10" />
                  <div className="h-4 w-5/6 bg-crave-night/10" />
                </div>
                <div className="mt-5 pt-4 border-t border-crave-rosa/60">
                  <div className="h-4 w-28 bg-crave-night/10" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-10 text-center text-sm text-crave-night/60">
            No reviews available yet.
          </p>
        ) : (
          <>
            <div className="mt-10 md:mt-12 hidden md:flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous reviews"
                className="w-11 h-11 flex items-center justify-center border border-crave-night/20 text-crave-night text-xl leading-none transition-colors duration-300 hover:bg-crave-rosa hover:border-crave-rosa"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next reviews"
                className="w-11 h-11 flex items-center justify-center border border-crave-night/20 text-crave-night text-xl leading-none transition-colors duration-300 hover:bg-crave-rosa hover:border-crave-rosa"
              >
                →
              </button>
            </div>
            <div
              ref={trackRef}
              className="mt-6 md:mt-8 flex flex-nowrap gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
