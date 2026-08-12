import Link from "next/link";
import { Logo } from "@/components/Logo";

/* The root not-found handles every unmatched URL, and the static export writes
   it to 404.html — which is the file GitHub Pages serves for a path it does not
   recognise. Without this file the reader got Next's default: black Helvetica
   on white, no branding, and no link back into the site.

   The header is deliberately not reused. It is a client component whose only
   links are same-page fragments, and none of those targets exist here, so it
   would render a menu where every item does nothing. */

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-navy px-6 py-24 text-center">
      <Link href="/" aria-label="MON Global — home">
        <Logo tone="onDark" size={1.1} />
      </Link>

      <p className="eyebrow mt-16 text-gold">Error 404</p>
      <h1 className="mt-5 max-w-xl font-display text-3xl leading-tight tracking-tight text-paper text-balance sm:text-4xl">
        That page is not here.
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone/75">
        The link may be out of date, or the address mistyped. Everything we do
        is on the home page.
      </p>

      <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="eyebrow bg-gold px-8 py-4 text-navy transition-colors hover:bg-gold-lift"
        >
          Back to the home page
        </Link>
        <a
          href="https://wa.me/971544994859"
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow border border-stone/25 px-8 py-4 text-stone transition-colors hover:border-gold hover:text-gold"
        >
          Talk to us
        </a>
      </div>
    </main>
  );
}
