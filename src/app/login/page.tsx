import { Metadata } from 'next';
import SignIn from '@/components/SignIn';

export const metadata: Metadata = {
    title: 'Login',

    description: 'Find your dream job in Cameroon!',
};

export default async function LoginPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    );
}
