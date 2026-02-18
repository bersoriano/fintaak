/**
 * POST /api/newsletter/subscribe
 *
 * Adds the subscriber to the Resend audience and sends a welcome email.
 * Called from the CTASection subscription form on the landing page.
 */

import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL, RESEND_AUDIENCE_ID } from "@/lib/resend";
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import type { SubscribePayload, ApiResponse } from "@/lib/types/email";

export async function GET() {
  return NextResponse.json<ApiResponse>(
    { success: false, error: "Usa POST para suscribirte" },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubscribePayload;
    const { email, name } = body;

    if (!email) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Email es requerido" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Email inválido" },
        { status: 400 }
      );
    }

    const resend = getResend();

    // 1. Add to Resend audience (if audience ID is configured)
    if (RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          audienceId: RESEND_AUDIENCE_ID,
          email,
          firstName: name ?? undefined,
          unsubscribed: false,
        });
      } catch (audienceError: unknown) {
        // If the contact already exists, Resend returns 409 — that's OK
        const msg =
          audienceError instanceof Error ? audienceError.message : "";
        if (!msg.includes("already exists")) {
          console.error("Failed to add contact to audience:", audienceError);
        }
      }
    }

    // 2. Send welcome email
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Bienvenido a Fintaak — transparencia en cada transferencia",
      react: WelcomeTemplate({ subscriberName: name }),
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Error al enviar el email de bienvenida" },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      id: data?.id,
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Error interno. Intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
