import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

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
    meta?: string;
    description?: React.ReactNode;
    media?: React.ReactNode;
    timestamp?: string;
    href?: string;
    ariaLabel?: string;
    hover?: "none" | "glow";
    accent?: "breaking";
};
declare function ActivityCard({ icon, title, titleNode, headline, competitorIcon, categoryLabel, categoryVariant, categoryTone, extraBadges, meta, description, media, timestamp, href, ariaLabel, hover, accent, }: ActivityCardProps): react_jsx_runtime.JSX.Element;

export { ActivityCard };
