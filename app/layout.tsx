import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fintaak.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fintaak - Calcula el Costo Real de Enviar Dinero a México",
    template: "%s | Fintaak",
  },
  description:
    "Compara proveedores de remesas, calcula comisiones y tipo de cambio real. Transparencia total para enviar dinero a México desde EE.UU.",
  keywords: [
    "remesas",
    "enviar dinero a México",
    "costo de remesas",
    "tipo de cambio",
    "transferencias internacionales",
    "calculadora de remesas",
    "Western Union",
    "Remitly",
    "Sendwave",
    "dinero a casa",
    "comisiones ocultas",
    "fintaak",
  ],
  authors: [{ name: "Fintaak" }],
  creator: "Fintaak",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Fintaak",
    title: "Fintaak - Calcula el Costo Real de Enviar Dinero a México",
    description:
      "Compara proveedores de remesas, calcula comisiones y tipo de cambio real. Transparencia total para enviar dinero a México desde EE.UU.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fintaak - Transparencia en cada transferencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintaak - Calcula el Costo Real de Enviar Dinero a México",
    description:
      "Compara proveedores de remesas, calcula comisiones y tipo de cambio real. Transparencia total.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
