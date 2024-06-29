'use client';

import { ButtonHTMLAttributes } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

function LoadingButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button {...props} type="submit" disabled={props.disabled}>
            <span className="flex items-center justify-center gap-1">
                {props.disabled && (
                    <Loader2 size={16} className="animate-spin" />
                )}
                {props.disabled ? 'Submitting...' : props.children}
            </span>
        </Button>
    );
}

export default LoadingButton;
