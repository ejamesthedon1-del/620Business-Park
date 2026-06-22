type BenefitIconId = "visibility" | "impression" | "team" | "growth" | "confidence";

const FOREGROUND = "#1A1A18";
const ACCENT = "#B8965A";
const ACCENT_SOFT = "rgba(184, 150, 90, 0.22)";

function VisibilityIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="w-full h-full">
      <path
        d="M3.5 16S8.5 8 16 8s12.5 8 12.5 8-5 8-12.5 8S3.5 16 3.5 16Z"
        stroke={FOREGROUND}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="4.25" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="1.5" fill={ACCENT} />
    </svg>
  );
}

function ImpressionIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="w-full h-full">
      <path d="M6 26V14l10-8 10 8v12" stroke={FOREGROUND} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 26v-8h8v8" stroke={FOREGROUND} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 14h20" stroke={ACCENT} strokeWidth="1.5" />
      <circle cx="16" cy="20" r="1.25" fill={ACCENT} />
      <path d="M13 8.5 16 6.5 19 8.5" stroke={ACCENT} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="w-full h-full">
      <rect x="5" y="8" width="10" height="16" rx="1.5" stroke={FOREGROUND} strokeWidth="1.5" />
      <rect x="17" y="8" width="10" height="16" rx="1.5" stroke={FOREGROUND} strokeWidth="1.5" />
      <path d="M10 13h4M10 17h4M22 13h4M22 17h2.5" stroke={ACCENT} strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3.25" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.25" />
      <path d="M16 14.25v3.5M14.25 16h3.5" stroke={ACCENT} strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="w-full h-full">
      <rect x="6" y="20" width="5" height="6" rx="1" fill={ACCENT_SOFT} stroke={FOREGROUND} strokeWidth="1.25" />
      <rect x="13.5" y="15" width="5" height="11" rx="1" fill={ACCENT_SOFT} stroke={FOREGROUND} strokeWidth="1.25" />
      <rect x="21" y="9" width="5" height="17" rx="1" fill={ACCENT} fillOpacity="0.35" stroke={ACCENT} strokeWidth="1.25" />
      <path d="M8 12 16 8.5 24 12" stroke={FOREGROUND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 7.5 26 10.5 23 13.5" stroke={ACCENT} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConfidenceIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="w-full h-full">
      <path
        d="M16 5.5 24 9v7.5c0 5-3.5 8.5-8 9.5-4.5-1-8-4.5-8-9.5V9l8-3.5Z"
        stroke={FOREGROUND}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.25 16.25 14.75 18.75 19.75 13.75"
        stroke={ACCENT}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="11.5" r="1.5" fill={ACCENT} />
    </svg>
  );
}

const iconMap: Record<BenefitIconId, () => JSX.Element> = {
  visibility: VisibilityIcon,
  impression: ImpressionIcon,
  team: TeamIcon,
  growth: GrowthIcon,
  confidence: ConfidenceIcon,
};

export function BenefitIcon({
  id,
  size = "md",
}: {
  id: BenefitIconId;
  size?: "md" | "lg";
}) {
  const Icon = iconMap[id];
  const isLg = size === "lg";

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center ${
        isLg ? "w-14 h-14" : "w-11 h-11"
      }`}
    >
      <Icon />
    </div>
  );
}

export type { BenefitIconId };
