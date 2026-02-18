/**
 * Admin page — compose and send a newsletter issue.
 *
 * Protected by NEWSLETTER_ADMIN_KEY (sent as x-admin-key header).
 * Not linked in navigation — access directly at /admin/send-newsletter.
 */

"use client";

import { useState } from "react";
import type { Article } from "@/lib/types/email";

interface ArticleInput extends Article {
  id: number;
}

let nextId = 1;
function newArticle(): ArticleInput {
  return { id: nextId++, title: "", excerpt: "", url: "" };
}

export default function SendNewsletterPage() {
  const [adminKey, setAdminKey] = useState("");
  const [issueNumber, setIssueNumber] = useState(1);
  const [publishDate, setPublishDate] = useState(
    new Date().toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [articles, setArticles] = useState<ArticleInput[]>([newArticle()]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState("");

  function updateArticle(id: number, field: keyof Article, value: string) {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  }

  function removeArticle(id: number) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setResult("");

    const toList = recipients
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (toList.length === 0) {
      setStatus("error");
      setResult("Agrega al menos un destinatario");
      return;
    }

    const validArticles = articles.filter((a) => a.title && a.excerpt && a.url);
    if (validArticles.length === 0) {
      setStatus("error");
      setResult("Agrega al menos un artículo completo");
      return;
    }

    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          to: toList,
          subject: subject || undefined,
          issueNumber,
          publishDate,
          articles: validArticles.map(({ title, excerpt, url }) => ({
            title,
            excerpt,
            url,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      setStatus("success");
      setResult(`Newsletter enviado. IDs: ${data.id}`);
    } catch (err) {
      setStatus("error");
      setResult(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-3xl font-bold text-[#2D3142] mb-2"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Enviar Newsletter
        </h1>
        <p className="text-gray-500 mb-8">
          Compone y envía una edición del newsletter de Fintaak.
        </p>

        <form onSubmit={handleSend} className="space-y-6">
          {/* Admin Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Key
            </label>
            <input
              type="password"
              required
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              placeholder="NEWSLETTER_ADMIN_KEY"
            />
          </div>

          {/* Issue info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de edición
              </label>
              <input
                type="number"
                min={1}
                required
                value={issueNumber}
                onChange={(e) => setIssueNumber(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de publicación
              </label>
              <input
                type="text"
                required
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Subject override */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asunto (opcional — por defecto: &quot;Fintaak Newsletter #N&quot;)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              placeholder="Fintaak Newsletter #1"
            />
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinatarios (uno por línea o separados por coma)
            </label>
            <textarea
              required
              rows={3}
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] resize-none font-mono text-sm"
              placeholder={"user1@example.com\nuser2@example.com"}
            />
          </div>

          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Artículos
              </label>
              <button
                type="button"
                onClick={() => setArticles((prev) => [...prev, newArticle()])}
                className="text-sm text-[#2E7D32] font-semibold hover:underline"
              >
                + Agregar artículo
              </button>
            </div>

            <div className="space-y-4">
              {articles.map((article, index) => (
                <div
                  key={article.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#2D3142]">
                      Artículo {index + 1}
                    </span>
                    {articles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArticle(article.id)}
                        className="text-sm text-[#D32F2F] hover:underline"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Título"
                    value={article.title}
                    onChange={(e) =>
                      updateArticle(article.id, "title", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
                  />
                  <textarea
                    placeholder="Extracto / resumen"
                    rows={2}
                    value={article.excerpt}
                    onChange={(e) =>
                      updateArticle(article.id, "excerpt", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm resize-none"
                  />
                  <input
                    type="url"
                    placeholder="https://fintaak.com/blog/..."
                    value={article.url}
                    onChange={(e) =>
                      updateArticle(article.id, "url", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Result message */}
          {status !== "idle" && status !== "loading" && (
            <div
              className={`p-4 rounded-lg text-sm ${
                status === "success"
                  ? "bg-green-50 text-[#2E7D32] border border-[#2E7D32]/20"
                  : "bg-red-50 text-[#D32F2F] border border-[#D32F2F]/20"
              }`}
            >
              {result}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#2E7D32] text-white px-6 py-4 rounded-lg hover:bg-green-800 transition-colors font-semibold min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando newsletter...
              </>
            ) : (
              "Enviar Newsletter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
