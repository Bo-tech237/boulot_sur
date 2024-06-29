'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const debounceValue = useDebounce(search, 500);

    useEffect(() => {
        if (debounceValue) {
            router.push(`/jobs?search=${debounceValue}`);
        } else if (!debounceValue && pathname === '/jobs') {
            router.push('/jobs');
        }
    }, [pathname, router, debounceValue]);

    return (
        <div className="relative my-8 block">
            <div className="">
                <Input
                    className="py-6 pl-12 text-xl"
                    placeholder="Search for jobs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onLoad={() => setSearch('')}
                />
                <Search className="absolute left-4 top-3.5" />
            </div>
        </div>
    );
}
