"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { IconWhatsApp } from "./icons";

/* Every entry here points at a section that exists. About us, Properties and
   Insights used to sit alongside these with href="#", which on a one-page site
   means the link does nothing at all: the reader clicks a navigation item and
   the page does not move. A menu that lies about what the site contains costs
   more than a shorter menu.

   Put them back the moment there is something to point at — either a new
   section id on this page, or a real route. */
const NAV = [
  { label: "Services", href: "#services" },
  { label: "Citizenship", href: "#routes" },
  { label: "Contact", href: "#contact" },
];

const CITIES = ["Dubai", "İstanbul", "Antalya", "Bodrum", "İzmir"];

/** Tailwind's `lg` breakpoint — the point the desktop nav appears. */
const DESKTOP_QUERY = "(min-width: 1024px)";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close if the viewport grows past the breakpoint. Without this, rotating a
  // tablet while the menu is open leaves a full-screen overlay with no visible
  // way out, since the trigger that dismisses it is hidden above `lg`.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // While open: lock scroll, trap focus, close on Escape, and restore focus to
  // the trigger on close so keyboard users don't get dumped at the top.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    // Capture the trigger now: by cleanup time the ref may point elsewhere.
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Ground is black, not navy. The mark's blue block (#203878) measures
          1.66:1 against navy (#0B132B) and effectively disappears; against
          black it separates. The logo is a white-on-black mark by design, so
          the surface it sits on has to be black. */}
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <Link href="/" aria-label="MON Global — home">
            <Logo size={0.62} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[13px] tracking-wide text-stone/75 transition-colors hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* wa.me needs the number in full international form with no "+",
              spaces or dashes — anything else silently opens WhatsApp with no
              recipient. The displayed text stays formatted for reading. */}
          <a
            href="https://wa.me/971544994859"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow hidden shrink-0 items-center gap-2.5 border border-gold/60 px-5 py-3 text-gold transition-colors hover:bg-gold hover:text-navy lg:inline-flex"
          >
            <IconWhatsApp className="h-[18px] w-[18px]" />
            +971 54 499 4859
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
              <span className="h-px w-full bg-gold" />
              <span className="h-px w-full bg-gold" />
            </span>
          </button>
        </div>
      </header>

      {/* Rendered as a SIBLING of <header>, never a child. The header uses
          backdrop-blur, and backdrop-filter establishes a containing block for
          fixed-position descendants — nested inside, `fixed inset-0` would
          size to the header box instead of the viewport. Sits above the
          header's z-40 so it covers it.

          Only mounted while open, so its links stay out of the tab order the
          rest of the time. */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-black lg:hidden motion-safe:animate-[menuIn_.22s_cubic-bezier(.2,.7,.3,1)_both]"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-gold/15 px-6 py-4">
            <Logo size={0.62} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-gold"
            >
              <span className="sr-only">Close menu</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Site"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8"
          >
            <ul className="flex flex-col">
              {NAV.map(({ label, href }) => (
                <li key={label} className="border-b border-gold/10">
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display text-3xl tracking-tight text-paper transition-colors hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/971544994859"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="eyebrow mt-10 flex items-center justify-center gap-2.5 bg-gold px-8 py-5 text-center text-navy transition-colors hover:bg-gold-lift"
            >
              <IconWhatsApp className="h-[18px] w-[18px]" />
              +971 54 499 4859
            </a>
          </nav>

          <div className="shrink-0 border-t border-gold/15 px-6 py-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {CITIES.map((city) => (
                <li key={city} className="eyebrow text-stone/55">
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
