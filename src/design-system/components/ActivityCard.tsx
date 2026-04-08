import * as React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Text } from "./Text";

type ActivityCardProps = {
  icon?: React.ReactNode;
  title: string;
  titleNode?: React.ReactNode;
  headline?: string;
  competitorIcon?: React.ReactNode;
  categoryLabel?: string;
  categoryVariant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary" | "homepage" | "advertising";
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
  headline,
  competitorIcon,
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
  const badge = categoryLabel ? (
    <Badge variant={categoryVariant} tone={categoryTone} aria-label={`Kategorie: ${categoryLabel}`}>{categoryLabel}</Badge>
  ) : null;

  const hasTitleContent = Boolean(titleNode || title);

  return (
    <Card
      variant="gradient"
      hover={hover}
      style={{ position: "relative", padding: "var(--space-lg)" }}
      data-clickable={href ? "true" : "false"}
      role="article"
      aria-label={ariaLabel || headline || title}
      className="ds-ActivityCard"
    >
      <div className="ds-ActivityCard-layout">
        {/* Topline: icon + competitor name (uppercase) + badges + meta */}
        <div className="ds-ActivityCard-topline">
          {icon && (
            <div aria-hidden style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {icon}
            </div>
          )}
          {hasTitleContent && (
            <div
              style={{
                minWidth: 0,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                ...(titleNode ? { position: "relative", zIndex: href ? 2 : 0 } : undefined),
              }}
            >
              {titleNode || <Text as="span" size="xs" tone="muted">{title}</Text>}
            </div>
          )}
          {badge}
        </div>

        {/* Headline */}
        {headline && (
          <div className="ds-ActivityCard-headline">
            <Text as="span" size="sm" weight="medium">{headline}</Text>
          </div>
        )}

        {/* Body: description + timestamp */}
        <div className="ds-ActivityCard-body">
          {description && (
            <div style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
              <Text as="div" size="sm" tone="muted">
                {description}
              </Text>
            </div>
          )}

          {timestamp && (
            <div style={{ marginTop: "var(--space-sm)" }}>
              <Text as="span" size="xs" tone="muted">{timestamp}</Text>
            </div>
          )}
        </div>
      </div>

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel || headline || title}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
      )}
    </Card>
  );
}
