'use client';

import { Lock } from 'lucide-react';
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
import { useStableQuery } from '@/hooks/useStableQuery';
import { api } from '../../convex/_generated/api';

export default function UserButton() {
    const user = useStableQuery(api.users.getUser);

    if (user === undefined) {
        return <div>Profile...</div>;
    }
    console.log('testUser', user);
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
                        Role: {user?.role || 'User'}
                    </DropdownMenuItem>

                    {user?.role === 'user' ? (
                        <DropdownMenuItem asChild>
                            <Link href="/register">
                                <Lock className="mr-2 h-4 w-4" />
                                Register
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard">
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
