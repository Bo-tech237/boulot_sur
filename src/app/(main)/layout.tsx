import Footer from '@/components/Footer';
import MainNav from '@/components/MainNav';

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <MainNav />

            {children}

            <Footer />
        </div>
    );
}
