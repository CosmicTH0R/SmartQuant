import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
  // Log recipient email for debugging
  console.log("Sending email to:", to);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    // Log success
    console.log("Email sent successfully!");
  } catch (err) {
    // Log the error if email fails
    console.error("Error sending email:", err.message);
  }
};

export default sendEmail;