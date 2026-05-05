import { supabase } from "@/integrations/supabase/client";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: string[];
}

export interface EmailNotification {
  id?: string;
  recipientEmail: string;
  templateId: string;
  templateVariables: Record<string, string>;
  status?: "pending" | "sent" | "failed";
  sentAt?: string;
  error?: string;
}

/**
 * Email templates for different notification types
 * Using string concatenation to avoid template literal issues
 */
export const emailTemplates: Record<string, EmailTemplate> = {
  orderConfirmation: {
    id: "order-confirmation",
    name: "Order Confirmation",
    subject: "Your Order Confirmation - Robert Trading Tools",
    htmlContent: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<h2>Order Confirmation</h2>' +
      '<p>Hi ' + '{{customerName}}' + ',</p>' +
      '<p>Thank you for your purchase! Your order has been confirmed.</p>' +
      '<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">' +
      '<p><strong>Order ID:</strong> ' + '{{orderId}}' + '</p>' +
      '<p><strong>Product:</strong> ' + '{{productName}}' + '</p>' +
      '<p><strong>Amount:</strong> ' + '{{amount}}' + '</p>' +
      '<p><strong>Date:</strong> ' + '{{orderDate}}' + '</p>' +
      '</div>' +
      '<p>You will receive a download link shortly.</p>' +
      '<p>Best regards,<br>Robert Trading Tools Team</p>' +
      '</div>',
    variables: ["customerName", "orderId", "productName", "amount", "orderDate"],
  },
  customEARequest: {
    id: "custom-ea-request",
    name: "Custom EA Request Received",
    subject: "Your Custom EA Request - Robert Trading Tools",
    htmlContent: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<h2>Custom EA Request Received</h2>' +
      '<p>Hi ' + '{{clientName}}' + ',</p>' +
      '<p>Thank you for submitting your custom EA request. We have received your details and will review them shortly.</p>' +
      '<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">' +
      '<p><strong>Request ID:</strong> ' + '{{requestId}}' + '</p>' +
      '<p><strong>Strategy:</strong> ' + '{{strategy}}' + '</p>' +
      '<p><strong>Budget Range:</strong> ' + '{{budgetRange}}' + '</p>' +
      '<p><strong>Deadline:</strong> ' + '{{deadline}}' + '</p>' +
      '</div>' +
      '<p>We will contact you within 24 hours with a quote and timeline.</p>' +
      '<p>Best regards,<br>Robert Trading Tools Team</p>' +
      '</div>',
    variables: ["clientName", "requestId", "strategy", "budgetRange", "deadline"],
  },
  bookingConfirmation: {
    id: "booking-confirmation",
    name: "Booking Confirmation",
    subject: "Your Booking Confirmation - Robert Trading Tools",
    htmlContent: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<h2>Booking Confirmation</h2>' +
      '<p>Hi ' + '{{clientName}}' + ',</p>' +
      '<p>Your consultation booking has been confirmed!</p>' +
      '<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">' +
      '<p><strong>Package:</strong> ' + '{{packageName}}' + '</p>' +
      '<p><strong>Date & Time:</strong> ' + '{{dateTime}}' + '</p>' +
      '<p><strong>Duration:</strong> ' + '{{duration}}' + '</p>' +
      '<p><strong>Booking ID:</strong> ' + '{{bookingId}}' + '</p>' +
      '</div>' +
      '<p>A Zoom link will be sent 24 hours before your session.</p>' +
      '<p>Best regards,<br>Robert Trading Tools Team</p>' +
      '</div>',
    variables: ["clientName", "packageName", "dateTime", "duration", "bookingId"],
  },
  contactFormSubmission: {
    id: "contact-form",
    name: "Contact Form Submission",
    subject: "We Received Your Message - Robert Trading Tools",
    htmlContent: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<h2>Message Received</h2>' +
      '<p>Hi ' + '{{senderName}}' + ',</p>' +
      '<p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>' +
      '<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">' +
      '<p><strong>Subject:</strong> ' + '{{subject}}' + '</p>' +
      '<p><strong>Message ID:</strong> ' + '{{messageId}}' + '</p>' +
      '</div>' +
      '<p>Expected response time: 24-48 hours</p>' +
      '<p>Best regards,<br>Robert Trading Tools Team</p>' +
      '</div>',
    variables: ["senderName", "subject", "messageId"],
  },
  downloadLink: {
    id: "download-link",
    name: "Download Link",
    subject: "Your Download Link - Robert Trading Tools",
    htmlContent: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<h2>Your Download is Ready</h2>' +
      '<p>Hi ' + '{{customerName}}' + ',</p>' +
      '<p>Your ' + '{{productName}}' + ' is ready to download!</p>' +
      '<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">' +
      '<p><strong>Product:</strong> ' + '{{productName}}' + '</p>' +
      '<p><strong>Order ID:</strong> ' + '{{orderId}}' + '</p>' +
      '<a href="' + '{{downloadUrl}}' + '" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 10px 0;">Download Now</a>' +
      '</div>' +
      '<p>This link will expire in 7 days.</p>' +
      '<p>Best regards,<br>Robert Trading Tools Team</p>' +
      '</div>',
    variables: ["customerName", "productName", "orderId", "downloadUrl"],
  },
};

