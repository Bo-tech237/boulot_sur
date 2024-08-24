import Contact from '@/components/Contact';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="my-10">
            <Card className="w-[350px] mx-auto bg-boulotGrey flex flex-col gap-5 p-4">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center justify-center md:gap-12">
                            <Link className="" href="/">
                                <span className="sr-only">Home</span>
                                <Image
                                    src={'/logo-transparent.svg'}
                                    alt="logo"
                                    width={200}
                                    height={200}
                                    priority
                                />
                            </Link>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Contact />
                </CardContent>
            </Card>
        </div>
    );
}
