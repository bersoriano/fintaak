# UX & Analytics Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add GA4 event tracking to all untracked user touchpoints and improve the remittance calculator UX with a readable ranking list, inline savings nudge, and tier-pricing hints.

**Architecture:** Pure frontend changes across 5 existing components. Analytics use `sendGAEvent` from `@next/third-parties/google` (already installed). UX changes are confined to `RemittanceCalculator.tsx`. No new files, no API changes, no new dependencies.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, `@next/third-parties/google` for GA4.

---

### Task 1: Analytics — Hero.tsx

**Files:**
- Modify: `app/components/Hero.tsx`

Hero is currently a server component. Adding `onClick` requires making it a client component.

**Step 1: Add `"use client"` directive and import**

At the very top of `app/components/Hero.tsx`, add:
```tsx
"use client";
```
Then add the import after the existing imports:
```tsx
import { sendGAEvent } from "@next/third-parties/google";
```

**Step 2: Add onClick to both CTA links**

Find the two `<Link>` elements in the CTAs block and add onClick handlers:

```tsx
<Link
  href="#newsletter"
  onClick={() => sendGAEvent("event", "hero_cta_clicked", { button: "waitlist" })}
  className="bg-[#2E7D32] text-white px-8 py-4 rounded-lg hover:bg-green-800 transition-colors text-base font-semibold min-h-[44px] flex items-center justify-center shadow-lg"
>
  Únete a la Lista de Espera
</Link>
<Link
  href="#calculadora"
  onClick={() => sendGAEvent("event", "hero_cta_clicked", { button: "calculator" })}
  className="border-2 border-[#2E7D32] text-[#2E7D32] px-8 py-4 rounded-lg hover:bg-green-50 transition-colors text-base font-semibold min-h-[44px] flex items-center justify-center"
>
  Prueba la Calculadora
</Link>
```

**Step 3: Verify manually**

Run `npm run dev`, open the site, click each hero button, check GA4 DebugView (or browser console with GA debug extension) for `hero_cta_clicked` with correct `button` param.

**Step 4: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: track hero CTA clicks in GA4"
```

---

### Task 2: Analytics — FAQ.tsx

**Files:**
- Modify: `app/components/FAQ.tsx`

FAQ.tsx already has `"use client"`. Just add the import and fire the event when an item is opened (not closed).

**Step 1: Add import**

After the existing `import { useState } from "react";` line, add:
```tsx
import { sendGAEvent } from "@next/third-parties/google";
```

**Step 2: Update accordion button onClick**

Find the button's `onClick` handler in the FAQ map and replace it:
```tsx
onClick={() => {
  const isOpening = openIndex !== index;
  setOpenIndex(openIndex === index ? null : index);
  if (isOpening) {
    sendGAEvent("event", "faq_item_opened", {
      question_index: index,
      question_text: faq.question,
    });
  }
}}
```

**Step 3: Verify manually**

Open FAQ section, click each item open, check GA4 DebugView for `faq_item_opened` with `question_index` and `question_text` params. Closing an item should fire nothing.

**Step 4: Commit**

```bash
git add app/components/FAQ.tsx
git commit -m "feat: track FAQ accordion opens in GA4"
```

---

### Task 3: Analytics — CTASection.tsx

**Files:**
- Modify: `app/components/CTASection.tsx`

CTASection.tsx already has `"use client"`. Add three events around the existing newsletter form submission logic.

**Step 1: Add import**

After `import { useState } from "react";`, add:
```tsx
import { sendGAEvent } from "@next/third-parties/google";
```

**Step 2: Add events inside handleSubmit**

Find the `handleSubmit` function. Add events at three points:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email) {
    setError("Por favor ingresa tu email");
    return;
  }

  if (!validateEmail(email)) {
    setError("Por favor ingresa un email válido");
    return;
  }

  setIsLoading(true);
  sendGAEvent("event", "newsletter_signup_attempted"); // <-- ADD

  try {
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al suscribirte");
    }

    setSubmitted(true);
    setEmail("");
    sendGAEvent("event", "newsletter_signup_success"); // <-- ADD
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al suscribirte. Intenta de nuevo.";
    setError(message);
    sendGAEvent("event", "newsletter_signup_error", { error: message }); // <-- ADD
  } finally {
    setIsLoading(false);
  }
};
```

**Step 3: Verify manually**

Submit the newsletter form with a valid email. Check GA4 DebugView for `newsletter_signup_attempted` and `newsletter_signup_success`. To test the error path, temporarily point the fetch to a bad URL and confirm `newsletter_signup_error` fires.

**Step 4: Commit**

```bash
git add app/components/CTASection.tsx
git commit -m "feat: track newsletter signup funnel in GA4"
```

---

### Task 4: Analytics — ContactForm.tsx

**Files:**
- Modify: `app/components/ContactForm.tsx`

