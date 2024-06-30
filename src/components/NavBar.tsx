'use client';

import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from './ui/sheet';
import { Menu } from 'lucide-react';
import { authLinks, navLinks } from '@/constants/data';
import { useSession } from 'next-auth/react';
import UserButton from './UserButton';
import Image from 'next/image';
import { Badge } from './ui/badge';

function NavBar() {
    const pathname = usePathname();
    const { data: session, update } = useSession();
    const user = session?.user;
    !session?.convexToken && update();

    return (
        <header className="flex h-20 items-center justify-between">
            <div className="md:flex md:items-center md:justify-center md:gap-12">
                <Link className="block bg-orange-50 rounded-full" href="/">
                    <span className="sr-only">Home</span>
                    <Image
                        src={'/logo-transparent.png'}
                        alt="Boulot Sur"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
            </div>

            <section className="hidden md:block">
                <nav className="flex items-center justify-center gap-3">
                    {navLinks.map((navLink) => (
                        <Link
                            key={navLink.title}
                            href={navLink.href}
                            className={cn(
                                buttonVariants({
                                    variant:
                                        pathname === `${navLink.href}`
                                            ? 'default'
                                            : 'ghost',
                                }),
                                'default' && '',
                                'justify-start text-sm lg:text-xl'
                            )}
                        >
                            {navLink.title}
                        </Link>
                    ))}
                </nav>
            </section>

            <section className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                    {authLinks.map((authLink) =>
                        authLink.href === '/login' ? (
                            <div key={authLink.title}>
                                {user ? (
                                    <UserButton user={user} />
                                ) : (
                                    <Link
                                        key={authLink.title}
                                        href={authLink.href}
                                        className={cn(
                                            buttonVariants({
                                                variant:
                                                    pathname ===
                                                    `${authLink.href}`
                                                        ? 'default'
                                                        : 'ghost',
                                            }),
                                            'default' && '',
                                            'justify-start text-sm lg:text-xl'
                                        )}
                                    >
                                        {authLink.title}
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div
                                className="hidden sm:flex"
                                key={authLink.title}
                            >
                                {!user && (
                                    <Link
                                        key={authLink.title}
                                        href={authLink.href}
                                        className={cn(
                                            buttonVariants({
                                                variant:
                                                    pathname ===
                                                    `${authLink.href}`
                                                        ? 'default'
                                                        : 'ghost',
                                            }),
                                            'default' && '',
                                            'justify-start text-sm lg:text-xl'
                                        )}
                                    >
                                        {authLink.title}
                                    </Link>
                                )}
                            </div>
                        )
                    )}
                </div>
                <ModeToggle />

                {/* mobile */}
                <nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side={'left'}
                            className="w-[300px] sm:w-[540px] flex flex-col items-center"
                        >
                            <SheetHeader>
                                <SheetTitle>BOULOT SUR</SheetTitle>
                                <SheetDescription>
                                    THE BEST JOB PORTAL WEB APP.
                                </SheetDescription>
                            </SheetHeader>

                            <nav className="flex flex-col items-center justify-center gap-5 mt-20">
                                {navLinks.map((navLink) => (
                                    <SheetClose key={navLink.title} asChild>
                                        <Link
                                            href={navLink.href}
                                            className={cn(
                                                buttonVariants({
                                                    variant:
                                                        pathname ===
                                                        `${navLink.href}`
                                                            ? 'default'
                                                            : 'ghost',
                                                }),
                                                'default' && '',
                                                'justify-start text-sm lg:text-xl'
                                            )}
                                        >
                                            {navLink.title}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </nav>
            </section>
        </header>
    );
}

export default NavBar;
