
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const recipient = "info@boomerangestimating.com";
const sender = process.env.EMAIL_FROM;

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\r?\n/g, "<br>");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!sender || !process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: "Email service is not configured.",
    });
  }

  try {
    const {
      fullName,
      email,
      companyName,
      website,
      message,
      honeypot,
      attachment,
    } = req.body ?? {};

    // Honeypot: real users should leave this field empty.
    if (typeof honeypot === "string" && honeypot.trim()) {
      return res.status(200).json({ success: true });
    }

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      fullName.length > 120 ||
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 10000
    ) {
      return res.status(400).json({
        error: "Please provide a valid name, email, and project description.",
      });
    }

    const fields: Record<string, unknown> = {
      "Full Name": fullName,
      Email: email,
      "Company Name": companyName,
      "Company Website": website,
      "Project Description": message,
    };

    const html = Object.entries(fields)
      .map(
        ([label, value]) => `
          <p>
            <strong>${escapeHtml(label)}:</strong><br />
            ${value ? escapeHtml(value) : "Not provided"}
          </p>
        `
      )
      .join("");

    const attachments: {
      filename: string;
      content: Buffer;
    }[] = [];

    if (attachment) {
      const { fileName, contentBase64, contentType } = attachment;

      const allowedTypes: Record<string, string> = {
        "application/pdf": ".pdf",
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "application/zip": ".zip",
        "application/x-zip-compressed": ".zip",
        "application/acad": ".dwg",
        "application/octet-stream": "",
      };

      if (
        typeof fileName !== "string" ||
        typeof contentBase64 !== "string" ||
        !contentBase64 ||
        contentBase64.length > 4_000_000 ||
        typeof contentType !== "string" ||
        !allowedTypes[contentType]
      ) {
        return res.status(400).json({
          error: "Invalid or unsupported attachment.",
        });
      }

      const base64 = contentBase64.replace(/^data:[^;]+;base64,/, "");

      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
        return res.status(400).json({
          error: "Invalid attachment data.",
        });
      }

      const extension = fileName.toLowerCase().slice(fileName.lastIndexOf("."));

      if (
        allowedTypes[contentType] &&
        extension !== allowedTypes[contentType]
      ) {
        return res.status(400).json({
          error: "File extension does not match its content type.",
        });
      }

      attachments.push({
        filename: fileName,
        content: Buffer.from(base64, "base64"),
      });
    }

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email.trim(),
      subject: `New Quote Request — ${fullName.trim()}`,
      html,
      ...(attachments.length ? { attachments } : {}),
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        error: "Unable to send your request right now.",
      });
    }

    console.log("Quote email sent:", data?.id);

    return res.status(200).json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Quote API error:", error);

    return res.status(500).json({
      error: "An unexpected error occurred. Please try again.",
    });
  }
}
