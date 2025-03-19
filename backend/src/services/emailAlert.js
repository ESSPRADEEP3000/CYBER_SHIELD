import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendAlertEmail(ip, url, method) {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: process.env.ALERT_EMAIL,
    subject: "Suspicious Activity Detected",
    text: `Suspicious activity detected from IP: ${ip} on URL: ${url} using method: ${method}`,
  };

  await transporter.sendMail(mailOptions);
}

export default sendAlertEmail;
