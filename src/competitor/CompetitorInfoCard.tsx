import React from "react";
import { Card } from "../design-system/components/Card";
import { Heading } from "../design-system/components/Heading";
import { Text } from "../design-system/components/Text";

type Props = {
  name: string;
  website?: string | null;
  linkedinUrl?: string | null;
  description?: string | null;
  currentClaim?: string | null;
  /** Icon for external links (e.g. lucide ExternalLink) */
  externalLinkIcon?: React.ComponentType<{ className?: string }>;
  /** Icon for positioning quote (e.g. lucide MessageSquareQuote) */
  quoteIcon?: React.ComponentType<{ className?: string }>;
  /** Icon for LinkedIn (e.g. lucide Linkedin) */
  linkedinIcon?: React.ComponentType<{ className?: string }>;
  /** Optional sidebar content (e.g. leadership section in app) */
  sidebar?: React.ReactNode;
};

function ensureAbsolute(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function cleanDomain(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function CompetitorInfoCard({
  name,
  website,
  linkedinUrl,
  description,
  currentClaim,
  externalLinkIcon: ExternalLinkIcon,
  quoteIcon: QuoteIcon,
  linkedinIcon: LinkedinIcon,
  sidebar,
}: Props) {
  return (
    <Card>
      <Card.Content>
        <div className="flex flex-col lg:flex-row lg:gap-lg">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            <Heading level={2}>{name}</Heading>

            <div className="flex items-center gap-md text-sm">
              {website ? (
                <a
                  href={ensureAbsolute(website)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary flex items-center gap-1"
                >
                  {cleanDomain(website)}
                  {ExternalLinkIcon && <ExternalLinkIcon className="h-3 w-3" />}
                </a>
              ) : (
                <span className="text-muted-foreground">No website listed</span>
              )}
              {linkedinUrl && (
                <>
                  <span className="text-muted-foreground">&middot;</span>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary flex items-center gap-1"
                  >
                    LinkedIn
                    {ExternalLinkIcon && <ExternalLinkIcon className="h-3 w-3" />}
                  </a>
                </>
              )}
            </div>

            {description && (
              <Text size="sm" tone="muted" className="mt-sm">
                {description}
              </Text>
            )}
          </div>

          {/* Sidebar (claim + optional extra content like leadership) */}
          {(currentClaim || sidebar) && (
            <>
              <div className="my-md lg:hidden" style={{ height: 1, background: "var(--border)" }} />
              <div className="hidden lg:block w-px bg-border shrink-0" />
              <div className="lg:w-64 shrink-0 flex flex-col gap-md">
                {currentClaim && (
                  <div>
                    <div className="flex items-center gap-sm mb-xs">
                      {QuoteIcon && <QuoteIcon className="h-4 w-4 text-muted-foreground" />}
                      <Text size="sm" tone="muted">Positioning</Text>
                    </div>
                    <Text size="sm" weight="medium" className="line-clamp-2">
                      &ldquo;{currentClaim}&rdquo;
                    </Text>
                  </div>
                )}
                {sidebar}
              </div>
            </>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
