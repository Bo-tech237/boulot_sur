'use client';

import Link from 'next/link';
import { Menu, Package2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { recruiterNavItems, applicantNavItems } from '@/constants/data';
import { useStableQuery } from '@/hooks/useStableQuery';
import { api } from '../../convex/_generated/api';
import { Authenticated, Unauthenticated } from 'convex/react';

function DashboardNav() {
    const user = useStableQuery(api.users.getUser);

    const pathname = usePathname();

    if (user === undefined) {
        return <div>Navigation...</div>;
    }

    if (user === null) return;

    return (
        <header className="container mx-auto sticky top-16 flex h-16 items-center gap-4 border-b bg-background">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Authenticated>
                    {user?.role === 'recruiter'
                        ? recruiterNavItems.map((item, index) => {
                              return (
                                  <Link
                                      key={index}
                                      href={item.href}
                                      className={cn(
                                          buttonVariants({
                                              variant:
                                                  pathname === item.href
                                                      ? 'default'
                                                      : 'ghost',
                                          }),
                                          item.variant === 'default' && '',
                                          'justify-start  lg:text-xl'
                                      )}
                                  >
                                      <span className="flex items-center justify-center gap-3">
                                          {item.title}
                                      </span>
                                  </Link>
                              );
                          })
                        : applicantNavItems.map((item, index) => {
                              return (
                                  <Link
                                      key={index}
                                      href={item.href}
                                      className={cn(
                                          buttonVariants({
                                              variant:
                                                  pathname === item.href
                                                      ? 'default'
                                                      : 'ghost',
                                          }),
                                          item.variant === 'default' && '',
                                          'justify-start  lg:text-xl'
                                      )}
                                  >
                                      <span className="flex items-center justify-center gap-3">
                                          {item.title}
                                      </span>
                                  </Link>
                              );
                          })}
                </Authenticated>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Authenticated>
                            {user?.role === 'recruiter'
                                ? recruiterNavItems.map((item) => {
                                      return (
                                          <SheetClose key={item.title} asChild>
                                              <Link
                                                  href={item.href}
                                                  className={cn(
                                                      buttonVariants({
                                                          variant:
                                                              pathname ===
                                                              item.href
                                                                  ? 'default'
                                                                  : 'ghost',
                                                      }),
                                                      item.variant ===
                                                          'default' && '',
                                                      'justify-start  lg:text-xl'
                                                  )}
                                              >
                                                  <span className="flex items-center justify-center gap-3">
                                                      {item.title}
                                                  </span>
                                              </Link>
                                          </SheetClose>
                                      );
                                  })
                                : applicantNavItems.map((item) => {
                                      return (
                                          <SheetClose key={item.title} asChild>
                                              <Link
                                                  href={item.href}
                                                  className={cn(
                                                      buttonVariants({
                                                          variant:
                                                              pathname ===
                                                              item.href
                                                                  ? 'default'
                                                                  : 'ghost',
                                                      }),
                                                      item.variant ===
                                                          'default' && '',
                                                      'justify-start  lg:text-xl'
                                                  )}
                                              >
                                                  <span className="flex items-center justify-center gap-3">
                                                      {item.title}
                                                  </span>
                                              </Link>
                                          </SheetClose>
                                      );
                                  })}
                        </Authenticated>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
            </div>
        </header>
    );
}

export default DashboardNav;
