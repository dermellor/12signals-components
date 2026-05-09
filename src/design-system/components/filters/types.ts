// Generic filter model: recursive criterion tree (AND/OR groups) plus a
// separate row of toggleable system badges (e.g. "Active only").
//
// Field types are open strings — each consumer defines its own dimensions
// via the FieldConfig[] passed to FilterBar.

export type FilterLogic = "AND" | "OR";

export type FilterOperator =
  | "after" | "before" | "between"
  | "equals" | "startsWith" | "contains"
  | "in";

export type FilterFieldType = string;

export type FieldInputKind =
  | "date"
  | "number"
  | "multiEnum"
  | "enum"
  | "boolean"
  | "text";

export interface FilterCriterion {
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

export interface FilterGroup {
  kind: "group";
  id: string;
  logic: FilterLogic;
  children: FilterNode[];
}

export type FilterNode = FilterCriterion | FilterGroup;

export interface FilterState {
  logic: FilterLogic;
  children: FilterNode[];
}

export interface FieldEnumOption {
  value: string;
  label: string;
  hint?: string;
}

export interface FieldConfig {
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
export interface NamedFilter {
  id: string;
  /** User-given name. Empty → render auto-summary instead. */
  name: string;
  state: FilterState;
  enabled: boolean;
}

export function isCriterion(n: FilterNode): n is FilterCriterion {
  return n.kind === "criterion";
}

export function isGroup(n: FilterNode): n is FilterGroup {
  return n.kind === "group";
}
