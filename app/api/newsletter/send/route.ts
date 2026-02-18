/**
 * POST /api/newsletter/send
 *
 * Admin-only endpoint to send a newsletter issue to a list of recipients.
 * Protected by NEWSLETTER_ADMIN_KEY header check.
 *
 * Body: SendNewsletterPayload (see lib/types/email.ts)
 *
 * For large audiences (>100 recipients), use Resend Batch API
 * which supports up to 100 emails per call. This route handles
 * chunking automatically.
 */

import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import NewsletterTemplate from "@/emails/NewsletterTemplate";
import type { SendNewsletterPayload, ApiResponse } from "@/lib/types/email";

const BATCH_SIZE = 100; // Resend batch limit

function authenticate(request: Request): boolean {
  const key = process.env.NEWSLETTER_ADMIN_KEY;
  if (!key) return false;
  const provided = request.headers.get("x-admin-key");
  return provided === key;
}

export async function POST(request: Request) {
  // Auth check
  if (!authenticate(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as SendNewsletterPayload;
    const { to, subject, issueNumber, publishDate, articles } = body;

    // Validate
    const recipients = Array.isArray(to) ? to : [to];
    if (recipients.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Se requiere al menos un destinatario" },
        { status: 400 }
      );
    }
    if (!articles || articles.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Se requiere al menos un artículo" },
        { status: 400 }
      );
    }

    const resend = getResend();
    const emailSubject =
      subject ?? `Fintaak Newsletter #${issueNumber}`;

    const ids: string[] = [];

    // Chunk recipients into batches
    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const chunk = recipients.slice(i, i + BATCH_SIZE);

      if (chunk.length === 1) {
        // Single send
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: chunk[0],
          subject: emailSubject,
          react: NewsletterTemplate({ issueNumber, publishDate, articles }),
        });
        if (error) throw new Error(error.message);
        if (data?.id) ids.push(data.id);
      } else {
        // Batch send
        const { data, error } = await resend.batch.send(
          chunk.map((email) => ({
            from: FROM_EMAIL,
            to: email,
            subject: emailSubject,
            react: NewsletterTemplate({ issueNumber, publishDate, articles }),
          }))
        );
        if (error) throw new Error(error.message);
        if (data?.data) {
          data.data.forEach((d) => ids.push(d.id));
        }
      }
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      id: ids.join(","),
    });
  } catch (err) {
    console.error("Newsletter send error:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Error al enviar el newsletter",
      },
      { status: 500 }
    );
  }
}
