import * as React from "react";

export type TabNavItem = {
  value: string;
  label: string;
  description?: string;
  badge?: React.ReactNode;
};

type TabNavProps = {
  items: TabNavItem[];
  value: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function TabNav({ items, value, onValueChange, ariaLabel, className, style }: TabNavProps) {
  return (
    <nav className={["ds-TabNav", className].filter(Boolean).join(" ")} aria-label={ariaLabel} style={style}>
      <ul className="ds-TabNavList" role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <li key={item.value} className="ds-TabNavItem">
              <button
                type="button"
                className="ds-TabNavTrigger"
                role="tab"
                aria-selected={active}
                data-state={active ? "active" : "inactive"}
                onClick={() => onValueChange?.(item.value)}
              >
                <span className="ds-TabNavLabel">{item.label}</span>
                {item.description && <span className="ds-TabNavDescription">{item.description}</span>}
                {item.badge && <span className="ds-TabNavBadge">{item.badge}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
