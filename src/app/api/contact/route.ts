import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, subject } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    // In production: send email via Nodemailer / SendGrid / Resend
    console.log('Contact inquiry:', { name, email, subject, message });
    return NextResponse.json({ message: 'Your inquiry has been received. We\'ll get back to you within 24 hours.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
