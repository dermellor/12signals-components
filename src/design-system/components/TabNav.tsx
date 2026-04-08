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
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () => {
      const nav = el.closest(".ds-TabNav") as HTMLElement | null;
      if (!nav) return;

      // --- Tab sizing: ensure one tab is always "cut off" on overflow ---
      const triggers = el.querySelectorAll<HTMLElement>(".ds-TabNavTrigger");
      const tabCount = triggers.length;
      const containerWidth = el.clientWidth;

      // Clear forced sizing to measure natural overflow
      triggers.forEach(t => { t.style.minWidth = ""; t.style.maxWidth = ""; });

      if (el.scrollWidth > containerWidth && tabCount > 1) {
        const gap = parseFloat(getComputedStyle(el).gap) || 8;
        // Show N full tabs + 35% of the next one
        const visibleFull = Math.min(tabCount - 1, containerWidth < 360 ? 2 : 3);
        const w = Math.floor((containerWidth - visibleFull * gap) / (visibleFull + 0.35));
        triggers.forEach(t => { t.style.minWidth = `${w}px`; t.style.maxWidth = `${w}px`; });
      }

      // --- Scroll fade indicators ---
      requestAnimationFrame(() => {
        nav.toggleAttribute("data-scroll-start", el.scrollLeft > 2);
        nav.toggleAttribute("data-scroll-end", el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, []);

  return (
    <nav className={["ds-TabNav", className].filter(Boolean).join(" ")} aria-label={ariaLabel} style={style}>
      <ul className="ds-TabNavList" role="tablist" ref={listRef}>
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
