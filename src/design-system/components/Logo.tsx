import { useId } from "react";

type LogoVariant = "default" | "inverted" | "monochrome";

type LogoProps = {
  /** Logo color variant */
  variant?: LogoVariant;
  size?: number | string;
  /** URL to SVG sprite file. When set, renders <use href> instead of inline SVG. */
  sprite?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns" | "width" | "height">;

function LogoSvg({ uid, variant, sizeStyle, className, ...rest }: { uid: string; variant: LogoVariant; sizeStyle: React.CSSProperties } & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns" | "width" | "height">) {
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  const shared = { xmlns: "http://www.w3.org/2000/svg", className: cls, "data-variant": variant, role: "img" as const, "aria-label": "12signals", style: sizeStyle, ...rest };

  switch (variant) {
    case "inverted":
      return (
        <svg viewBox="-9 -9 117 117" {...shared}>
          <defs>
            <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#441B67" />
              <stop offset="100%" stopColor="#E838A2" />
            </linearGradient>
            <linearGradient id={`${uid}-inv-arc`} x1="30%" y1="100%" x2="70%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="50%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id={`${uid}-inv-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.75" />
              <stop offset="100%" stopColor="white" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={`${uid}-inv-main`} gradientUnits="userSpaceOnUse" x1="42.6" y1="53.1" x2="82.8" y2="36.4">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect x="-9" y="-9" width="117" height="117" rx="26" ry="26" fill={`url(#${uid}-bg)`} />
          <path d="M 56.5 16.6 A 34 34 0 1 0 54.1 83.8" fill="none" stroke={`url(#${uid}-inv-arc)`} strokeWidth="5.5" strokeLinecap="butt" />
          <path d="M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z" fill={`url(#${uid}-inv-ring)`} />
          <mask id={`${uid}-inv-needle`}>
            <line x1="50" y1="50" x2="82.8" y2="36.4" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="7" fill="white" />
          </mask>
          <rect x="0" y="0" width="100" height="100" fill={`url(#${uid}-inv-main)`} mask={`url(#${uid}-inv-needle)`} />
          <circle cx="67.0" cy="20.5" r="2.8" fill="white" opacity="0.8" />
          <circle cx="77.8" cy="30.5" r="2.8" fill="white" opacity="0.7" />
          <circle cx="83.5" cy="44.1" r="2.8" fill="white" opacity="0.65" />
          <circle cx="82.8" cy="58.8" r="2.8" fill="white" opacity="0.5" />
          <circle cx="76.0" cy="71.8" r="2.8" fill="white" opacity="0.4" />
          <circle cx="64.3" cy="80.8" r="2.8" fill="white" opacity="0.35" />
        </svg>
      );

    case "monochrome":
      return (
        <svg viewBox="8 10 82 80" {...shared}>
          <path d="M 56.5 16.6 A 34 34 0 1 0 54.1 83.8" fill="none" stroke="#1A1C1E" strokeWidth="6" strokeLinecap="butt" />
          <path d="M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z" fill="#1A1C1E" />
          <line x1="50" y1="50" x2="82.8" y2="36.4" stroke="#1A1C1E" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="50" r="7" fill="#1A1C1E" />
          <circle cx="67.0" cy="20.5" r="3" fill="#333333" />
          <circle cx="77.8" cy="30.5" r="3" fill="#555555" />
          <circle cx="83.5" cy="44.1" r="3" fill="#777777" />
          <circle cx="82.8" cy="58.8" r="3" fill="#999999" />
          <circle cx="76.0" cy="71.8" r="3" fill="#BBBBBB" />
          <circle cx="64.3" cy="80.8" r="3" fill="#DDDDDD" />
        </svg>
      );

    // "default" = V2 Gradient Flow
    default:
      return (
        <svg viewBox="8 10 82 80" {...shared}>
          <defs>
            <linearGradient id={`${uid}-main`} gradientUnits="userSpaceOnUse" x1="42.6" y1="53.1" x2="82.8" y2="36.4">
              <stop offset="0%" stopColor="#441B67" />
              <stop offset="100%" stopColor="#E838A2" />
            </linearGradient>
            <linearGradient id={`${uid}-arc`} x1="30%" y1="100%" x2="70%" y2="0%">
              <stop offset="0%" stopColor="#441B67" />
              <stop offset="50%" stopColor="#7D3BA3" />
              <stop offset="100%" stopColor="#E838A2" />
            </linearGradient>
            <linearGradient id={`${uid}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5C2580" />
              <stop offset="100%" stopColor="#C835A5" />
            </linearGradient>
          </defs>
          <path d="M 56.5 16.6 A 34 34 0 1 0 54.1 83.8" fill="none" stroke={`url(#${uid}-arc)`} strokeWidth="6" strokeLinecap="butt" />
          <path d="M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z" fill={`url(#${uid}-ring)`} />
          <line x1="50" y1="50" x2="82.8" y2="36.4" stroke={`url(#${uid}-main)`} strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="50" r="7" fill={`url(#${uid}-main)`} />
          <circle cx="67.0" cy="20.5" r="3" fill="#441B67" />
          <circle cx="77.8" cy="30.5" r="3" fill="#5C2580" />
          <circle cx="83.5" cy="44.1" r="3" fill="#7D3BA3" />
          <circle cx="82.8" cy="58.8" r="3" fill="#A832A8" />
          <circle cx="76.0" cy="71.8" r="3" fill="#C835A5" />
          <circle cx="64.3" cy="80.8" r="3" fill="#E838A2" />
        </svg>
      );
  }
}

export function Logo({ variant = "default", size = 36, sprite, className, style, ...rest }: LogoProps) {
  const reactId = useId();
  const uid = reactId.replace(/:/g, "");
  const sizeStyle = { width: size, height: size, ...style };
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");

  if (sprite) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cls}
        data-variant={variant}
        role="img"
        aria-label="12signals"
        style={sizeStyle}
        {...rest}
      >
        <use href={`${sprite}#logo-${variant}`} width="100%" height="100%" />
      </svg>
    );
  }

  return <LogoSvg uid={uid} variant={variant} sizeStyle={sizeStyle} className={className} {...rest} />;
}

export const LOGO_VARIANTS: { value: LogoVariant; label: string }[] = [
  { value: "default", label: "Gradient Flow" },
  { value: "inverted", label: "Inverted" },
  { value: "monochrome", label: "Monochrome" },
];
