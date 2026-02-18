# Fintaak Newsletter System

Technical documentation for the email and newsletter infrastructure.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Flows](#flows)
   - [Subscriber Sign-up Flow](#1-subscriber-sign-up-flow)
   - [Newsletter Send Flow](#2-newsletter-send-flow)
   - [Contact Form Flow](#3-contact-form-flow)
6. [Email Templates](#email-templates)
7. [Admin Dashboard](#admin-dashboard)
8. [API Reference](#api-reference)
9. [Local Development](#local-development)
10. [Production Checklist](#production-checklist)

---

## Overview

The newsletter system allows Fintaak to:

- Collect email subscribers from the landing page ("Únete a la Lista de Espera" section)
- Store subscribers in a Resend Audience for list management
- Send a branded welcome email immediately on subscription
- Compose and send weekly newsletter issues from an admin dashboard
- Handle batching automatically for large recipient lists

All emails are built as React components using React Email, rendered server-side by Resend, and follow the Fintaak Color Guidelines v1.

---

## Tech Stack

| Tool | Role |
|---|---|
| **Resend** (`resend` npm package) | Email sending API + audience/contact management |
| **React Email** (`react-email`, `@react-email/components`) | Email template authoring with JSX + Tailwind |
| **Next.js App Router** | API routes (POST handlers) and admin page |
| **TypeScript** | Type safety across templates, API payloads, and responses |

---

## Project Structure

```
fintaak/
├── emails/                              # React Email templates
│   ├── NewsletterTemplate.tsx           # Weekly newsletter template
│   └── WelcomeTemplate.tsx              # Welcome email on subscribe
├── lib/
│   ├── resend.ts                        # Shared Resend client + constants
│   └── types/
│       └── email.ts                     # TypeScript interfaces
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts                 # Contact form endpoint
│   │   └── newsletter/
│   │       ├── subscribe/
│   │       │   └── route.ts             # Subscription endpoint
│   │       └── send/
│   │           └── route.ts             # Newsletter send endpoint (admin)
│   ├── admin/
│   │   └── send-newsletter/
│   │       └── page.tsx                 # Admin dashboard UI
│   └── components/
│       └── CTASection.tsx               # Landing page subscription form
├── .env.local                           # Environment variables (not committed)
└── .env.example                         # Template for env vars
```

---

## Environment Variables

All required variables are documented in `.env.example`:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_AUDIENCE_ID` | Recommended | Audience ID from [resend.com/audiences](https://resend.com/audiences). Without this, subscribers still get the welcome email but are not stored in a list. |
| `NEWSLETTER_ADMIN_KEY` | Yes (for sending) | Secret key that protects the `/api/newsletter/send` endpoint. Generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Used in email templates for logo image, CTA links, and unsubscribe URL. Defaults to `https://fintaak.com` |

---

## Flows

### 1. Subscriber Sign-up Flow

This is the main flow triggered when a user enters their email in the "Únete a la Lista de Espera" section on the landing page.

```
User enters email on landing page (CTASection component)
        │
        ▼
POST /api/newsletter/subscribe
  Body: { email: string, name?: string }
        │
        ├── Validate email format
        │
        ├── Step 1: Add contact to Resend Audience
        │   └── Uses resend.contacts.create()
        │   └── If contact already exists (409), silently continues
        │
        ├── Step 2: Send welcome email
        │   └── Uses WelcomeTemplate (React Email)
        │   └── Subject: "Bienvenido a Fintaak — transparencia en cada transferencia"
        │
        └── Return { success: true, id: "email-id" }
```

**Frontend behavior:**
- Shows loading spinner while request is in flight
- On success: displays confirmation message "¡Gracias! Revisa tu email para confirmar."
- On error: shows error message below the input field

### 2. Newsletter Send Flow

This flow is triggered from the admin dashboard at `/admin/send-newsletter`.

```
Admin fills form at /admin/send-newsletter
  - Enters admin key
  - Sets issue number, date, subject
  - Adds recipient emails (comma or newline separated)
  - Composes articles (title + excerpt + URL each)
        │
        ▼
POST /api/newsletter/send
  Headers: { x-admin-key: NEWSLETTER_ADMIN_KEY }
  Body: SendNewsletterPayload
        │
        ├── Authenticate via x-admin-key header
        │   └── Must match NEWSLETTER_ADMIN_KEY env var
        │   └── Returns 401 if invalid
        │
        ├── Validate payload (recipients + articles)
        │
        ├── Chunk recipients into batches of 100
        │   └── 1 recipient  → resend.emails.send()
        │   └── 2-100        → resend.batch.send()
        │   └── 101+         → multiple batch calls
        │
        ├── Each email rendered with NewsletterTemplate
        │   └── Includes: header with logo, greeting, article cards,
        │       CTA button, footer with social + unsubscribe
        │
        └── Return { success: true, id: "id1,id2,..." }
```

**Batching details:**
- Resend's batch API supports up to 100 emails per call
- The send endpoint automatically chunks larger lists
- Each batch is sent sequentially to avoid rate limits

### 3. Contact Form Flow

Separate from the newsletter, used by the contact form in the FAQ section.

```
User fills contact form (name, email, message)
        │
        ▼
POST /api/contact
  Body: { name, email, message }
        │
        ├── Validate all fields present + email format
        │
        ├── Send email to bsorianocode@gmail.com
        │   └── Plain HTML (not React Email template)
        │   └── Reply-to set to user's email
        │
        └── Return { success: true }
```

---

## Email Templates

Both templates are in the `emails/` folder and built with `@react-email/components`.

### NewsletterTemplate.tsx

**Props:**

```typescript
interface NewsletterProps {
  issueNumber: number;       // e.g. 1, 2, 3...
  publishDate: string;       // e.g. "17 de febrero, 2026"
  articles: Article[];       // Array of { title, excerpt, url }
  subscriberName?: string;   // Optional personalization
}
```

**Structure:**
1. **Header** — Charcoal (#2D3142) background, centered logo, issue number + date
2. **Greeting** — Personalized if name is available
3. **Article cards** — Title (bold), excerpt, "Leer más →" link in green (#2E7D32)
4. **CTA button** — Green button linking to the calculator
5. **Footer** — Social links, subscription notice, unsubscribe link

### WelcomeTemplate.tsx

**Props:**

```typescript
interface WelcomeProps {
  subscriberName?: string;
}
```

**Structure:**
1. **Header** — Green (#2E7D32) background with logo
2. **Welcome message** — Personalized greeting
3. **What to expect** — 3 bullet points about content they'll receive
4. **CTA button** — Link to the calculator
5. **Footer** — Unsubscribe link

### Previewing templates locally

```bash
npm run email
```

Opens a preview server at `http://localhost:3001` where you can view and test both templates with sample data. Hot-reloads on file changes.

---

## Admin Dashboard

Accessible at: `/admin/send-newsletter`

This page is **not linked** in the site navigation. Access it directly by URL.

### Fields

| Field | Required | Description |
|---|---|---|
| Admin Key | Yes | Must match `NEWSLETTER_ADMIN_KEY` from env |
| Issue Number | Yes | Integer, e.g. 1 |
| Publish Date | Yes | Auto-filled with today's date in Spanish |
| Subject | No | Defaults to "Fintaak Newsletter #N" |
| Recipients | Yes | Emails separated by commas or newlines |
| Articles | Yes (at least 1) | Each needs title, excerpt, and URL |

### Security

The admin key is sent as an `x-admin-key` HTTP header. This is a simple protection layer — for production with multiple admins, consider adding proper authentication (e.g. NextAuth).

---

## API Reference

### POST `/api/newsletter/subscribe`

Adds a subscriber and sends welcome email.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "María"  // optional
}
```

**Response (200):**
```json
{
  "success": true,
  "id": "email-id-from-resend"
}
```

**Error responses:** 400 (validation), 500 (send failure)

---

### POST `/api/newsletter/send`

Sends a newsletter issue. Requires authentication.

**Headers:**
```
x-admin-key: your-secret-key
Content-Type: application/json
```

**Request:**
```json
{
  "to": ["user1@example.com", "user2@example.com"],
  "subject": "Fintaak Newsletter #1",
  "issueNumber": 1,
  "publishDate": "17 de febrero, 2026",
  "articles": [
    {
      "title": "Article title",
      "excerpt": "Short description...",
      "url": "https://fintaak.com/blog/article-slug"
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "id": "id1,id2,id3"
}
```

**Error responses:** 401 (unauthorized), 400 (validation), 500 (send failure)

---

### POST `/api/contact`

Sends a contact form message.

**Request:**
```json
{
  "name": "Carlos",
  "email": "carlos@example.com",
  "message": "I have a question about..."
}
```

**Response (200):**
```json
{
  "success": true
}
```

---

## Local Development

### Prerequisites

1. Node.js 18+
2. A Resend account with an API key

### Setup

```bash
# Install dependencies
npm install

# Copy env template and fill in values
cp .env.example .env.local

# Start Next.js dev server
npm run dev

# In a separate terminal, start email preview server
npm run email
```

### Testing the subscribe flow

1. Open `http://localhost:3000`
2. Scroll to "Únete a la Lista de Espera"
3. Enter an email and submit
4. Check the Resend dashboard for the sent welcome email

### Testing the newsletter send

1. Open `http://localhost:3000/admin/send-newsletter`
2. Enter your `NEWSLETTER_ADMIN_KEY`
3. Fill in the form with test data
4. Use your own email as the recipient
5. Send and verify you receive the newsletter

### Testing with curl

```bash
# Subscribe
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Send newsletter
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_KEY" \
  -d '{
    "to": ["test@example.com"],
    "issueNumber": 1,
    "publishDate": "18 de febrero, 2026",
    "articles": [{"title":"Test","excerpt":"Testing...","url":"https://fintaak.com"}]
  }'
```

---

## Production Checklist

### Before launch

- [ ] **Verify a custom domain in Resend** — Required for sending to anyone (not just your own email). Set up DKIM, SPF, and DMARC records. Then update `FROM_EMAIL` in `lib/resend.ts` to use your domain (e.g. `newsletter@fintaak.com`).

- [ ] **Create a Resend Audience** — Go to [resend.com/audiences](https://resend.com/audiences), create one, and add the ID to `RESEND_AUDIENCE_ID`.

- [ ] **Set a strong NEWSLETTER_ADMIN_KEY** — Generate with `openssl rand -hex 32`.

- [ ] **Set NEXT_PUBLIC_SITE_URL** — So email template links (logo, CTAs, unsubscribe) point to the correct domain.

- [ ] **Build the /unsubscribe page** — Currently links to `/unsubscribe` which doesn't exist yet. Should call `resend.contacts.update()` to set `unsubscribed: true`.

### Recommended improvements

- [ ] **Rate limiting** on `/api/newsletter/subscribe` — Prevent abuse with Vercel KV, Upstash, or middleware-based rate limiting.

- [ ] **Webhook endpoint** — Set up a Resend webhook at `/api/newsletter/webhooks` to track deliveries, bounces, complaints, and unsubscribes.

- [ ] **Pull audience from Resend** — Instead of pasting emails in the admin form, fetch the subscriber list from Resend's audience API.

- [ ] **Admin authentication** — Replace the single API key with proper auth (NextAuth, Clerk, etc.) for multi-user admin access.

- [ ] **Test mode** — Use Resend's test API key or a tool like Mailtrap during development to avoid sending real emails.

---

## Shared Resend Client

All API routes use the shared client from `lib/resend.ts`:

```typescript
import { getResend, FROM_EMAIL, RESEND_AUDIENCE_ID } from "@/lib/resend";

const resend = getResend(); // Lazy init, safe at build time
```

The client is lazily initialized — it won't throw during `next build` if the env var is missing, only when actually called at runtime. This prevents build failures for static pages.

---

## TypeScript Interfaces

All shared types live in `lib/types/email.ts`:

- `Article` — Newsletter article (title, excerpt, url)
- `NewsletterProps` — Props for the newsletter email template
- `WelcomeProps` — Props for the welcome email template
- `SendNewsletterPayload` — Request body for the send endpoint
- `SubscribePayload` — Request body for the subscribe endpoint
- `ApiResponse` — Standard API response shape (success, error?, id?)
