
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const recipient = "info@boomerangestimating.com";
const sender = process.env.EMAIL_FROM;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // Check environment variables
  if (!sender || !process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY or EMAIL_FROM");

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
      website,
      honeypot,
    } = req.body ?? {};

    // Separate honeypot field to detect bots
    if (
      typeof honeypot === "string" &&
      honeypot.trim().length > 0
    ) {
      return res.status(200).json({
        success: true,
      });
    }

    // Validate required fields
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      fullName.length > 120 ||
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof scope !== "string" ||
      !scope.trim() ||
      scope.length > 10000
    ) {
      return res.status(400).json({
        error: "Please provide a valid name, email, and project scope.",
      });
    }

    // Prepare email fields
    const fields = {
      "Full name": fullName,
      Email: email,
      Phone: phone,
      Company: companyName,
      Website: website,
      "Project name": projectName,
      "Project address": projectAddress,
      "Project type": projectType,
      "Scope of work": scope,
    };

    // Escape HTML to prevent unsafe content
    const escapeHtml = (value: unknown) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br />");

    const html = Object.entries(fields)
      .map(([label, value]) => {
        const safeValue = escapeHtml(value);

        return `
          <p>
            <strong>${label}:</strong><br />
            ${safeValue || "Not provided"}
          </p>
        `;
      })
      .join("");

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject: `New Quote Request — ${fullName.trim()}`,
      html,
    });

    // Handle Resend errors
    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        error: "Unable to send your request right now.",
      });
    }

    console.log("Quote email sent successfully:", data?.id);

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