ContactForm.tsx already has `"use client"`. Fire one event on successful submission.

**Step 1: Add import**

After `import { useState } from "react";`, add:
```tsx
import { sendGAEvent } from "@next/third-parties/google";
```

**Step 2: Add event on success**

Find the `setStatus("success");` line inside `handleSubmit` and add the event immediately after:
```tsx
setStatus("success");
setForm({ name: "", email: "", message: "" });
sendGAEvent("event", "contact_form_submitted"); // <-- ADD
```

**Step 3: Verify manually**

Submit the contact form. Check GA4 DebugView for `contact_form_submitted`.

**Step 4: Commit**

```bash
git add app/components/ContactForm.tsx
git commit -m "feat: track contact form submissions in GA4"
```

---

### Task 5: Analytics — calculator_section_viewed

**Files:**
- Modify: `app/components/RemittanceCalculator.tsx`

Add an IntersectionObserver that fires `calculator_section_viewed` once when the section enters the viewport. Uses a ref to prevent re-firing.

**Step 1: Add ref and useEffect**

After the existing `customAmountDebounce` ref declaration, add:
```tsx
const hasTrackedView = useRef(false);
```

Then add a new `useEffect` after the existing click-outside effect:
```tsx
useEffect(() => {
  const section = document.getElementById("calculadora");
  if (!section) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasTrackedView.current) {
        hasTrackedView.current = true;
        sendGAEvent("event", "calculator_section_viewed");
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(section);
  return () => observer.disconnect();
}, []);
```

**Step 2: Verify manually**

Load the page and scroll down to the calculator. Check GA4 DebugView for `calculator_section_viewed`. Scroll away and back — it should NOT fire again.

**Step 3: Commit**

```bash
git add app/components/RemittanceCalculator.tsx
git commit -m "feat: track calculator section visibility in GA4"
```

---

### Task 6: UX — Replace ranking dots with readable list

**Files:**
- Modify: `app/components/RemittanceCalculator.tsx`

The current ranking visualization is a row of colored dots (`<div className="flex gap-1 mb-4">`). Replace it with a compact ordered list that is readable on mobile without hover.

**Step 1: Remove the dot bar**

Find and delete this entire block (approximately lines 436–453 in the original file):
```tsx
<div className="flex gap-1 mb-4">
  {ranking.map((r, i) => {
    const isSelected = r.id === selectedProviderId;
    let color = "bg-gray-200";
    if (isSelected) {
      if (i === 0) color = "bg-[#2E7D32]";
      else if (i === ranking.length - 1) color = "bg-[#D32F2F]";
      else color = "bg-[#1565C0]";
    }
    return (
      <div
        key={r.id}
        className={`flex-1 h-3 rounded-full ${color} transition-colors`}
        title={`${r.emoji} ${r.name}: $${formatUSD(r.totalCost)}`}
      />
    );
  })}
</div>
```

**Step 2: Replace with ordered list**

In its place, insert:
```tsx
<div className="space-y-1.5 mb-4">
  {ranking.map((r, i) => {
    const isSelected = r.id === selectedProviderId;
    return (
      <div
        key={r.id}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          isSelected
            ? "bg-green-50 border border-[#2E7D32]/30"
            : "bg-gray-50"
        }`}
      >
        <span className="text-gray-400 w-4 text-right text-xs">{i + 1}</span>
        <span className={`flex-1 ${isSelected ? "font-semibold text-[#2D3142]" : "text-gray-600"}`}>
          {r.emoji} {r.name}
        </span>
        <span className={`font-medium tabular-nums ${isSelected ? "text-[#2E7D32]" : "text-gray-500"}`}>
          ${formatUSD(r.totalCost)}
        </span>
      </div>
    );
  })}
