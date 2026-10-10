import { FilterLogic } from './types.js';

/**
 * All user-facing strings used by the filter components. Each consumer
 * passes a `labels` prop to FilterBar; missing keys fall back to the
 * English defaults below. To localize, wrap your `t(...)` calls into a
 * matching object.
 */
interface FilterBarLabels {
    enable: string;
    disable: string;
    addFilter: string;
    edit: string;
    remove: string;
    emptyLabel: string;
    editorTitle: string;
    editorName: string;
    editorDone: string;
    editorDelete: string;
    editorEmpty: string;
    editorConditions: (count: number) => string;
    add: string;
    addCondition: string;
    addGroup: string;
    removeGroup: string;
    toggleLogic: string;
    groupLabel: (logic: FilterLogic) => string;
    logic: (logic: FilterLogic) => string;
    dimensionAriaLabel: string;
    operatorAriaLabel: string;
    dateFromAriaLabel: string;
    dateToAriaLabel: string;
    searchPlaceholder: string;
    pickValue: string;
    pickValues: string;
    yes: string;
    no: string;
    and: string;
    noResults: string;
    nSelected: (count: number) => string;
    opAtLeast: string;
    opAtMost: string;
    opBetween: string;
    opContains: string;
    opStartsWith: string;
    opEquals: string;
    opAfter: string;
    opBefore: string;
}
declare const defaultFilterBarLabels: FilterBarLabels;
declare function resolveFilterBarLabels(partial?: Partial<FilterBarLabels>): FilterBarLabels;

export { type FilterBarLabels, defaultFilterBarLabels, resolveFilterBarLabels };
