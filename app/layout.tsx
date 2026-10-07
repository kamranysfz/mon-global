import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

/* latin-ext is REQUIRED, not optional: without it the dotted capital İ in
   Türkiye, İstanbul and İzmir falls back to a substitute face and the
   wordmark of every city we operate in renders wrong.

   Cormorant Garamond replaces the board's Playfair Display: same editorial
   register, far less ubiquitous, and its variable 300–700 range gives a real
   heading hierarchy. Verified to carry the full Turkish set (İ ı Ş ş Ğ ğ Ç). */
const displaySerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MON Global — Second Passports & Residency",
    template: "%s — MON Global",
  },
  description:
    "Second passports and residency, for families anywhere. We guide you through citizenship and residency by investment, with honest advice at every step.",
  // metadataBase makes the relative og:image absolute. Without it Next emits a
  // relative URL, which most scrapers ignore — and the fallback is the favicon.
  metadataBase: new URL("https://mong.ae"),
  openGraph: {
    title: "MON Global — Second Passports & Residency",
    description:
      "Second passports and residency, for families anywhere.",
    locale: "en_AE",
    type: "website",
    url: "https://mong.ae",
    siteName: "MON Global",
    // 1200x630 is what every platform crops from. Without this, WhatsApp and
    // iMessage fall back to the favicon — which was Next.js's default triangle,
    // so every shared link carried a Vercel logo.
    images: [{ url: "/og.png", width: 1200, height: 630,
               alt: "MON Global — Second passports and residency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MON Global — Second Passports & Residency",
    description:
      "Second passports and residency, for families anywhere.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
