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

    public sendEmail(mailOptions: MailOptions) {
        return this.transporter.sendMail(mailOptions);
    }

    public notifyAdminForNewUser(email: string, username: string) {
        this.sendEmail(notifyAdminNewUserEmailTemplate(email, username));
    }

    public notifyUserForSignup(email: string, username: string) {
        this.sendEmail(newUserEmailTemplate(email, username));
    }

    public notifyUserForDeletedAccount(
        email: string | null | undefined,
        username: string | null | undefined
    ) {
        this.sendEmail(deleteUserEmailTemplate(email, username));
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