</div>
```

**Step 3: Verify manually**

Check desktop and mobile (use browser DevTools responsive mode). All 8 providers should be visible as a ranked list. The selected provider row should be green-highlighted. No hover required to read names or costs.

**Step 4: Commit**

```bash
git add app/components/RemittanceCalculator.tsx
git commit -m "feat: replace ranking dots with readable provider list"
```

---

### Task 7: UX — Inline savings nudge (conversion bridge)

**Files:**
- Modify: `app/components/RemittanceCalculator.tsx`

After the ranking card's closing `</div>`, add a new card that either confirms the user picked the cheapest option or shows how much they could save by switching, with a link to the newsletter.

**Step 1: Compute cheapest provider's received amount**

The `cheapest` variable already exists. Add a derived value for the cheapest provider's MXN received. Find where `cheapest` is declared and add below it:

```tsx
const cheapestStats = useMemo(
  () => calcProvider(providers.find((p) => p.id === cheapest.id)!, amount),
  [cheapest, amount]
);
```

**Step 2: Add the nudge card**

Find the closing `</div>` of the ranking card and the `</div>` closing the right column's `space-y-6` div. Insert the nudge between the ranking card and the disclaimer. It should go inside the right column's `space-y-6` div, after the ranking card:

```tsx
{/* Savings Nudge / Confirmation */}
{selectedRank === 1 ? (
  <div className="rounded-xl bg-green-50 border border-[#2E7D32]/20 p-4">
    <p className="text-sm text-[#2E7D32] font-medium">
      Elegiste la opción más económica para este monto.
    </p>
  </div>
) : (
  <div className="rounded-xl bg-amber-50 border border-[#F57C00]/20 p-4">
    <p className="text-sm text-gray-700">
      Con {cheapest.emoji}{" "}
      <span className="font-semibold text-[#2D3142]">{cheapest.name}</span>, tu familia
      recibiría{" "}
      <span className="font-semibold text-[#2E7D32]">
        MXN {formatMXN(cheapestStats.received - stats.received)} más.
      </span>
    </p>
    <a
      href="#newsletter"
      onClick={() =>
        sendGAEvent("event", "savings_nudge_clicked", {
          cheapest_provider: cheapest.name,
          amount,
          savings_usd: formatUSD(stats.totalCost - cheapestStats.totalCost),
        })
      }
      className="mt-2 inline-block text-sm font-semibold text-[#1565C0] hover:underline"
    >
      Únete a la lista de espera →
    </a>
  </div>
)}
```

**Step 3: Verify manually**

- Select a provider that is NOT #1 → amber nudge with MXN savings and link should appear.
- Select the #1 provider → green confirmation should appear.
- Click the nudge link → page should scroll to newsletter, and GA4 DebugView should show `savings_nudge_clicked` with `cheapest_provider`, `amount`, and `savings_usd`.

**Step 4: Commit**

```bash
git add app/components/RemittanceCalculator.tsx
git commit -m "feat: add inline savings nudge linking calculator to newsletter CTA"
```

---

### Task 8: UX — Tier pricing hints

**Files:**
- Modify: `app/components/RemittanceCalculator.tsx`

Three providers (Remitly, Western Union, Ria) have amount-dependent pricing. When the current amount is below their improvement threshold, show a small hint.

**Step 1: Add helper function**

After the `formatUSD` function and before the `RemittanceCalculator` component declaration, add:

```tsx
function getTierHint(providerId: string, amount: number): string | null {
  if (providerId === "remitly" && amount < 500) return "El costo mejora si envías $500+.";
  if (providerId === "western-union" && amount < 400) return "El margen mejora si envías $400+.";
  if (providerId === "ria" && amount < 600) return "El margen mejora si envías $600+.";
  return null;
}
```

**Step 2: Use the hint in the Provider Note card**

Find the Provider Note card (the `<div>` containing the `💡` span and `selectedProvider.note`). Replace the note text with:

```tsx
<div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
  <p className="text-sm text-gray-600">
    <span className="mr-2">💡</span>
    <span className="font-medium text-[#2D3142]">
      {selectedProvider.name}:
    </span>{" "}
    {selectedProvider.note}
    {getTierHint(selectedProvider.id, amount) && (
      <span className="ml-1 text-[#1565C0]">
        {getTierHint(selectedProvider.id, amount)}
      </span>
    )}
  </p>
</div>
```

**Step 3: Verify manually**

- Select Remitly with amount $200 → hint "El costo mejora si envías $500+" should appear in blue after the note.
- Select Remitly with amount $600 → no hint.
- Select Western Union with amount $300 → hint "El margen mejora si envías $400+".
- Select Western Union with amount $500 → no hint.
- Select Ria with amount $400 → hint "El margen mejora si envías $600+".
- Select Sendwave (no tiers) → no hint at any amount.

**Step 4: Commit**

```bash
git add app/components/RemittanceCalculator.tsx
git commit -m "feat: show tier pricing hints for amount-dependent providers"
```

---

## Summary

| Task | File | Type |
|------|------|------|
| 1 | `Hero.tsx` | Analytics — hero CTA clicks |
| 2 | `FAQ.tsx` | Analytics — FAQ opens |
| 3 | `CTASection.tsx` | Analytics — newsletter funnel |
| 4 | `ContactForm.tsx` | Analytics — contact form |
| 5 | `RemittanceCalculator.tsx` | Analytics — section viewed |
| 6 | `RemittanceCalculator.tsx` | UX — readable ranking list |
| 7 | `RemittanceCalculator.tsx` | UX — savings nudge |
| 8 | `RemittanceCalculator.tsx` | UX — tier pricing hints |

Total new GA4 events: `hero_cta_clicked`, `faq_item_opened`, `newsletter_signup_attempted`, `newsletter_signup_success`, `newsletter_signup_error`, `contact_form_submitted`, `calculator_section_viewed`, `savings_nudge_clicked` (8 events).
