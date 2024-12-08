'use client';

import { Home, Loader2, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SignOut } from '@/auth/SignOut';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../convex/_generated/api';

export default function UserButton() {
    const {
        data: user,
        isPending,
        error,
    } = useQuery(convexQuery(api.users.getUser, {}));

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Profile...
            </div>
        );
    }

    if (!user) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No user available
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="flex-none rounded-full">
                    <Image
                        src={user?.image || '/avatar_placeholder.png'}
                        alt="User profile picture"
                        width={50}
                        height={50}
                        className="aspect-square rounded-full bg-background object-cover"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.name || 'User'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Role: {user?.roles?.join('-') || 'User'}
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="/" className="cursor-pointer">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </DropdownMenuItem>

                    {user?.roles?.length === 1 ? (
                        <DropdownMenuItem asChild>
                            <Link href="/register" className="cursor-pointer">
                                <Lock className="mr-2 h-4 w-4" />
                                Register
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="cursor-pointer">
                                <Lock className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <div>
                        <SignOut />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
