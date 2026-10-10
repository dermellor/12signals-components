import {
  isCriterion,
  isGroup
} from "./chunk-KEQRP7TE.js";

// src/design-system/components/filters/engine.ts
function makeNamedFilter(initial = {}) {
  var _a, _b, _c;
  return {
    id: makeId(),
    name: (_a = initial.name) != null ? _a : "",
    state: (_b = initial.state) != null ? _b : getDefaultFilterState(),
    enabled: (_c = initial.enabled) != null ? _c : true
  };
}
var ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
function makeId() {
  let s = "";
  for (let i = 0; i < 8; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return s;
}
function defaultOperatorFor(kind) {
  if (kind === "date") return "after";
  if (kind === "number") return "after";
  if (kind === "text") return "contains";
  if (kind === "multiEnum") return "in";
  return "equals";
}
function makeCriterion(type, kind, patch = {}) {
  var _a;
  return {
    kind: "criterion",
    id: makeId(),
    type,
    operator: (_a = patch.operator) != null ? _a : defaultOperatorFor(kind),
    ...patch
  };
}
function makeGroup(logic = "OR", prefilled = []) {
  return { kind: "group", id: makeId(), logic, children: prefilled };
}
function getDefaultFilterState() {
  return { logic: "AND", children: [] };
}
function isCriterionActive(c) {
  if (c.dateFrom || c.dateTo) return true;
  if (c.numberFrom != null || c.numberTo != null) return true;
  if (c.stringValue && c.stringValue.length > 0) return true;
  if (c.stringValues && c.stringValues.length > 0) return true;
  if (c.booleanValue != null) return true;
  return false;
}
function countActiveCriteria(nodes) {
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
function matchString(actual, c) {
  if (Array.isArray(actual)) {
    if (c.operator === "in") {
      if (!c.stringValues || c.stringValues.length === 0) return true;
      return actual.some((v) => c.stringValues.includes(String(v)));
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
function matchDate(actual, c) {
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
function matchNumber(actual, c) {
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
function matchCriterionValue(value, kind, c) {
  if (!isCriterionActive(c)) return true;
  if (kind === "date") return matchDate(value, c);
  if (kind === "number") return matchNumber(value, c);
  return matchString(value, c);
}
function matchNode(ad, node, matchLeaf) {
  if (isCriterion(node)) return matchLeaf(ad, node);
  if (node.children.length === 0) return true;
  if (node.logic === "AND") return node.children.every((n) => matchNode(ad, n, matchLeaf));
  return node.children.some((n) => matchNode(ad, n, matchLeaf));
}
function matchState(ad, state, matchLeaf) {
  if (state.children.length === 0) return true;
  if (state.logic === "AND") return state.children.every((n) => matchNode(ad, n, matchLeaf));
  return state.children.some((n) => matchNode(ad, n, matchLeaf));
}
function summarizeFilter(state, fieldConfigs, options = {}) {
  var _a, _b;
  const total = countActiveCriteria(state.children);
  const emptyLabel = (_a = options.emptyLabel) != null ? _a : "Empty filter";
  const conditionsLabel = (_b = options.conditionsLabel) != null ? _b : ((n) => `${n} conditions`);
  if (total === 0) return emptyLabel;
  const flatTopCrit = state.children.filter(isCriterion).filter(isCriterionActive);
  const hasNested = state.children.some(isGroup);
  if (!hasNested && flatTopCrit.length === 1) {
    return formatCriterion(flatTopCrit[0], fieldConfigs, options.valueLabels);
  }
  if (!hasNested && flatTopCrit.length > 1 && flatTopCrit.length <= 3) {
    const joiner = state.logic === "OR" ? " OR " : " \xB7 ";
    return flatTopCrit.map((c) => labelOfField(c.type, fieldConfigs)).join(joiner);
  }
  return conditionsLabel(total);
}
function labelOfField(type, configs) {
  var _a, _b;
  return (_b = (_a = configs.find((c) => c.type === type)) == null ? void 0 : _a.label) != null ? _b : type;
}
function formatCriterion(c, configs, valueLabels) {
  var _a;
  const field = labelOfField(c.type, configs);
  const labels = valueLabels == null ? void 0 : valueLabels[c.type];
  const enumOpts = (_a = configs.find((cfg) => cfg.type === c.type)) == null ? void 0 : _a.enumOptions;
  const labelFor = (v) => {
    var _a2, _b, _c;
    return (_c = (_b = labels == null ? void 0 : labels[v]) != null ? _b : (_a2 = enumOpts == null ? void 0 : enumOpts.find((o) => o.value === v)) == null ? void 0 : _a2.label) != null ? _c : v;
  };
  if (c.stringValues && c.stringValues.length > 0) {
    const labeled = c.stringValues.map(labelFor);
    const joined = labeled.length <= 2 ? labeled.join(", ") : `${labeled.slice(0, 2).join(", ")} +${labeled.length - 2}`;
    return `${field}: ${joined}`;
  }
  if (c.stringValue) return `${field}: ${labelFor(c.stringValue)}`;
  if (c.dateFrom && c.dateTo) return `${field}: ${c.dateFrom} \u2013 ${c.dateTo}`;
  if (c.dateFrom) return `${field} ${opLabel(c.operator)} ${c.dateFrom}`;
  if (c.numberFrom != null && c.numberTo != null) return `${field}: ${c.numberFrom}\u2013${c.numberTo}`;
  if (c.numberFrom != null) return `${field} ${opLabel(c.operator)} ${c.numberFrom}`;
  if (c.booleanValue != null) return `${field}: ${c.booleanValue ? "yes" : "no"}`;
  return field;
}
function opLabel(op) {
  switch (op) {
    case "after":
      return "\u2265";
    case "before":
      return "\u2264";
    case "equals":
      return "=";
    case "contains":
      return "~";
    case "startsWith":
      return "^";
    default:
      return "";
  }
}
function updateAtPath(state, path, updater) {
  if (path.length === 0) {
    return { ...state, children: updater(state.children) };
  }
  const walk = (children, remaining) => {
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
function toggleLogicAtPath(state, path) {
  if (path.length === 0) {
    return { ...state, logic: state.logic === "AND" ? "OR" : "AND" };
  }
  const walk = (children, remaining) => {
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
function getInputKind(configs, type) {
  var _a, _b;
  return (_b = (_a = configs.find((c) => c.type === type)) == null ? void 0 : _a.inputKind) != null ? _b : "text";
}

export {
  makeNamedFilter,
  makeId,
  defaultOperatorFor,
  makeCriterion,
  makeGroup,
  getDefaultFilterState,
  isCriterionActive,
  countActiveCriteria,
  matchCriterionValue,
  matchNode,
  matchState,
  summarizeFilter,
  updateAtPath,
  toggleLogicAtPath,
  getInputKind
};
//# sourceMappingURL=chunk-2WQXNSZC.js.map