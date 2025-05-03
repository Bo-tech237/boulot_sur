import { Metadata } from 'next';
import RecruiterProfile from './RecruiterProfile';

export const metadata: Metadata = {
    title: 'Profile',
};

async function ProfilePage() {
    return (
        <div className="w-full py-10">
            <RecruiterProfile />
        </div>
    );
}

export default ProfilePage;
