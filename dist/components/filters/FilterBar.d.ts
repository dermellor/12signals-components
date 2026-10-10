import * as react_jsx_runtime from 'react/jsx-runtime';
import { NamedFilter, FieldConfig, FilterFieldType } from './types.js';
import { FilterBarLabels } from './labels.js';

type SystemBadge = {
    id: string;
    label: string;
    active: boolean;
    onToggle: () => void;
};
type Props = {
    filters: NamedFilter[];
    onChange: (next: NamedFilter[]) => void;
    fieldConfigs: FieldConfig[];
    defaultType?: FilterFieldType;
    systemBadges?: SystemBadge[];
    /** Override any subset of the default English labels. */
    labels?: Partial<FilterBarLabels>;
    /** Section aria-label. Defaults to "Filters". */
    sectionAriaLabel?: string;
};
declare function FilterBar({ filters, onChange, fieldConfigs, defaultType, systemBadges, labels: labelsProp, sectionAriaLabel, }: Props): react_jsx_runtime.JSX.Element;

export { FilterBar, type SystemBadge };
