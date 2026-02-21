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
        viewBox="0 0 396 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cls}
        role="img"
        aria-label="12signals"
        style={{ height, width: "auto", ...style }}
        {...rest}
      >
        <use href={`${sprite}#wordmark`} width="396" height="100" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 396 100"
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

      {/* Wordmark glyphs — ABCFavorit outlines, no font dependency */}
      <g style={{ fill: "hsl(var(--primary))" }}>
        <path d="M192 0H288V700H213L33 525V405L192 559Z" transform="translate(105.00,74.50) scale(0.070000,-0.070000)" />
        <path d="M50 0H523V90H162L349 263C430 338 513 412 513 523C513 643 412 710 292 710C158 710 58 625 57 491H157C157 568 210 625 287 625H297C363 625 415 584 415 518C415 432 338 380 276 321L50 106Z" transform="translate(130.90,74.50) scale(0.070000,-0.070000)" />
        <path d="M242 -10C358 -10 439 50 439 140C439 230 377 271 301 286L222 302C172 312 152 331 152 366C152 401 187 430 243 430H251C316 430 344 390 349 345H444C444 440 377 510 246 510C146 510 57 456 57 356C57 271 122 229 203 213L276 199C326 189 344 167 344 135C344 95 303 70 251 70H243C184 70 137 95 132 155H37C37 60 109 -10 242 -10Z" transform="translate(170.38,74.50) scale(0.070000,-0.070000)" />
        <path d="M75 0H170V500H75ZM70 590H175V700H70Z" transform="translate(203.84,74.50) scale(0.070000,-0.070000)" />
        <path d="M268 -220C423 -220 513 -125 513 0V500H418V430C398 470 343 510 268 510C150 510 46 430 46 255C46 80 153 0 268 0C343 0 393 40 418 80V10C418 -95 358 -140 273 -140H263C195 -140 141 -115 131 -65H36C46 -155 128 -220 268 -220ZM141 255C141 380 206 430 277 430H285C354 430 418 365 418 255C418 145 349 80 280 80H272C201 80 141 130 141 255Z" transform="translate(220.29,74.50) scale(0.070000,-0.070000)" />
        <path d="M75 0H170V280C170 375 235 430 306 430H314C385 430 415 385 415 315V0H510V335C510 440 445 510 330 510C250 510 200 475 170 430V500H75Z" transform="translate(260.75,74.50) scale(0.070000,-0.070000)" />
        <path d="M210 -10C290 -10 350 35 370 80C370 75 370 25 375 0H465C460 35 460 80 460 110V320C460 422 390 510 257 510C144 510 61 447 55 355H150C156 405 201 430 253 430H261C325 430 365 390 365 320V304L227 293C146 286 45 252 45 138C45 53 115 -10 210 -10ZM140 142C140 188 182 216 240 221L365 231V180C365 120 290 70 229 70H221C174 70 140 101 140 142Z" transform="translate(300.65,74.50) scale(0.070000,-0.070000)" />
        <path d="M75 0H170V700H75Z" transform="translate(337.05,74.50) scale(0.070000,-0.070000)" />
        <path d="M242 -10C358 -10 439 50 439 140C439 230 377 271 301 286L222 302C172 312 152 331 152 366C152 401 187 430 243 430H251C316 430 344 390 349 345H444C444 440 377 510 246 510C146 510 57 456 57 356C57 271 122 229 203 213L276 199C326 189 344 167 344 135C344 95 303 70 251 70H243C184 70 137 95 132 155H37C37 60 109 -10 242 -10Z" transform="translate(353.50,74.50) scale(0.070000,-0.070000)" />
      </g>
    </svg>
  );
}
