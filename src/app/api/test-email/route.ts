import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({ 
        error: 'Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env.local' 
      }, { status: 400 });
    }

    console.log('🧪 Testing email configuration...');
    console.log(`📧 Email User: ${process.env.EMAIL_USER}`);
    console.log(`🔑 Email Pass: ${process.env.EMAIL_PASS ? '[CONFIGURED]' : '[NOT SET]'}`);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: '🧪 Portfolio Email Test - SUCCESS!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #00FFFF; text-align: center;">✅ Email Configuration Test</h2>
          <hr style="border: 1px solid #00FFFF; margin: 20px 0;">
          
          <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin: 10px 0; border: 1px solid #c3e6cb;">
            <strong>🎉 SUCCESS!</strong> Your email configuration is working correctly.
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <strong>📧 From:</strong> ${process.env.EMAIL_USER}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <strong>🕐 Test Time:</strong> ${new Date().toLocaleString()}
          </div>
          
          <hr style="border: 1px solid #00FFFF; margin: 20px 0;">
          <p style="text-align: center; color: #666;">
            Your portfolio contact form will now send email notifications successfully!
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Test email sent successfully!');

    return NextResponse.json({ 
      success: true, 
      message: 'Email test successful! Check your inbox.',
      details: {
        from: process.env.EMAIL_USER,
        timestamp: new Date().toISOString()
      }
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Email test failed:', error);
    
    let errorMessage = 'Email test failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ 
      error: errorMessage,
      details: 'Check your email credentials and Gmail App Password setup'
    }, { status: 500 });
  }
}
