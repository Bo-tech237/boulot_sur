import { Metadata } from 'next';
import DashboardNav from '@/components/DashboardNav';
import DashboardPermissions from '@/auth/DashboardPermissions';

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
    return (
        <>
            <DashboardPermissions>
                <div className="flex min-h-screen w-full flex-col">
                    <DashboardNav />
                    <main className="container flex flex-1 flex-col gap-4 py-4 md:gap-8">
                        {children}
                    </main>
                </div>
            </DashboardPermissions>
        </>
    );
}
