# UX & Analytics Improvements — Design Doc

**Date:** 2026-03-05
**Goal:** Increase both calculator engagement and newsletter signups by closing analytics gaps and bridging calculator results to conversion.

## Problem

- Only 3 GA events tracked (calculator interactions), leaving the full funnel blind: hero CTAs, FAQ engagement, newsletter signups, contact form, and calculator section visibility are untracked.
- The ranking bar in the calculator uses colored dots with hover-only tooltips — unreadable on mobile and unclear on desktop.
- Providers with amount-dependent pricing (Remitly, Western Union, Moneygram, Ria) show no hint that the cost improves at higher amounts, missing an opportunity to guide user behavior.
- There is no bridge between a user seeing they are overpaying and the newsletter/waitlist CTA.

## Success Criteria

- All major user interactions tracked in GA4 with meaningful parameters.
- A user on a non-cheapest provider sees an inline savings nudge linking to the newsletter.
- The ranking section is readable on mobile without hover.
- Tier-pricing hints appear contextually when relevant.

## Design

### Part 1 — Analytics Instrumentation

Add `sendGAEvent` calls to the following files:

**Hero.tsx**
- `hero_cta_clicked` → `{ button: "waitlist" | "calculator" }`
- Triggered on each of the two CTA link clicks.

**FAQ.tsx**
- `faq_item_opened` → `{ question_index: number, question_text: string }`
- Triggered when an accordion item is opened (not on close, to avoid noise).

**CTASection.tsx**
- `newsletter_signup_attempted` — on form submit, before the API call.
- `newsletter_signup_success` — after successful API response.
- `newsletter_signup_error` → `{ error: string }` — on catch.

**ContactForm.tsx**
- `contact_form_submitted` — after successful API response.

**RemittanceCalculator.tsx**
- `calculator_section_viewed` — fires once using IntersectionObserver when the section enters the viewport. Uses a `hasTracked` ref to prevent duplicate fires.
- `savings_nudge_clicked` → `{ cheapest_provider: string, amount: number, savings_usd: string }` — fires when the inline savings nudge link is clicked.

### Part 2 — Calculator UX

**2a. Inline savings nudge (conversion bridge)**

Below the ranking card, show a contextual banner:

- When selected provider is NOT #1:
  > "Con [cheapest emoji] [cheapest name], tu familia recibiría MXN [X] más. → Únete a la lista de espera"
  - The link scrolls to `#newsletter`.
  - `savings_nudge_clicked` event fires on click.
- When selected provider IS #1:
  > "Elegiste la opción más económica para este monto."
  - Styled in green, no CTA needed.

**2b. Readable ranking**

Replace the colored dot bar with a compact ordered list:
- Each row: rank number, emoji + provider name, total cost in USD.
- Selected provider row is highlighted (green border/background).
- No hover dependency — works on mobile.
- Sorted cheapest to most expensive (same data as the existing `ranking` computed value).

**2c. Tier pricing hints**

For providers with amount-dependent pricing, detect when the current amount is below their threshold and append a hint to the provider note:

| Provider | Threshold | Hint |
|----------|-----------|------|
| Remitly | $500 | "El costo mejora si envías $500+" |
| Western Union | $400 | "El margen mejora si envías $400+" |
| Moneygram | varies | No hint (fee is fixed per tier, note already explains) |
| Ria | $600 | "El margen mejora si envías $600+" |

Hint is appended inline after the existing `provider.note`, styled in blue-gray to differentiate from the main note.

### Part 3 — What We Are Not Doing

- No layout or page structure changes.
- No new pages or routes.
- No scroll depth tracking.
- No shareable results URLs.
- No external data fetching or real-time rate updates.

## Files Changed

| File | Change type |
|------|-------------|
| `app/components/Hero.tsx` | Add analytics |
| `app/components/FAQ.tsx` | Add analytics |
| `app/components/CTASection.tsx` | Add analytics |
| `app/components/ContactForm.tsx` | Add analytics |
| `app/components/RemittanceCalculator.tsx` | Add analytics + UX changes |
