import {
  FieldConfig,
  FieldInputKind,
  FilterCriterion,
  FilterFieldType,
  FilterGroup,
  FilterLogic,
  FilterNode,
  FilterOperator,
  FilterState,
  NamedFilter,
  isCriterion,
  isGroup,
} from "./types";

export function makeNamedFilter(initial: Partial<NamedFilter> = {}): NamedFilter {
  return {
    id: makeId(),
    name: initial.name ?? "",
    state: initial.state ?? getDefaultFilterState(),
    enabled: initial.enabled ?? true,
  };
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
export function makeId(): string {
  let s = "";
  for (let i = 0; i < 8; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return s;
}

export function defaultOperatorFor(kind: FieldInputKind): FilterOperator {
  if (kind === "date") return "after";
  if (kind === "number") return "after";
  if (kind === "text") return "contains";
  if (kind === "multiEnum") return "in";
  return "equals";
}

export function makeCriterion(
  type: FilterFieldType,
  kind: FieldInputKind,
  patch: Partial<FilterCriterion> = {},
): FilterCriterion {
  return {
    kind: "criterion",
    id: makeId(),
    type,
    operator: patch.operator ?? defaultOperatorFor(kind),
    ...patch,
  };
}

export function makeGroup(
  logic: FilterLogic = "OR",
  prefilled: FilterCriterion[] = [],
): FilterGroup {
  return { kind: "group", id: makeId(), logic, children: prefilled };
}

export function getDefaultFilterState(): FilterState {
  return { logic: "AND", children: [] };
}

export function isCriterionActive(c: FilterCriterion): boolean {
  if (c.dateFrom || c.dateTo) return true;
  if (c.numberFrom != null || c.numberTo != null) return true;
  if (c.stringValue && c.stringValue.length > 0) return true;
  if (c.stringValues && c.stringValues.length > 0) return true;
  if (c.booleanValue != null) return true;
  return false;
}

export function countActiveCriteria(nodes: FilterNode[]): number {
  let n = 0;
  for (const node of nodes) {
    if (isCriterion(node)) {
      if (isCriterionActive(node)) n++;
    } else {
      n += countActiveCriteria(node.children);
    }
  }
  return n;
}

// ── Generic value matchers ───────────────────────────────────────────────
// Domain-agnostic. Consumers extract a value from their domain object via
// their own getValue(type) helper, then pass it here together with the
// resolved input kind.

function matchString(actual: unknown, c: FilterCriterion): boolean {
  if (Array.isArray(actual)) {
    if (c.operator === "in") {
      if (!c.stringValues || c.stringValues.length === 0) return true;
      return actual.some((v) => c.stringValues!.includes(String(v)));
    }
    if (!c.stringValue) return true;
    return actual.some((v) => String(v) === c.stringValue);
  }
  if (actual == null) return false;
  const s = String(actual);
  if (c.operator === "in") {
    if (!c.stringValues || c.stringValues.length === 0) return true;
    return c.stringValues.includes(s);
  }
  if (!c.stringValue) return true;
  if (c.operator === "equals") return s === c.stringValue;
  if (c.operator === "startsWith") return s.startsWith(c.stringValue);
  if (c.operator === "contains") return s.toLowerCase().includes(c.stringValue.toLowerCase());
  return false;
}

function matchDate(actual: unknown, c: FilterCriterion): boolean {
  if (typeof actual !== "string" || !actual) return false;
  if (c.operator === "after") {
    if (!c.dateFrom) return true;
    return actual >= c.dateFrom;
  }
  if (c.operator === "before") {
    if (!c.dateFrom) return true;
    return actual <= c.dateFrom;
  }
  if (c.operator === "between") {
    if (c.dateFrom && actual < c.dateFrom) return false;
    if (c.dateTo && actual > c.dateTo) return false;
    return true;
  }
  return true;
}

function matchNumber(actual: unknown, c: FilterCriterion): boolean {
  if (typeof actual !== "number" || Number.isNaN(actual)) return false;
  if (c.operator === "after") return c.numberFrom == null || actual >= c.numberFrom;
  if (c.operator === "before") return c.numberFrom == null || actual <= c.numberFrom;
  if (c.operator === "between") {
    if (c.numberFrom != null && actual < c.numberFrom) return false;
    if (c.numberTo != null && actual > c.numberTo) return false;
    return true;
  }
  return true;
}

export function matchCriterionValue(
  value: unknown,
  kind: FieldInputKind,
  c: FilterCriterion,
): boolean {
  if (!isCriterionActive(c)) return true;
  if (kind === "date") return matchDate(value, c);
  if (kind === "number") return matchNumber(value, c);
  return matchString(value, c);
}

/**
 * Walk a node tree, matching each leaf criterion via the consumer-supplied
 * matchLeaf adapter. Group logic is handled here.
 */
export function matchNode<T>(
  ad: T,
  node: FilterNode,
  matchLeaf: (ad: T, c: FilterCriterion) => boolean,
): boolean {
  if (isCriterion(node)) return matchLeaf(ad, node);
  if (node.children.length === 0) return true;
  if (node.logic === "AND") return node.children.every((n) => matchNode(ad, n, matchLeaf));
  return node.children.some((n) => matchNode(ad, n, matchLeaf));
}

export function matchState<T>(
  ad: T,
  state: FilterState,
  matchLeaf: (ad: T, c: FilterCriterion) => boolean,
): boolean {
  if (state.children.length === 0) return true;
  if (state.logic === "AND") return state.children.every((n) => matchNode(ad, n, matchLeaf));
  return state.children.some((n) => matchNode(ad, n, matchLeaf));
}

/**
 * Auto-derived label for a NamedFilter pill. Used when the user has not
 * named the filter explicitly. Tries to be useful for the common cases
 * (1 criterion → field+value, multiple → field list, complex → count).
 */
export interface SummarizeOptions {
  emptyLabel?: string;
  conditionsLabel?: (count: number) => string;
  valueLabels?: Record<FilterFieldType, Record<string, string>>;
}

export function summarizeFilter(
  state: FilterState,
  fieldConfigs: FieldConfig[],
  options: SummarizeOptions = {},
): string {
  const total = countActiveCriteria(state.children);
  const emptyLabel = options.emptyLabel ?? "Empty filter";
  const conditionsLabel = options.conditionsLabel ?? ((n: number) => `${n} conditions`);
  if (total === 0) return emptyLabel;

  const flatTopCrit = state.children.filter(isCriterion).filter(isCriterionActive);
  const hasNested = state.children.some(isGroup);

  if (!hasNested && flatTopCrit.length === 1) {
    return formatCriterion(flatTopCrit[0], fieldConfigs, options.valueLabels);
  }
  if (!hasNested && flatTopCrit.length > 1 && flatTopCrit.length <= 3) {
    const joiner = state.logic === "OR" ? " OR " : " · ";
    return flatTopCrit
      .map((c) => labelOfField(c.type, fieldConfigs))
      .join(joiner);
  }
  return conditionsLabel(total);
}

function labelOfField(type: FilterFieldType, configs: FieldConfig[]): string {
  return configs.find((c) => c.type === type)?.label ?? type;
}

function formatCriterion(
  c: FilterCriterion,
  configs: FieldConfig[],
  valueLabels?: Record<FilterFieldType, Record<string, string>>,
): string {
  const field = labelOfField(c.type, configs);
  const labels = valueLabels?.[c.type];
  const enumOpts = configs.find((cfg) => cfg.type === c.type)?.enumOptions;
  const labelFor = (v: string) =>
    labels?.[v]
      ?? enumOpts?.find((o) => o.value === v)?.label
      ?? v;

  if (c.stringValues && c.stringValues.length > 0) {
    const labeled = c.stringValues.map(labelFor);
    const joined = labeled.length <= 2
      ? labeled.join(", ")
      : `${labeled.slice(0, 2).join(", ")} +${labeled.length - 2}`;
    return `${field}: ${joined}`;
  }
  if (c.stringValue) return `${field}: ${labelFor(c.stringValue)}`;
  if (c.dateFrom && c.dateTo) return `${field}: ${c.dateFrom} – ${c.dateTo}`;
  if (c.dateFrom) return `${field} ${opLabel(c.operator)} ${c.dateFrom}`;
  if (c.numberFrom != null && c.numberTo != null) return `${field}: ${c.numberFrom}–${c.numberTo}`;
  if (c.numberFrom != null) return `${field} ${opLabel(c.operator)} ${c.numberFrom}`;
  if (c.booleanValue != null) return `${field}: ${c.booleanValue ? "yes" : "no"}`;
  return field;
}

function opLabel(op: FilterOperator): string {
  switch (op) {
    case "after": return "≥";
    case "before": return "≤";
    case "equals": return "=";
    case "contains": return "~";
    case "startsWith": return "^";
    default: return "";
  }
}

// ── Tree mutations ────────────────────────────────────────────────────────
// Path-based updates so the recursive UI can address any node by id chain.

export function updateAtPath(
  state: FilterState,
  path: string[],
  updater: (children: FilterNode[]) => FilterNode[],
): FilterState {
  if (path.length === 0) {
    return { ...state, children: updater(state.children) };
  }
  const walk = (children: FilterNode[], remaining: string[]): FilterNode[] => {
    if (remaining.length === 0) return updater(children);
    const [head, ...rest] = remaining;
    return children.map((ch) => {
      if (isGroup(ch) && ch.id === head) {
        return { ...ch, children: walk(ch.children, rest) };
      }
      return ch;
    });
  };
  return { ...state, children: walk(state.children, path) };
}

export function toggleLogicAtPath(state: FilterState, path: string[]): FilterState {
  if (path.length === 0) {
    return { ...state, logic: state.logic === "AND" ? "OR" : "AND" };
  }
  const walk = (children: FilterNode[], remaining: string[]): FilterNode[] => {
    if (remaining.length === 1) {
      return children.map((ch) => {
        if (isGroup(ch) && ch.id === remaining[0]) {
          return { ...ch, logic: ch.logic === "AND" ? "OR" : "AND" };
        }
        return ch;
      });
    }
    const [head, ...rest] = remaining;
    return children.map((ch) => {
      if (isGroup(ch) && ch.id === head) {
        return { ...ch, children: walk(ch.children, rest) };
      }
      return ch;
    });
  };
  return { ...state, children: walk(state.children, path) };
}

export function getInputKind(configs: FieldConfig[], type: FilterFieldType): FieldInputKind {
  return configs.find((c) => c.type === type)?.inputKind ?? "text";
}
