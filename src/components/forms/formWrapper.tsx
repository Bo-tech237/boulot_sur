import { ReactNode } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type FormWrapperProps = {
    title: string;
    children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <div>
            <div className="mb-5">
                <div className="text-2xl font-semibold leading-none tracking-tight">
                    {title}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}
