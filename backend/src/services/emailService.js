import nodemailer from "nodemailer";

let transporter;
let missingCredentialsLogged = false;

const getSmtpUser = () => process.env.SMTP_USER || process.env.EMAIL_USER;
const getSmtpPass = () => process.env.SMTP_PASS || process.env.EMAIL_PASS;

const getSmtpConfig = () => ({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: String(process.env.SMTP_SECURE ?? "true").toLowerCase() !== "false",
  auth: {
    user: getSmtpUser(),
    pass: getSmtpPass(),
  },
});

const assertSmtpCredentials = () => {
  if (getSmtpUser() && getSmtpPass()) {
    return;
  }

  if (!missingCredentialsLogged) {
    console.error("Missing SMTP credentials");
    missingCredentialsLogged = true;
  }

  throw new Error("Missing SMTP credentials");
};

const getTransporter = () => {
  if (!transporter) {
    assertSmtpCredentials();
    transporter = nodemailer.createTransport(getSmtpConfig());
  }

  return transporter;
};

const getFromAddress = () =>
  process.env.SMTP_FROM || `"Qonoq Capsule" <${getSmtpUser()}>`;

const formatPrice = (value) => Number(value || 0).toLocaleString("en-US");

export const buildBookingConfirmationText = (booking) => `Thank you for choosing Qonoq Capsule via QonoqCapsule.uz!

Your booking and payment details are included in the attached invoice / payment receipt.

IMPORTANT INFORMATION

Qonoq Capsule is NOT located in the Transit Zone.

We are located in the Check-in / Registration Zone of Tashkent International Airport, Terminal 2.

Please do NOT proceed to the Transit Zone.

Before arriving, please visit QonoqCapsule.uz and open the "How to Find Us / Directions" section to review the step-by-step photo guide showing how to reach Qonoq Capsule from the airport entrance:
https://qonoqcapsule.uz/directions

We strongly recommend checking these directions in advance so you can easily find us upon arrival.

CONTACT INFORMATION

Phone / WhatsApp / Telegram: +998 95 232 24 24
Email: qonoqcapsule@mail.ru
Website: QonoqCapsule.uz

IMPORTANT NOTE

For your security, we will never ask you to send your credit card details by message or through unofficial links.

If you have any questions about your booking, payment, or how to find us, please contact us using the details above or visit QonoqCapsule.uz.

YOUR BOOKING DETAILS

Guest: ${booking.guestName || ""}
Email: ${booking.guestEmail || ""}
Phone: ${booking.guestPhone || ""}

Booking Date: ${booking.bookingDate || ""}
Check-in Date: ${booking.checkInDate || ""}
Check-in Time: ${booking.checkInTime || ""}
Room Type: ${booking.roomType || ""}
Duration: ${booking.duration || ""}
Price: ${formatPrice(booking.price)} UZS

Thank you for choosing Qonoq Capsule.
We look forward to welcoming you!

-- Qonoq Capsule Team`;

export const sendMail = (options) =>
  getTransporter().sendMail({
    from: getFromAddress(),
    ...options,
  });

export const sendBookingConfirmationEmail = async ({
  booking,
  receiptPdf,
  receiptNumber,
}) => {
  if (!booking.guestEmail) {
    throw new Error("Guest email is missing");
  }

  return sendMail({
    to: booking.guestEmail,
    subject: "Qonoq Capsule - Booking Confirmation & Payment Receipt",
    text: buildBookingConfirmationText(booking),
    attachments: [
      {
        filename: `qonoq-capsule-receipt-${receiptNumber}.pdf`,
        content: receiptPdf,
        contentType: "application/pdf",
      },
    ],
  });
};
