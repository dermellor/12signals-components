import * as React from "react";
import { Text } from "./Text";

type NavigationBarProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  brand?: React.ReactNode;
  brandAccessory?: React.ReactNode;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  leadingPosition?: "left" | "right";
} & React.HTMLAttributes<HTMLElement>;

export function NavigationBar({
  title,
  subtitle,
  brand,
  brandAccessory,
  leading,
  actions,
  leadingPosition = "left",
  className,
  ...rest
}: NavigationBarProps) {
  const showLeadingLeft = leading && leadingPosition === "left";
  const showLeadingRight = leading && leadingPosition === "right";
  return (
    <header className={["ds-NavigationBar", className].filter(Boolean).join(" ")} {...rest}>
      {showLeadingLeft && <div className="ds-NavigationBarLeading">{leading}</div>}
      <div className="ds-NavigationBarBrand">
        {brand ? (
          <>
            <div className="ds-NavigationBarBrandContent">
              {brand}
              {brandAccessory && <div className="ds-NavigationBarBrandAccessory">{brandAccessory}</div>}
            </div>
            {subtitle && <Text size="xs" tone="muted">{subtitle}</Text>}
          </>
        ) : (
          <>
            {title != null && <Text as="div" weight="semibold">{title}</Text>}
            {subtitle && <Text size="xs" tone="muted">{subtitle}</Text>}
          </>
        )}
      </div>
      {actions && <div className="ds-NavigationBarActions">{actions}</div>}
      {showLeadingRight && <div className="ds-NavigationBarLeading">{leading}</div>}
    </header>
  );
}
