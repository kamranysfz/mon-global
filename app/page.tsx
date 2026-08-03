import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import {
  IconProperty,
  IconCitizenship,
  IconLegal,
  IconManagement,
  IconRelocation,
  IconConsultation,
  IconShortlist,
  IconVisit,
  IconPurchase,
  IconDocuments,
  IconApproval,
  IconPassport,
  IconTrust,
  IconExpertise,
  IconCommitment,
  IconConfidentiality,
  IconIntegrity,
  IconInstagram,
  IconFacebook,
} from "@/components/icons";

const VALUES = [
  { Icon: IconTrust, name: "Trust", line: "Your future, our priority." },
  { Icon: IconExpertise, name: "Expertise", line: "Local knowledge, global standards." },
  { Icon: IconCommitment, name: "Commitment", line: "Dedicated to your success." },
  { Icon: IconConfidentiality, name: "Confidentiality", line: "Your privacy is protected." },
  { Icon: IconIntegrity, name: "Integrity", line: "Honest advice, lasting relationships." },
];

const SERVICES = [
  {
    Icon: IconProperty,
    name: "Property Selection",
    body: "Handpicked properties that match your goals and your lifestyle — not whatever happens to be on the market.",
  },
  {
    Icon: IconCitizenship,
    name: "Citizenship by Investment",
    body: "Complete guidance through the Turkish citizenship-by-investment route, from eligibility to submission.",
  },
  {
    Icon: IconLegal,
    name: "Legal Support",
    body: "An expert legal team handling title, valuation and compliance so the purchase is smooth and secure.",
  },
  {
    Icon: IconManagement,
    name: "Property Management",
    body: "Rent it, maintain it, protect it. We look after the investment long after the paperwork is done.",
  },
  {
    Icon: IconRelocation,
    name: "Relocation Assistance",
    body: "Schools, banking, residency, healthcare — we assist you and your family at every step of the move.",
  },
];

/* Copy note: steps 6 and 7 are deliberately written as application-and-
   decision, not as a guaranteed outcome. Turkish citizenship by investment
   is conditional on investment thresholds, a holding period and the
   authorities' discretion — promising a passport is a claims exposure. */
const PROCESS = [
  { Icon: IconConsultation, name: "Consultation", body: "We understand your needs and goals." },
  { Icon: IconShortlist, name: "Property shortlist", body: "We present the options worth your time." },
  { Icon: IconVisit, name: "Visit Türkiye", body: "We arrange your trip and viewings." },
  { Icon: IconPurchase, name: "Purchase", body: "We secure your property." },
  { Icon: IconDocuments, name: "Documents", body: "We prepare and submit your application." },
  { Icon: IconApproval, name: "Decision", body: "The Turkish authorities assess your application." },
  { Icon: IconPassport, name: "Passports", body: "On approval, passports are issued to your family." },
];

const CITIES = ["Dubai", "İstanbul", "Antalya", "Bodrum", "İzmir"];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        {/* No photography here by choice: the identity board's imagery is
            AI-generated, and synthetic property shots undercut a brand whose
            product is real property. Drop real photography into this section
            when it exists — the layout reserves the right-hand column. */}
        <section className="relative overflow-hidden border-b border-gold/15">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(120% 90% at 78% 8%, rgba(200,157,91,0.16), transparent 58%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
            <p className="eyebrow text-gold">Turkish Property &amp; Citizenship Advisory</p>
            <h1 className="mt-7 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-paper text-balance sm:text-5xl lg:text-6xl">
              Own property in Türkiye.
              <br />
              Secure your family&rsquo;s future.
            </h1>
            <div className="mt-9 h-px w-24 bg-gold" />
            <p className="mt-9 max-w-xl text-[15px] leading-relaxed text-stone/75">
              We help families secure their future through property ownership and
              Turkish citizenship — with expert guidance at every step, from the
              first conversation to the passports in your hands.
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="eyebrow bg-gold px-8 py-4 text-navy transition-colors hover:bg-gold-lift"
              >
                Book a private consultation
              </a>
              <a
                href="#process"
                className="eyebrow border border-stone/25 px-8 py-4 text-stone transition-colors hover:border-gold hover:text-gold"
              >
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- Values ---------------- */}
        <section className="border-b border-gold/15">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-14 sm:grid-cols-3 lg:grid-cols-5">
            {VALUES.map(({ Icon, name, line }) => (
              <li key={name} className="flex flex-col gap-3">
                <Icon className="h-6 w-6 text-gold" />
                <span className="eyebrow text-paper">{name}</span>
                <span className="text-[13px] leading-relaxed text-stone/60">{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------- Services ---------------- */}
        <section id="services" className="bg-paper text-ink">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
            <p className="eyebrow text-gold-deep">Our services</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight tracking-tight text-navy text-balance sm:text-4xl">
              Everything the move asks of you, handled in one place.
            </h2>
            <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ Icon, name, body }) => (
                <li key={name} className="flex flex-col gap-4 border-t border-ink/12 pt-6">
                  <Icon className="h-7 w-7 text-gold-deep" />
                  <h3 className="font-display text-xl tracking-tight text-navy">{name}</h3>
                  <p className="text-[14px] leading-relaxed text-grey">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Process ---------------- */}
        {/* Numbering is used here because the content genuinely is a
            sequence — each step depends on the one before it. */}
        <section id="process" className="border-b border-gold/15">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
            <p className="eyebrow text-gold">Our process</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight tracking-tight text-paper text-balance sm:text-4xl">
              Seven steps, and you always know which one you are on.
            </h2>
            <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map(({ Icon, name, body }, i) => (
                <li key={name} className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/45 font-display text-[15px] text-gold"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="h-px flex-1 bg-gold/20" aria-hidden="true" />
                  </div>
                  <Icon className="h-6 w-6 text-gold" />
                  <h3 className="eyebrow text-paper">
                    <span className="sr-only">Step {i + 1}: </span>
                    {name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-stone/60">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- Quote ---------------- */}
        <section className="bg-ink">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
            <span aria-hidden="true" className="font-display text-6xl leading-none text-gold">
              &ldquo;
            </span>
            <blockquote className="mt-4 font-display text-2xl leading-snug tracking-tight text-paper text-balance sm:text-3xl">
              We don&rsquo;t just sell properties. We help you build a future where
              your family can live, travel and thrive.
            </blockquote>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="bg-paper text-ink">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-gold-deep">Get in touch</p>
              <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight tracking-tight text-navy text-balance sm:text-4xl">
                Start with a conversation, not a brochure.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-grey">
                Tell us what you are hoping to achieve and we will tell you
                honestly whether we can help, and what it would involve.
              </p>
            </div>
            <a
              href="#"
              className="eyebrow shrink-0 self-start bg-navy px-8 py-4 text-paper transition-colors hover:bg-ink lg:self-auto"
            >
              Book a private consultation
            </a>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
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
                  href="https://www.instagram.com/global.monc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <IconInstagram className="h-4 w-4" />
                  <span>@global.monc</span>
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
            <p className="text-[12px] text-stone/45">
              &copy; {new Date().getFullYear()} MON Global. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
