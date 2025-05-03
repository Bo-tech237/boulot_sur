"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Testimonials } from "@/types/testimonials";
import { InfiniteMovingCard } from "./MovingCardDemo";

export default function UserTestimonials({
  reviews,
}: {
  reviews: Testimonials;
}) {
  const formattedTestimonials = reviews.map((review) => ({
    quote: review.comment?.text || "",
    name: review.user?.name || "",
    rating: review.rating?.ratings || 0,
  }));

  return (
    <section className="container">
      <div className="py-12 lg:py-16">
        <div className="mb-5 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Read trusted reviews from our customers
            </h2>

            <p className="mt-6 max-w-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur praesentium natus sapiente commodi. Aliquid sunt
              tempore iste repellendus explicabo dignissimos placeat, autem
              harum dolore reprehenderit quis! Quo totam dignissimos earum.
            </p>
          </div>

          <Link
            href="#"
            className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-600 px-5 py-3 text-rose-600 transition hover:bg-rose-600 hover:text-white md:mt-0"
          >
            <span className="font-medium"> Read all reviews </span>
            <ArrowRight size={20} />
          </Link>
        </div>

        <div>
          <div>
            {reviews.length > 0 && (
              <InfiniteMovingCard
                testimonials={formattedTestimonials}
                direction="left"
                speed="slow"
              />
            )}
          </div>
          {reviews.length === 0 && (
            <div className="text-red-600 text-center text-2xl mt-10">
              No reviews for now
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
