import { Metadata } from 'next';
import DashboardNav from '@/components/DashboardNav';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import AppSidebar from '@/components/AppSidebar';

export const metadata: Metadata = {
    title: {
        default: 'Dashboard',
        template: 'Dashboard|%s',
    },
    description: 'Find your dream job in Cameroon!',
};

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default async function SettingsLayout({
    children,
}: SettingsLayoutProps) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
    console.log('cookies:', cookieStore, 'open:', defaultOpen);

    return (
        <>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar variant="inset" />

                <SidebarInset>
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <SidebarTrigger />

                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
