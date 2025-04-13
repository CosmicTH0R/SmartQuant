import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (toEmail, token) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // App password
    },
  });

  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  // email options
  const mailOptions = {
    from: `"YourApp Support" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Verify your email 🚀',
    html: `
      <h2>Welcome to Our App!</h2>
      <p>Click below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
      <br/><br/>
      <small>This link will expire in 15 minutes.</small>
    `,
  };

  // send email
  await transporter.sendMail(mailOptions);
};
