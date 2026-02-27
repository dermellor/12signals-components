import * as React from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  renderLink?: (href: string, children: React.ReactNode) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Breadcrumb({ items, renderLink, className, style }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["ds-Breadcrumb", className].filter(Boolean).join(" ")}
      style={style}
    >
      <ol className="ds-BreadcrumbList">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="ds-BreadcrumbItem">
              {item.href && !isLast ? (
                renderLink ? (
                  <span className="ds-BreadcrumbLink">{renderLink(item.href, item.label)}</span>
                ) : (
                  <a className="ds-BreadcrumbLink" href={item.href}>
                    {item.label}
                  </a>
                )
              ) : (
                <span className="ds-BreadcrumbCurrent" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="ds-BreadcrumbSeparator" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
