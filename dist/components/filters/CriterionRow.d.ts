import * as react_jsx_runtime from 'react/jsx-runtime';
import { FilterCriterion, FieldConfig } from './types.js';
import { FilterBarLabels } from './labels.js';

type Props = {
    criterion: FilterCriterion;
    fieldConfigs: FieldConfig[];
    labels: FilterBarLabels;
    onUpdate: (patch: Partial<FilterCriterion>) => void;
    onRemove: () => void;
};
declare function CriterionRow({ criterion, fieldConfigs, labels, onUpdate, onRemove }: Props): react_jsx_runtime.JSX.Element;

export { CriterionRow };
