import nodemailer from "nodemailer";

export const allMails = async (to_email: any, message: any, subject: any) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or any SMTP provider
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to_email,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
