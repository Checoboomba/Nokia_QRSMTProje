const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI1, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TicketSchema = new mongoose.Schema({
  operatorId: String,
  operatorName: String,
  lineNumber: String,
  machineNumber: String,
  errors: [String],
  satisfaction: String,
  status: { type: String, default: "Created" },
  ticketId: String,
  comments: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  localTimeCreated: String // Field to store formatted local time
});

const Ticket = mongoose.model("Ticket", TicketSchema);

app.post("/api/report", async (req, res) => {
  const { operatorId, operatorName, lineNumber, machineNumber, errors, satisfaction } = req.body;

  const ticketId = Math.floor(1000 + Math.random() * 9000).toString();
  const localTimeCreated = new Date().toLocaleTimeString(); // Only time is stored
  const ticket = new Ticket({ 
    operatorId, 
    operatorName, 
    lineNumber, 
    machineNumber, 
    errors, 
    satisfaction, 
    ticketId,
    localTimeCreated
  });

  await ticket.save();
  res.json({ message: "Ticket created", ticketId });
});

app.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

// Update ticket status and comments
app.post("/api/update-ticket", async (req, res) => {
  const { ticketId, status, comments } = req.body;
  await Ticket.findOneAndUpdate({ ticketId }, { status, comments });
  res.json({ message: "Ticket updated successfully" });
});

// Delete ticket
app.delete("/api/delete-ticket/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  await Ticket.findOneAndDelete({ ticketId });
  res.json({ message: "Ticket deleted successfully" });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});