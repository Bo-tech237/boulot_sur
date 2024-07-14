'use server';

import { magicLinkTypes } from '@/lib/magicLinkSchema';

export async function magicLinkAuth(data: magicLinkTypes) {
    const { email } = data;

    try {
        return {
            success: false,
            message: 'For now only the google auth is working',
        };
    } catch (error) {
        console.log(error);
    }
}
