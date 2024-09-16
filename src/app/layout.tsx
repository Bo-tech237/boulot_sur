import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import ConvexClientProvider from '../../providers/ConvexClientProvider';
import { Toaster } from '@/components/ui/toaster';
import TanStackProvider from '../../providers/QueryClientProvider';

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
        <ConvexAuthNextjsServerProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ConvexClientProvider>
                        <TanStackProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                {children}

                                <Toaster />
                                <ScrollToTop />
                            </ThemeProvider>
                        </TanStackProvider>
                    </ConvexClientProvider>
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    );
}
