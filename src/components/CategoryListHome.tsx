'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, FileStack } from 'lucide-react';
import { api } from '../../convex/_generated/api';
import { useStableQuery } from '@/hooks/useStableQuery';

export default function CategoryListHome() {
    const categoriesResults = useStableQuery(api.categories.getHomeCategories);

    if (categoriesResults === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Categories...
            </div>
        );
    }

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-6 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Browse Jobs Categories
                    </h2>

                    <p className="mt-4 whitespace-pre-line">
                        Post a job to tell us about your project. We&apos;ll
                        quickly match you with the right freelancers.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categoriesResults !== null &&
                        categoriesResults.map((categoryResult) => (
                            <div
                                key={categoryResult.category._id}
                                className="transition-all duration-500 ease-in-out hover:-translate-y-2"
                            >
                                <Link
                                    href={`/categories/${categoryResult.category._id}`}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-center h-16 w-16 rounded-lg text-center leading-[4.4] mx-auto bg-violet-700">
                                                <FileStack className="text-zinc-300  dark:text-muted-foreground" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center">
                                            <h5 className="text-xl font-bold">
                                                {categoryResult.category.name}
                                            </h5>

                                            <p className="mt-1 font-medium">
                                                {categoryResult.totalJobs}{' '}
                                                {categoryResult.totalJobs > 1
                                                    ? 'Jobs'
                                                    : 'Job'}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                </div>

                <div className="mt-12 text-center transition-all duration-500 ease-in-out hover:-translate-y-2">
                    <Button>
                        <Link
                            href="/categories"
                            className="flex gap-1 font-bold"
                        >
                            All Categories <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
