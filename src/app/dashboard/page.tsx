import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';
import AdminWelcome from './AdminWelcome';
import ApplicantWelcome from './ApplicantWelcome';
import RecruiterWelcome from './RecruiterWelcome';

async function DashboardPage() {
    const session = await getSession();
    const user = session?.user;
    if (!session) redirect('/login');
    console.log('dashboard:', session);

    return (
        <>
            {user?.role === 'admin' ? (
                <AdminWelcome />
            ) : user?.role === 'recruiter' ? (
                <RecruiterWelcome session={session} />
            ) : (
                <ApplicantWelcome session={session} />
            )}
        </>
    );
}

export default DashboardPage;
