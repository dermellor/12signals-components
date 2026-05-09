import { FilterLogic } from "./types";

/**
 * All user-facing strings used by the filter components. Each consumer
 * passes a `labels` prop to FilterBar; missing keys fall back to the
 * English defaults below. To localize, wrap your `t(...)` calls into a
 * matching object.
 */
export interface FilterBarLabels {
  // Bar
  enable: string;
  disable: string;
  addFilter: string;
  edit: string;
  remove: string;
  emptyLabel: string;

  // Editor
  editorTitle: string;
  editorName: string;
  editorDone: string;
  editorDelete: string;
  editorEmpty: string;
  editorConditions: (count: number) => string;

  // Node list
  add: string;
  addCondition: string;
  addGroup: string;
  removeGroup: string;
  toggleLogic: string;
  groupLabel: (logic: FilterLogic) => string;
  logic: (logic: FilterLogic) => string;

  // Criterion row
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

export const defaultFilterBarLabels: FilterBarLabels = {
  enable: "Enable filter",
  disable: "Disable filter",
  addFilter: "Add filter",
  edit: "Edit filter",
  remove: "Remove filter",
  emptyLabel: "Empty filter",

  editorTitle: "Filter",
  editorName: "Name",
  editorDone: "Done",
  editorDelete: "Delete",
  editorEmpty: "No conditions yet",
  editorConditions: (n) => (n === 1 ? "1 condition" : `${n} conditions`),

  add: "Add",
  addCondition: "Add condition",
  addGroup: "Add group",
  removeGroup: "Remove group",
  toggleLogic: "Toggle AND/OR",
  groupLabel: (logic) => `${logic} group`,
  logic: (logic) => logic,

  dimensionAriaLabel: "Filter dimension",
  operatorAriaLabel: "Filter operator",
  dateFromAriaLabel: "From date",
  dateToAriaLabel: "To date",
  searchPlaceholder: "Search…",
  pickValue: "Pick a value",
  pickValues: "Pick values",
  yes: "Yes",
  no: "No",
  and: "and",
  noResults: "No results",
  nSelected: (n) => `${n} selected`,
  opAtLeast: "≥",
  opAtMost: "≤",
  opBetween: "between",
  opContains: "contains",
  opStartsWith: "starts with",
  opEquals: "equals",
  opAfter: "after",
  opBefore: "before",
};

export function resolveFilterBarLabels(
  partial?: Partial<FilterBarLabels>,
): FilterBarLabels {
  if (!partial) return defaultFilterBarLabels;
  return { ...defaultFilterBarLabels, ...partial };
}
