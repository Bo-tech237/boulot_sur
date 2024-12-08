'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../../../convex/_generated/api';
import { ShowRating } from '../ui/showRating';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';

export default function Testimonials() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.comments.getBestReviews, {})
    );

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading reviews...
            </div>
        );
    }

    if (!data) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center dark:text-white text-red-900 text-center">
                No review available right now
            </div>
        );
    }

    console.log('bestReviews:', data);

    return (
        <section className="container">
            <div className="py-12 lg:py-16">
                <div className="mb-5 md:flex md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Read trusted reviews from our customers
                        </h2>

                        <p className="mt-6 max-w-lg leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aspernatur praesentium natus sapiente commodi.
                            Aliquid sunt tempore iste repellendus explicabo
                            dignissimos placeat, autem harum dolore
                            reprehenderit quis! Quo totam dignissimos earum.
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
                    <Carousel
                        opts={{
                            align: 'center',
                            loop: true,
                        }}
                        plugins={[plugin.current]}
                        // onMouseEnter={plugin.current.stop}
                        // onMouseLeave={plugin.current.reset}
                        className="w-full"
                    >
                        <CarouselContent>
                            {data?.map((review) => (
                                <CarouselItem
                                    key={review.rating?._id}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                                <span className="text-3xl font-semibold">
                                                    <ShowRating
                                                        userRating={
                                                            review.rating
                                                                ?.ratings
                                                        }
                                                    />
                                                </span>
                                                <div className="mt-2">
                                                    <p className="mt-2 leading-relaxed text-gray-700">
                                                        {review.comment?.text}
                                                    </p>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                &mdash; {review.user?.name}
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                {data.length === 0 && (
                    <div className="flex py-10 items-center justify-center dark:text-white text-red-900 text-center font-bold text-2xl">
                        No review available right now
                    </div>
                )}
            </div>
        </section>
    );
}
