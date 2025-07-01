import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  rmaCode,
  status,
  product,
  problemDescription,
}) => {
  const frontendUrl = "https://servisas.gpsmeistras.lt"; // arba naudok .env kintamąjį
  const link = `${frontendUrl}/status/${rmaCode}`;

  let subject = "";
  let html = "";

  // 🟡 Statuso žinutės
  if (status === "Registruota") {
    subject = `✅ Jūsų RMA registracija sėkminga – ${rmaCode}`;
    html = `
      <p>Jūsų remonto registracija <strong>RMA kodas: ${rmaCode}</strong> sėkminga.</p>
      <p><strong>Prietaisas:</strong> ${product.brand} ${product.model}</p>
      <p><strong>Serijinis numeris:</strong> ${product.serialNumber}</p>
      <p><strong>Gedimo informacija:</strong> ${problemDescription}</p>
      <br/>
      <p>Jei pastebėjote neatitikimų, susisiekite el. paštu 
      <a href="mailto:servisas@gpsmeistras.lt">servisas@gpsmeistras.lt</a> 
      arba atsakykite į šį laišką. Neatsakydami patvirtinate, kad pateikiama informacija teisinga.</p>
    `;
  } else if (status === "Paruošta atsiėmimui") {
    subject = `🔔 RMA atnaujinimas – įrenginys paruoštas atsiėmimui`;
    html = `
      <p>Sveiki,</p>
      <p>Jūsų įrenginio remonto statusas buvo atnaujintas.</p>
      <p>📌 <strong>Naujas statusas:</strong> Paruošta atsiėmimui</p>
      <p>Atsimti siuntą galite mūsų fizinėje parduotuvėje:</p>
      <p><strong>Jonavos g. 204A, Kaunas</strong></p>
      <p>Jei norite, kad siuntą išsiųstume LPExpress kurjeriu ar paštomatu – atsakykite į šį laišką su adresu.</p>
    `;
  } else if (status === "Prekė išsiųsta klientui") {
    subject = `📦 Siunta išsiųsta – ${rmaCode}`;
    html = `
      <p>Sveiki,</p>
      <p>Jūsų įrenginys buvo perduotas LPExpress kurjeriui.</p>
      <p>Siunta jus pasieks per artimiausias <strong>1–5 darbo dienas</strong>.</p>
    `;
    // Ateityje pridėsi sekimo kodą čia
  } else {
    subject = `🔧 RMA statusas atnaujintas – ${rmaCode}`;
    html = `
      <p>Sveiki,</p>
      <p>Jūsų įrenginio remonto statusas buvo atnaujintas.</p>
      <p>📌 <strong>Naujas statusas:</strong> ${status}</p>
      <p>Jei turite klausimų – atsakykite į šį el. laišką.</p>
    `;
  }

  // ✅ Visada pridėti RMA peržiūros mygtuką
  html += `
    <br/>
    <a href="${link}" style="display: inline-block; padding: 10px 20px; background: #0056A0; color: white; text-decoration: none; border-radius: 5px;">
      Peržiūrėti RMA statusą
    </a>
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
