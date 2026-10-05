import Link from "next/link";
import { Logo } from "./Logo";
import { IconInstagram, IconFacebook } from "./icons";

const CITIES = ["Dubai", "İstanbul", "Antalya", "Bodrum", "İzmir"];

/* Extracted from app/page.tsx so /privacy carries the same footer. Nothing in
   here changed in the move except the Privacy Policy link, which is a legal
   requirement of the Meta lead form and has to appear site-wide.

   The link is stone/70 rather than matching the copyright's stone/45 — /45
   measures 3.83:1 on navy and fails WCAG AA, and a required legal link is the
   last thing to hide. The copyright beside it is untouched and still fails. */
export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <Logo size={0.72} />
          <div className="text-[13px] leading-relaxed text-stone/60">
            <p>Dubai, United Arab Emirates</p>
            <p className="mt-1">
              {/* tel: must be digits only with the country code and no
                  spaces, or iOS and Android silently fail to dial. The
                  spaced version is for reading, not for the href. */}
              <a
                href="tel:+971544994859"
                className="transition-colors hover:text-gold"
              >
                +971 54 499 4859
              </a>
            </p>
            <p className="mt-1">
              <a href="mailto:info@monc.ae" className="transition-colors hover:text-gold">
                info@monc.ae
              </a>
            </p>
            {/* Instagram and Facebook are live. The identity board also shows
                YouTube and LinkedIn — add those once the handles are real,
                rather than shipping dead icons.

                The Facebook URL is the numeric profile.php form because the
                Page has no vanity handle yet. Swap it for facebook.com/<name>
                once one is claimed; the numeric id keeps working either way. */}
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://www.instagram.com/moncglobal/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <IconInstagram className="h-4 w-4" />
                <span>@moncglobal</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592655997105"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <IconFacebook className="h-4 w-4" />
                <span>MON Global</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
          {CITIES.map((city) => (
            <li key={city} className="eyebrow text-stone/70">
              {city}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 border-t border-gold/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* The brand tagline, and half of a matched pair: MON CONSULTANCY
              carries "tailor made consulting". It is a formula, not a
              slogan — never reword one side without the other. This replaced
              "Beyond borders. Beyond expectations.", retired when the logo
              changed; see ../../social/design.md §1b. */}
          <p className="eyebrow text-gold">Tailor made investments.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-[12px] text-stone/70 transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
            <p className="text-[12px] text-stone/45">
              &copy; {new Date().getFullYear()} MON Global. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
