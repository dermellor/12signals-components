import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default from 'react';

type Props = {
    name: string;
    website?: string | null;
    linkedinUrl?: string | null;
    description?: string | null;
    currentClaim?: string | null;
    /** Icon for external links (e.g. lucide ExternalLink) */
    externalLinkIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for positioning quote (e.g. lucide MessageSquareQuote) */
    quoteIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for LinkedIn (e.g. lucide Linkedin) */
    linkedinIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Optional sidebar content (e.g. leadership section in app) */
    sidebar?: React__default.ReactNode;
};
declare function CompetitorInfoCard({ name, website, linkedinUrl, description, currentClaim, externalLinkIcon: ExternalLinkIcon, quoteIcon: QuoteIcon, linkedinIcon: LinkedinIcon, sidebar, }: Props): react_jsx_runtime.JSX.Element;

export { CompetitorInfoCard };
