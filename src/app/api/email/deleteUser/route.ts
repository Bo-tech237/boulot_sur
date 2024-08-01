import { NextResponse, type NextRequest } from 'next/server';
import { emailer } from '@/email/sendEmail';

export async function POST(request: NextRequest) {
    const { email, name } = await request.json();

    try {
        const result = await emailer.notifyUserForDeletedAccount(email, name);

        console.log('nodemailer response', result);

        if (result.rejected.length > 0) {
            return {
                success: false,
                message: 'Message not sent retry later.',
            };
        }
        return NextResponse.json({
            success: true,
            message: 'Message sent successfully',
        });
    } catch (err) {
        return NextResponse.json({ message: 'Failed!', status: 500 });
    }
}
