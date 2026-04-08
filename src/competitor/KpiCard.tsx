import React from "react";
import { Card } from "../design-system/components/Card";
import { Text } from "../design-system/components/Text";
import { Tooltip } from "../design-system/components/Tooltip";
import type { KpiEntry } from "./kpi-utils";
import { formatKpiValue, qualifierPrefix } from "./kpi-utils";

type Props = {
  /** lucide-react icon component */
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  entry: KpiEntry | null;
  /** Locale for number formatting (default "de-DE") */
  locale?: string;
  /** External link icon component (optional, for source links) */
  externalLinkIcon?: React.ComponentType<{ className?: string }>;
};

export function KpiCard({
  icon: Icon,
  label,
  entry,
  locale = "de-DE",
  externalLinkIcon: ExternalLinkIcon,
}: Props) {
  const formatted = entry
    ? `${qualifierPrefix(entry.qualifier)}${formatKpiValue(entry.value, entry.unit, locale)}`
    : null;

  return (
    <Card>
      <Card.Content>
        <div className="flex items-center gap-sm mb-sm">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <Text size="sm" tone="muted">
            {label}
          </Text>
        </div>
        {entry && formatted ? (
          <>
            {entry.source_url ? (
              <Tooltip content={entry.source_title ?? entry.source_url}>
                <a
                  href={entry.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <Text size="xl" weight="bold">
                    {formatted}
                  </Text>
                  {ExternalLinkIcon && (
                    <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </a>
              </Tooltip>
            ) : (
              <Text size="xl" weight="bold">
                {formatted}
              </Text>
            )}
            {entry.period && (
              <Text size="sm" tone="muted">{entry.period}</Text>
            )}
          </>
        ) : (
          <Text size="xl" weight="bold" tone="muted">
            ?
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}
