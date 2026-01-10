import * as React from "react";

export type SelectMenuOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type SelectMenuProps = {
  options: SelectMenuOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  align?: "left" | "right";
  label?: React.ReactNode;
  className?: string;
};

export function SelectMenu({
  options,
  value,
  onValueChange,
  ariaLabel = "Open menu",
  align = "right",
  label,
  className,
}: SelectMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current || !event.target) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className={["ds-SelectMenu", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className="ds-SelectMenuTrigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label && <span className="ds-SelectMenuLabel">{label}</span>}
        <span className="ds-SelectMenuChevron" aria-hidden>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8l4 4 4-4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="ds-SelectMenuContent" role="listbox" data-align={align}>
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                className="ds-SelectMenuOption"
                disabled={option.disabled}
                onClick={() => {
                  if (option.disabled) return;
                  onValueChange?.(option.value);
                  setOpen(false);
                }}
              >
                <span className="ds-SelectMenuOptionLabel">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
