import PDFDocument from "pdfkit";

const getTimeZone = () => process.env.BOOKING_TIME_ZONE || "Asia/Tashkent";

const formatDate = (value) => {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return value || "";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: getTimeZone(),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatAmount = (value) => Number(value || 0).toLocaleString("en-US");

export const createReceiptNumber = ({ bookingId, orderId, paidAt } = {}) => {
  const date = paidAt ? new Date(paidAt) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const datePart = safeDate.toISOString().slice(0, 10).replace(/-/g, "");
  const source = String(bookingId || orderId || Date.now()).replace(/[^a-zA-Z0-9]/g, "");
  const suffix = source.slice(-8).toUpperCase().padStart(8, "0");

  return `QC-${datePart}-${suffix}`;
};

const writePair = (doc, label, value) => {
  doc.font("Helvetica-Bold").text(`${label}: `, { continued: true });
  doc.font("Helvetica").text(String(value || "-"));
};

const sectionTitle = (doc, title) => {
  doc.moveDown(0.75);
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#202733").text(title.toUpperCase());
  doc.moveDown(0.25);
  doc.strokeColor("#DCE3EC").lineWidth(0.7).moveTo(48, doc.y).lineTo(547, doc.y).stroke();
  doc.moveDown(0.5);
  doc.fillColor("#111827").fontSize(9.5);
};

const writeImportantInformation = (doc) => {
  const x = 48;
  const width = 499;
  const y = doc.y;
  const body =
    "Qonoq Capsule is NOT located in the Transit Zone.\n" +
    "We are located in the Check-in / Registration Zone of Tashkent International Airport, Terminal 2.\n" +
    "Please do NOT proceed to the Transit Zone.";
  const bodyHeight = doc.heightOfString(body, { width: width - 32, lineGap: 2 });
  const boxHeight = 44 + bodyHeight;

  doc.roundedRect(x, y, width, boxHeight, 8).fillAndStroke("#FFF8E8", "#E8B84B");
  doc.fillColor("#8A5A00").font("Helvetica-Bold").fontSize(10.5).text("IMPORTANT INFORMATION", x + 16, y + 13, {
    width: width - 32,
  });
  doc.fillColor("#2C2A25").font("Helvetica-Bold").fontSize(9.5).text(body, x + 16, y + 31, {
    width: width - 32,
    lineGap: 2,
  });
  doc.y = y + boxHeight + 8;
};

export const generatePaymentReceiptPdf = (receipt) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    const doc = new PDFDocument({ size: "A4", margin: 48 });

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(22).text("QONOQ CAPSULE", {
      align: "center",
    });
    doc.moveDown(0.2);
    doc.fillColor("#5B6573").fontSize(11).text("Invoice / Payment Receipt", { align: "center" });
    doc.moveDown(1.1);

    doc.fillColor("#111827").font("Helvetica").fontSize(9.5);
    writePair(doc, "Receipt No", receipt.receiptNumber);
    writePair(doc, "Payment ID", receipt.octoPaymentId);
    writePair(doc, "Transaction Date", formatDate(receipt.paymentDate));
    writePair(doc, "Payment Status", "PAID");

    sectionTitle(doc, "Payer Information");
    writePair(doc, "Name", receipt.guestName);
    writePair(doc, "Email", receipt.guestEmail);
    writePair(doc, "Phone", receipt.guestPhone);

    sectionTitle(doc, "Payment Information");
    writePair(doc, "Service", "Sleep Capsule Reservation");
    writePair(doc, "Amount Paid", `${formatAmount(receipt.amount)} UZS`);
    writePair(doc, "Currency", "UZS");
    writePair(doc, "Payment Method", receipt.paymentMethod || "Online Card");

    sectionTitle(doc, "Payment Provider");
    writePair(doc, "Provider", receipt.paymentProvider || "Octo Payment");
    writePair(doc, "Acquiring / Payment Partner", "Octo Bank");
    writePair(doc, "Merchant", "Qonoq Capsule");
    doc.moveDown(0.45);
    doc.font("Helvetica").fillColor("#5B6573").fontSize(8.8).text(
      "Payment was processed securely through the Octo Payment / Octo Bank acquiring system. This receipt is issued by Qonoq Capsule as confirmation of successful payment.",
      { lineGap: 1.5 },
    );

    doc.moveDown(0.7);
    writeImportantInformation(doc);

    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(9.5).text("HOW TO FIND US");
    doc.moveDown(0.25);
    doc.font("Helvetica").fillColor("#4B5563").fontSize(8.8).text(
      "Before arriving, review the step-by-step photo directions at QonoqCapsule.uz/directions so you can recognize the route from Terminal 2 to Qonoq Capsule in advance.",
      { lineGap: 1.5 },
    );

    doc.moveDown(0.6);
    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(9.5).text("CONTACT INFORMATION");
    doc.moveDown(0.25);
    doc.font("Helvetica").fontSize(8.8).fillColor("#343B46");
    doc.text("Phone / WhatsApp / Telegram: +998 95 232 24 24");
    doc.text("Email: qonoqcapsule@mail.ru");
    doc.text("Website: QonoqCapsule.uz");

    doc.moveDown(0.65);
    doc.font("Helvetica-Bold").fillColor("#111827").fontSize(9.2).text("IMPORTANT NOTE");
    doc.moveDown(0.2);
    doc.font("Helvetica").fillColor("#5B6573").fontSize(8.5).text(
      "For your security, Qonoq Capsule will never ask you to send credit card details by message or through unofficial links.",
      { lineGap: 1.3 },
    );

    doc.end();
  });
