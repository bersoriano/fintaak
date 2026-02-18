/**
 * NewsletterTemplate — weekly Fintaak newsletter email.
 *
 * Built with @react-email/components + Tailwind for email-safe styling.
 * Preview locally with `npm run email`.
 *
 * Brand colours (from Fintaak Color Guidelines v1):
 *   Empowerment Green #2E7D32  |  Trust Blue #1565C0
 *   Charcoal #2D3142           |  Community Orange #F57C00
 */

import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Link,
  Hr,
  Tailwind,
} from "@react-email/components";
import type { NewsletterProps, Article } from "@/lib/types/email";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fintaak.com";

function ArticleCard({ title, excerpt, url }: Article) {
  return (
    <Section className="mb-6">
      <Text className="text-[18px] font-bold text-[#2D3142] leading-tight m-0 mb-1">
        {title}
      </Text>
      <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-3">
        {excerpt}
      </Text>
      <Link
        href={url}
        className="text-[14px] font-semibold text-[#2E7D32] no-underline"
      >
        Leer más →
      </Link>
    </Section>
  );
}

export default function NewsletterTemplate({
  issueNumber = 1,
  publishDate = "17 de febrero, 2026",
  articles = defaultArticles,
  subscriberName,
}: NewsletterProps) {
  const previewText = `Fintaak Newsletter #${issueNumber} — ${articles[0]?.title ?? "Nuevos artículos"}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#f4f4f5] font-sans m-0 p-0">
          <Container className="max-w-[600px] mx-auto my-8">
            {/* Header */}
            <Section className="bg-[#2D3142] rounded-t-lg px-8 py-6 text-center">
              <Img
                src={`${baseUrl}/logo.png`}
                alt="Fintaak"
                width={140}
                height={46}
                className="mx-auto"
              />
              <Text className="text-[12px] text-gray-400 m-0 mt-3 tracking-wide uppercase">
                Newsletter #{issueNumber} · {publishDate}
              </Text>
            </Section>

            {/* Body */}
            <Section className="bg-white px-8 py-8">
              {/* Greeting */}
              <Text className="text-[16px] text-[#2D3142] leading-relaxed m-0 mb-6">
                {subscriberName ? `Hola ${subscriberName},` : "Hola,"}{" "}
                aquí tienes lo más reciente sobre remesas, finanzas y
                transparencia.
              </Text>

              {/* Articles */}
              {articles.map((article, i) => (
                <div key={i}>
                  <ArticleCard {...article} />
                  {i < articles.length - 1 && (
                    <Hr className="border-gray-200 my-5" />
                  )}
                </div>
              ))}

              {/* CTA */}
              <Section className="text-center mt-8 mb-4">
                <Link
                  href={`${baseUrl}/#calculadora`}
                  className="bg-[#2E7D32] text-white text-[15px] font-semibold py-3 px-8 rounded-lg no-underline inline-block"
                >
                  Prueba la Calculadora
                </Link>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f9f9f9] rounded-b-lg px-8 py-6 text-center">
              {/* Social */}
              <Row className="mb-4">
                <Column align="center">
                  <Link href="#" className="text-[#2D3142] text-[13px] no-underline mx-2">
                    Facebook
                  </Link>
                  <Link href="#" className="text-[#2D3142] text-[13px] no-underline mx-2">
                    Twitter
                  </Link>
                  <Link href="#" className="text-[#2D3142] text-[13px] no-underline mx-2">
                    Instagram
                  </Link>
                </Column>
              </Row>

              <Text className="text-[12px] text-gray-500 m-0 mb-2">
                Recibiste este email porque te suscribiste al newsletter de Fintaak.
              </Text>
              <Link
                href={`${baseUrl}/unsubscribe`}
                className="text-[12px] text-gray-500 underline"
              >
                Cancelar suscripción
              </Link>
              <Text className="text-[11px] text-gray-400 m-0 mt-4">
                © {new Date().getFullYear()} Fintaak. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

/* Default data for React Email preview server */
const defaultArticles: Article[] = [
  {
    title: "¿Qué es el tipo de cambio mid-market?",
    excerpt:
      "Aprende a identificar el tipo de cambio real y cómo los proveedores esconden su ganancia en la diferencia.",
    url: "https://fintaak.com/blog/tipo-de-cambio-mid-market",
  },
  {
    title: "5 costos ocultos al enviar remesas",
    excerpt:
      "Descubre los cargos que la mayoría de servicios no te muestran y cómo evitarlos para que tu familia reciba más.",
    url: "https://fintaak.com/blog/costos-ocultos-remesas",
  },
  {
    title: "Comparativa: los 8 servicios más usados en 2026",
    excerpt:
      "Analizamos comisiones, márgenes de tipo de cambio y velocidad de entrega de los principales proveedores.",
    url: "https://fintaak.com/blog/comparativa-servicios-remesas",
  },
];
