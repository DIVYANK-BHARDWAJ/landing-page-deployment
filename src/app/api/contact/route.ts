import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/mongoose';
import Lead from '@/models/Lead';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Securely inject lead data into MongoDB Atlas 
    try {
      await connectToDatabase();
      if (process.env.MONGODB_URI) {
        await Lead.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          organization: data.organization,
          submissions: data.submissions || "Not selected",
          repo: data.repo || "Not selected",
          challenges: data.challenges || ""
        });
        console.log("Successfully securely injected Lead into MongoDB.");
      } else {
        console.warn("MongoDB bypass active: MONGODB_URI missing in .env.local");
      }
    } catch (dbError) {
      console.error("MongoDB persistence error: ", dbError);
      // We do not fail the request if the DB is down, we still send the internal email alert.
    }
    
    // Configuration from environment
    const EMAIL_USER = process.env.EMAIL_USER || 'amitsinghironman@gmail.com';
    const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

    if (!process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_PASS in .env.local file");
      return NextResponse.json({ message: "Server configuration error: Missing credentials." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_TO, 
      subject: `[LEAD] Enterprise Demo Request - ${data.organization || 'JudgeNod'}`,
      replyTo: data.email, // Standard reply hooks to the prospect
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
          <div style="background-color: #f8fafc; border-left: 4px solid #8b5cf6; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: bold;">New Qualification Pipeline Entry</p>
            <h2 style="margin: 8px 0 0; color: #0f172a; font-size: 24px; font-weight: 800;">Enterprise Demo Request</h2>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 24px;">Hello Team,</p>
          <p style="font-size: 16px; margin-bottom: 32px;">A new enterprise prospect has requested a live demonstration. Below is the parsed qualification intake data for immediate strategic review:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; width: 35%; color: #475569;">Point of Contact</td>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569;">Corporate Email</td>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none; font-weight: 600;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569;">Organization</td>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${data.organization || 'Not Provided'}</td>
            </tr>
            <tr>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569;">Projected Volume</td>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${data.submissions || 'Undisclosed'}</td>
            </tr>
            <tr>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569;">Infrastructure Stack</td>
              <td style="padding: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${data.repo || 'Undisclosed'}</td>
            </tr>
          </table>

          <div style="padding: 24px; background-color: #f1f5f9; border-radius: 8px;">
            <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #475569;">Operational Bottlenecks / Objectives</h3>
            <p style="margin: 0; color: #334155; font-style: italic; font-size: 16px;">
              "${data.challenges || 'No specific technical bottlenecks were disclosed during initial intake.'}"
            </p>
          </div>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              <strong>Automated Alert</strong> via JudgeNod Infrastructure<br>
              To engage this prospect, simply hit "Reply" to thread communication directly to their provided corporate email.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
