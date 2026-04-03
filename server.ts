import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Rate limiting for contact form
  const contactLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many requests from this IP, please try again after a minute",
  });

  // API Routes
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/status", (req, res) => {
    const isConfigured = !!(
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.RECIPIENT_EMAIL
    );
    res.json({
      configured: isConfigured,
      host: process.env.EMAIL_HOST || "not set",
      port: process.env.EMAIL_PORT || "not set",
    });
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { name, email, phone, organization, inquiryType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const referenceNumber = `KHUB-${Date.now().toString().slice(-6)}`;

    // Check if email is configured
    const isConfigured = !!(
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.RECIPIENT_EMAIL
    );

    if (!isConfigured) {
      console.warn("Email not configured. Simulating success for:", { name, email, inquiryType });
      return res.json({ 
        success: true, 
        referenceNumber, 
        simulated: true,
        message: "Email credentials not set in environment. This is a simulated success for the preview."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      const referenceNumber = `KHUB-${Date.now().toString().slice(-6)}`;

      // 1. Admin Email
      await transporter.sendMail({
        from: `"K-HUB Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New K-HUB Inquiry: ${inquiryType} - ${referenceNumber}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone || "N/A"}
          Organization: ${organization || "N/A"}
          Inquiry Type: ${inquiryType}
          Message: ${message}
          Reference: ${referenceNumber}
        `,
        html: `
          <h3>New K-HUB Inquiry</h3>
          <p><strong>Reference:</strong> ${referenceNumber}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Organization:</strong> ${organization || "N/A"}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      // 2. Auto-reply to User
      await transporter.sendMail({
        from: `"K-HUB Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for contacting K-HUB - ${referenceNumber}`,
        text: `
          Dear ${name},

          Thank you for reaching out to K-HUB. We have received your inquiry regarding "${inquiryType}".
          Our team will review your message and get back to you shortly.

          Your reference number is: ${referenceNumber}

          Best regards,
          The K-HUB Team
          Vidyardi Institutions Pvt. Ltd.
        `,
        html: `
          <h3>Dear ${name},</h3>
          <p>Thank you for reaching out to <strong>K-HUB</strong>. We have received your inquiry regarding "${inquiryType}".</p>
          <p>Our team will review your message and get back to you shortly.</p>
          <p>Your reference number is: <strong>${referenceNumber}</strong></p>
          <br>
          <p>Best regards,<br>
          The K-HUB Team<br>
          Vidyardi Institutions Pvt. Ltd.</p>
        `,
      });

      res.json({ success: true, referenceNumber });
    } catch (error) {
      console.error("Email sending failed:", error);
      res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
