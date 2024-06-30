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
            <div>
                <div> {title}</div>
            </div>
            <div>{children}</div>
        </div>
    );
}
