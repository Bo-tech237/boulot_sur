import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';
import AdminWelcome from './AdminWelcome';

async function DashboardPage() {
    // const session = await getSession();
    // if (!session) redirect('/login');

    return (
        <>
            <AdminWelcome />
        </>
    );
}

export default DashboardPage;
