/**
 * SendGrid Integration Service
 * Handles email sending, contact management, and email verification
 */

const SENDGRID_API_URL = "https://api.sendgrid.com/v3";
const SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY;
const FROM_EMAIL = process.env.VITE_SENDGRID_FROM_EMAIL || "neuroalgoforexedge@gmail.com";

export interface SendGridContact {
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  custom_fields?: Record<string, string>;
}

export interface SendGridEmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  categories?: string[];
  customArgs?: Record<string, string>;
}

export interface SendGridTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  plain_content?: string;
}

/**
 * Send email via SendGrid
 */
export async function sendEmail(
  request: SendGridEmailRequest
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const toArray = Array.isArray(request.to) ? request.to : [request.to];

    const payload = {
      personalizations: toArray.map((email) => ({
        to: [{ email }],
        subject: request.subject,
      })),
      from: {
        email: request.from || FROM_EMAIL,
        name: "Robert Trading Tools",
      },
      content: [
        {
          type: "text/html",
          value: request.html,
        },
        ...(request.text
          ? [
              {
                type: "text/plain",
                value: request.text,
              },
            ]
          : []),
      ],
      ...(request.replyTo && {
        replyTo: {
          email: request.replyTo,
        },
      }),
      ...(request.cc && {
        cc: request.cc.map((email) => ({ email })),
      }),
      ...(request.bcc && {
        bcc: request.bcc.map((email) => ({ email })),
      }),
      ...(request.categories && {
        categories: request.categories,
      }),
      ...(request.customArgs && {
        customArgs: request.customArgs,
      }),
    };

    const response = await fetch(`${SENDGRID_API_URL}/mail/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }

    const messageId = response.headers.get("x-message-id") || `msg_${Date.now()}`;

    return {
      success: true,
      messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Add contact to SendGrid
 */
export async function addContact(
  contact: SendGridContact
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const payload = {
      contacts: [
        {
          email: contact.email,
          first_name: contact.first_name,
          last_name: contact.last_name,
          phone_number: contact.phone_number,
          custom_fields: contact.custom_fields,
        },
      ],
    };

    const response = await fetch(`${SENDGRID_API_URL}/marketing/contacts`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }

    const data = await response.json();

    return {
      success: true,
      contactId: data.job_id,
    };
  } catch (error) {
    console.error("Error adding contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get contact by email
 */
export async function getContact(
  email: string
): Promise<{ success: boolean; contact?: SendGridContact; error?: string }> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const response = await fetch(
      `${SENDGRID_API_URL}/marketing/contacts/search?query=email%20%3D%20%27${encodeURIComponent(email)}%27`,
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    const data = await response.json();
    const contact = data.result?.[0];

    if (!contact) {
      return {
        success: false,
        error: "Contact not found",
      };
    }

    return {
      success: true,
      contact: {
        email: contact.email,
        first_name: contact.first_name,
        last_name: contact.last_name,
        phone_number: contact.phone_number,
        custom_fields: contact.custom_fields,
      },
    };
  } catch (error) {
    console.error("Error getting contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete contact
 */
export async function deleteContact(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const payload = {
      emails: [email],
    };

    const response = await fetch(`${SENDGRID_API_URL}/marketing/contacts`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get sender verification status
 */
export async function getSenderVerificationStatus(): Promise<{
  success: boolean;
  verified: boolean;
  email?: string;
  error?: string;
}> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const response = await fetch(`${SENDGRID_API_URL}/verified_senders`, {
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    const data = await response.json();
    const sender = data.results?.find(
      (s: any) => s.from_email === FROM_EMAIL
    );

    return {
      success: true,
      verified: sender?.verified_at ? true : false,
      email: FROM_EMAIL,
    };
  } catch (error) {
    console.error("Error checking sender verification:", error);
    return {
      success: false,
      verified: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get email statistics
 */
export async function getEmailStats(
  startDate: string,
  endDate: string
): Promise<{
  success: boolean;
  stats?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    dropped: number;
  };
  error?: string;
}> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const response = await fetch(
      `${SENDGRID_API_URL}/stats?start_date=${startDate}&end_date=${endDate}&aggregated_by=day`,
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    const data = await response.json();
    const stats = data[0] || {};

    return {
      success: true,
      stats: {
        sent: stats.stats?.[0]?.requests || 0,
        delivered: stats.stats?.[0]?.delivered || 0,
        opened: stats.stats?.[0]?.opens || 0,
        clicked: stats.stats?.[0]?.clicks || 0,
        bounced: stats.stats?.[0]?.bounces || 0,
        dropped: stats.stats?.[0]?.drops || 0,
      },
    };
  } catch (error) {
    console.error("Error getting email stats:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Create dynamic template
 */
export async function createTemplate(
  template: SendGridTemplate
): Promise<{ success: boolean; templateId?: string; error?: string }> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const payload = {
      name: template.name,
      generations: [
        {
          name: "Dynamic Template",
          subject: template.subject,
          html_content: template.html_content,
          plain_content: template.plain_content,
        },
      ],
    };

    const response = await fetch(`${SENDGRID_API_URL}/templates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }

    const data = await response.json();

    return {
      success: true,
      templateId: data.id,
    };
  } catch (error) {
    console.error("Error creating template:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send email using template
 */
export async function sendTemplateEmail(
  to: string,
  templateId: string,
  dynamicData: Record<string, any>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured");
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: to }],
          dynamic_template_data: dynamicData,
        },
      ],
      from: {
        email: FROM_EMAIL,
        name: "Robert Trading Tools",
      },
      template_id: templateId,
    };

    const response = await fetch(`${SENDGRID_API_URL}/mail/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }

    const messageId = response.headers.get("x-message-id") || `msg_${Date.now()}`;

    return {
      success: true,
      messageId,
    };
  } catch (error) {
    console.error("Error sending template email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
