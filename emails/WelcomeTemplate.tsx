/**
 * WelcomeTemplate — sent immediately when someone subscribes.
 * Confirms the subscription and sets expectations.
 */

import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Link,
  Hr,
  Tailwind,
} from "@react-email/components";
import type { WelcomeProps } from "@/lib/types/email";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fintaak.com";

export default function WelcomeTemplate({ subscriberName }: WelcomeProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Bienvenido a Fintaak — transparencia en cada transferencia</Preview>
      <Tailwind>
        <Body className="bg-[#f4f4f5] font-sans m-0 p-0">
          <Container className="max-w-[600px] mx-auto my-8">
            {/* Header */}
            <Section className="bg-[#2E7D32] rounded-t-lg px-8 py-8 text-center">
              <Img
                src={`${baseUrl}/logo.png`}
                alt="Fintaak"
                width={140}
                height={46}
                className="mx-auto"
              />
            </Section>

            {/* Body */}
            <Section className="bg-white px-8 py-8">
              <Text className="text-[22px] font-bold text-[#2D3142] m-0 mb-4">
                {subscriberName
                  ? `¡Bienvenido, ${subscriberName}!`
                  : "¡Bienvenido a Fintaak!"}
              </Text>

              <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-4">
                Gracias por unirte a nuestra lista de espera. Estás entre los primeros
                en recibir acceso a la app cuando lancemos.
              </Text>

              <Text className="text-[15px] text-[#555] leading-relaxed m-0 mb-4">
                Mientras tanto, cada semana recibirás contenido educativo sobre:
              </Text>

              <Section className="bg-[#f9fafb] rounded-lg p-5 mb-6">
                <Text className="text-[14px] text-[#2D3142] m-0 mb-2">
                  ✓ Cómo funcionan realmente las remesas
                </Text>
                <Text className="text-[14px] text-[#2D3142] m-0 mb-2">
                  ✓ Costos ocultos que los proveedores no te muestran
                </Text>
                <Text className="text-[14px] text-[#2D3142] m-0">
                  ✓ Tips para que tu familia reciba más dinero
                </Text>
              </Section>

              <Section className="text-center mb-4">
                <Link
                  href={`${baseUrl}/#calculadora`}
                  className="bg-[#2E7D32] text-white text-[15px] font-semibold py-3 px-8 rounded-lg no-underline inline-block"
                >
                  Prueba la Calculadora Gratis
                </Link>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f9f9f9] rounded-b-lg px-8 py-6 text-center">
              <Hr className="border-gray-200 mb-4" />
              <Text className="text-[12px] text-gray-500 m-0 mb-2">
                Recibiste este email porque te suscribiste en fintaak.com
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
