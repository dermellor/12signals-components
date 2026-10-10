import * as react_jsx_runtime from 'react/jsx-runtime';
import { NamedFilter, FieldConfig, FilterFieldType } from './types.js';
import { FilterBarLabels } from './labels.js';

type Props = {
    open: boolean;
    filter: NamedFilter | null;
    fieldConfigs: FieldConfig[];
    defaultType?: FilterFieldType;
    labels: FilterBarLabels;
    /** Called with patched filter on every edit. Live-saves to URL. */
    onChange: (next: NamedFilter) => void;
    /** Called when user closes the modal. */
    onClose: () => void;
    /** Called when user removes the filter from the editor. */
    onRemove?: () => void;
};
declare function FilterEditor({ open, filter, fieldConfigs, defaultType, labels, onChange, onClose, onRemove, }: Props): react_jsx_runtime.JSX.Element | null;

export { FilterEditor };
