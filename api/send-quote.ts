
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
      phone,
      companyName,
      projectName,
      projectAddress,
      projectType,
      scope,
      message,
      website,
      honeypot,
      attachment,
    } = req.body ?? {};

    // Separate hidden honeypot field.
    if (
      typeof honeypot === "string" &&
      honeypot.trim().length > 0
    ) {
      return res.status(200).json({
        success: true,
      });
    }

    // Support both frontend field names.
    const projectScope = scope ?? message;

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      fullName.length > 120 ||
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof projectScope !== "string" ||
      !projectScope.trim() ||
      projectScope.length > 10000
    ) {
      return res.status(400).json({
        error: "Please provide a valid name, email, and project scope.",
      });
    }

    const fields: Record<string, unknown> = {
      "Full name": fullName,
      Email: email,
      Phone: phone,
      Company: companyName,
      Website: website,
      "Project name": projectName,
      "Project address": projectAddress,
      "Project type": projectType,
      "Scope of work": projectScope,
    };

    const html = Object.entries(fields)
      .map(([label, value]) => `
        <p>
          <strong>${escapeHtml(label)}:</strong><br>
          ${value ? escapeHtml(value) : "Not provided"}
        </p>
      `)
      .join("");

    // Optional PDF attachment.
    const attachments = [];

    if (attachment) {
      const { fileName, content, contentType } = attachment;

      if (
        typeof fileName !== "string" ||
        typeof content !== "string" ||
        !content ||
        content.length > 4_000_000
      ) {
        return res.status(400).json({
          error: "Invalid or oversized attachment.",
        });
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
      ];

      if (
        contentType &&
        !allowedTypes.includes(contentType)
      ) {
        return res.status(400).json({
          error: "Unsupported attachment type.",
        });
      }

      const base64 = content.replace(
        /^data:[^;]+;base64,/,
        ""
      );

      attachments.push({
        filename: fileName,
        content: base64,
      });
    }

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email.trim(),
      subject: `New Quote Request — ${fullName.trim()}`,
      html,
      ...(attachments.length > 0 ? { attachments } : {}),
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        error: "Unable to send your request right now.",
      });
    }

    console.log("Resend email sent successfully:", data?.id);

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
