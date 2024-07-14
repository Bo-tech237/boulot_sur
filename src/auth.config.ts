import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';

export const authConfig = {
    providers: [Google],
};
