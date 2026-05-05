import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send";

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
  text?: string;
  replyTo?: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const emailRequest: EmailRequest = await req.json();

    // Validate required fields
    if (!emailRequest.to || !emailRequest.subject || !emailRequest.html) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, html",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Prepare SendGrid payload
    const payload = {
      personalizations: [
        {
          to: [{ email: emailRequest.to }],
          subject: emailRequest.subject,
        },
      ],
      from: {
        email: emailRequest.from || "neuroalgoforexedge@gmail.com",
        name: "Robert Trading Tools",
      },
      content: [
        {
          type: "text/html",
          value: emailRequest.html,
        },
      ],
      ...(emailRequest.text && {
        content: [
          { type: "text/plain", value: emailRequest.text },
          { type: "text/html", value: emailRequest.html },
        ],
      }),
      ...(emailRequest.replyTo && {
        replyTo: {
          email: emailRequest.replyTo,
        },
      }),
    };

    // Send via SendGrid
    const response = await fetch(SENDGRID_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid error:", error);
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }

    // Extract message ID from response headers
    const messageId = response.headers.get("x-message-id") || `msg_${Date.now()}`;

    return new Response(
      JSON.stringify({
        success: true,
        messageId,
        message: "Email sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error in send-email function:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
