import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="space-y-3 px-3 py-10 text-center">
            <h1 className="text-4xl font-bold">Not Found</h1>
            <p className="text-muted-foreground">This page does not exist</p>
            <Button asChild>
                <Link href={'/'}>Back To Home Page</Link>
            </Button>
        </main>
    );
}
