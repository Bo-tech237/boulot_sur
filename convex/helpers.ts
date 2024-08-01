'use node';

import { v } from 'convex/values';
import { action, internalAction } from './_generated/server';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class Emailer {
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    }

    public async sendEmail(mailOptions: MailOptions) {
        return await this.transporter.sendMail(mailOptions);
    }

    public async notifyAdminForNewUser(email: string, username: string) {
        return await this.sendEmail(
            notifyAdminNewUserEmailTemplate(email, username)
        );
    }

    public async notifyUserForSignup(email: string, username: string) {
        return await this.sendEmail(newUserEmailTemplate(email, username));
    }

    public async notifyUserForDeletedAccount(
        email: string | null | undefined,
        username: string | null | undefined
    ) {
        return await this.sendEmail(deleteUserEmailTemplate(email, username));
    }

    public async contactAdmin(
        username: string,
        email: string,
        phone: string,
        message: string
    ) {
        return await this.sendEmail(
            contactAdminEmailTemplate(username, email, phone, message)
        );
    }
}

export const emailer = new Emailer();

export const newUserEmailTemplate = (email: string, username: string) => {
    return {
        from: {
            name: 'Boulot Sur',
            address: process.env.GMAIL_USER,
        },
        to: email,
        subject: `${username}, Welcome to Boulot Sur`,
        text: 'Welcome to Boulot Sur',
        html: `
      <h1>Welcome to BOULOT SUR!</h1>
      <p>We're glad you've decided to join us. We hope you find everything you're looking for here and enjoy using our site.</p>
      <p>If you have any questions or need any help, please don't hesitate to contact us. Thank you for signing up!</p>
    `,
    } as MailOptions;
};

export const deleteUserEmailTemplate = (
    email: string | null | undefined,
    username: string | null | undefined
) => {
    return {
        from: {
            name: 'Boulot Sur',
            address: process.env.GMAIL_USER,
        },
        to: email,
        subject: `${username}, Boulot Sur: Account deleted`,
        text: 'Boulot Sur: Account deleted',
        html: `
      <h1>Account Deleted!</h1>
      <p>We're sorry you've decided to leave us. We are looking forward to see you next time.</p>
      <p>If you have any questions or need any help, please don't hesitate to contact us. Thank you for using our services!</p>
    `,
    } as MailOptions;
};

export const notifyAdminNewUserEmailTemplate = (
    email: string,
    username: string
) => {
    return {
        from: {
            name: 'Boulot Sur',
            address: process.env.GMAIL_USER,
        },
        to: process.env.GMAIL_USER,
        subject: `New User: ${username} - email: ${email}`,
        text: `New User: ${username} - email: ${email}`,
        html: `
      <h1>New User: ${username}</h1>
      <p>email: ${email}</p>
    `,
    } as MailOptions;
};

export const contactAdminEmailTemplate = (
    username: string,
    email: string,
    phone: string,
    message: string
) => {
    return {
        from: {
            name: 'Boulot Sur',
            address: process.env.GMAIL_USER,
        },
        to: process.env.GMAIL_USER,
        subject: 'Inquiry Email',
        text: `Name: ${username}\nEmail: ${email}`,
        html: `
      <h1>Name: ${username}</h1>
      <p>Email: ${email}</p>
      <p>Tel: ${phone}</p>
      <p>${message}</p>
    `,
    } as MailOptions;
};

export const newUserEmail = action({
    args: { email: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        const newUser = await emailer.notifyAdminForNewUser(
            args.email,
            args.name
        );

        console.log('convex email new User', newUser);
        return newUser;
    },
});

export const deleteUserEmail = action({
    args: { email: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        const deletedUser = await emailer.notifyUserForDeletedAccount(
            args.email,
            args.name
        );
        console.log('convex email delete User', deletedUser);
        return deletedUser;
    },
});
