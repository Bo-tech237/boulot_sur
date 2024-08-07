'use server';

import { contactTypes } from '@/lib/contactSchema';
import { emailer } from '@/email/sendEmail';

export async function contactAdmin(data: contactTypes) {
    const { name, email, phone, message } = data;

    try {
        const result = await emailer.contactAdmin(name, email, phone, message);

        console.log('nodemailer response', result);

        if (result.rejected.length > 0) {
            return {
                success: false,
                message: 'Message not sent retry later.',
            };
        }

        return {
            success: true,
            message: 'Message sent successfully',
        };
    } catch (error) {
        console.log(error);
    }
}
