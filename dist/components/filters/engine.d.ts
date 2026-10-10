import { NamedFilter, FieldInputKind, FilterOperator, FilterFieldType, FilterCriterion, FilterLogic, FilterGroup, FilterState, FilterNode, FieldConfig } from './types.js';

declare function makeNamedFilter(initial?: Partial<NamedFilter>): NamedFilter;
declare function makeId(): string;
declare function defaultOperatorFor(kind: FieldInputKind): FilterOperator;
declare function makeCriterion(type: FilterFieldType, kind: FieldInputKind, patch?: Partial<FilterCriterion>): FilterCriterion;
declare function makeGroup(logic?: FilterLogic, prefilled?: FilterCriterion[]): FilterGroup;
declare function getDefaultFilterState(): FilterState;
declare function isCriterionActive(c: FilterCriterion): boolean;
declare function countActiveCriteria(nodes: FilterNode[]): number;
declare function matchCriterionValue(value: unknown, kind: FieldInputKind, c: FilterCriterion): boolean;
/**
 * Walk a node tree, matching each leaf criterion via the consumer-supplied
 * matchLeaf adapter. Group logic is handled here.
 */
declare function matchNode<T>(ad: T, node: FilterNode, matchLeaf: (ad: T, c: FilterCriterion) => boolean): boolean;
declare function matchState<T>(ad: T, state: FilterState, matchLeaf: (ad: T, c: FilterCriterion) => boolean): boolean;
/**
 * Auto-derived label for a NamedFilter pill. Used when the user has not
 * named the filter explicitly. Tries to be useful for the common cases
 * (1 criterion → field+value, multiple → field list, complex → count).
 */
interface SummarizeOptions {
    emptyLabel?: string;
    conditionsLabel?: (count: number) => string;
    valueLabels?: Record<FilterFieldType, Record<string, string>>;
}
declare function summarizeFilter(state: FilterState, fieldConfigs: FieldConfig[], options?: SummarizeOptions): string;
declare function updateAtPath(state: FilterState, path: string[], updater: (children: FilterNode[]) => FilterNode[]): FilterState;
declare function toggleLogicAtPath(state: FilterState, path: string[]): FilterState;
declare function getInputKind(configs: FieldConfig[], type: FilterFieldType): FieldInputKind;

export { type SummarizeOptions, countActiveCriteria, defaultOperatorFor, getDefaultFilterState, getInputKind, isCriterionActive, makeCriterion, makeGroup, makeId, makeNamedFilter, matchCriterionValue, matchNode, matchState, summarizeFilter, toggleLogicAtPath, updateAtPath };
