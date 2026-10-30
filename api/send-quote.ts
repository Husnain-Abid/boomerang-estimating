
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const recipient = "info@boomerangestimating.com";
const sender = process.env.EMAIL_FROM;

const MAX_ATTACHMENT_SIZE = 3 * 1024 * 1024;

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\r?\n/g, "<br>");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
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
      deadline,
      honeypot,
      attachment,
    } = req.body ?? {};

    // Honeypot protection
    if (typeof honeypot === "string" && honeypot.trim()) {
      return res.status(200).json({ success: true });
    }

    // Required field validation
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      fullName.length > 120 ||
      typeof email !== "string" ||
      email.length > 254 ||
      !isValidEmail(email) ||
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 10000
    ) {
      return res.status(400).json({
        error:
          "Please provide a valid name, email, and project description.",
      });
    }

    const fields: Record<string, unknown> = {
      "Full Name": fullName,
      Email: email,
      "Company Name": companyName,
      "Company Website": website,
      "Project Deadline": deadline,
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
      if (
        typeof attachment !== "object" ||
        typeof attachment.fileName !== "string" ||
        typeof attachment.contentBase64 !== "string" ||
        typeof attachment.contentType !== "string"
      ) {
        return res.status(400).json({
          error: "Invalid attachment.",
        });
      }

      const { fileName, contentBase64, contentType } = attachment;

      const allowedTypes: Record<string, string> = {
        "application/pdf": ".pdf",
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "application/zip": ".zip",
        "application/x-zip-compressed": ".zip",
      };

      if (
        !fileName.trim() ||
        fileName.length > 255 ||
        !contentBase64 ||
        contentBase64.length > 4_200_000 ||
        !allowedTypes[contentType]
      ) {
        return res.status(400).json({
          error: "Invalid or unsupported attachment.",
        });
      }

      const safeFileName = fileName
        .replace(/\\/g, "/")
        .split("/")
        .pop()!
        .replace(/[^a-zA-Z0-9._-]/g, "_");

      const base64 = contentBase64.replace(
        /^data:[^;]+;base64,/,
        ""
      );

      // Validate Base64 format
      if (
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          base64
        )
      ) {
        return res.status(400).json({
          error: "Invalid attachment data.",
        });
      }

      const extension = safeFileName
        .toLowerCase()
        .slice(safeFileName.lastIndexOf("."));

      if (extension !== allowedTypes[contentType]) {
        return res.status(400).json({
          error: "File extension does not match its content type.",
        });
      }

      const fileBuffer = Buffer.from(base64, "base64");

      if (
        fileBuffer.length === 0 ||
        fileBuffer.length > MAX_ATTACHMENT_SIZE
      ) {
        return res.status(400).json({
          error: "Attachment must be smaller than 3 MB.",
        });
      }

      attachments.push({
        filename: safeFileName,
        content: fileBuffer,
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
