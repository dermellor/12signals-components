import * as React from "react";
import { Text } from "./Text";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PageHeader({ title, subtitle, actions, ...rest }: PageHeaderProps) {
  return (
    <header className="ds-PageHeader" {...rest}>
      <div className="ds-PageHeaderMain">
        <Text as="h1" size="2xl" weight="semibold">{title}</Text>
        {subtitle && <Text size="sm" as="p">{subtitle}</Text>}
      </div>
      {actions && <div className="ds-PageHeaderActions">{actions}</div>}
    </header>
  );
}
