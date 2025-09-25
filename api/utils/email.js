const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  if (process.env.NODE_ENV === 'test') {
    // Mock transporter for testing
    return {
      sendMail: async (options) => {
        console.log('📧 Email would be sent:', options);
        return { messageId: 'test-message-id' };
      }
    };
  }

  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  emailVerification: (data) => ({
    subject: 'Verify Your Paradise Nursery Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Welcome to Paradise Nursery! 🌱</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for creating an account with Paradise Nursery. To complete your registration, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationUrl}"
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
        <p>This link will expire in 24 hours for security reasons.</p>
        <p>If you didn't create an account with Paradise Nursery, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Best regards,<br>
          The Paradise Nursery Team
        </p>
      </div>
    `,
    text: `
      Welcome to Paradise Nursery!

      Hi ${data.name},

      Thank you for creating an account with Paradise Nursery. To complete your registration, please verify your email address by visiting: ${data.verificationUrl}

      This link will expire in 24 hours for security reasons.

      If you didn't create an account with Paradise Nursery, please ignore this email.

      Best regards,
      The Paradise Nursery Team
    `
  }),

  passwordReset: (data) => ({
    subject: 'Password Reset - Paradise Nursery',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Password Reset Request</h2>
        <p>Hi ${data.name},</p>
        <p>You requested a password reset for your Paradise Nursery account. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetUrl}"
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
        <p><strong>Important:</strong> This link will expire in 10 minutes for security reasons.</p>
        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Best regards,<br>
          The Paradise Nursery Team
        </p>
      </div>
    `,
    text: `
      Password Reset Request - Paradise Nursery

      Hi ${data.name},

      You requested a password reset for your Paradise Nursery account. Please visit this link to reset your password: ${data.resetUrl}

      Important: This link will expire in 10 minutes for security reasons.

      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.

      Best regards,
      The Paradise Nursery Team
    `
  }),

  passwordChanged: (data) => ({
    subject: 'Password Changed Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Password Changed Successfully</h2>
        <p>Hi ${data.name},</p>
        <p>Your password has been successfully changed for your Paradise Nursery account.</p>
        <p>If you made this change, no further action is required.</p>
        <p>If you didn't change your password, please contact our support team immediately.</p>
        <div style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0;">
          <strong>Security Notice:</strong> For your security, we recommend using a unique password for each of your online accounts.
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Best regards,<br>
          The Paradise Nursery Team
        </p>
      </div>
    `,
    text: `
      Password Changed Successfully - Paradise Nursery

      Hi ${data.name},

      Your password has been successfully changed for your Paradise Nursery account.

      If you made this change, no further action is required.

      If you didn't change your password, please contact our support team immediately.

      Security Notice: For your security, we recommend using a unique password for each of your online accounts.

      Best regards,
      The Paradise Nursery Team
    `
  }),

  orderConfirmation: (data) => ({
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Order Confirmed! 🌱</h2>
        <p>Hi ${data.customerName},</p>
        <p>Thank you for your order! We've received your order and are preparing it for shipment.</p>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order Number:</strong> ${data.orderNumber}</p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> $${data.total}</p>
          <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        </div>

        <p>You'll receive another email when your order ships with tracking information.</p>
        <p>You can also track your order status by logging into your account.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/account/orders"
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Order Details
          </a>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Thank you for choosing Paradise Nursery!<br>
          Questions? Contact us at support@paradisenursery.com
        </p>
      </div>
    `,
    text: `
      Order Confirmed! - Paradise Nursery

      Hi ${data.customerName},

      Thank you for your order! We've received your order and are preparing it for shipment.

      Order Details:
      - Order Number: ${data.orderNumber}
      - Order Date: ${new Date().toLocaleDateString()}
      - Total Amount: $${data.total}
      - Payment Method: ${data.paymentMethod}

      You'll receive another email when your order ships with tracking information.

      You can also track your order status by logging into your account.

      View Order Details: ${process.env.FRONTEND_URL}/account/orders

      Thank you for choosing Paradise Nursery!
      Questions? Contact us at support@paradisenursery.com
    `
  })
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const template = emailTemplates[options.template];
    if (!template) {
      throw new Error(`Email template '${options.template}' not found`);
    }

    const { subject, html, text } = template(options.data);

    const mailOptions = {
      from: `"Paradise Nursery" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: options.email,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', info.messageId);

    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  emailTemplates
};