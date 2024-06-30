import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import SignIn from '@/components/SignIn';
import getSession from '@/lib/getSession';

export const metadata: Metadata = {
    title: 'Login',

    description: 'Find your dream job in Cameroon!',
};

export default async function LoginPage() {
    if ((await getSession()) !== null) {
        redirect('/dashboard');
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    );
}
