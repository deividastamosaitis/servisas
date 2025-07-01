import ServiceTicket from "../models/ServiceTicket.js";
import { sendEmail } from "../utils/sendEmail.js";

function generateRmaCode() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 900 + 100);
  return `GPS_RMA${date}${random}`;
}

export const registerRma = async (req, res) => {
  try {
    const { client, product, problemDescription } = JSON.parse(req.body.data); // nes siunčiam FormData

    const rmaCode = generateRmaCode();

    const attachments = req.files?.map((file) => file.filename) || [];

    const ticket = new ServiceTicket({
      client,
      product: {
        ...product,
        externalService: {
          rmaCode,
          status: "Registruota",
        },
      },
      problemDescription,
      attachments,
    });

    await ticket.save();

    await sendEmail({
      to: client.email,
      rmaCode,
      status: "Registruota",
      product,
      problemDescription,
    });

    res.status(201).json({ rmaCode });
  } catch (err) {
    console.error("❌ KLAIDA REGISTRUOJANT:", err.message);
    res.status(500).json({ error: "Nepavyko užregistruoti." });
  }
};

export const checkRmaStatus = async (req, res) => {
  try {
    const { rma } = req.params;
    const ticket = await ServiceTicket.findOne({
      "product.externalService.rmaCode": rma,
    });

    if (!ticket) {
      return res.status(404).json({ error: "RMA kodas nerastas." });
    }

    res.json({
      rmaCode: ticket.product.externalService.rmaCode,
      status: ticket.status,
      receivedDate: ticket.receivedDate,
      clientName: ticket.client.name,
    });
  } catch (err) {
    res.status(500).json({ error: "Serverio klaida." });
  }
};
