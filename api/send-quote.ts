
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const recipient = "info@boomerangestimating.com";
const sender = process.env.EMAIL_FROM;

// Maximum combined attachment size: 3 MB
const MAX_TOTAL_ATTACHMENT_SIZE = 3 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "application/zip": ".zip",
  "application/x-zip-compressed": ".zip",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    ".xlsx",
};

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

function safeFileName(fileName: string): string {
  return fileName
    .replace(/\\/g, "/")
    .split("/")
    .pop()!
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

function createHtml(fields: Record<string, unknown>): string {
  return Object.entries(fields)
    .map(
      ([label, value]) => `
        <p>
          <strong>${escapeHtml(label)}:</strong><br />
          ${value ? escapeHtml(value) : "Not provided"}
        </p>
      `
    )
    .join("");
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
      formType,
      fullName,
      email,
      companyName,
      website,
      message,
      deadline,
      phone,
      projectName,
      projectAddress,
      projectType,
      scopeDescription,
      honeypot,
      attachment,
      attachments: uploadedAttachments,
    } = req.body ?? {};

    // Honeypot protection
    if (typeof honeypot === "string" && honeypot.trim()) {
      return res.status(200).json({ success: true });
    }

    // Common validation
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      fullName.length > 120 ||
      typeof email !== "string" ||
      email.length > 254 ||
      !isValidEmail(email)
    ) {
      return res.status(400).json({
        error: "Please provide a valid name and email address.",
      });
    }

    let fields: Record<string, unknown>;
    let subject: string;

    if (formType === "request-quote") {
      // Request Quote form validation
      if (
        typeof phone !== "string" ||
        phone.trim().length < 8 ||
        phone.length > 40 ||
        typeof projectName !== "string" ||
        projectName.trim().length < 2 ||
        typeof projectAddress !== "string" ||
        projectAddress.trim().length < 5 ||
        typeof projectType !== "string" ||
        !projectType.trim() ||
        typeof scopeDescription !== "string" ||
        scopeDescription.trim().length < 20 ||
        scopeDescription.length > 10000
      ) {
        return res.status(400).json({
          error: "Please complete all required project details.",
        });
      }

      fields = {
        "Form Type": "Request a Quote",
        "Full Name": fullName,
        Email: email,
        Phone: phone,
        "Company Name": companyName,
        "Project Name": projectName,
        "Project Address": projectAddress,
        "Project Type": projectType,
        "Scope Description": scopeDescription,
      };

      subject = `New Quote Request — ${fullName.trim()} — ${projectName.trim()}`;
    } else {
      // Existing Contact form validation
      if (
        typeof message !== "string" ||
        !message.trim() ||
        message.length > 10000
      ) {
        return res.status(400).json({
          error: "Please provide a project description.",
        });
      }

      fields = {
        "Form Type": "Contact Form",
        "Full Name": fullName,
        Email: email,
        "Company Name": companyName,
        "Company Website": website,
        "Project Deadline": deadline,
        "Project Description": message,
      };

      subject = `New Quote Request — ${fullName.trim()}`;
    }

    // Support both the existing Contact attachment and
    // multiple Request Quote attachments.
    const files: unknown[] = [];

    if (attachment) {
      files.push(attachment);
    }

    if (uploadedAttachments !== undefined) {
      if (!Array.isArray(uploadedAttachments)) {
        return res.status(400).json({
          error: "Invalid attachments.",
        });
      }

      files.push(...uploadedAttachments);
    }

    const emailAttachments: {
      filename: string;
      content: Buffer;
    }[] = [];

    let totalAttachmentSize = 0;

    for (const file of files) {
      if (
        !file ||
        typeof file !== "object" ||
        typeof (file as any).fileName !== "string" ||
        typeof (file as any).contentBase64 !== "string" ||
        typeof (file as any).contentType !== "string"
      ) {
        return res.status(400).json({
          error: "Invalid attachment.",
        });
      }

      const { fileName, contentBase64, contentType } = file as {
        fileName: string;
        contentBase64: string;
        contentType: string;
      };

      const extension = ALLOWED_TYPES[contentType];

      const cleanName = safeFileName(fileName);

      if (
        !cleanName ||
        cleanName.length > 255 ||
        !contentBase64 ||
        !extension ||
        contentBase64.length > 4_300_000
      ) {
        return res.status(400).json({
          error: "Invalid or unsupported attachment.",
        });
      }

      const base64 = contentBase64.replace(
        /^data:[^;]+;base64,/,
        ""
      );

      if (
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          base64
        )
      ) {
        return res.status(400).json({
          error: "Invalid attachment data.",
        });
      }

      if (!cleanName.toLowerCase().endsWith(extension)) {
        return res.status(400).json({
          error: "File extension does not match its content type.",
        });
      }

      const fileBuffer = Buffer.from(base64, "base64");

      if (fileBuffer.length === 0) {
        return res.status(400).json({
          error: "An uploaded file is empty.",
        });
      }

      totalAttachmentSize += fileBuffer.length;

      if (totalAttachmentSize > MAX_TOTAL_ATTACHMENT_SIZE) {
        return res.status(400).json({
          error: "The combined attachment size must be 3 MB or less.",
        });
      }

      emailAttachments.push({
        filename: cleanName,
        content: fileBuffer,
      });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Website Form Submission</h2>
        ${createHtml(fields)}
        <hr />
        <p><strong>Uploaded Files:</strong> ${emailAttachments.length}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email.trim(),
      subject,
      html,
      ...(emailAttachments.length
        ? { attachments: emailAttachments }
        : {}),
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        error: "Unable to send your request right now.",
      });
    }

    console.log("Email sent successfully:", data?.id);

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
