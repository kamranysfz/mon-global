/**
 * Thin line icon set, matching the "ICON STYLE" row on the identity board.
 * All icons: 24x24 grid, 1.25 stroke, no fill, currentColor — so they take
 * their colour from the surrounding text and stay consistent at any size.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function IconProperty({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M10 21v-6h4v6" />
      <path d="M9 11h1.5M13.5 11H15" />
    </svg>
  );
}

export function IconCitizenship({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="2.5" width="14" height="19" rx="1.6" />
      <circle cx="12" cy="10" r="3.4" />
      <path d="M8.6 10h6.8M12 6.6c1.5 1.9 1.5 4.9 0 6.8-1.5-1.9-1.5-4.9 0-6.8Z" />
      <path d="M9.5 17.5h5" />
    </svg>
  );
}

export function IconLegal({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 7h14M9.5 7 5 7l-2 5a3.2 3.2 0 0 0 4 0Z" />
      <path d="M19 7l2 5a3.2 3.2 0 0 1-4 0Z" />
      <circle cx="12" cy="4" r="1" />
    </svg>
  );
}

export function IconManagement({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1Z" />
      <circle cx="12" cy="14" r="2.2" />
      <path d="M12 10.6v1.2M12 16.2v1.2M15 14h-1.2M10.2 14H9" />
    </svg>
  );
}

export function IconRelocation({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="16" cy="9.5" r="2" />
      <path d="M3.5 19v-1.4a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4V19" />
      <path d="M14.5 19v-1a3.2 3.2 0 0 1 3.2-3.2h.6A2.7 2.7 0 0 1 21 17.5V19" />
    </svg>
  );
}

export function IconConsultation({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h7A1.5 1.5 0 0 1 13 6.5v4A1.5 1.5 0 0 1 11.5 12H7l-3 2.4V12a1.5 1.5 0 0 1-1-1.5Z" />
      <path d="M16 9h3.5A1.5 1.5 0 0 1 21 10.5v4a1.5 1.5 0 0 1-1.5 1.5V19l-3-3h-2A1.5 1.5 0 0 1 13 14.5V14" />
    </svg>
  );
}

export function IconShortlist({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4.5" y="3" width="15" height="18" rx="1.6" />
      <path d="M8 8h8M8 12h8M8 16h4.5" />
    </svg>
  );
}

export function IconVisit({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 13.5 5 12l4.5 1.2L14 6.2a2 2 0 0 1 3.4 2.1l-3 5.6 4.6 1.3-1.6 2.4-5.3-.9-2.2 3.3-1.8-.4.9-3.5-4.2-1Z" />
    </svg>
  );
}

export function IconPurchase({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11.5 6 9l3.2 2.6 1.6-1.3 4 3.2" />
      <path d="M14.8 13.5 17 15.4a1.3 1.3 0 0 1-1.7 2l-.6-.5" />
      <path d="M14.7 16.9a1.3 1.3 0 0 1-1.8 1.9l-.7-.6" />
      <path d="M12.2 18.2a1.3 1.3 0 0 1-1.9 1.7L6.6 16.6" />
      <path d="M21 11.5 18 9l-3.6 1.3" />
    </svg>
  );
}

export function IconDocuments({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 3h6.5L19 7.5V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v5h5" />
      <path d="M9.5 13h6M9.5 16.5h4" />
    </svg>
  );
}

export function IconApproval({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.4 12.3 2.5 2.5 4.7-5" />
    </svg>
  );
}

export function IconPassport({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="2.5" width="14" height="19" rx="1.6" />
      <circle cx="12" cy="9.5" r="3.2" />
      <path d="M9 17h6" />
    </svg>
  );
}

export function IconTrust({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21.2c4.3-1.9 6.6-5.1 6.6-9.4V5.9L12 3.2 5.4 5.9v5.9c0 4.3 2.3 7.5 6.6 9.4Z" />
    </svg>
  );
}

export function IconExpertise({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V10M9.3 20V4.5M14.7 20v-8M20 20V7" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function IconCommitment({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11 6.5 8l3.2 2.7L12 9.2l4.2 3.3" />
      <path d="M16.2 12.5 18 14.2a1.25 1.25 0 0 1-1.7 1.8" />
      <path d="M15.8 16.4a1.25 1.25 0 0 1-1.8 1.8" />
      <path d="M13.4 17.9a1.25 1.25 0 0 1-1.8 1.7L8 16.6" />
      <path d="M21 11 17.5 8l-3.3 1.2" />
    </svg>
  );
}

export function IconConfidentiality({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4.6" y="10.2" width="14.8" height="10.6" rx="1.8" />
      <path d="M8.2 10.2V7.4a3.8 3.8 0 0 1 7.6 0v2.8" />
      <circle cx="12" cy="15.4" r="1.1" />
    </svg>
  );
}

export function IconIntegrity({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 3.4 2.7 5.5 6 .9-4.35 4.25L17.4 20 12 17.2 6.6 20l1.05-5.95L3.3 9.8l6-.9Z" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <path d="M15.2 8.2h-1.4a1.6 1.6 0 0 0-1.6 1.6V12m-2 0h5.2m-2.6 0v5.3" />
    </svg>
  );
}

/**
 * WhatsApp: the speech bubble with its tail, plus the handset.
 * Drawn to the same 24x24 / 1.25-stroke rules as the rest of the set rather
 * than dropping in the official filled glyph, which would be the only solid
 * icon on the site and would sit oddly beside these.
 */
export function IconWhatsApp({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.9 20.1l1.2-3.5a7.9 7.9 0 1 1 3 2.9z" />
      <path d="M9 9.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.4 2.1c.2.1.4.1.5 0l.5-.6c.2-.2.3-.2.5-.1l1.4.7c.2.1.4.2.4.4a1.7 1.7 0 0 1-1.2 1.5 3 3 0 0 1-2-.3 9.4 9.4 0 0 1-4.3-4.2 3 3 0 0 1-.3-2z" />
    </svg>
  );
}
