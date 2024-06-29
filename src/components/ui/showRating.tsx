'use client';

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

type Props = {
    userRating?: number | undefined;
};

export function ShowRating({ userRating }: Props) {
    const [hasMounted, setHasMounted] = useState(false);
    let activeStars: any = userRating;
    const totalStars = 5;

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="flex justify-between items-center gap-2">
            <div
                style={{
                    display: 'inline-flex',
                    position: 'relative',
                    textAlign: 'left',
                }}
            >
                {[...new Array(totalStars)].map((arr, index) => {
                    const activeState = activeStars;
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
                        <div className="relative" key={index}>
                            <div
                                style={{
                                    width: showRatingWithPrecision
                                        ? `${(activeState % 1) * 100}%`
                                        : '0%',
                                    overflow: 'hidden',
                                    position: 'absolute',
                                }}
                            >
                                <Star size={30} fill="orange" color="orange" />
                            </div>
                            {/*Note here */}
                            <div
                                style={{
                                    color: showEmptyIcon ? 'gray' : 'inherit',
                                }}
                            >
                                {showEmptyIcon ? (
                                    <Star size={30} />
                                ) : (
                                    <Star
                                        size={30}
                                        fill="orange"
                                        color="orange"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <span className="text-2xl">{activeStars}</span> */}
        </div>
    );
}
