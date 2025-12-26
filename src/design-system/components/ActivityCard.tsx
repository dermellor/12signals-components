import * as React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Text } from "./Text";

type ActivityCardProps = {
  icon?: React.ReactNode;
  title: string;
  titleNode?: React.ReactNode;
  categoryLabel?: string;
  categoryVariant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary";
  categoryTone?: "solid" | "subtle";
  meta?: string; // e.g., competitor or domain
  description?: React.ReactNode;
  timestamp?: string;
  href?: string;
  ariaLabel?: string;
  hover?: "none" | "glow";
};

export function ActivityCard({
  icon,
  title,
  titleNode,
  categoryLabel,
  categoryVariant = "outline",
  categoryTone = "solid",
  meta,
  description,
  timestamp,
  href,
  ariaLabel,
  hover = "glow",
}: ActivityCardProps) {
  return (
    <Card
      variant="gradient"
      hover={hover}
      style={{ position: "relative", padding: "var(--space-lg)" }}
      data-clickable={href ? "true" : "false"}
      role="article"
      aria-label={ariaLabel || title}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)" }}>
        {icon && (
          <div aria-hidden style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {icon}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginBottom: "var(--space-xs)" }}>
            <div style={titleNode ? { position: "relative", zIndex: href ? 2 : 0 } : undefined}>
              {titleNode || (
                <Text as="span" size="sm" weight="medium">{title}</Text>
              )}
            </div>
            {categoryLabel && (
              <Badge variant={categoryVariant} tone={categoryTone} aria-label={`Kategorie: ${categoryLabel}`}>{categoryLabel}</Badge>
            )}
            {meta && (
              <Text as="span" size="xs" tone="muted">{meta}</Text>
            )}
          </div>

          {description && (
            <div style={{ marginBottom: "var(--space-sm)" }}>
              <Text as="div" size="sm" tone="muted">
                {description}
              </Text>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {timestamp && (
              <Text as="span" size="xs" tone="muted">{timestamp}</Text>
            )}
          </div>
        </div>
      </div>

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel || title}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
      )}
    </Card>
  );
}
