/**
 * Shared Resend client instance.
 * Lazily initialised so the module can be imported at build time
 * without throwing when the env var is missing (e.g. during static generation).
 */

import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

/**
 * Constants — update these when you verify your domain in Resend.
 *
 * IMPORTANT: Until you add and verify a custom domain in Resend,
 * you can only send to your own email using onboarding@resend.dev.
 * After verification, update FROM_EMAIL to use your domain for
 * proper DKIM/SPF alignment and better deliverability.
 */
export const FROM_EMAIL = "Fintaak <hello@fintaak.com>";
export const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";
