import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/* The business name Kamran confirmed on 2026-10-05.

   ADDRESS: there is no street address to state. MON Consultancy publishes none
   either — its site footer gives only a phone number, an email and "United Arab
   Emirates" — and the instruction was to match it. So this says the same thing
   the rest of the group says. If a trade-licence address is ever wanted here,
   it is a one-line change. */
const LEGAL_NAME = "MON GLOBAL";
const REGISTERED_ADDRESS = "Dubai, United Arab Emirates";

/* Hardcoded on purpose. This is the date the policy text last changed, not
   the date the site was built. Deriving it from new Date() would move it on
   every unrelated deploy and quietly claim a revision that never happened.
   Update it by hand whenever the wording below changes. */
const LAST_UPDATED = "5 October 2026";

const PRIVACY_EMAIL = "info@monc.ae";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How MON Global collects, uses and protects the personal information you give us through our ads, lead forms and enquiries.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <SiteHeader />

      {/* Paper ground, and a narrower column than the rest of the site. The
          home page runs max-w-6xl because its sections are grids; this is one
          column of prose, where a 6xl measure is unreadable.

          Small gold type is gold-deep, never gold — see globals.css, gold on
          paper measures 2.30:1 and fails. */}
      <main className="flex-1 bg-paper text-ink">
        <div className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
          <p className="eyebrow text-gold-deep">Privacy</p>
          <h1 className="mt-5 font-display text-4xl leading-tight tracking-tight text-navy text-balance sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-[13px] text-grey">
            Last updated {LAST_UPDATED}
          </p>
          <div className="mt-9 h-px w-24 bg-gold-deep/40" />

          <p className="mt-9 text-[15px] leading-relaxed text-grey">
            This policy explains what we do with your personal information —
            what we collect, why we collect it, who else sees it, and how to
            have it removed. It is written to be read, not to be skipped.
          </p>

          <Section n={1} title="Who we are">
            <p>{LEGAL_NAME}</p>
            <p>{REGISTERED_ADDRESS}</p>
            <p>
              For anything about your data or this policy, email us at{" "}
              <Mail />.
            </p>
          </Section>

          <Section n={2} title="What we collect">
            <p>
              When you fill in one of our lead forms on Facebook or Instagram,
              we collect your <strong>name</strong>, <strong>email address</strong>,{" "}
              <strong>phone number</strong>, and the answers you give on the
              form — for example whether you are currently in the UAE.
            </p>
            <p>
              If you message us on WhatsApp or by email, we keep that
              conversation and whatever you choose to tell us in it.
            </p>
            <p>
              That is everything. This website has no contact form, no cookies,
              no analytics and no tracking pixels. Visiting mong.ae collects
              nothing about you at all.
            </p>
          </Section>

          <Section n={3} title="Why we use it">
            <ul className="flex list-disc flex-col gap-3 pl-5">
              <li>
                To reply to your enquiry and follow up about the service you
                asked about.
              </li>
              <li>
                To send you marketing about our services. You can opt out
                whenever you like — every marketing message has an unsubscribe
                link, or email <Mail /> and we will stop.
              </li>
            </ul>
          </Section>

          <Section n={4} title="Who we share it with">
            <p>
              <strong>We do not sell your personal data.</strong>
            </p>
            <p>
              We share it with the companies that run our systems, and only so
              that they can run them:
            </p>
            <ul className="flex list-disc flex-col gap-3 pl-5">
              <li>
                <strong>PocketProp</strong> — our CRM, where enquiries are
                managed
              </li>
              <li>
                <strong>Supabase</strong> — the database behind it
              </li>
              <li>
                <strong>Cloudflare</strong> — hosting and network
              </li>
              <li>
                <strong>Resend</strong> — sending email
              </li>
            </ul>
            <p>
              None of them may use your information for anything of their own.
            </p>
          </Section>

          <Section n={5} title="How long we keep it">
            <p>
              <strong>24 months</strong> after we last hear from you. Then we
              delete it.
            </p>
            <p>
              If you become a client, we keep your information for as long as we
              are working together, and afterwards for as long as the law
              requires us to.
            </p>
          </Section>

          <Section n={6} title="Your rights">
            <p>
              You can ask us to show you the information we hold about you, to
              correct it, or to delete it. Email <Mail /> and tell us what you
              want.
            </p>
            <p>
              <strong>We reply within 30 days.</strong>
            </p>
          </Section>

          <Section n={7} title="Where your information is stored">
            <p>
              Our providers run servers in <strong>South Korea</strong>, the{" "}
              <strong>United Arab Emirates</strong> and the{" "}
              <strong>United States</strong>. So your information may be stored
              and processed outside the country you live in.
            </p>
          </Section>

          <Section n={8} title="Changes to this policy">
            <p>
              We may update this policy from time to time. The date at the top
              of this page always shows the version currently in force.
            </p>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function Mail() {
  return (
    <a
      href={`mailto:${PRIVACY_EMAIL}`}
      className="text-gold-deep underline underline-offset-2 transition-colors hover:text-navy"
    >
      {PRIVACY_EMAIL}
    </a>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-ink/12 pt-8">
      <h2 className="font-display text-2xl tracking-tight text-navy">
        <span className="text-gold-deep">{n}.</span> {title}
      </h2>
      <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-grey">
        {children}
      </div>
    </section>
  );
}
