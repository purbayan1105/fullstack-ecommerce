import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: any, code: any) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or any SMTP provider
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code} and is valid for next 30 minutes `,
  };

  await transporter.sendMail(mailOptions);
};
