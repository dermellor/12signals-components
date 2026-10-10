// src/design-system/components/filters/labels.ts
var defaultFilterBarLabels = {
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
  editorConditions: (n) => n === 1 ? "1 condition" : `${n} conditions`,
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
  searchPlaceholder: "Search\u2026",
  pickValue: "Pick a value",
  pickValues: "Pick values",
  yes: "Yes",
  no: "No",
  and: "and",
  noResults: "No results",
  nSelected: (n) => `${n} selected`,
  opAtLeast: "\u2265",
  opAtMost: "\u2264",
  opBetween: "between",
  opContains: "contains",
  opStartsWith: "starts with",
  opEquals: "equals",
  opAfter: "after",
  opBefore: "before"
};
function resolveFilterBarLabels(partial) {
  if (!partial) return defaultFilterBarLabels;
  return { ...defaultFilterBarLabels, ...partial };
}

export {
  defaultFilterBarLabels,
  resolveFilterBarLabels
};
//# sourceMappingURL=chunk-BGFRAABE.js.map