type FilterLogic = "AND" | "OR";
type FilterOperator = "after" | "before" | "between" | "equals" | "startsWith" | "contains" | "in";
type FilterFieldType = string;
type FieldInputKind = "date" | "number" | "multiEnum" | "enum" | "boolean" | "text";
interface FilterCriterion {
    kind: "criterion";
    id: string;
    type: FilterFieldType;
    operator: FilterOperator;
    dateFrom?: string;
    dateTo?: string;
    numberFrom?: number;
    numberTo?: number;
    stringValue?: string;
    stringValues?: string[];
    booleanValue?: boolean;
}
interface FilterGroup {
    kind: "group";
    id: string;
    logic: FilterLogic;
    children: FilterNode[];
}
type FilterNode = FilterCriterion | FilterGroup;
interface FilterState {
    logic: FilterLogic;
    children: FilterNode[];
}
interface FieldEnumOption {
    value: string;
    label: string;
    hint?: string;
}
interface FieldConfig {
    type: FilterFieldType;
    label: string;
    inputKind: FieldInputKind;
    enumOptions?: FieldEnumOption[];
}
/**
 * One pill in the FilterBar = one NamedFilter. Each carries its own
 * (potentially deeply nested) FilterState. Multiple NamedFilters at the
 * page level are AND-combined.
 */
interface NamedFilter {
    id: string;
    /** User-given name. Empty → render auto-summary instead. */
    name: string;
    state: FilterState;
    enabled: boolean;
}
declare function isCriterion(n: FilterNode): n is FilterCriterion;
declare function isGroup(n: FilterNode): n is FilterGroup;

export { type FieldConfig, type FieldEnumOption, type FieldInputKind, type FilterCriterion, type FilterFieldType, type FilterGroup, type FilterLogic, type FilterNode, type FilterOperator, type FilterState, type NamedFilter, isCriterion, isGroup };
