import type { Metadata } from "next";
import { Figtree, Fraunces, Outfit, Syne } from "next/font/google";
import { AppLoadingProvider } from "@/components/AppLoadingProvider";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lanzarote Experience Tours - Visitas guiadas en Lanzarote",
    template: "%s | Lanzarote Experience Tours",
  },
  description:
    "Somos Lanzarote Experience Tours, una empresa familiar y local. Organizamos visitas guiadas en Lanzarote sin intermediarios, en Español y en grupos reducidos (máx 14 personas).",
  other: {
    "theme-color": "#2a7a4a",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${syne.variable} ${figtree.variable} ${fraunces.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <AppLoadingProvider>
          <CartProvider>{children}</CartProvider>
        </AppLoadingProvider>
      </body>
    </html>
  );
}
