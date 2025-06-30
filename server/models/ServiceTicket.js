import mongoose from "mongoose";

const ExternalServiceSchema = new mongoose.Schema(
  {
    sentTo: String,
    sentDate: Date,
    rmaCode: String,
    supplierRmaCode: String,
    status: {
      type: String,
      enum: ["Išsiųsta", "Laukiama", "Kreditas", "Grąžinta", "Registruota"],
      default: "Registruota",
    },
    returnDate: Date,
  },
  { _id: false }
);

const ServiceTicketSchema = new mongoose.Schema({
  client: {
    name: String,
    phone: String,
    email: String,
  },
  product: {
    category: {
      type: String,
      enum: ["Robotas", "Kamera", "Registratorius", "Radaras"],
    },
    brand: String,
    model: String,
    serialNumber: String,
    externalService: ExternalServiceSchema,
  },
  problemDescription: String,
  receivedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      "Naujas",
      "Diagnostika",
      "Dalių užsakymas",
      "Remontuojama",
      "Paruošta atsiėmimui",
      "Uždaryta",
    ],
    default: "Naujas",
  },
  attachments: [String],
});

export default mongoose.model("ServiceTicket", ServiceTicketSchema);
