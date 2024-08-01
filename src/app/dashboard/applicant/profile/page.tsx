import { Metadata } from 'next';
import ApplicantProfile from './ApplicantProfile';

export const metadata: Metadata = {
    title: 'Profile',
};

async function ProfilePage() {
    return (
        <div className="w-full py-10">
            <ApplicantProfile />
        </div>
    );
}

export default ProfilePage;
