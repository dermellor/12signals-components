import * as React from "react";

export type NavigationItem = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
};

type NavigationProps = {
  items: NavigationItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
  style?: React.CSSProperties;
};

export function Navigation({
  items,
  value,
  onValueChange,
  ariaLabel,
  orientation = "vertical",
  className,
  style,
}: NavigationProps) {
  const handleSelect = React.useCallback(
    (item: NavigationItem) => {
      if (item.disabled) return;
      item.onSelect?.(item.value);
      onValueChange?.(item.value);
    },
    [onValueChange]
  );

  return (
    <nav
      className={["ds-Navigation", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      data-orientation={orientation}
      style={style}
    >
      <ul className="ds-NavigationList">
        {items.map((item) => {
          const active = item.value === value;
          const content = (
            <>
              {item.icon && <span className="ds-NavigationIcon" aria-hidden>{item.icon}</span>}
              <span className="ds-NavigationText">
                <span className="ds-NavigationLabel">{item.label}</span>
                {item.description && (
                  <span className="ds-NavigationDescription">{item.description}</span>
                )}
              </span>
              {item.badge && <span className="ds-NavigationBadge">{item.badge}</span>}
            </>
          );

          return (
            <li key={item.value} className="ds-NavigationItem">
              {item.href ? (
                <a
                  href={item.href}
                  className="ds-NavigationLink"
                  data-state={active ? "active" : "inactive"}
                  aria-current={active ? "page" : undefined}
                  aria-disabled={item.disabled || undefined}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault();
                      return;
                    }
                    handleSelect(item);
                  }}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className="ds-NavigationLink"
                  data-state={active ? "active" : "inactive"}
                  aria-current={active ? "page" : undefined}
                  disabled={item.disabled}
                  onClick={() => handleSelect(item)}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
