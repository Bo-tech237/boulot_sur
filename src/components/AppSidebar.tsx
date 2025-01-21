'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { Table } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../convex/_generated/api';
import { SidebarNav } from './SidebarNav';
import {
    adminNavItems,
    applicantNavItems,
    recruiterNavItems,
} from '@/constants/data';
import { SidebarNavItem } from '@/types/SidebarTypes';
import { cn } from '@/lib/utils';
import { DashboardNavUser } from './DashboardNavUser';

export default function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { isMobile } = useSidebar();
    const {
        data: user,
        isPending,
        error,
    } = useQuery(convexQuery(api.users.getUser, {}));

    let navItems: SidebarNavItem[] = [];

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

    if (!user) {
        console.log('Tanstact error:', error);

        return (
            <SidebarMenu>
                <SidebarMenuItem className={cn(isMobile && 'truncate text-xs')}>
                    OOPS! An error occurred retry.
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    user?.roles?.forEach((role) => {
        switch (role) {
            case 'admin':
                navItems.push(...adminNavItems);
                break;

            case 'recruiter':
                navItems.push(...recruiterNavItems);
                break;

            case 'applicant':
                navItems.push(...applicantNavItems);
                break;

            default:
                break;
        }
    });

    console.log('navItemsTypes', navItems);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip={'Home'} asChild>
                            <Link href={'/'}>
                                <Table />
                                <span>Boulot Sur</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarNav items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <DashboardNavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
