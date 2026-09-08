import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lanzarote Experience Tours — Salidas locales por la isla",
    template: "%s | Lanzarote Experience Tours",
  },
  description:
    "Empresa familiar de Lanzarote. Salidas guiadas en español, grupos pequeños y minibuses propios: volcanes, jameos, costa y traslados sin intermediarios.",
  other: {
    "theme-color": "#2a7a4a",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${figtree.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
