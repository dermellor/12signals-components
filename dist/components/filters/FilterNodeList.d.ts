import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { FilterNode, FilterLogic, FieldConfig, FilterFieldType, FilterState } from './types.js';
import { FilterBarLabels } from './labels.js';

type Props = {
    nodes: FilterNode[];
    logic: FilterLogic;
    fieldConfigs: FieldConfig[];
    defaultType: FilterFieldType;
    labels: FilterBarLabels;
    onSetState: React.Dispatch<React.SetStateAction<FilterState>>;
    parentPath: string[];
};
declare function FilterNodeList({ nodes, logic, fieldConfigs, defaultType, labels, onSetState, parentPath, }: Props): react_jsx_runtime.JSX.Element;

export { FilterNodeList };