/**
 * Send email notification via SendGrid
 */
export async function sendEmailNotification(
  notification: EmailNotification
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log("[emailService] Sending email notification:", {
      recipient: notification.recipientEmail,
      templateId: notification.templateId,
      variables: Object.keys(notification.templateVariables)
    });

    const template = emailTemplates[notification.templateId];
    if (!template) {
      throw new Error("Template not found: " + notification.templateId);
    }

    // Replace variables in template
    let htmlContent = template.htmlContent;
    let subject = template.subject;

    Object.entries(notification.templateVariables).forEach(([key, value]) => {
      const placeholder = "{{" + key + "}}";
      const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g");
      htmlContent = htmlContent.replace(regex, value || "");
      subject = subject.replace(regex, value || "");
    });

    console.log("[emailService] Template processed, calling edge function");

    // Call SendGrid API via Supabase Edge Function
    const response = await supabase.functions.invoke("send-email", {
      body: {
        to: notification.recipientEmail,
        subject,
        html: htmlContent,
        from: process.env.VITE_SENDGRID_FROM_EMAIL || "neuroalgoforexedge@gmail.com",
      },
    });

    if (response.error) {
      throw response.error;
    }

    console.log("[emailService] Email sent successfully");

    // Log notification to database
    const { data, error } = await supabase
      .from("email_notifications")
      .insert({
        recipient_email: notification.recipientEmail,
        template_id: notification.templateId,
        template_variables: notification.templateVariables,
        status: "sent",
        sent_at: new Date().toISOString(),
        message_id: response.data?.messageId,
      });

    if (error) {
      console.error("[emailService] Error logging notification:", error);
    }

    return {
      success: true,
      messageId: response.data?.messageId,
    };
  } catch (error) {
    console.error("[emailService] Error sending email:", error);

    // Log failed notification
    await supabase
      .from("email_notifications")
      .insert({
        recipient_email: notification.recipientEmail,
        template_id: notification.templateId,
        template_variables: notification.templateVariables,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      })
      .catch((err) => console.error("[emailService] Error logging failed notification:", err));

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(
  customerEmail: string,
  customerName: string,
  orderId: string,
  productName: string,
  amount: number,
  orderDate: string
) {
  return sendEmailNotification({
    recipientEmail: customerEmail,
    templateId: "orderConfirmation",
    templateVariables: {
      customerName,
      orderId,
      productName,
      amount: amount.toString(),
      orderDate,
    },
  });
}

/**
 * Send custom EA request confirmation
 */
export async function sendCustomEARequestConfirmation(
  clientEmail: string,
  clientName: string,
  requestId: string,
  strategy: string,
  budgetRange: string,
  deadline: string
) {
  return sendEmailNotification({
    recipientEmail: clientEmail,
    templateId: "customEARequest",
    templateVariables: {
      clientName,
      requestId,
      strategy,
      budgetRange,
      deadline,
    },
  });
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(
  clientEmail: string,
  clientName: string,
  packageName: string,
  dateTime: string,
  duration: string,
  bookingId: string
) {
  return sendEmailNotification({
    recipientEmail: clientEmail,
    templateId: "bookingConfirmation",
    templateVariables: {
      clientName,
      packageName,
      dateTime,
      duration,
      bookingId,
    },
  });
}

/**
 * Send contact form submission confirmation
 */
export async function sendContactFormConfirmation(
  senderEmail: string,
  senderName: string,
  subject: string,
  messageId: string
) {
  return sendEmailNotification({
    recipientEmail: senderEmail,
    templateId: "contactFormSubmission",
    templateVariables: {
      senderName,
      subject,
      messageId,
    },
  });
}

/**
 * Send download link email
 */
export async function sendDownloadLink(
  customerEmail: string,
  customerName: string,
  productName: string,
  orderId: string,
  downloadUrl: string
) {
  return sendEmailNotification({
    recipientEmail: customerEmail,
    templateId: "downloadLink",
    templateVariables: {
      customerName,
      productName,
      orderId,
      downloadUrl,
    },
  });
}

/**
 * Get email notification history
 */
export async function getEmailNotificationHistory(
  recipientEmail?: string,
  limit: number = 50
) {
  let query = supabase
    .from("email_notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (recipientEmail) {
    query = query.eq("recipient_email", recipientEmail);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[emailService] Error fetching notification history:", error);
    return [];
  }

  return data || [];
}
