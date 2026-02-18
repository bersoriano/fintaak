/**
 * Shared TypeScript interfaces for the email/newsletter system.
 * Used by templates, API routes, and the admin dashboard.
 */

export interface Article {
  title: string;
  excerpt: string;
  url: string;
}

export interface NewsletterProps {
  issueNumber: number;
  publishDate: string;
  articles: Article[];
  subscriberName?: string;
}

export interface WelcomeProps {
  subscriberName?: string;
}

export interface SendNewsletterPayload {
  to: string[] | string;
  subject?: string;
  issueNumber: number;
  publishDate: string;
  articles: Article[];
}

export interface SubscribePayload {
  email: string;
  name?: string;
}

export interface ApiResponse {
  success: boolean;
  error?: string;
  id?: string;
}
