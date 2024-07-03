import { Lock, LogOut } from 'lucide-react';
import { User } from 'next-auth';
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
import { signOut } from 'next-auth/react';

interface UserButtonProps {
    user: User;
}

export default function UserButton({ user }: UserButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="flex-none rounded-full">
                    <Image
                        src={user.image || '/avatar_placeholder.png'}
                        alt="User profile picture"
                        width={50}
                        height={50}
                        className="aspect-square rounded-full bg-background object-cover"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user.name || 'User'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Role: {user.role}</DropdownMenuItem>

                    {user.role === 'user' ? (
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
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex w-full items-center"
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
