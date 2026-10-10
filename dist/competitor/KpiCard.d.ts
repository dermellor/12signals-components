import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default from 'react';
import { KpiEntry } from './kpi-utils.js';

type Props = {
    /** lucide-react icon component */
    icon: React__default.ComponentType<{
        className?: string;
    }>;
    label: string;
    entry: KpiEntry | null;
    /** Locale for number formatting (default "de-DE") */
    locale?: string;
    /** External link icon component (optional, for source links) */
    externalLinkIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Hide the period/year below the value */
    hidePeriod?: boolean;
};
declare function KpiCard({ icon: Icon, label, entry, locale, externalLinkIcon: ExternalLinkIcon, hidePeriod, }: Props): react_jsx_runtime.JSX.Element;

export { KpiCard };
