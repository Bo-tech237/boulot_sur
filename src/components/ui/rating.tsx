'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { Loader2, Star } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { toast } from './use-toast';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

type Props = {
    precision?: number;
    totalStars?: number;
    application: {
        userId: string;
        jobId: string;
    };
    onRating: () => void;
};

export function AppRating({
    precision = 0.5,
    totalStars = 5,
    application,
    onRating,
}: Props) {
    const [activeStar, setActiveStar] = useState(-1);
    const [hoverActiveStar, setHoverActiveStar] = useState(-1);
    const [isHovered, setIsHovered] = useState(false);
    const ratingContainerRef = useRef<HTMLDivElement>(null);
    const [hasMounted, setHasMounted] = useState(false);
    const [server, setServer] = useState<any>({});
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const updateRatings = useMutation(api.ratings.updateRatings);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    const calculateRating = (e: { clientX: number }) => {
        const { width, left } =
            ratingContainerRef?.current?.getBoundingClientRect() || {
                width: 0,
                left: 0,
            };
        let percent = (e.clientX - left) / width;
        const numberInStars = percent * totalStars;
        const nearestNumber =
            Math.round((numberInStars + precision / 2) / precision) * precision;

        return Number(
            nearestNumber.toFixed(
                precision.toString().split('.')[1]?.length || 0
            )
        );
    };

    const handleClick = (e: { clientX: number }) => {
        setIsHovered(false);
        setActiveStar(calculateRating(e));
    };

    const handleMouseMove = (e: { clientX: number }) => {
        setIsHovered(true);
        setHoverActiveStar(calculateRating(e));
    };

    const handleMouseLeave = (e: any) => {
        setHoverActiveStar(-1); // Reset to default state
        setIsHovered(false);
    };

    async function sendRating() {
        const data = {
            rating: activeStar,
            ...application,
        };
        const result = await updateRatings(data);

        if (result?.success === false) {
            return setServer(result);
        }

        if (result?.success === true) {
            toast({
                variant: 'success',
                title: result?.message,
                description: `${new Date().toUTCString()}`,
            });
            onRating();

            return router.push('/dashboard/recruiter/applications');
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-4 justify-between items-center">
                <div
                    style={{
                        display: 'inline-flex',
                        position: 'relative',
                        cursor: 'pointer',
                        textAlign: 'left',
                    }}
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    ref={ratingContainerRef}
                >
                    {[...new Array(totalStars)].map((arr, index) => {
                        const activeState = isHovered
                            ? hoverActiveStar
                            : activeStar;
                        const showEmptyIcon =
                            activeState === -1 || activeState < index + 1;
                        const isActiveRating = activeState !== 1;
                        const isRatingWithPrecision = activeState % 1 !== 0;
                        const isRatingEqualToIndex =
                            Math.ceil(activeState) === index + 1;
                        const showRatingWithPrecision =
                            isActiveRating &&
                            isRatingWithPrecision &&
                            isRatingEqualToIndex;
                        return (
                            <div
                                className="relative"
                                style={{
                                    cursor: 'pointer',
                                }}
                                key={index}
                            >
                                <div
                                    style={{
                                        width: showRatingWithPrecision
                                            ? `${(activeState % 1) * 100}%`
                                            : '0%',
                                        overflow: 'hidden',
                                        position: 'absolute',
                                    }}
                                >
                                    <Star fill="orange" color="orange" />
                                </div>
                                {/*Note here */}
                                <div
                                    style={{
                                        color: showEmptyIcon
                                            ? 'gray'
                                            : 'inherit',
                                    }}
                                >
                                    {showEmptyIcon ? (
                                        <Star />
                                    ) : (
                                        <Star fill="orange" color="orange" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="">{activeStar > 0 ? activeStar : 0} Star</div>
            </div>
            <Button
                disabled={isPending}
                onClick={() => {
                    startTransition(() => {
                        sendRating();
                    });
                }}
            >
                <span className="flex items-center justify-center gap-1">
                    {isPending && (
                        <Loader2 size={16} className="animate-spin" />
                    )}
                    Submit
                </span>
            </Button>
            <div
                className="flex items-end space-x-1 py-3"
                aria-live="polite"
                aria-atomic="true"
            >
                {server.success === false && (
                    <p className="text-xl text-red-500">{server?.message}</p>
                )}
            </div>
        </div>
    );
}
