'use client';

import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../../../../convex/_generated/api';
import { DataTable } from '../data-table';
import { columns } from './columns';
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from '@/components/ui/sidebar';

export default function Page() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.users.getRecruiterUsers, {})
    );

    if (isPending) {
        return (
            <SidebarMenu>
                {Array.from({ length: 5 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                        <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        );
    }

    if (!data) {
        console.log('error:', error);
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                Recruiters not available
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <DataTable columns={columns} data={data} />
            {data?.length === 0 && (
                <div className="text-red-600 text-xl">
                    No recruiter available.
                </div>
            )}
        </div>
    );
}
