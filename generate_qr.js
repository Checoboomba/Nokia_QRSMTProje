const QRCode = require("qrcode");
const fs = require("fs");

const qrDir = "qrcodes";
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
}

const generateQRCode = async (machineId) => {
  try {
    const url = `http://192.168.10.1:5000/report?machineId=${machineId}`;
    const qrCodePath = `${qrDir}/machine_${machineId}.png`;

    await QRCode.toFile(qrCodePath, url, {
      color: { dark: "#000", light: "#fff" },
      width: 300
    });

    console.log(`✅ QR Code for Machine ${machineId} saved at: ${qrCodePath}`);
  } catch (err) {
    console.error("Error generating QR Code:", err);
  }
};

const machines = ["SMT001", "SMT002", "SMT003"];
machines.forEach(machineId => generateQRCode(machineId));