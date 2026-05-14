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
  extraBadges?: React.ReactNode;
  meta?: string; // e.g., competitor or domain
  description?: React.ReactNode;
  media?: React.ReactNode;
  timestamp?: string;
  href?: string;
  ariaLabel?: string;
  hover?: "none" | "glow";
  // When set, the category badge is forced to the accent's label/variant and
  // the card gains a matching frame. Currently only "breaking" — used for news
  // items whose source article carries a structural-event score floor (>=9).
  accent?: "breaking";
};

const ACCENT_BADGES: Record<NonNullable<ActivityCardProps["accent"]>, { label: string; variant: NonNullable<ActivityCardProps["categoryVariant"]>; tone: NonNullable<ActivityCardProps["categoryTone"]> }> = {
  breaking: { label: "Breaking", variant: "danger", tone: "solid" },
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
  extraBadges,
  meta,
  description,
  media,
  timestamp,
  href,
  ariaLabel,
  hover = "glow",
  accent,
}: ActivityCardProps) {
  const accentBadge = accent ? ACCENT_BADGES[accent] : null;
  const effectiveLabel = accentBadge?.label ?? categoryLabel;
  const effectiveVariant = accentBadge?.variant ?? categoryVariant;
  const effectiveTone = accentBadge?.tone ?? categoryTone;
  const badge = effectiveLabel ? (
    <Badge variant={effectiveVariant} tone={effectiveTone} aria-label={`Kategorie: ${effectiveLabel}`}>{effectiveLabel}</Badge>
  ) : null;

  const hasTitleContent = Boolean(titleNode || title);

  return (
    <Card
      variant="gradient"
      hover={hover}
      style={{ position: "relative", padding: "var(--space-lg)" }}
      data-clickable={href ? "true" : "false"}
      data-accent={accent || undefined}
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
          {extraBadges}
        </div>

        {/* Body: text column (headline + description + timestamp) + optional media column */}
        <div className="ds-ActivityCard-content" data-has-media={media ? "true" : "false"}>
          <div className="ds-ActivityCard-textcol">
            {headline && (
              <div className="ds-ActivityCard-headline">
                <Text as="span" size="sm" weight="medium">{headline}</Text>
              </div>
            )}
            {description && (
              <div className="ds-ActivityCard-description" style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
                <Text as="div" size="sm" tone="muted">
                  {description}
                </Text>
              </div>
            )}
            {timestamp && (
              <div className="ds-ActivityCard-timestamp">
                <Text as="span" size="xs" tone="muted">{timestamp}</Text>
              </div>
            )}
          </div>
          {media && (
            <div className="ds-ActivityCard-media">
              {media}
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
