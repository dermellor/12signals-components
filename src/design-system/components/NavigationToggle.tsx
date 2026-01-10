import * as React from "react";

type NavigationToggleProps = {
  ariaLabel?: string;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function NavigationToggle({ ariaLabel = "Toggle navigation", icon, ...rest }: NavigationToggleProps) {
  return (
    <button type="button" className="ds-NavigationToggle" aria-label={ariaLabel} {...rest}>
      <span className="ds-NavigationToggleIcon" aria-hidden>
        {icon ?? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        )}
      </span>
    </button>
  );
}
