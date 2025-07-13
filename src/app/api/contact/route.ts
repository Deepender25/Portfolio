import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { saveContactSubmission } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const savedSubmission = await saveContactSubmission({
      name,
      email,
      message,
      ipAddress
    });

    // Log to console for immediate notification
    console.log('🚨 NEW CONTACT FORM SUBMISSION:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🆔 ID: ${savedSubmission.id}`);
    console.log(`📧 FROM: ${name} (${email})`);
    console.log(`📝 MESSAGE: ${message}`);
    console.log(`🕐 TIME: ${new Date().toLocaleString()}`);
    console.log(`🌐 IP: ${ipAddress}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Optional: Send email notification (requires email configuration)
    // You can configure this with your email service
    try {
      await sendEmailNotification(name, email, message);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue anyway since console logging worked
    }

    // Send response back to the client
    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully! You will be contacted soon.' 
    }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function sendEmailNotification(name: string, email: string, message: string) {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('📧 Email credentials not configured. Skipping email notification.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password, not regular password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'yadavdeepender65@gmail.com', // Your notification email
    subject: `🚨 New Portfolio Contact: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #00FFFF; text-align: center;">New Contact Form Submission</h2>
        <hr style="border: 1px solid #00FFFF; margin: 20px 0;">
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <strong>👤 Name:</strong> ${name}
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <strong>📧 Email:</strong> ${email}
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <strong>📝 Message:</strong><br>
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <strong>🕐 Received:</strong> ${new Date().toLocaleString()}
        </div>
        
        <hr style="border: 1px solid #00FFFF; margin: 20px 0;">
        <p style="text-align: center; color: #666;">This notification was sent from your portfolio website.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log('📧 Email notification sent successfully!');
}
