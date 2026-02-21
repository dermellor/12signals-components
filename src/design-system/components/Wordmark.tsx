import { useId } from "react";

type WordmarkProps = {
  /** Height controls size (width derives from aspect ratio) */
  height?: number | string;
  className?: string;
  /** URL to SVG sprite file. When set, renders <use href> instead of inline SVG. */
  sprite?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns">;

export function Wordmark({ height = 36, className, sprite, style, ...rest }: WordmarkProps) {
  const reactId = useId();
  const uid = reactId.replace(/:/g, "");
  const cls = ["ds-Wordmark", className].filter(Boolean).join(" ");

  if (sprite) {
    return (
      <svg
        viewBox="0 0 420 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cls}
        role="img"
        aria-label="12signals"
        style={{ height, width: "auto", ...style }}
        {...rest}
      >
        <use href={`${sprite}#wordmark`} width="420" height="100" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 420 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cls}
      role="img"
      aria-label="12signals"
      style={{ height, width: "auto", ...style }}
      {...rest}
    >
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

      {/* Logo mark (same geometry as Logo default) */}
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

      {/* Wordmark text — ABCFavorit, optically balanced with logo */}
      <text
        x="105"
        y="50"
        dominantBaseline="central"
        fontFamily="ABCFavorit, system-ui, sans-serif"
        fontSize="70"
        fontWeight="400"
        letterSpacing="-0.01em"
        style={{ fill: "hsl(var(--primary))" }}
      >
        12signals
      </text>
    </svg>
  );
}
