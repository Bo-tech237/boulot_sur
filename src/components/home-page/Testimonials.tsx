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
import { ArrowRight } from 'lucide-react';

export default function Testimonials() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    );

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
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                                <span className="text-3xl font-semibold">
                                                    {index + 1}
                                                </span>
                                                <div className="mt-2">
                                                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                                                        Staying Alive
                                                    </p>
                                                    <p className="mt-2 leading-relaxed text-gray-700">
                                                        Where are they? You know
                                                        what? If we come across
                                                        somebody with no arms or
                                                        legs, do we bother
                                                        resuscitating them?
                                                    </p>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                &mdash; Michael Scott
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
