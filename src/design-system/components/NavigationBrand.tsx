import * as React from "react";

type NavigationBrandProps = {
  href?: string;
  logo?: React.ReactNode;
  label?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function NavigationBrand({ href, logo, label, className, ...rest }: NavigationBrandProps) {
  const content = (
    <>
      {logo && <span className="ds-NavigationBrandLogo" aria-hidden>{logo}</span>}
      {label && <span className="ds-NavigationBrandLabel">{label}</span>}
    </>
  );

  return (
    <div className={["ds-NavigationBrand", className].filter(Boolean).join(" ")} {...rest}>
      {href ? (
        <a className="ds-NavigationBrandLink" href={href}>
          {content}
        </a>
      ) : (
        <div className="ds-NavigationBrandLink">{content}</div>
      )}
    </div>
  );
}
