import { Metadata } from 'next';
import ApplicantProfile from './ApplicantProfile';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Profile',

    description: 'Find your dream job in Cameroon!',
};

async function ProfilePage() {
    const session = await getSession();

    if (!session) {
        return redirect('/login');
    }

    return (
        <div className="w-full py-10">
            <ApplicantProfile session={session} />
        </div>
    );
}

export default ProfilePage;
