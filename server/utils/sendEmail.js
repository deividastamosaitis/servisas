import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, rmaCode }) => {
  const link = `http://localhost:3000/status/${rmaCode}`;

  const html = `
    <div style="font-family: sans-serif; color: #333;">
      <h2 style="color: #0056A0;">Jūsų garantinio registracija patvirtinta</h2>
      <p>RMA kodas: <strong>${rmaCode}</strong></p>
      <p>Norėdami peržiūrėti remonto eigą, paspauskite žemiau esančią nuorodą:</p>
      <a href="${link}" style="display: inline-block; padding: 10px 20px; background: #0056A0; color: white; text-decoration: none; border-radius: 5px;">
        Peržiūrėti RMA statusą
      </a>
      <p style="margin-top: 20px; font-size: 12px; color: #777;">
        Jei turite klausimų – atsakykite į šį laišką.
      </p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: "kiras.serveriai.lt",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"GPSmeistras Servisas" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
