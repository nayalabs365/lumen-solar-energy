import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request: NextRequest) {
  try {
    if (!accountSid || !authToken || !verifySid) {
      return NextResponse.json(
        { error: 'Twilio credentials not configured' },
        { status: 500 }
      );
    }

    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Phone number and code are required' },
        { status: 400 }
      );
    }

    // Format phone number to E.164 format (+1XXXXXXXXXX)
    const formattedPhone = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Verify the code via Twilio Verify
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: formattedPhone,
        code: code,
      });

    console.log('OTP verification:', verificationCheck.status);

    if (verificationCheck.status === 'approved') {
      return NextResponse.json({
        success: true,
        verified: true,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Incorrect code'
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('OTP verify error:', error);
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error: error.message || 'Failed to verify OTP'
      },
      { status: 500 }
    );
  }
}
