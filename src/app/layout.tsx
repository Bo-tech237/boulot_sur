import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import MainNav from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import ConvexClientProvider from '../../providers/ConvexClientProvider';
import { Toaster } from '@/components/ui/toaster';
import MyMiddleware from '@/components/MyMiddleware';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Boulot Sur',
        template: '%s|Boulot Sur',
    },
    description: 'Find your dream job in Cameroon!',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ConvexClientProvider>
                    <MyMiddleware />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <MainNav />

                        {children}

                        <Footer />
                        <Toaster />
                        <ScrollToTop />
                    </ThemeProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
