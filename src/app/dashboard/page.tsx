'use client';

import AdminWelcome from './AdminWelcome';
import ApplicantWelcome from './ApplicantWelcome';
import RecruiterWelcome from './RecruiterWelcome';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../../convex/_generated/api';
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from '@/components/ui/sidebar';

function DashboardPage() {
    const {
        data: user,
        isPending,
        error,
    } = useQuery(convexQuery(api.users.getUser, {}));

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
            <div className="flex items-center justify-center py-10">
                User not available
            </div>
        );
    }

    return (
        <>
            {user.roles?.some((role) => role === 'admin') && <AdminWelcome />}
            {user.roles?.some((role) => role === 'recruiter') && (
                <RecruiterWelcome />
            )}
            {user.roles?.some((role) => role === 'applicant') && (
                <ApplicantWelcome />
            )}
        </>
    );
}

export default DashboardPage;
