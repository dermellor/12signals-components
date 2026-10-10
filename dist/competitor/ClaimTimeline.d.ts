import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default from 'react';
import { ClaimRange } from './claim-utils.js';

type Props = {
    claimRanges: ClaimRange[];
    loading?: boolean;
    error?: boolean;
    /** Locale for date formatting (default "de-DE") */
    locale?: string;
    /** Months between tick labels (default: auto based on range) */
    tickInterval?: number;
    /** Optional loading spinner element (e.g. lucide Loader2) */
    loadingIcon?: React__default.ReactNode;
};
declare function ClaimTimeline({ claimRanges, loading, error, locale, tickInterval, loadingIcon, }: Props): react_jsx_runtime.JSX.Element;

export { ClaimTimeline };
