import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';
import RecruiterProfile from './RecruiterProfile';

export const metadata: Metadata = {
    title: 'Profile',

    description: 'Find your dream job in Cameroon!',
};

async function ProfilePage() {
    const session = await getSession();

    if (!session) {
        return redirect('/');
    }

    return (
        <div className="w-full py-10">
            <RecruiterProfile session={session} />
        </div>
    );
}

export default ProfilePage;
