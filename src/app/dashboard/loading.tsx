import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Loading() {
    return (
        <div className="h-screen flex flex-col gap-2 items-center justify-center text-2xl">
            <Loader2 size={50} className="animate-spin" />
            Loading...
        </div>
    );
}
