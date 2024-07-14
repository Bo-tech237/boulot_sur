'use server';

import { contactTypes } from '@/lib/contactSchema';

export async function contactAdmin(data: contactTypes) {
    const { name, email, phone } = data;

    console.log('data:', name, email, phone);

    try {
        return {
            success: false,
            message: 'Waiting for the Domain name to be effective',
        };
    } catch (error) {
        console.log(error);
    }
}
