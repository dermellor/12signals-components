// src/design-system/components/Button.tsx
import * as React from "react";
import { Loader2 } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = React.forwardRef(function Button2({
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  className,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      "data-variant": variant,
      "data-size": size,
      "data-loading": loading ? "true" : void 0,
      className: ["ds-Button", className].filter(Boolean).join(" "),
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsx(Loader2, { "aria-hidden": true, focusable: false, className: "ds-ButtonSpinner" }) : iconLeft ? /* @__PURE__ */ jsx("span", { className: "ds-ButtonIcon", "aria-hidden": true, children: iconLeft }) : null,
        /* @__PURE__ */ jsx("span", { className: "ds-ButtonLabel", children }),
        !loading && iconRight && /* @__PURE__ */ jsx("span", { className: "ds-ButtonIcon", "aria-hidden": true, children: iconRight })
      ]
    }
  );
});

// src/design-system/components/Text.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Text({
  as,
  size = "sm",
  weight = "regular",
  tone = "default",
  children,
  className,
  ...rest
}) {
  const Comp = as || "p";
  const mergedClassName = ["ds-Text", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx2(
    Comp,
    {
      "data-size": size,
      "data-weight": weight,
      "data-tone": tone,
      className: mergedClassName,
      ...rest,
      children
    }
  );
}

// src/design-system/components/Card.tsx
import * as React2 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var CardNestingContext = React2.createContext(false);
function CardRoot({ children, variant = "default", hover = "none", className, ...rest }) {
  const isNested = React2.useContext(CardNestingContext);
  const ref = React2.useRef(null);
  if (isNested) {
    throw new Error(
      "[ds-Card] Nested Card detected. Cards must not be placed inside other Cards \u2014 use a plain container (div, section) or a different visual treatment instead."
    );
  }
  React2.useEffect(() => {
    const el = ref.current;
    if (!el || hover !== "glow") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hover]);
  const cn = ["ds-Card", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3(CardNestingContext.Provider, { value: true, children: /* @__PURE__ */ jsx3("div", { ref, className: cn, "data-variant": variant, "data-hover": hover, ...rest, children }) });
}
function CardHeader({ children, className, variant = "default", ...rest }) {
  const cn = ["ds-CardHeader", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3("div", { className: cn, "data-variant": variant, ...rest, children });
}
function CardContent({ children, className, ...rest }) {
  const cn = ["ds-CardContent", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3("div", { className: cn, ...rest, children });
}
function CardTitle({
  as,
  children,
  className,
  ...rest
}) {
  const Comp = as || "h3";
  const cn = ["ds-CardTitle", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3(Comp, { className: cn, ...rest, children });
}
var Card = Object.assign(CardRoot, { Header: CardHeader, Content: CardContent, Title: CardTitle });

// src/design-system/components/TextField.tsx
import * as React3 from "react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function TextField({ label, description, error, inputProps, ...rest }) {
  const id = React3.useId();
  const describedBy = [];
  if (description) describedBy.push(`${id}-desc`);
  if (error) describedBy.push(`${id}-err`);
  return /* @__PURE__ */ jsxs2("div", { className: "ds-TextField", ...rest, children: [
    /* @__PURE__ */ jsx4("label", { className: "ds-TextFieldLabel", htmlFor: id, children: label }),
    /* @__PURE__ */ jsx4(
      "input",
      {
        id,
        "aria-invalid": !!error,
        "aria-describedby": describedBy.join(" ") || void 0,
        className: "ds-TextFieldInput",
        ...inputProps
      }
    ),
    description && /* @__PURE__ */ jsx4("div", { id: `${id}-desc`, className: "ds-TextFieldDescription", children: description }),
    error && /* @__PURE__ */ jsx4("div", { id: `${id}-err`, className: "ds-TextFieldError", role: "alert", children: error })
  ] });
}

// src/design-system/components/Modal.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return /* @__PURE__ */ jsxs3("div", { className: "ds-ModalRoot", children: [
    /* @__PURE__ */ jsx5("div", { className: "ds-ModalOverlay", onClick: onClose }),
    /* @__PURE__ */ jsxs3("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: "ds-ModalContent", children: [
      title && /* @__PURE__ */ jsx5("div", { className: "ds-ModalHeader", children: /* @__PURE__ */ jsx5("strong", { children: title }) }),
      /* @__PURE__ */ jsx5("div", { className: "ds-ModalBody", children }),
      footer && /* @__PURE__ */ jsx5("div", { className: "ds-ModalFooter", children: footer })
    ] })
  ] });
}

// src/design-system/components/Badge.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function Badge({
  as,
  variant = "solid",
  tone = "solid",
  size = "md",
  children,
  ...rest
}) {
  const Comp = as || "span";
  return /* @__PURE__ */ jsx6(Comp, { className: "ds-Badge", "data-variant": variant, "data-tone": tone, "data-size": size, ...rest, children });
}

// src/design-system/components/FilterBadge.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function FilterBadge({
  label,
  active,
  removable = false,
  onToggle,
  onEdit,
  onRemove,
  variant = "default",
  size = "md",
  toggleAriaLabel,
  editAriaLabel = "Edit filter",
  removeAriaLabel = "Remove filter",
  children
}) {
  const handle = (cb) => (e) => {
    e.stopPropagation();
    cb == null ? void 0 : cb();
  };
  return /* @__PURE__ */ jsxs4(
    "span",
    {
      className: "ds-FilterBadge",
      "data-variant": variant,
      "data-size": size,
      "data-state": active ? "active" : "inactive",
      children: [
        /* @__PURE__ */ jsxs4(
          "button",
          {
            type: "button",
            className: "ds-FilterBadgeToggle",
            "aria-pressed": variant === "add" ? void 0 : active,
            "aria-label": toggleAriaLabel,
            onClick: onToggle,
            children: [
              /* @__PURE__ */ jsx7("span", { className: "ds-FilterBadgeLabel", children: label }),
              children
            ]
          }
        ),
        onEdit && /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            className: "ds-FilterBadgeAction",
            "aria-label": editAriaLabel,
            onClick: handle(onEdit),
            children: /* @__PURE__ */ jsx7("svg", { width: "11", height: "11", viewBox: "0 0 12 12", "aria-hidden": "true", children: /* @__PURE__ */ jsx7(
              "path",
              {
                d: "M8.5 1.5l2 2L4 10l-2.5.5L2 8l6.5-6.5z",
                stroke: "currentColor",
                strokeWidth: "1.2",
                strokeLinejoin: "round",
                fill: "none"
              }
            ) })
          }
        ),
        removable && onRemove ? /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            className: "ds-FilterBadgeAction",
            "aria-label": removeAriaLabel,
            onClick: handle(onRemove),
            children: /* @__PURE__ */ jsx7("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ jsx7("path", { d: "M1 1l8 8M9 1L1 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        ) : null
      ]
    }
  );
}

// src/design-system/components/filters/types.ts
function isCriterion(n) {
  return n.kind === "criterion";
}
function isGroup(n) {
  return n.kind === "group";
}

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

// src/design-system/components/filters/url.ts
var VALID_OPS = [
  "after",
  "before",
  "between",
  "equals",
  "startsWith",
  "contains",
  "in"
];
function makeId2() {
  return Math.random().toString(36).slice(2, 10);
}
function b64UrlEncode(s) {
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64UrlDecode(s) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - s.length % 4);
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return decodeURIComponent(escape(atob(b64)));
}
function critToDto(c) {
  const dto = { k: "c", i: c.id, t: c.type, o: c.operator };
  if (c.dateFrom) dto.df = c.dateFrom;
  if (c.dateTo) dto.dt = c.dateTo;
  if (c.numberFrom != null) dto.nf = c.numberFrom;
  if (c.numberTo != null) dto.nt = c.numberTo;
  if (c.stringValue) dto.sv = c.stringValue;
  if (c.stringValues && c.stringValues.length > 0) dto.svs = c.stringValues;
  if (c.booleanValue != null) dto.bv = c.booleanValue;
  return dto;
}
function groupToDto(g) {
  return { k: "g", i: g.id, l: g.logic, c: g.children.map(nodeToDto) };
}
function nodeToDto(n) {
  return isCriterion(n) ? critToDto(n) : groupToDto(n);
}
function stateToDto(s) {
  return { l: s.logic, c: s.children.map(nodeToDto) };
}
function dtoToCrit(dto, options) {
  var _a;
  const renamed = (_a = options.renameTypes) == null ? void 0 : _a[dto.t];
  const type = renamed != null ? renamed : dto.t;
  if (typeof type !== "string" || !type) return null;
  if (typeof dto.o !== "string" || !VALID_OPS.includes(dto.o)) return null;
  return {
    kind: "criterion",
    id: typeof dto.i === "string" ? dto.i : makeId2(),
    type,
    operator: dto.o,
    dateFrom: typeof dto.df === "string" ? dto.df : void 0,
    dateTo: typeof dto.dt === "string" ? dto.dt : void 0,
    numberFrom: typeof dto.nf === "number" ? dto.nf : void 0,
    numberTo: typeof dto.nt === "number" ? dto.nt : void 0,
    stringValue: typeof dto.sv === "string" ? dto.sv : void 0,
    stringValues: Array.isArray(dto.svs) ? dto.svs.filter((v) => typeof v === "string") : void 0,
    booleanValue: typeof dto.bv === "boolean" ? dto.bv : void 0
  };
}
function dtoToGroup(dto, options) {
  if (dto.l !== "AND" && dto.l !== "OR") return null;
  if (!Array.isArray(dto.c)) return null;
  const children = [];
  for (const raw of dto.c) {
    const node = dtoToNode(raw, options);
    if (node) children.push(node);
  }
  return {
    kind: "group",
    id: typeof dto.i === "string" ? dto.i : makeId2(),
    logic: dto.l,
    children
  };
}
function dtoToNode(dto, options) {
  if ((dto == null ? void 0 : dto.k) === "c") return dtoToCrit(dto, options);
  if ((dto == null ? void 0 : dto.k) === "g") return dtoToGroup(dto, options);
  return null;
}
function dtoToState(dto, options) {
  if (!dto || dto.l !== "AND" && dto.l !== "OR" || !Array.isArray(dto.c)) {
    return { logic: "AND", children: [] };
  }
  const children = [];
  for (const raw of dto.c) {
    const node = dtoToNode(raw, options);
    if (node) children.push(node);
  }
  return { logic: dto.l, children };
}
function serializeFilters(filters) {
  const dto = {
    v: 1,
    f: filters.map((f) => {
      const out = { i: f.id, s: stateToDto(f.state) };
      if (f.name) out.n = f.name;
      if (!f.enabled) out.e = 0;
      return out;
    })
  };
  return b64UrlEncode(JSON.stringify(dto));
}
function parseFilters(encoded, options = {}) {
  if (!encoded) return [];
  try {
    const dto = JSON.parse(b64UrlDecode(encoded));
    if (!dto || dto.v !== 1 || !Array.isArray(dto.f)) return [];
    const out = [];
    for (const raw of dto.f) {
      if (!raw || typeof raw !== "object") continue;
      out.push({
        id: typeof raw.i === "string" ? raw.i : makeId2(),
        name: typeof raw.n === "string" ? raw.n : "",
        state: dtoToState(raw.s, options),
        enabled: raw.e === 0 ? false : true
      });
    }
    return out;
  } catch (err) {
    console.warn("[ds/filters] failed to parse filter URL param", err);
    return [];
  }
}

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

// src/design-system/components/filters/CriterionRow.tsx
import * as React4 from "react";
import { X } from "lucide-react";
import { Fragment, jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var SELECT_CLASS = "border border-border rounded-md px-2 py-1 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-success/40 focus:border-success";
var INPUT_CLASS = SELECT_CLASS;
function CriterionRow({ criterion, fieldConfigs, labels, onUpdate, onRemove }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const config = (_a = fieldConfigs.find((f) => f.type === criterion.type)) != null ? _a : fieldConfigs[0];
  const inputKind = (_b = config == null ? void 0 : config.inputKind) != null ? _b : "text";
  const handleTypeChange = (nextType) => {
    var _a2;
    const nextConfig = fieldConfigs.find((f) => f.type === nextType);
    const nextKind = (_a2 = nextConfig == null ? void 0 : nextConfig.inputKind) != null ? _a2 : "text";
    const nextOperator = nextKind === inputKind ? criterion.operator : defaultOperatorFor(nextKind);
    onUpdate({
      type: nextType,
      operator: nextOperator,
      dateFrom: void 0,
      dateTo: void 0,
      numberFrom: void 0,
      numberTo: void 0,
      stringValue: void 0,
      stringValues: void 0,
      booleanValue: void 0
    });
  };
  return /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsx8(
      "select",
      {
        value: criterion.type,
        onChange: (e) => handleTypeChange(e.target.value),
        className: SELECT_CLASS,
        "aria-label": labels.dimensionAriaLabel,
        children: fieldConfigs.map((f) => /* @__PURE__ */ jsx8("option", { value: f.type, children: f.label }, f.type))
      }
    ),
    (inputKind === "date" || inputKind === "number" || inputKind === "text") && /* @__PURE__ */ jsx8(
      "select",
      {
        value: criterion.operator,
        onChange: (e) => onUpdate({ operator: e.target.value }),
        className: SELECT_CLASS,
        "aria-label": labels.operatorAriaLabel,
        children: inputKind === "number" ? /* @__PURE__ */ jsxs5(Fragment, { children: [
          /* @__PURE__ */ jsx8("option", { value: "after", children: labels.opAtLeast }),
          /* @__PURE__ */ jsx8("option", { value: "before", children: labels.opAtMost }),
          /* @__PURE__ */ jsx8("option", { value: "between", children: labels.opBetween })
        ] }) : inputKind === "text" ? /* @__PURE__ */ jsxs5(Fragment, { children: [
          /* @__PURE__ */ jsx8("option", { value: "contains", children: labels.opContains }),
          /* @__PURE__ */ jsx8("option", { value: "startsWith", children: labels.opStartsWith }),
          /* @__PURE__ */ jsx8("option", { value: "equals", children: labels.opEquals })
        ] }) : /* @__PURE__ */ jsxs5(Fragment, { children: [
          /* @__PURE__ */ jsx8("option", { value: "after", children: labels.opAfter }),
          /* @__PURE__ */ jsx8("option", { value: "before", children: labels.opBefore }),
          /* @__PURE__ */ jsx8("option", { value: "between", children: labels.opBetween })
        ] })
      }
    ),
    inputKind === "date" && /* @__PURE__ */ jsxs5(Fragment, { children: [
      /* @__PURE__ */ jsx8(
        "input",
        {
          type: "date",
          value: (_c = criterion.dateFrom) != null ? _c : "",
          onChange: (e) => onUpdate({ dateFrom: e.target.value || void 0 }),
          className: INPUT_CLASS,
          "aria-label": labels.dateFromAriaLabel
        }
      ),
      criterion.operator === "between" && /* @__PURE__ */ jsxs5(Fragment, { children: [
        /* @__PURE__ */ jsx8("span", { className: "text-sm text-muted-foreground", children: labels.and }),
        /* @__PURE__ */ jsx8(
          "input",
          {
            type: "date",
            value: (_d = criterion.dateTo) != null ? _d : "",
            onChange: (e) => onUpdate({ dateTo: e.target.value || void 0 }),
            className: INPUT_CLASS,
            "aria-label": labels.dateToAriaLabel
          }
        )
      ] })
    ] }),
    inputKind === "number" && /* @__PURE__ */ jsxs5(Fragment, { children: [
      /* @__PURE__ */ jsx8(
        "input",
        {
          type: "number",
          value: (_e = criterion.numberFrom) != null ? _e : "",
          onChange: (e) => onUpdate({
            numberFrom: e.target.value === "" ? void 0 : Number(e.target.value)
          }),
          className: `${INPUT_CLASS} w-24`
        }
      ),
      criterion.operator === "between" && /* @__PURE__ */ jsxs5(Fragment, { children: [
        /* @__PURE__ */ jsx8("span", { className: "text-sm text-muted-foreground", children: labels.and }),
        /* @__PURE__ */ jsx8(
          "input",
          {
            type: "number",
            value: (_f = criterion.numberTo) != null ? _f : "",
            onChange: (e) => onUpdate({
              numberTo: e.target.value === "" ? void 0 : Number(e.target.value)
            }),
            className: `${INPUT_CLASS} w-24`
          }
        )
      ] })
    ] }),
    inputKind === "text" && /* @__PURE__ */ jsx8(
      "input",
      {
        type: "text",
        value: (_g = criterion.stringValue) != null ? _g : "",
        onChange: (e) => onUpdate({ stringValue: e.target.value }),
        placeholder: labels.searchPlaceholder,
        className: `${INPUT_CLASS} min-w-[200px]`
      }
    ),
    inputKind === "enum" && /* @__PURE__ */ jsxs5(
      "select",
      {
        value: (_h = criterion.stringValue) != null ? _h : "",
        onChange: (e) => onUpdate({ stringValue: e.target.value || void 0 }),
        className: `${SELECT_CLASS} min-w-[160px]`,
        children: [
          /* @__PURE__ */ jsx8("option", { value: "", children: labels.pickValue }),
          ((_i = config == null ? void 0 : config.enumOptions) != null ? _i : []).map((o) => /* @__PURE__ */ jsx8("option", { value: o.value, children: o.label }, o.value))
        ]
      }
    ),
    inputKind === "multiEnum" && /* @__PURE__ */ jsx8(
      MultiEnumPicker,
      {
        options: (_j = config == null ? void 0 : config.enumOptions) != null ? _j : [],
        selected: (_k = criterion.stringValues) != null ? _k : [],
        onChange: (vals) => onUpdate({ stringValues: vals.length > 0 ? vals : void 0 }),
        labels
      }
    ),
    inputKind === "boolean" && /* @__PURE__ */ jsxs5(
      "select",
      {
        value: criterion.booleanValue == null ? "" : criterion.booleanValue ? "true" : "false",
        onChange: (e) => onUpdate({
          booleanValue: e.target.value === "" ? void 0 : e.target.value === "true"
        }),
        className: SELECT_CLASS,
        children: [
          /* @__PURE__ */ jsx8("option", { value: "", children: labels.pickValue }),
          /* @__PURE__ */ jsx8("option", { value: "true", children: labels.yes }),
          /* @__PURE__ */ jsx8("option", { value: "false", children: labels.no })
        ]
      }
    ),
    /* @__PURE__ */ jsx8(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onRemove,
        "aria-label": labels.remove,
        title: labels.remove,
        children: /* @__PURE__ */ jsx8(X, { size: 14, "aria-hidden": true })
      }
    )
  ] });
}
function MultiEnumPicker({
  options,
  selected,
  onChange,
  labels
}) {
  var _a, _b;
  const [open, setOpen] = React4.useState(false);
  const [query, setQuery] = React4.useState("");
  const wrapRef = React4.useRef(null);
  React4.useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      var _a2;
      if (!((_a2 = wrapRef.current) == null ? void 0 : _a2.contains(e.target))) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const filtered = React4.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);
  const summary = selected.length === 0 ? labels.pickValues : selected.length === 1 ? (_b = (_a = options.find((o) => o.value === selected[0])) == null ? void 0 : _a.label) != null ? _b : selected[0] : labels.nSelected(selected.length);
  const toggle = (value) => {
    if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
    else onChange([...selected, value]);
  };
  return /* @__PURE__ */ jsxs5("div", { ref: wrapRef, className: "relative inline-block", children: [
    /* @__PURE__ */ jsx8(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => setOpen((v) => !v),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        className: "border border-border bg-background min-w-[160px] justify-between",
        children: /* @__PURE__ */ jsx8("span", { className: "truncate", children: summary })
      }
    ),
    open && /* @__PURE__ */ jsxs5(
      "div",
      {
        role: "dialog",
        className: "absolute z-50 mt-1 w-72 rounded-md border border-border bg-popover text-popover-foreground shadow-lg p-2",
        children: [
          /* @__PURE__ */ jsx8(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: labels.searchPlaceholder,
              autoFocus: true,
              className: `${INPUT_CLASS} w-full mb-2`
            }
          ),
          /* @__PURE__ */ jsx8("ul", { role: "listbox", "aria-multiselectable": "true", className: "max-h-56 overflow-auto", children: filtered.length === 0 ? /* @__PURE__ */ jsx8("li", { className: "px-2 py-1 text-xs text-muted-foreground", children: labels.noResults }) : filtered.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return /* @__PURE__ */ jsx8("li", { children: /* @__PURE__ */ jsxs5(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "w-full justify-start",
                "aria-selected": isSelected,
                onClick: () => toggle(opt.value),
                children: [
                  /* @__PURE__ */ jsx8("span", { className: "inline-flex h-4 w-4 mr-2 items-center justify-center rounded border border-border", children: isSelected ? /* @__PURE__ */ jsx8("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ jsx8("path", { d: "M1 5l3 3 5-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }) }) : null }),
                  /* @__PURE__ */ jsx8("span", { className: "truncate", children: opt.label }),
                  opt.hint ? /* @__PURE__ */ jsx8("span", { className: "ml-auto text-xs text-muted-foreground", children: opt.hint }) : null
                ]
              }
            ) }, opt.value);
          }) })
        ]
      }
    )
  ] });
}

// src/design-system/components/filters/FilterNodeList.tsx
import * as React5 from "react";
import { ChevronDown, FolderPlus, Layers, Plus, X as X2 } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
function FilterNodeList({
  nodes,
  logic,
  fieldConfigs,
  defaultType,
  labels,
  onSetState,
  parentPath
}) {
  const updateChildren = React5.useCallback(
    (updater) => {
      onSetState((prev) => updateAtPath(prev, parentPath, updater));
    },
    [onSetState, parentPath]
  );
  const toggleSelfLogic = React5.useCallback(() => {
    onSetState((prev) => toggleLogicAtPath(prev, parentPath));
  }, [onSetState, parentPath]);
  const updateCriterion = (id, patch) => {
    updateChildren(
      (children) => children.map(
        (ch) => isCriterion(ch) && ch.id === id ? { ...ch, ...patch } : ch
      )
    );
  };
  const removeNode = (id) => {
    updateChildren((children) => children.filter((ch) => ch.id !== id));
  };
  const addCriterion = () => {
    updateChildren((children) => [
      ...children,
      makeCriterion(defaultType, getInputKind(fieldConfigs, defaultType))
    ]);
  };
  const addGroup = () => {
    const inverted = logic === "AND" ? "OR" : "AND";
    const kind = getInputKind(fieldConfigs, defaultType);
    updateChildren((children) => [
      ...children,
      makeGroup(inverted, [
        makeCriterion(defaultType, kind),
        makeCriterion(defaultType, kind)
      ])
    ]);
  };
  return /* @__PURE__ */ jsxs6("div", { className: "flex flex-col gap-1.5", children: [
    nodes.map((node, idx) => /* @__PURE__ */ jsxs6("div", { children: [
      idx > 0 && nodes.length > 1 && /* @__PURE__ */ jsx9("div", { className: "py-0.5", children: /* @__PURE__ */ jsx9(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: toggleSelfLogic,
          title: labels.toggleLogic,
          className: "px-2 py-0.5 text-xs font-medium border border-success/40 bg-success/10 text-success hover:bg-success/20",
          children: labels.logic(logic)
        }
      ) }),
      isCriterion(node) ? /* @__PURE__ */ jsx9(
        CriterionRow,
        {
          criterion: node,
          fieldConfigs,
          labels,
          onUpdate: (patch) => updateCriterion(node.id, patch),
          onRemove: () => removeNode(node.id)
        }
      ) : /* @__PURE__ */ jsxs6(
        "div",
        {
          className: "rounded-lg border px-3 py-2 relative",
          style: {
            borderColor: "hsl(var(--success) / 0.4)",
            backgroundColor: "hsl(var(--success) / 0.06)"
          },
          children: [
            /* @__PURE__ */ jsxs6("header", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxs6(
                "span",
                {
                  className: "text-xs font-medium inline-flex items-center gap-1",
                  style: { color: "hsl(var(--success))" },
                  children: [
                    /* @__PURE__ */ jsx9(Layers, { size: 12, "aria-hidden": true }),
                    labels.groupLabel(node.logic)
                  ]
                }
              ),
              /* @__PURE__ */ jsx9(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => removeNode(node.id),
                  "aria-label": labels.removeGroup,
                  title: labels.removeGroup,
                  children: /* @__PURE__ */ jsx9(X2, { size: 14, "aria-hidden": true })
                }
              )
            ] }),
            /* @__PURE__ */ jsx9(
              FilterNodeList,
              {
                nodes: node.children,
                logic: node.logic,
                fieldConfigs,
                defaultType,
                labels,
                onSetState,
                parentPath: [...parentPath, node.id]
              }
            )
          ]
        }
      )
    ] }, node.id)),
    /* @__PURE__ */ jsx9(
      AddNodeMenu,
      {
        labels,
        onAddCriterion: addCriterion,
        onAddGroup: addGroup
      }
    )
  ] });
}
function AddNodeMenu({
  onAddCriterion,
  onAddGroup,
  labels
}) {
  const wrapRef = React5.useRef(null);
  const [open, setOpen] = React5.useState(false);
  React5.useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      var _a;
      if (!((_a = wrapRef.current) == null ? void 0 : _a.contains(e.target))) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return /* @__PURE__ */ jsxs6("div", { ref: wrapRef, className: "relative inline-block pt-1", children: [
    /* @__PURE__ */ jsx9(
      Button,
      {
        variant: "ghost",
        size: "xs",
        onClick: () => setOpen((v) => !v),
        iconLeft: /* @__PURE__ */ jsx9(Plus, { size: 12, "aria-hidden": true }),
        iconRight: /* @__PURE__ */ jsx9(ChevronDown, { size: 10, "aria-hidden": true }),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        children: labels.add
      }
    ),
    open && /* @__PURE__ */ jsxs6(
      "div",
      {
        role: "menu",
        className: "absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-popover text-popover-foreground shadow-md p-1",
        children: [
          /* @__PURE__ */ jsx9(
            Button,
            {
              variant: "ghost",
              size: "xs",
              className: "w-full justify-start",
              onClick: () => {
                onAddCriterion();
                setOpen(false);
              },
              iconLeft: /* @__PURE__ */ jsx9(Plus, { size: 12, "aria-hidden": true }),
              children: labels.addCondition
            }
          ),
          /* @__PURE__ */ jsx9(
            Button,
            {
              variant: "ghost",
              size: "xs",
              className: "w-full justify-start",
              onClick: () => {
                onAddGroup();
                setOpen(false);
              },
              iconLeft: /* @__PURE__ */ jsx9(FolderPlus, { size: 12, "aria-hidden": true }),
              children: labels.addGroup
            }
          )
        ]
      }
    )
  ] });
}

// src/design-system/components/Input.tsx
import * as React6 from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var Input = React6.forwardRef(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx10(
      "input",
      {
        ref,
        className: composedClassName,
        "data-size": size,
        "aria-invalid": invalid || void 0,
        ...rest
      }
    );
  }
);
Input.displayName = "Input";

// src/design-system/components/filters/FilterEditor.tsx
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
function FilterEditor({
  open,
  filter,
  fieldConfigs,
  defaultType,
  labels,
  onChange,
  onClose,
  onRemove
}) {
  var _a, _b;
  if (!filter) return null;
  const resolvedDefaultType = (_b = defaultType != null ? defaultType : (_a = fieldConfigs[0]) == null ? void 0 : _a.type) != null ? _b : "";
  const setName = (name) => onChange({ ...filter, name });
  const setState = (updater) => {
    const nextState = typeof updater === "function" ? updater(filter.state) : updater;
    onChange({ ...filter, state: nextState });
  };
  const autoSummary = summarizeFilter(filter.state, fieldConfigs, {
    emptyLabel: labels.editorEmpty,
    conditionsLabel: labels.editorConditions
  });
  const activeCount = countActiveCriteria(filter.state.children);
  return /* @__PURE__ */ jsx11(
    Modal,
    {
      open,
      onClose,
      title: labels.editorTitle,
      footer: /* @__PURE__ */ jsxs7("div", { className: "flex w-full items-center justify-between gap-2", children: [
        onRemove ? /* @__PURE__ */ jsx11(Button, { variant: "danger", size: "sm", onClick: onRemove, children: labels.editorDelete }) : /* @__PURE__ */ jsx11("span", {}),
        /* @__PURE__ */ jsx11(Button, { variant: "primary", size: "sm", onClick: onClose, children: labels.editorDone })
      ] }),
      children: /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-4 min-w-[40rem] max-w-[60rem]", children: [
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx11("label", { htmlFor: "filter-name", className: "text-xs text-muted-foreground", children: labels.editorName }),
          /* @__PURE__ */ jsx11(
            Input,
            {
              id: "filter-name",
              value: filter.name,
              onChange: (e) => setName(e.target.value),
              placeholder: autoSummary
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx11(Text, { size: "sm", weight: "medium", children: labels.editorConditions(activeCount) }),
          /* @__PURE__ */ jsx11(
            FilterNodeList,
            {
              nodes: filter.state.children,
              logic: filter.state.logic,
              fieldConfigs,
              defaultType: resolvedDefaultType,
              labels,
              onSetState: setState,
              parentPath: []
            }
          )
        ] })
      ] })
    }
  );
}

// src/design-system/components/filters/FilterBar.tsx
import * as React7 from "react";
import { Fragment as Fragment2, jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function FilterBar({
  filters,
  onChange,
  fieldConfigs,
  defaultType,
  systemBadges = [],
  labels: labelsProp,
  sectionAriaLabel = "Filters"
}) {
  var _a;
  const labels = resolveFilterBarLabels(labelsProp);
  const [editingId, setEditingId] = React7.useState(null);
  const editing = (_a = filters.find((f) => f.id === editingId)) != null ? _a : null;
  const updateFilter = (next) => {
    onChange(filters.map((f) => f.id === next.id ? next : f));
  };
  const removeFilter = (id) => {
    onChange(filters.filter((f) => f.id !== id));
    if (editingId === id) setEditingId(null);
  };
  const addNew = () => {
    const draft = makeNamedFilter();
    onChange([...filters, draft]);
    setEditingId(draft.id);
  };
  const closeEditor = () => {
    if (editing && editing.state.children.length === 0 && !editing.name) {
      removeFilter(editing.id);
      return;
    }
    setEditingId(null);
  };
  const labelFor = (f) => f.name || summarizeFilter(f.state, fieldConfigs, { emptyLabel: labels.emptyLabel });
  return /* @__PURE__ */ jsxs8(Fragment2, { children: [
    /* @__PURE__ */ jsxs8("div", { className: "flex flex-wrap items-center gap-2", "aria-label": sectionAriaLabel, children: [
      systemBadges.map((b) => /* @__PURE__ */ jsx12(
        FilterBadge,
        {
          label: b.label,
          active: b.active,
          onToggle: b.onToggle,
          toggleAriaLabel: b.active ? labels.disable : labels.enable
        },
        b.id
      )),
      filters.map((f) => /* @__PURE__ */ jsx12(
        FilterBadge,
        {
          label: labelFor(f),
          active: f.enabled,
          removable: true,
          onToggle: () => updateFilter({ ...f, enabled: !f.enabled }),
          onEdit: () => setEditingId(f.id),
          onRemove: () => removeFilter(f.id),
          toggleAriaLabel: f.enabled ? labels.disable : labels.enable,
          editAriaLabel: labels.edit,
          removeAriaLabel: labels.remove
        },
        f.id
      )),
      /* @__PURE__ */ jsx12(
        FilterBadge,
        {
          variant: "add",
          label: `+ ${labels.addFilter}`,
          active: false,
          onToggle: addNew,
          toggleAriaLabel: labels.addFilter
        }
      )
    ] }),
    /* @__PURE__ */ jsx12(
      FilterEditor,
      {
        open: editingId != null,
        filter: editing,
        fieldConfigs,
        defaultType,
        labels,
        onChange: updateFilter,
        onClose: closeEditor,
        onRemove: editing ? () => removeFilter(editing.id) : void 0
      }
    )
  ] });
}

// src/design-system/components/DateTimeInput.tsx
import * as React8 from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
var DateTimeInput = React8.forwardRef(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx13(
      "input",
      {
        ref,
        type: "datetime-local",
        className: composedClassName,
        "data-size": size,
        "aria-invalid": invalid || void 0,
        ...rest
      }
    );
  }
);
DateTimeInput.displayName = "DateTimeInput";

// src/design-system/components/DateTimeModalInput.tsx
import * as React9 from "react";

// src/design-system/components/Dialog.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
function Dialog(props) {
  return /* @__PURE__ */ jsx14(Modal, { ...props });
}

// src/design-system/components/DateTimeModalInput.tsx
import { Fragment as Fragment3, jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
function DateTimeModalInput({
  label,
  value,
  onSave,
  displayValue,
  emptyLabel = "Datum setzen",
  size = "md",
  disabled,
  saving,
  saveLabel = "Speichern",
  cancelLabel = "Abbrechen",
  triggerProps
}) {
  const isDisabled = disabled || saving;
  const [open, setOpen] = React9.useState(false);
  const [draft, setDraft] = React9.useState(value);
  const draftRef = React9.useRef(value);
  const inputRef = React9.useRef(null);
  const inputId = React9.useId();
  React9.useEffect(() => {
    if (open) {
      setDraft(value);
      draftRef.current = value;
    }
  }, [open, value]);
  const handleOpen = () => {
    if (isDisabled) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    var _a, _b;
    const liveValue = (_b = (_a = inputRef.current) == null ? void 0 : _a.value) != null ? _b : draftRef.current;
    onSave(liveValue);
    setOpen(false);
  };
  const triggerLabel = (displayValue && displayValue.trim().length > 0 ? displayValue : "") || emptyLabel;
  return /* @__PURE__ */ jsxs9(Fragment3, { children: [
    /* @__PURE__ */ jsx15(
      Button,
      {
        size,
        variant: "ghost",
        onClick: handleOpen,
        "aria-label": label,
        disabled: isDisabled,
        ...triggerProps,
        children: triggerLabel
      }
    ),
    /* @__PURE__ */ jsx15(
      Dialog,
      {
        open,
        onClose: handleClose,
        title: label,
        footer: /* @__PURE__ */ jsxs9("div", { style: { display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ jsx15(Button, { variant: "ghost", onClick: handleClose, disabled: saving, children: cancelLabel }),
          /* @__PURE__ */ jsx15(Button, { onClick: handleSave, disabled: saving, children: saveLabel })
        ] }),
        children: /* @__PURE__ */ jsx15("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-xs)" }, children: /* @__PURE__ */ jsx15(
          DateTimeInput,
          {
            id: inputId,
            size,
            value: draft,
            ref: inputRef,
            onChange: (event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            },
            onInput: (event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            },
            disabled: disabled || saving,
            "aria-label": label,
            autoFocus: true
          }
        ) })
      }
    )
  ] });
}

// src/design-system/components/Select.tsx
import * as React10 from "react";
import { jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
function textFromNode(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (React10.isValidElement(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}
function selectValueToString(value) {
  if (Array.isArray(value)) return value[0] == null ? void 0 : String(value[0]);
  return value == null ? void 0 : String(value);
}
function selectedOptionLabel(children, value) {
  var _a;
  const options = React10.Children.toArray(children).filter(
    (child) => React10.isValidElement(child)
  );
  const selectedValue = selectValueToString(value);
  const selected = selectedValue == null ? (_a = options.find((option) => option.props.selected)) != null ? _a : options[0] : options.find((option) => {
    var _a2;
    const optionText = textFromNode(option.props.children);
    return String((_a2 = option.props.value) != null ? _a2 : optionText) === selectedValue;
  });
  return selected ? textFromNode(selected.props.children).trim() : "";
}
var Select = React10.forwardRef(
  ({
    size = "md",
    variant = "default",
    children,
    className,
    style,
    value,
    defaultValue,
    onChange,
    ...rest
  }, ref) => {
    var _a;
    const [uncontrolledValue, setUncontrolledValue] = React10.useState(defaultValue);
    const classNames = (_a = className == null ? void 0 : className.split(" ").filter(Boolean)) != null ? _a : [];
    const isIconSelect = classNames.includes("ds-Select--icon");
    const withChevron = isIconSelect || variant === "plain";
    const currentValue = value !== void 0 ? value : uncontrolledValue;
    const plainLabel = variant === "plain" ? selectedOptionLabel(children, currentValue) : "";
    const handleChange = (event) => {
      if (value === void 0) setUncontrolledValue(event.currentTarget.value);
      onChange == null ? void 0 : onChange(event);
    };
    return /* @__PURE__ */ jsxs10("div", { className: "ds-SelectWrap", "data-variant": variant, children: [
      variant === "plain" ? /* @__PURE__ */ jsx16("span", { className: "ds-SelectPlainSizer", "aria-hidden": true, children: plainLabel || "\xA0" }) : null,
      /* @__PURE__ */ jsx16(
        "select",
        {
          ref,
          className: ["ds-Select", className].filter(Boolean).join(" "),
          "data-size": size,
          "data-variant": variant,
          value,
          defaultValue,
          onChange: handleChange,
          style: {
            ...style,
            ...withChevron ? { backgroundImage: "none", appearance: "none", WebkitAppearance: "none" } : null
          },
          ...rest,
          children
        }
      ),
      withChevron && /* @__PURE__ */ jsx16("span", { className: "ds-SelectChevron", "aria-hidden": true, children: /* @__PURE__ */ jsx16("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx16("path", { d: "M6 8l4 4 4-4" }) }) })
    ] });
  }
);
Select.displayName = "Select";
var SelectOption = (props) => /* @__PURE__ */ jsx16("option", { ...props });

// src/design-system/components/SelectMenu.tsx
import * as React11 from "react";
import { jsx as jsx17, jsxs as jsxs11 } from "react/jsx-runtime";
function SelectMenu({
  options,
  value,
  onValueChange,
  ariaLabel = "Open menu",
  align = "right",
  label,
  className
}) {
  const [open, setOpen] = React11.useState(false);
  const rootRef = React11.useRef(null);
  React11.useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current || !event.target) return;
      if (!rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  return /* @__PURE__ */ jsxs11("div", { ref: rootRef, className: ["ds-SelectMenu", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs11(
      "button",
      {
        type: "button",
        className: "ds-SelectMenuTrigger",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-label": ariaLabel,
        onClick: () => setOpen((prev) => !prev),
        children: [
          label && /* @__PURE__ */ jsx17("span", { className: "ds-SelectMenuLabel", children: label }),
          /* @__PURE__ */ jsx17("span", { className: "ds-SelectMenuChevron", "aria-hidden": true, children: /* @__PURE__ */ jsx17("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx17("path", { d: "M6 8l4 4 4-4" }) }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx17("div", { className: "ds-SelectMenuContent", role: "listbox", "data-align": align, children: options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ jsx17(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": selected,
          className: "ds-SelectMenuOption",
          disabled: option.disabled,
          onClick: () => {
            if (option.disabled) return;
            onValueChange == null ? void 0 : onValueChange(option.value);
            setOpen(false);
          },
          children: /* @__PURE__ */ jsx17("span", { className: "ds-SelectMenuOptionLabel", children: option.label })
        },
        option.value
      );
    }) })
  ] });
}

// src/design-system/components/Table.tsx
import * as React12 from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
function cx(base, className) {
  return className ? `${base} ${className}` : base;
}
function withSticky(base, sticky) {
  if (!sticky) return base;
  const suffix = sticky === "start" ? "Start" : "End";
  return `${base} ds-TableSticky ds-TableSticky${suffix}`;
}
var TableContainer = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("div", { ref, className: cx("ds-TableContainer", className), ...rest });
});
TableContainer.displayName = "TableContainer";
var Table = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("table", { ref, className: cx("ds-Table", className), ...rest });
});
Table.displayName = "Table";
var TableHeader = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("thead", { ref, className: cx("ds-TableHeader", className), ...rest });
});
TableHeader.displayName = "TableHeader";
var TableBody = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("tbody", { ref, className: cx("ds-TableBody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("tfoot", { ref, className: cx("ds-TableFooter", className), ...rest });
});
TableFooter.displayName = "TableFooter";
var TableRow = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("tr", { ref, className: cx("ds-TableRow", className), ...rest });
});
TableRow.displayName = "TableRow";
var TableHead = React12.forwardRef(
  ({ className, sticky, ...rest }, ref) => {
    return /* @__PURE__ */ jsx18("th", { ref, className: cx(withSticky("ds-TableHead", sticky), className), ...rest });
  }
);
TableHead.displayName = "TableHead";
var TableCell = React12.forwardRef(
  ({ className, sticky, ...rest }, ref) => {
    return /* @__PURE__ */ jsx18("td", { ref, className: cx(withSticky("ds-TableCell", sticky), className), ...rest });
  }
);
TableCell.displayName = "TableCell";
var TableCaption = React12.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx18("caption", { ref, className: cx("ds-TableCaption", className), ...rest });
});
TableCaption.displayName = "TableCaption";

// src/design-system/components/MatrixTable.tsx
import * as React13 from "react";
import { createPortal } from "react-dom";
import { ChevronDown as ChevronDown2, ListTree } from "lucide-react";
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
function cx2(base, className) {
  return className ? `${base} ${className}` : base;
}
var MatrixTableShell = React13.forwardRef(
  ({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("div", { ref, className: cx2("ds-MatrixTableShell", className), ...rest })
);
MatrixTableShell.displayName = "MatrixTableShell";
var MatrixTableToolbar = React13.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("div", { ref, className: cx2("ds-MatrixTableToolbar", className), ...rest }));
MatrixTableToolbar.displayName = "MatrixTableToolbar";
function MatrixViewControl({
  className,
  label,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxs12("div", { className: cx2("ds-MatrixViewControl", className), ...rest, children: [
    /* @__PURE__ */ jsx19("span", { className: "ds-MatrixViewControlLabel", children: label }),
    /* @__PURE__ */ jsx19("div", { className: "ds-MatrixViewControlInput", children })
  ] });
}
var MatrixTableContainer = React13.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("div", { ref, className: cx2("ds-MatrixTableContainer", className), ...rest }));
MatrixTableContainer.displayName = "MatrixTableContainer";
var MatrixTable = React13.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("table", { ref, className: cx2("ds-MatrixTable", className), ...rest }));
MatrixTable.displayName = "MatrixTable";
var MatrixTableHeader = React13.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("thead", { ref, className: cx2("ds-MatrixTableHeader", className), ...rest }));
MatrixTableHeader.displayName = "MatrixTableHeader";
var MatrixTableBody = React13.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("tbody", { ref, className: cx2("ds-MatrixTableBody", className), ...rest }));
MatrixTableBody.displayName = "MatrixTableBody";
var MatrixTableRow = React13.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx19("tr", { ref, className: cx2("ds-MatrixTableRow", className), ...rest }));
MatrixTableRow.displayName = "MatrixTableRow";
var MatrixTableHead = React13.forwardRef(
  ({ className, columnRole = "dimension", depth, align = "left", separator, ...rest }, ref) => /* @__PURE__ */ jsx19(
    "th",
    {
      ref,
      className: cx2("ds-MatrixTableHead", className),
      "data-column-role": columnRole,
      "data-depth": depth,
      "data-align": align,
      "data-separator": separator ? "true" : void 0,
      ...rest
    }
  )
);
MatrixTableHead.displayName = "MatrixTableHead";
var MatrixTableCell = React13.forwardRef(
  ({
    className,
    columnRole = "dimension",
    depth,
    align = "left",
    separator,
    repeated,
    ...rest
  }, ref) => /* @__PURE__ */ jsx19(
    "td",
    {
      ref,
      className: cx2("ds-MatrixTableCell", className),
      "data-column-role": columnRole,
      "data-depth": depth,
      "data-align": align,
      "data-separator": separator ? "true" : void 0,
      "data-repeated": repeated ? "true" : void 0,
      ...rest
    }
  )
);
MatrixTableCell.displayName = "MatrixTableCell";
function MatrixColumnLabel({
  className,
  depth,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx19(
    "div",
    {
      className: cx2("ds-MatrixColumnLabel", className),
      "data-depth": depth,
      ...rest,
      children: /* @__PURE__ */ jsx19("span", { className: "ds-MatrixColumnLabelText", children })
    }
  );
}
function MatrixTableAction({
  as,
  icon,
  label,
  className,
  ...rest
}) {
  const Comp = as != null ? as : "button";
  return /* @__PURE__ */ jsxs12(Comp, { className: cx2("ds-MatrixTableAction", className), ...rest, children: [
    /* @__PURE__ */ jsx19("span", { className: "ds-MatrixTableActionIcon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ jsx19("span", { className: "ds-SrOnly", children: label })
  ] });
}
function MatrixDrilldownMenu({
  options,
  onValueChange,
  label,
  ariaLabel,
  align = "right",
  disabled,
  className
}) {
  const [open, setOpen] = React13.useState(false);
  const rootRef = React13.useRef(null);
  const contentRef = React13.useRef(null);
  const [pos, setPos] = React13.useState(null);
  const isDisabled = disabled || options.length === 0;
  React13.useEffect(() => {
    if (!open || !rootRef.current) {
      setPos(null);
      return;
    }
    const updatePosition = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        left: align === "right" ? rect.right : rect.left
      });
    };
    updatePosition();
    const onPointerDown = (event) => {
      var _a;
      if (!rootRef.current || !event.target) return;
      const target = event.target;
      if (!rootRef.current.contains(target) && !((_a = contentRef.current) == null ? void 0 : _a.contains(target))) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, open]);
  return /* @__PURE__ */ jsxs12("div", { ref: rootRef, className: cx2("ds-MatrixDrilldownMenu", className), children: [
    /* @__PURE__ */ jsxs12(
      "button",
      {
        type: "button",
        className: "ds-MatrixDrilldownTrigger",
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-label": ariaLabel,
        disabled: isDisabled,
        "data-open": open ? "true" : void 0,
        onClick: () => {
          if (!isDisabled) setOpen((prev) => !prev);
        },
        children: [
          /* @__PURE__ */ jsx19(ListTree, { "aria-hidden": true, focusable: false, className: "ds-MatrixDrilldownPrimaryIcon" }),
          /* @__PURE__ */ jsx19("span", { className: "ds-MatrixDrilldownLabel", children: label }),
          /* @__PURE__ */ jsx19(ChevronDown2, { "aria-hidden": true, focusable: false, className: "ds-MatrixDrilldownChevron" })
        ]
      }
    ),
    open && !isDisabled && pos ? createPortal(
      /* @__PURE__ */ jsx19(
        "div",
        {
          ref: contentRef,
          className: "ds-MatrixDrilldownContent ds-MatrixDrilldownContent--portal",
          role: "menu",
          "data-align": align,
          style: {
            top: pos.top,
            left: pos.left
          },
          children: options.map((option) => /* @__PURE__ */ jsx19(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "ds-MatrixDrilldownOption",
              disabled: option.disabled,
              onClick: () => {
                if (option.disabled) return;
                onValueChange == null ? void 0 : onValueChange(option.value);
                setOpen(false);
              },
              children: option.label
            },
            option.value
          ))
        }
      ),
      document.body
    ) : null
  ] });
}
function MatrixDrilldownPath({
  items,
  resetLabel,
  onReset,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxs12("div", { className: cx2("ds-MatrixDrilldownPath", className), ...rest, children: [
    /* @__PURE__ */ jsx19("button", { type: "button", className: "ds-MatrixDrilldownPathReset", onClick: onReset, children: resetLabel }),
    items.map((item) => /* @__PURE__ */ jsxs12("span", { className: "ds-MatrixDrilldownPathItem", children: [
      /* @__PURE__ */ jsx19("span", { className: "ds-MatrixDrilldownPathLabel", children: item.label }),
      /* @__PURE__ */ jsx19("span", { className: "ds-MatrixDrilldownPathValue", children: item.value })
    ] }, item.id))
  ] });
}

// src/design-system/components/Tabs.tsx
import * as React14 from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var TabsCtx = React14.createContext(null);
function TabsRoot({ value, defaultValue, onValueChange, children, ...rest }) {
  const [internal, setInternal] = React14.useState(defaultValue || "");
  const isControlled = value !== void 0;
  const current = isControlled ? value : internal;
  const set = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange == null ? void 0 : onValueChange(v);
  };
  return /* @__PURE__ */ jsx20(TabsCtx.Provider, { value: { value: current, onChange: set }, children: /* @__PURE__ */ jsx20("div", { className: "ds-Tabs", ...rest, children }) });
}
function TabsList({ children, ...rest }) {
  return /* @__PURE__ */ jsx20("div", { className: "ds-TabsList", role: "tablist", ...rest, children });
}
function TabsTrigger({ value, children, ...rest }) {
  const ctx = React14.useContext(TabsCtx);
  const selected = ctx.value === value;
  return /* @__PURE__ */ jsx20(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": selected,
      "data-state": selected ? "active" : "inactive",
      className: "ds-TabsTrigger",
      onClick: () => ctx.onChange(value),
      ...rest,
      children
    }
  );
}
function TabsContent({ value, children, ...rest }) {
  const ctx = React14.useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return /* @__PURE__ */ jsx20("div", { className: "ds-TabsContent", role: "tabpanel", ...rest, children });
}
var Tabs = Object.assign(TabsRoot, { List: TabsList, Trigger: TabsTrigger, Content: TabsContent });

// src/design-system/components/Alert.tsx
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
function Alert({ variant = "info", title, children, ...rest }) {
  return /* @__PURE__ */ jsxs13("div", { className: "ds-Alert", role: variant === "danger" ? "alert" : "status", "data-variant": variant, ...rest, children: [
    title && /* @__PURE__ */ jsx21("div", { className: "ds-AlertTitle", children: title }),
    children && /* @__PURE__ */ jsx21("div", { className: "ds-AlertDescription", children })
  ] });
}

// src/design-system/components/Tooltip.tsx
import * as React15 from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
function Tooltip({ content, children, className, style, multiline }) {
  const [open, setOpen] = React15.useState(false);
  const ref = React15.useRef(null);
  const [pos, setPos] = React15.useState(null);
  React15.useEffect(() => {
    if (!open || !ref.current) {
      setPos(null);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left + rect.width / 2
    });
  }, [open]);
  const rootClass = className ? `ds-TooltipRoot ${className}` : "ds-TooltipRoot";
  const contentClass = multiline ? "ds-TooltipContent ds-TooltipContent--portal ds-TooltipContent--multiline" : "ds-TooltipContent ds-TooltipContent--portal";
  return /* @__PURE__ */ jsxs14("div", { className: rootClass, style, ref, onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), children: [
    children,
    open && pos && createPortal2(
      /* @__PURE__ */ jsx22(
        "div",
        {
          role: "tooltip",
          className: contentClass,
          style: { top: pos.top, left: pos.left },
          children: content
        }
      ),
      document.body
    )
  ] });
}

// src/design-system/components/Toast.tsx
import * as React16 from "react";
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
var ToastCtx = React16.createContext(null);
function ToastProvider({ children }) {
  const [items, setItems] = React16.useState([]);
  const idRef = React16.useRef(1);
  const show = (t) => {
    const id = idRef.current++;
    setItems((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3500);
  };
  return /* @__PURE__ */ jsxs15(ToastCtx.Provider, { value: { show }, children: [
    children,
    /* @__PURE__ */ jsx23("div", { className: "ds-ToastViewport", "aria-live": "polite", "aria-atomic": "true", children: items.map((i) => /* @__PURE__ */ jsxs15("div", { className: "ds-Toast", "data-variant": i.variant || "info", children: [
      i.title && /* @__PURE__ */ jsx23("div", { className: "ds-ToastTitle", children: i.title }),
      i.description && /* @__PURE__ */ jsx23("div", { className: "ds-ToastDescription", children: i.description })
    ] }, i.id)) })
  ] });
}
function useToast() {
  const ctx = React16.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// src/design-system/components/Separator.tsx
import { jsx as jsx24 } from "react/jsx-runtime";
function Separator({ orientation = "horizontal", ...rest }) {
  return /* @__PURE__ */ jsx24("div", { role: "separator", className: "ds-Separator", "data-orientation": orientation, ...rest });
}

// src/design-system/components/Skeleton.tsx
import { jsx as jsx25 } from "react/jsx-runtime";
function Skeleton({ round, style, ...rest }) {
  return /* @__PURE__ */ jsx25("div", { className: "ds-Skeleton", style: { borderRadius: round ? "var(--radius-pill)" : void 0, ...style }, ...rest });
}

// src/design-system/components/PageHeader.tsx
import { jsx as jsx26, jsxs as jsxs16 } from "react/jsx-runtime";
function PageHeader({ title, subtitle, actions, ...rest }) {
  return /* @__PURE__ */ jsxs16("header", { className: "ds-PageHeader", ...rest, children: [
    /* @__PURE__ */ jsxs16("div", { className: "ds-PageHeaderMain", children: [
      /* @__PURE__ */ jsx26(Text, { as: "h1", size: "2xl", weight: "semibold", children: title }),
      subtitle && /* @__PURE__ */ jsx26(Text, { size: "sm", as: "p", children: subtitle })
    ] }),
    actions && /* @__PURE__ */ jsx26("div", { className: "ds-PageHeaderActions", children: actions })
  ] });
}

// src/design-system/components/ActivityCard.tsx
import { jsx as jsx27, jsxs as jsxs17 } from "react/jsx-runtime";
var ACCENT_BADGES = {
  breaking: { label: "Breaking", variant: "accent", tone: "solid" }
};
function ActivityCard({
  icon,
  title,
  titleNode,
  headline,
  competitorIcon,
  categoryLabel,
  categoryVariant = "outline",
  categoryTone = "solid",
  extraBadges,
  meta,
  description,
  media,
  timestamp,
  href,
  ariaLabel,
  hover = "glow",
  accent
}) {
  var _a, _b, _c;
  const accentBadge = accent ? ACCENT_BADGES[accent] : null;
  const effectiveLabel = (_a = accentBadge == null ? void 0 : accentBadge.label) != null ? _a : categoryLabel;
  const effectiveVariant = (_b = accentBadge == null ? void 0 : accentBadge.variant) != null ? _b : categoryVariant;
  const effectiveTone = (_c = accentBadge == null ? void 0 : accentBadge.tone) != null ? _c : categoryTone;
  const badge = effectiveLabel ? /* @__PURE__ */ jsx27(Badge, { variant: effectiveVariant, tone: effectiveTone, "aria-label": `Kategorie: ${effectiveLabel}`, children: effectiveLabel }) : null;
  const hasTitleContent = Boolean(titleNode || title);
  return /* @__PURE__ */ jsxs17(
    Card,
    {
      variant: "gradient",
      hover,
      style: { position: "relative", padding: "var(--space-lg)" },
      "data-clickable": href ? "true" : "false",
      "data-accent": accent || void 0,
      role: "article",
      "aria-label": ariaLabel || headline || title,
      className: "ds-ActivityCard",
      children: [
        /* @__PURE__ */ jsxs17("div", { className: "ds-ActivityCard-layout", children: [
          /* @__PURE__ */ jsxs17("div", { className: "ds-ActivityCard-topline", children: [
            icon && /* @__PURE__ */ jsx27("div", { "aria-hidden": true, style: { display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: icon }),
            hasTitleContent && /* @__PURE__ */ jsx27(
              "div",
              {
                style: {
                  minWidth: 0,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  ...titleNode ? { position: "relative", zIndex: href ? 2 : 0 } : void 0
                },
                children: titleNode || /* @__PURE__ */ jsx27(Text, { as: "span", size: "xs", tone: "muted", children: title })
              }
            ),
            badge,
            extraBadges
          ] }),
          /* @__PURE__ */ jsxs17("div", { className: "ds-ActivityCard-content", "data-has-media": media ? "true" : "false", children: [
            /* @__PURE__ */ jsxs17("div", { className: "ds-ActivityCard-textcol", children: [
              headline && /* @__PURE__ */ jsx27("div", { className: "ds-ActivityCard-headline", children: /* @__PURE__ */ jsx27(Text, { as: "span", size: "sm", weight: "medium", children: headline }) }),
              description && /* @__PURE__ */ jsx27("div", { className: "ds-ActivityCard-description", style: { overflowWrap: "anywhere", wordBreak: "break-word" }, children: /* @__PURE__ */ jsx27(Text, { as: "div", size: "sm", tone: "muted", children: description }) }),
              timestamp && /* @__PURE__ */ jsx27("div", { className: "ds-ActivityCard-timestamp", children: /* @__PURE__ */ jsx27(Text, { as: "span", size: "xs", tone: "muted", children: timestamp }) })
            ] }),
            media && /* @__PURE__ */ jsx27("div", { className: "ds-ActivityCard-media", children: media })
          ] })
        ] }),
        href && /* @__PURE__ */ jsx27(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": ariaLabel || headline || title,
            style: { position: "absolute", inset: 0, zIndex: 1 }
          }
        )
      ]
    }
  );
}

// src/design-system/components/EntityListRow.tsx
import { Fragment as Fragment4, jsx as jsx28, jsxs as jsxs18 } from "react/jsx-runtime";
function getGridTemplate(columns) {
  const columnTemplate = columns.length ? columns.map((column) => {
    var _a;
    return (_a = column.width) != null ? _a : "minmax(7rem, 1fr)";
  }).join(" ") : "minmax(0, 1fr)";
  return `${columnTemplate} 2rem`;
}
function getGridStyle(columns, style) {
  return {
    "--ds-EntityList-grid-template": getGridTemplate(columns),
    ...style
  };
}
function EntityListHeader({
  columns,
  sortKey,
  sortDirection = "asc",
  onSortChange,
  className,
  style,
  ...rest
}) {
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      role: "row",
      className: ["ds-EntityListHeader", className].filter(Boolean).join(" "),
      style: getGridStyle(columns, style),
      ...rest,
      children: [
        columns.map((column) => {
          var _a, _b;
          const isActive = sortKey === column.key;
          const ariaSort = isActive ? sortDirection === "asc" ? "ascending" : "descending" : "none";
          return /* @__PURE__ */ jsx28(
            "div",
            {
              role: "columnheader",
              "aria-sort": ariaSort,
              className: "ds-EntityListHeader-cell",
              "data-align": (_a = column.align) != null ? _a : "start",
              style: { "--ds-EntityListHeader-cell-offset": (_b = column.headerOffset) != null ? _b : "0px" },
              children: column.sortable && onSortChange ? /* @__PURE__ */ jsxs18(
                "button",
                {
                  type: "button",
                  className: "ds-EntityListHeader-sortButton",
                  "data-active": isActive ? "true" : "false",
                  onClick: () => onSortChange(column.key),
                  children: [
                    /* @__PURE__ */ jsx28("span", { children: column.label }),
                    isActive && /* @__PURE__ */ jsx28("span", { "aria-hidden": "true", className: "ds-EntityListHeader-sortIcon", children: sortDirection === "asc" ? "\u2191" : "\u2193" })
                  ]
                }
              ) : /* @__PURE__ */ jsx28(Text, { as: "span", size: "sm", tone: "muted", weight: "medium", children: column.label })
            },
            column.key
          );
        }),
        /* @__PURE__ */ jsx28("div", { "aria-hidden": "true", className: "ds-EntityListHeader-trailing" })
      ]
    }
  );
}
function EntityListRow({
  columns,
  icon,
  title,
  cells = [],
  trailingIcon,
  ariaLabel,
  href,
  renderLink,
  className,
  style,
  ...rest
}) {
  var _a, _b;
  const content = /* @__PURE__ */ jsxs18(Fragment4, { children: [
    /* @__PURE__ */ jsxs18("div", { className: "ds-EntityListRow-cell ds-EntityListRow-primary", "data-align": (_b = (_a = columns[0]) == null ? void 0 : _a.align) != null ? _b : "start", children: [
      icon && /* @__PURE__ */ jsx28("div", { className: "ds-EntityListRow-icon", children: icon }),
      /* @__PURE__ */ jsx28("div", { className: "ds-EntityListRow-mainContent", children: /* @__PURE__ */ jsx28(Text, { as: "span", size: "md", weight: "semibold", className: "ds-EntityListRow-title", children: title }) })
    ] }),
    columns.slice(1).map((column, index) => {
      var _a2, _b2;
      return /* @__PURE__ */ jsx28(
        "div",
        {
          className: "ds-EntityListRow-cell",
          "data-align": (_a2 = column.align) != null ? _a2 : "start",
          "data-secondary": "true",
          children: /* @__PURE__ */ jsx28("div", { className: "ds-EntityListRow-cellContent", children: (_b2 = cells[index]) != null ? _b2 : null })
        },
        column.key
      );
    }),
    /* @__PURE__ */ jsx28("div", { className: "ds-EntityListRow-trailing", "aria-hidden": "true", children: trailingIcon })
  ] });
  const main = /* @__PURE__ */ jsx28(Fragment4, { children: href ? /* @__PURE__ */ jsx28("a", { href, className: "ds-EntityListRow-link", "aria-label": ariaLabel, children: content }) : renderLink ? renderLink(content, "ds-EntityListRow-link") : /* @__PURE__ */ jsx28("div", { className: "ds-EntityListRow-static", children: content }) });
  return /* @__PURE__ */ jsx28(
    "div",
    {
      ...rest,
      className: ["ds-EntityListRow", className].filter(Boolean).join(" "),
      "data-clickable": href || renderLink ? "true" : "false",
      style: getGridStyle(columns, style),
      children: main
    }
  );
}

// src/design-system/components/RichText.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
function RichText({ as, children, ...rest }) {
  const Comp = as || "div";
  return /* @__PURE__ */ jsx29(Comp, { className: "ds-RichText", ...rest, children });
}

// src/design-system/components/DevButton.tsx
import { jsx as jsx30, jsxs as jsxs19 } from "react/jsx-runtime";
function DevButton({
  children,
  type = "button",
  ...rest
}) {
  return /* @__PURE__ */ jsxs19(
    "button",
    {
      type,
      className: "ds-DevButton",
      ...rest,
      children: [
        /* @__PURE__ */ jsx30("span", { "aria-hidden": true, children: "[" }),
        /* @__PURE__ */ jsx30("span", { className: "ds-DevButtonLabel", children }),
        /* @__PURE__ */ jsx30("span", { "aria-hidden": true, children: "]" })
      ]
    }
  );
}

// src/design-system/components/TagField.tsx
import * as React17 from "react";
import { jsx as jsx31, jsxs as jsxs20 } from "react/jsx-runtime";
function Tag({ children, onRemove, removeAriaLabel }) {
  return /* @__PURE__ */ jsxs20("span", { className: "ds-Tag", children: [
    /* @__PURE__ */ jsx31("span", { className: "ds-TagLabel", children }),
    onRemove && /* @__PURE__ */ jsx31(
      "button",
      {
        type: "button",
        className: "ds-TagRemove",
        onClick: onRemove,
        "aria-label": removeAriaLabel != null ? removeAriaLabel : `Remove ${String(children)}`,
        children: "\xD7"
      }
    )
  ] });
}
function TagList({ tags, onRemove, emptyLabel }) {
  if (tags.length === 0 && emptyLabel) {
    return /* @__PURE__ */ jsx31("div", { className: "ds-TagListEmpty", children: emptyLabel });
  }
  return /* @__PURE__ */ jsx31("div", { className: "ds-TagList", children: tags.map((tag, index) => /* @__PURE__ */ jsx31(
    Tag,
    {
      onRemove: onRemove ? () => onRemove(tag, index) : void 0,
      children: tag
    },
    `${tag}-${index}`
  )) });
}
function TagField({
  label,
  values,
  onChange,
  description,
  error,
  placeholder,
  disabled,
  addOnBlur = true,
  ariaLabel
}) {
  const inputId = React17.useId();
  const descriptionId = description ? `${inputId}-desc` : void 0;
  const errorId = error ? `${inputId}-err` : void 0;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  const [inputValue, setInputValue] = React17.useState("");
  const addTag = React17.useCallback(
    (raw) => {
      if (disabled) return;
      const next = raw.trim();
      if (!next) return;
      if (values.includes(next)) {
        setInputValue("");
        return;
      }
      onChange([...values, next]);
      setInputValue("");
    },
    [disabled, onChange, values]
  );
  const removeTag = React17.useCallback(
    (index) => {
      if (disabled) return;
      const next = values.filter((_, idx) => idx !== index);
      onChange(next);
    },
    [disabled, onChange, values]
  );
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (event.key !== "Tab") {
        event.preventDefault();
      }
      addTag(inputValue);
      return;
    }
    if (event.key === "Backspace" && !inputValue && values.length > 0) {
      event.preventDefault();
      removeTag(values.length - 1);
    }
  };
  const handleBlur = () => {
    if (addOnBlur) {
      addTag(inputValue);
    }
  };
  return /* @__PURE__ */ jsxs20("div", { className: "ds-TagField", children: [
    /* @__PURE__ */ jsx31("label", { className: "ds-TagFieldLabel", htmlFor: inputId, children: label }),
    /* @__PURE__ */ jsxs20(
      "div",
      {
        className: "ds-TagFieldControl",
        "data-disabled": disabled ? "true" : "false",
        "data-invalid": error ? "true" : "false",
        children: [
          /* @__PURE__ */ jsx31(
            TagList,
            {
              tags: values,
              onRemove: disabled ? void 0 : (_, index) => removeTag(index)
            }
          ),
          /* @__PURE__ */ jsx31(
            "input",
            {
              id: inputId,
              "aria-label": ariaLabel != null ? ariaLabel : label,
              className: "ds-TagInput",
              value: inputValue,
              onChange: (event) => setInputValue(event.currentTarget.value),
              onKeyDown: handleKeyDown,
              onBlur: handleBlur,
              placeholder: values.length === 0 ? placeholder : void 0,
              "aria-invalid": error ? "true" : void 0,
              "aria-describedby": describedBy,
              disabled
            }
          )
        ]
      }
    ),
    description && /* @__PURE__ */ jsx31("div", { id: descriptionId, className: "ds-TagFieldDescription", children: description }),
    error && /* @__PURE__ */ jsx31("div", { id: errorId, className: "ds-TagFieldError", role: "alert", children: error })
  ] });
}

// src/design-system/components/BarChart.tsx
import * as React18 from "react";
import {
  ResponsiveContainer,
  BarChart as RCBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as Tooltip2
} from "recharts";

// src/design-system/components/Heading.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
function Heading({ level = 2, className, children, ...rest }) {
  const Comp = `h${level}`;
  const cn = ["ds-Heading", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx32(Comp, { className: cn, "data-level": level, ...rest, children });
}

// src/design-system/components/BarChart.tsx
import { jsx as jsx33, jsxs as jsxs21 } from "react/jsx-runtime";
var VARIANT_CYCLE = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral"
];
var VARIANT_COLORS = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 90%, transparent)"
};
var getVariantColor = (variant = "primary") => {
  var _a;
  return (_a = VARIANT_COLORS[variant]) != null ? _a : VARIANT_COLORS.primary;
};
var isGroupedPoint = (point) => "groups" in point;
var ChartTooltip = ({
  active,
  payload,
  label,
  groups,
  valueFormatter,
  tooltipFilter
}) => {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  if (tooltipFilter && !tooltipFilter(String(label))) return null;
  const detail = (_b = (_a = payload[0]) == null ? void 0 : _a.payload) == null ? void 0 : _b.detail;
  const entries = payload.filter((item) => typeof item.value === "number" && item.value > 0).map((item) => {
    var _a2, _b2;
    const meta = groups.find((group) => group.id === item.dataKey);
    return {
      id: item.dataKey,
      label: (_a2 = meta == null ? void 0 : meta.label) != null ? _a2 : String(item.dataKey),
      value: Number(item.value),
      variant: (_b2 = meta == null ? void 0 : meta.variant) != null ? _b2 : "primary"
    };
  });
  if (entries.length === 0) return null;
  return /* @__PURE__ */ jsxs21("div", { className: "ds-BarChartTooltip", children: [
    /* @__PURE__ */ jsx33("div", { className: "ds-BarChartTooltipLabel", children: label }),
    detail && /* @__PURE__ */ jsx33("div", { className: "ds-BarChartTooltipDetail", children: detail }),
    /* @__PURE__ */ jsx33("ul", { className: "ds-BarChartTooltipList", children: entries.map((entry) => /* @__PURE__ */ jsxs21("li", { className: "ds-BarChartTooltipItem", children: [
      /* @__PURE__ */ jsx33("span", { className: "ds-BarChartLegendSwatch", "data-variant": entry.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx33("span", { className: "ds-BarChartTooltipName", children: entry.label }),
      /* @__PURE__ */ jsx33("span", { className: "ds-BarChartTooltipValue", children: valueFormatter(entry.value) })
    ] }, `${entry.id}-${entry.label}`)) })
  ] });
};
var FilteredCursor = (props) => {
  var _a;
  const { tooltipFilter, x, y, width, height, payload } = props;
  const label = (_a = payload == null ? void 0 : payload[0]) == null ? void 0 : _a.payload;
  const labelStr = label == null ? void 0 : label.label;
  if (!labelStr || !tooltipFilter(labelStr)) return null;
  return /* @__PURE__ */ jsx33(
    "rect",
    {
      x,
      y,
      width,
      height,
      fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)"
    }
  );
};
function BarChart({
  data,
  ariaLabel,
  xAxisLabel,
  yAxisLabel,
  valueFormatter = (value) => `${value}`,
  groups: providedGroups,
  tooltipFilter
}) {
  const hasGroupedData = data.length > 0 && data.every(isGroupedPoint);
  const derivedGroupOrder = React18.useMemo(() => {
    if (!hasGroupedData) return [];
    const seen = /* @__PURE__ */ new Set();
    const order = [];
    for (const point of data) {
      if (!isGroupedPoint(point)) continue;
      for (const group of point.groups) {
        if (!seen.has(group.id)) {
          seen.add(group.id);
          order.push(group.id);
        }
      }
    }
    return order;
  }, [data, hasGroupedData, providedGroups]);
  const resolvedGroups = React18.useMemo(() => {
    var _a;
    if (hasGroupedData && derivedGroupOrder.length === 0) return [];
    const metaById = new Map(providedGroups == null ? void 0 : providedGroups.map((group) => [group.id, group]));
    if (hasGroupedData) {
      return derivedGroupOrder.map((id, index) => {
        var _a2, _b, _c;
        const meta = metaById.get(id);
        const variant = (_a2 = meta == null ? void 0 : meta.variant) != null ? _a2 : VARIANT_CYCLE[index % VARIANT_CYCLE.length];
        return {
          id,
          label: (_b = meta == null ? void 0 : meta.label) != null ? _b : id,
          variant,
          tintIndex: (_c = meta == null ? void 0 : meta.tintIndex) != null ? _c : 0
        };
      });
    }
    const fallback = (_a = providedGroups == null ? void 0 : providedGroups[0]) != null ? _a : {
      id: "default",
      label: "Value",
      variant: "primary",
      tintIndex: 0
    };
    return [fallback];
  }, [derivedGroupOrder, hasGroupedData, providedGroups]);
  const normalizedData = React18.useMemo(() => {
    if (data.length === 0) return [];
    if (!hasGroupedData) {
      return data.map((point) => {
        var _a, _b, _c, _d, _e, _f;
        return {
          label: point.label,
          detail: "detail" in point ? point.detail : void 0,
          bars: [
            {
              id: (_b = (_a = resolvedGroups[0]) == null ? void 0 : _a.id) != null ? _b : "default",
              value: "value" in point ? point.value : 0,
              detail: "detail" in point ? point.detail : void 0,
              variant: (_d = (_c = resolvedGroups[0]) == null ? void 0 : _c.variant) != null ? _d : "primary",
              tintIndex: (_f = (_e = resolvedGroups[0]) == null ? void 0 : _e.tintIndex) != null ? _f : 0
            }
          ]
        };
      });
    }
    const groupedData = data.filter(isGroupedPoint);
    return groupedData.map((point) => ({
      label: point.label,
      detail: point.detail,
      bars: resolvedGroups.map((group) => {
        var _a, _b;
        const match = point.groups.find((item) => item.id === group.id);
        return {
          id: group.id,
          value: (_a = match == null ? void 0 : match.value) != null ? _a : 0,
          detail: (_b = match == null ? void 0 : match.detail) != null ? _b : point.detail,
          variant: group.variant
        };
      })
    }));
  }, [data, resolvedGroups, hasGroupedData]);
  const chartData = React18.useMemo(
    () => normalizedData.map((point) => {
      const entry = {
        label: point.label,
        detail: point.detail
      };
      point.bars.forEach((bar) => {
        entry[bar.id] = bar.value;
      });
      return entry;
    }),
    [normalizedData]
  );
  const axisTickStyle = {
    fill: "hsl(var(--muted-foreground))",
    fontSize: 12
  };
  return /* @__PURE__ */ jsxs21("figure", { className: "ds-BarChart", role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs21("div", { className: "ds-BarChartGrid", children: [
      yAxisLabel && /* @__PURE__ */ jsx33(Heading, { level: 3, "aria-hidden": true, children: yAxisLabel }),
      /* @__PURE__ */ jsx33("div", { className: "ds-BarChartChart", children: /* @__PURE__ */ jsx33(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs21(RCBarChart, { data: chartData, margin: { top: 24, right: 16, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsx33(
          XAxis,
          {
            dataKey: "label",
            tick: axisTickStyle,
            tickLine: { stroke: "var(--color-border-default)" },
            axisLine: { stroke: "var(--color-border-default)" },
            interval: 0
          }
        ),
        /* @__PURE__ */ jsx33(
          YAxis,
          {
            tick: axisTickStyle,
            tickLine: { stroke: "var(--color-border-default)" },
            axisLine: { stroke: "var(--color-border-default)" },
            allowDecimals: false,
            width: 44
          }
        ),
        /* @__PURE__ */ jsx33(
          Tooltip2,
          {
            cursor: tooltipFilter ? /* @__PURE__ */ jsx33(FilteredCursor, { tooltipFilter }) : { fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)" },
            content: /* @__PURE__ */ jsx33(ChartTooltip, { groups: resolvedGroups, valueFormatter, tooltipFilter })
          }
        ),
        resolvedGroups.map((group, index) => {
          var _a;
          return /* @__PURE__ */ jsx33(
            Bar,
            {
              dataKey: group.id,
              stackId: "jobs",
              fill: getVariantColor((_a = group.variant) != null ? _a : "primary"),
              isAnimationActive: false,
              radius: index === resolvedGroups.length - 1 ? [8, 8, 0, 0] : 0,
              maxBarSize: 48
            },
            group.id
          );
        })
      ] }) }) }),
      xAxisLabel && /* @__PURE__ */ jsx33("div", { className: "ds-BarChartAxisCaption", "aria-hidden": true, children: xAxisLabel })
    ] }),
    /* @__PURE__ */ jsx33("dl", { className: "ds-BarChartTable", children: normalizedData.map(
      (point, pointIndex) => point.bars.map((bar, barIndex) => {
        var _a;
        const groupMeta = resolvedGroups.find((group) => group.id === bar.id);
        return /* @__PURE__ */ jsxs21("div", { className: "ds-BarChartTableRow", children: [
          /* @__PURE__ */ jsx33("dt", { children: `${point.label} \u2013 ${(_a = groupMeta == null ? void 0 : groupMeta.label) != null ? _a : bar.id}` }),
          /* @__PURE__ */ jsx33("dd", { children: valueFormatter(bar.value) })
        ] }, `table-${point.label}-${bar.id}-${pointIndex}-${barIndex}`);
      })
    ) })
  ] });
}

// src/design-system/components/PieChart.tsx
import * as React19 from "react";
import {
  ResponsiveContainer as ResponsiveContainer2,
  PieChart as RCPieChart,
  Pie,
  Cell,
  Tooltip as Tooltip3
} from "recharts";
import { jsx as jsx34, jsxs as jsxs22 } from "react/jsx-runtime";
var VARIANT_CYCLE2 = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral"
];
var VARIANT_COLORS2 = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 90%, transparent)"
};
var getVariantColor2 = (variant = "primary") => {
  var _a;
  return (_a = VARIANT_COLORS2[variant]) != null ? _a : VARIANT_COLORS2.primary;
};
var ChartTooltip2 = ({
  active,
  payload,
  valueFormatter
}) => {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const entries = payload.filter((item) => typeof item.value === "number").map((item) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return {
      id: String((_d = (_c = (_b2 = (_a2 = item.payload) == null ? void 0 : _a2.id) != null ? _b2 : item.dataKey) != null ? _c : item.name) != null ? _d : "slice"),
      label: String((_h = (_g = (_f = (_e = item.payload) == null ? void 0 : _e.label) != null ? _f : item.name) != null ? _g : item.dataKey) != null ? _h : "Slice"),
      value: Number((_i = item.value) != null ? _i : 0),
      variant: (_k = (_j = item.payload) == null ? void 0 : _j.variant) != null ? _k : "primary",
      detail: (_l = item.payload) == null ? void 0 : _l.detail
    };
  }).filter((entry) => entry.value > 0);
  if (entries.length === 0) return null;
  return /* @__PURE__ */ jsxs22("div", { className: "ds-PieChartTooltip", children: [
    /* @__PURE__ */ jsx34("div", { className: "ds-PieChartTooltipLabel", children: (_a = entries[0]) == null ? void 0 : _a.label }),
    ((_b = entries[0]) == null ? void 0 : _b.detail) && /* @__PURE__ */ jsx34("div", { className: "ds-PieChartTooltipDetail", children: entries[0].detail }),
    /* @__PURE__ */ jsx34("ul", { className: "ds-PieChartTooltipList", children: entries.map((entry) => /* @__PURE__ */ jsxs22("li", { className: "ds-PieChartTooltipItem", children: [
      /* @__PURE__ */ jsx34("span", { className: "ds-PieChartLegendSwatch", "data-variant": entry.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx34("span", { className: "ds-PieChartTooltipName", children: entry.label }),
      /* @__PURE__ */ jsx34("span", { className: "ds-PieChartTooltipValue", children: valueFormatter(entry.value) })
    ] }, `${entry.id}-${entry.label}`)) })
  ] });
};
var normalizeSlices = (data) => {
  return data.map((slice, index) => {
    var _a;
    return {
      ...slice,
      variant: (_a = slice.variant) != null ? _a : VARIANT_CYCLE2[index % VARIANT_CYCLE2.length]
    };
  });
};
function PieChart({
  data,
  ariaLabel,
  valueFormatter = (value) => `${value}`,
  centerLabel,
  showLegend = true,
  variant = "default"
}) {
  const slices = React19.useMemo(() => normalizeSlices(data), [data]);
  const total = React19.useMemo(
    () => slices.reduce((sum, slice) => sum + Math.max(0, slice.value), 0),
    [slices]
  );
  if (slices.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs22("figure", { className: "ds-PieChart", role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs22("div", { className: variant === "plain" ? "ds-PieChartChart ds-PieChartChart--plain" : "ds-PieChartChart", children: [
      /* @__PURE__ */ jsx34(ResponsiveContainer2, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs22(RCPieChart, { children: [
        /* @__PURE__ */ jsx34(
          Pie,
          {
            data: slices,
            dataKey: "value",
            nameKey: "label",
            innerRadius: "55%",
            outerRadius: "85%",
            stroke: "var(--color-border-default)",
            strokeWidth: 1,
            paddingAngle: 1,
            isAnimationActive: false,
            children: slices.map((slice) => /* @__PURE__ */ jsx34(Cell, { fill: getVariantColor2(slice.variant) }, slice.id))
          }
        ),
        /* @__PURE__ */ jsx34(
          Tooltip3,
          {
            cursor: { fill: "transparent" },
            wrapperStyle: { outline: "none" },
            content: /* @__PURE__ */ jsx34(ChartTooltip2, { valueFormatter })
          }
        )
      ] }) }),
      centerLabel && /* @__PURE__ */ jsxs22("div", { className: "ds-PieChartCenter", children: [
        /* @__PURE__ */ jsx34("div", { className: "ds-PieChartCenterValue", children: centerLabel.value }),
        centerLabel.description && /* @__PURE__ */ jsx34("div", { className: "ds-PieChartCenterDescription", children: centerLabel.description })
      ] }),
      !centerLabel && /* @__PURE__ */ jsxs22("div", { className: "ds-PieChartCenter", children: [
        /* @__PURE__ */ jsx34("div", { className: "ds-PieChartCenterValue", children: valueFormatter(total) }),
        /* @__PURE__ */ jsx34("div", { className: "ds-PieChartCenterDescription", children: "Total" })
      ] })
    ] }),
    showLegend && /* @__PURE__ */ jsx34("ul", { className: "ds-PieChartLegend", role: "list", children: slices.map((slice) => /* @__PURE__ */ jsxs22("li", { className: "ds-PieChartLegendItem", children: [
      /* @__PURE__ */ jsx34("span", { className: "ds-PieChartLegendSwatch", "data-variant": slice.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx34("span", { className: "ds-PieChartLegendLabel", children: slice.label }),
      /* @__PURE__ */ jsx34("span", { className: "ds-PieChartLegendValue", children: valueFormatter(slice.value) })
    ] }, `legend-${slice.id}`)) }),
    /* @__PURE__ */ jsxs22("dl", { className: "ds-PieChartTable", children: [
      slices.map((slice) => /* @__PURE__ */ jsxs22("div", { className: "ds-PieChartTableRow", children: [
        /* @__PURE__ */ jsx34("dt", { children: slice.label }),
        /* @__PURE__ */ jsx34("dd", { children: valueFormatter(slice.value) })
      ] }, `table-${slice.id}`)),
      /* @__PURE__ */ jsxs22("div", { className: "ds-PieChartTableRow", children: [
        /* @__PURE__ */ jsx34("dt", { children: "Total" }),
        /* @__PURE__ */ jsx34("dd", { children: valueFormatter(total) })
      ] })
    ] })
  ] });
}

// src/design-system/components/TabNav.tsx
import * as React20 from "react";
import { jsx as jsx35, jsxs as jsxs23 } from "react/jsx-runtime";
function TabNav({ items, value, onValueChange, ariaLabel, className, style }) {
  const listRef = React20.useRef(null);
  React20.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () => {
      const nav = el.closest(".ds-TabNav");
      if (!nav) return;
      const triggers = el.querySelectorAll(".ds-TabNavTrigger");
      const tabCount = triggers.length;
      const containerWidth = el.clientWidth;
      triggers.forEach((t) => {
        t.style.minWidth = "";
        t.style.maxWidth = "";
      });
      if (el.scrollWidth > containerWidth && tabCount > 1) {
        const gap = parseFloat(getComputedStyle(el).gap) || 8;
        const visibleFull = Math.min(tabCount - 1, containerWidth < 360 ? 2 : 3);
        const w = Math.floor((containerWidth - visibleFull * gap) / (visibleFull + 0.35));
        triggers.forEach((t) => {
          t.style.minWidth = `${w}px`;
          t.style.maxWidth = `${w}px`;
        });
      }
      requestAnimationFrame(() => {
        nav.toggleAttribute("data-scroll-start", el.scrollLeft > 2);
        nav.toggleAttribute("data-scroll-end", el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsx35("nav", { className: ["ds-TabNav", className].filter(Boolean).join(" "), "aria-label": ariaLabel, style, children: /* @__PURE__ */ jsx35("ul", { className: "ds-TabNavList", role: "tablist", ref: listRef, children: items.map((item) => {
    const active = item.value === value;
    return /* @__PURE__ */ jsx35("li", { className: "ds-TabNavItem", children: /* @__PURE__ */ jsxs23(
      "button",
      {
        type: "button",
        className: "ds-TabNavTrigger",
        role: "tab",
        "aria-selected": active,
        "data-state": active ? "active" : "inactive",
        onClick: () => onValueChange == null ? void 0 : onValueChange(item.value),
        children: [
          /* @__PURE__ */ jsx35("span", { className: "ds-TabNavLabel", children: item.label }),
          item.description && /* @__PURE__ */ jsx35("span", { className: "ds-TabNavDescription", children: item.description }),
          item.badge && /* @__PURE__ */ jsx35("span", { className: "ds-TabNavBadge", children: item.badge })
        ]
      }
    ) }, item.value);
  }) }) });
}

// src/design-system/components/ActionIconButton.tsx
import { Eye, Trash2, Save, Pencil, Loader2 as Loader22, Power, Star } from "lucide-react";
import { jsx as jsx36 } from "react/jsx-runtime";
var actionMeta = {
  view: { label: "Ansehen", Icon: Eye },
  delete: { label: "L\xF6schen", Icon: Trash2 },
  save: { label: "Speichern", Icon: Save },
  edit: { label: "Editieren", Icon: Pencil },
  deactivate: { label: "Deaktivieren", Icon: Power },
  star: { label: "Stern setzen", Icon: Star }
};
function ActionIconButton({
  action,
  loading = false,
  selected = false,
  "aria-label": ariaLabel,
  title,
  ...rest
}) {
  const { Icon, label } = actionMeta[action];
  const resolvedLabel = ariaLabel != null ? ariaLabel : label;
  return /* @__PURE__ */ jsx36(
    "button",
    {
      type: "button",
      "data-action": action,
      "data-selected": selected ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      className: "ds-ActionIconButton",
      "aria-label": resolvedLabel,
      "aria-busy": loading || void 0,
      title: title != null ? title : label,
      ...rest,
      children: loading ? /* @__PURE__ */ jsx36(Loader22, { "aria-hidden": true, focusable: false, className: "ds-ActionIconButtonSpinner" }) : /* @__PURE__ */ jsx36(Icon, { "aria-hidden": true, focusable: false })
    }
  );
}

// src/design-system/components/InlineEditButton.tsx
import { Pencil as Pencil2 } from "lucide-react";
import { jsx as jsx37 } from "react/jsx-runtime";
function InlineEditButton({
  "aria-label": ariaLabel,
  title,
  ...rest
}) {
  return /* @__PURE__ */ jsx37(
    "button",
    {
      type: "button",
      className: "ds-InlineEditButton",
      "aria-label": ariaLabel != null ? ariaLabel : "Bearbeiten",
      title: title != null ? title : "Bearbeiten",
      ...rest,
      children: /* @__PURE__ */ jsx37(Pencil2, { "aria-hidden": true, focusable: false })
    }
  );
}

// src/design-system/components/Navigation.tsx
import * as React21 from "react";
import { Fragment as Fragment5, jsx as jsx38, jsxs as jsxs24 } from "react/jsx-runtime";
function Navigation({
  items,
  value,
  onValueChange,
  ariaLabel,
  orientation = "vertical",
  className,
  style
}) {
  const handleSelect = React21.useCallback(
    (item) => {
      var _a;
      if (item.disabled) return;
      (_a = item.onSelect) == null ? void 0 : _a.call(item, item.value);
      onValueChange == null ? void 0 : onValueChange(item.value);
    },
    [onValueChange]
  );
  return /* @__PURE__ */ jsx38(
    "nav",
    {
      className: ["ds-Navigation", className].filter(Boolean).join(" "),
      "aria-label": ariaLabel,
      "data-orientation": orientation,
      style,
      children: /* @__PURE__ */ jsx38("ul", { className: "ds-NavigationList", children: items.map((item) => {
        const active = item.value === value;
        const content = /* @__PURE__ */ jsxs24(Fragment5, { children: [
          item.icon && /* @__PURE__ */ jsx38("span", { className: "ds-NavigationIcon", "aria-hidden": true, children: item.icon }),
          /* @__PURE__ */ jsxs24("span", { className: "ds-NavigationText", children: [
            /* @__PURE__ */ jsx38("span", { className: "ds-NavigationLabel", children: item.label }),
            item.description && /* @__PURE__ */ jsx38("span", { className: "ds-NavigationDescription", children: item.description })
          ] }),
          item.badge && /* @__PURE__ */ jsx38("span", { className: "ds-NavigationBadge", children: item.badge })
        ] });
        return /* @__PURE__ */ jsx38("li", { className: "ds-NavigationItem", children: item.href ? /* @__PURE__ */ jsx38(
          "a",
          {
            href: item.href,
            className: "ds-NavigationLink",
            "data-state": active ? "active" : "inactive",
            "aria-current": active ? "page" : void 0,
            "aria-disabled": item.disabled || void 0,
            onClick: (event) => {
              if (item.disabled) {
                event.preventDefault();
                return;
              }
              handleSelect(item);
            },
            children: content
          }
        ) : /* @__PURE__ */ jsx38(
          "button",
          {
            type: "button",
            className: "ds-NavigationLink",
            "data-state": active ? "active" : "inactive",
            "aria-current": active ? "page" : void 0,
            disabled: item.disabled,
            onClick: () => handleSelect(item),
            children: content
          }
        ) }, item.value);
      }) })
    }
  );
}

// src/design-system/components/NavigationBar.tsx
import { Fragment as Fragment6, jsx as jsx39, jsxs as jsxs25 } from "react/jsx-runtime";
function NavigationBar({
  title,
  subtitle,
  brand,
  brandAccessory,
  leading,
  actions,
  leadingPosition = "left",
  className,
  ...rest
}) {
  const showLeadingLeft = leading && leadingPosition === "left";
  const showLeadingRight = leading && leadingPosition === "right";
  return /* @__PURE__ */ jsxs25("header", { className: ["ds-NavigationBar", className].filter(Boolean).join(" "), ...rest, children: [
    showLeadingLeft && /* @__PURE__ */ jsx39("div", { className: "ds-NavigationBarLeading", children: leading }),
    /* @__PURE__ */ jsx39("div", { className: "ds-NavigationBarBrand", children: brand ? /* @__PURE__ */ jsxs25(Fragment6, { children: [
      /* @__PURE__ */ jsxs25("div", { className: "ds-NavigationBarBrandContent", children: [
        brand,
        brandAccessory && /* @__PURE__ */ jsx39("div", { className: "ds-NavigationBarBrandAccessory", children: brandAccessory })
      ] }),
      subtitle && /* @__PURE__ */ jsx39(Text, { size: "xs", tone: "muted", children: subtitle })
    ] }) : /* @__PURE__ */ jsxs25(Fragment6, { children: [
      title != null && /* @__PURE__ */ jsx39(Text, { as: "div", weight: "semibold", children: title }),
      subtitle && /* @__PURE__ */ jsx39(Text, { size: "xs", tone: "muted", children: subtitle })
    ] }) }),
    actions && /* @__PURE__ */ jsx39("div", { className: "ds-NavigationBarActions", children: actions }),
    showLeadingRight && /* @__PURE__ */ jsx39("div", { className: "ds-NavigationBarLeading", children: leading })
  ] });
}

// src/design-system/components/NavigationBrand.tsx
import { Fragment as Fragment7, jsx as jsx40, jsxs as jsxs26 } from "react/jsx-runtime";
function NavigationBrand({ href, logo, label, className, ...rest }) {
  const content = /* @__PURE__ */ jsxs26(Fragment7, { children: [
    logo && /* @__PURE__ */ jsx40("span", { className: "ds-NavigationBrandLogo", "aria-hidden": true, children: logo }),
    label && /* @__PURE__ */ jsx40("span", { className: "ds-NavigationBrandLabel", children: label })
  ] });
  return /* @__PURE__ */ jsx40("div", { className: ["ds-NavigationBrand", className].filter(Boolean).join(" "), ...rest, children: href ? /* @__PURE__ */ jsx40("a", { className: "ds-NavigationBrandLink", href, children: content }) : /* @__PURE__ */ jsx40("div", { className: "ds-NavigationBrandLink", children: content }) });
}

// src/design-system/components/NavigationToggle.tsx
import { jsx as jsx41, jsxs as jsxs27 } from "react/jsx-runtime";
function NavigationToggle({ ariaLabel = "Toggle navigation", icon, ...rest }) {
  return /* @__PURE__ */ jsx41("button", { type: "button", className: "ds-NavigationToggle", "aria-label": ariaLabel, ...rest, children: /* @__PURE__ */ jsx41("span", { className: "ds-NavigationToggleIcon", "aria-hidden": true, children: icon != null ? icon : /* @__PURE__ */ jsxs27("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx41("path", { d: "M4 7h16" }),
    /* @__PURE__ */ jsx41("path", { d: "M4 12h16" }),
    /* @__PURE__ */ jsx41("path", { d: "M4 17h16" })
  ] }) }) });
}

// src/design-system/components/Logo.tsx
import { useId as useId4 } from "react";
import { jsx as jsx42, jsxs as jsxs28 } from "react/jsx-runtime";
function LogoSvg({ uid, variant, sizeStyle, className, ...rest }) {
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  const shared = { xmlns: "http://www.w3.org/2000/svg", className: cls, "data-variant": variant, role: "img", "aria-label": "12signals", style: sizeStyle, ...rest };
  switch (variant) {
    case "inverted":
      return /* @__PURE__ */ jsxs28("svg", { viewBox: "-9 -9 117 117", ...shared, children: [
        /* @__PURE__ */ jsxs28("defs", { children: [
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-bg`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-inv-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsx42("stop", { offset: "50%", stopColor: "white", stopOpacity: "0.55" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.3" })
          ] }),
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-inv-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.75" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.4" })
          ] }),
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-inv-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.85" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx42("rect", { x: "-9", y: "-9", width: "117", height: "117", rx: "26", ry: "26", fill: `url(#${uid}-bg)` }),
        /* @__PURE__ */ jsx42("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-inv-arc)`, strokeWidth: "5.5", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx42("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-inv-ring)` }),
        /* @__PURE__ */ jsxs28("mask", { id: `${uid}-inv-needle`, children: [
          /* @__PURE__ */ jsx42("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: "white", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx42("circle", { cx: "50", cy: "50", r: "7", fill: "white" })
        ] }),
        /* @__PURE__ */ jsx42("rect", { x: "0", y: "0", width: "100", height: "100", fill: `url(#${uid}-inv-main)`, mask: `url(#${uid}-inv-needle)` }),
        /* @__PURE__ */ jsx42("circle", { cx: "67.0", cy: "20.5", r: "2.8", fill: "white", opacity: "0.8" }),
        /* @__PURE__ */ jsx42("circle", { cx: "77.8", cy: "30.5", r: "2.8", fill: "white", opacity: "0.7" }),
        /* @__PURE__ */ jsx42("circle", { cx: "83.5", cy: "44.1", r: "2.8", fill: "white", opacity: "0.65" }),
        /* @__PURE__ */ jsx42("circle", { cx: "82.8", cy: "58.8", r: "2.8", fill: "white", opacity: "0.5" }),
        /* @__PURE__ */ jsx42("circle", { cx: "76.0", cy: "71.8", r: "2.8", fill: "white", opacity: "0.4" }),
        /* @__PURE__ */ jsx42("circle", { cx: "64.3", cy: "80.8", r: "2.8", fill: "white", opacity: "0.35" })
      ] });
    case "monochrome":
      return /* @__PURE__ */ jsxs28("svg", { viewBox: "8 10 82 80", ...shared, children: [
        /* @__PURE__ */ jsx42("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: "#1A1C1E", strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx42("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: "#1A1C1E" }),
        /* @__PURE__ */ jsx42("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: "#1A1C1E", strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx42("circle", { cx: "50", cy: "50", r: "7", fill: "#1A1C1E" }),
        /* @__PURE__ */ jsx42("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#333333" }),
        /* @__PURE__ */ jsx42("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#555555" }),
        /* @__PURE__ */ jsx42("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#777777" }),
        /* @__PURE__ */ jsx42("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#999999" }),
        /* @__PURE__ */ jsx42("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#BBBBBB" }),
        /* @__PURE__ */ jsx42("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#DDDDDD" })
      ] });
    // "default" = V2 Gradient Flow
    default:
      return /* @__PURE__ */ jsxs28("svg", { viewBox: "8 10 82 80", ...shared, children: [
        /* @__PURE__ */ jsxs28("defs", { children: [
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx42("stop", { offset: "50%", stopColor: "#7D3BA3" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs28("linearGradient", { id: `${uid}-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx42("stop", { offset: "0%", stopColor: "#5C2580" }),
            /* @__PURE__ */ jsx42("stop", { offset: "100%", stopColor: "#C835A5" })
          ] })
        ] }),
        /* @__PURE__ */ jsx42("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-arc)`, strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx42("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-ring)` }),
        /* @__PURE__ */ jsx42("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: `url(#${uid}-main)`, strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx42("circle", { cx: "50", cy: "50", r: "7", fill: `url(#${uid}-main)` }),
        /* @__PURE__ */ jsx42("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#441B67" }),
        /* @__PURE__ */ jsx42("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#5C2580" }),
        /* @__PURE__ */ jsx42("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#7D3BA3" }),
        /* @__PURE__ */ jsx42("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#A832A8" }),
        /* @__PURE__ */ jsx42("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#C835A5" }),
        /* @__PURE__ */ jsx42("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#E838A2" })
      ] });
  }
}
function Logo({ variant = "default", size = 36, sprite, className, style, ...rest }) {
  const reactId = useId4();
  const uid = reactId.replace(/:/g, "");
  const sizeStyle = { width: size, height: size, ...style };
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  if (sprite) {
    return /* @__PURE__ */ jsx42(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: cls,
        "data-variant": variant,
        role: "img",
        "aria-label": "12signals",
        style: sizeStyle,
        ...rest,
        children: /* @__PURE__ */ jsx42("use", { href: `${sprite}#logo-${variant}`, width: "100%", height: "100%" })
      }
    );
  }
  return /* @__PURE__ */ jsx42(LogoSvg, { uid, variant, sizeStyle, className, ...rest });
}
var LOGO_VARIANTS = [
  { value: "default", label: "Gradient Flow" },
  { value: "inverted", label: "Inverted" },
  { value: "monochrome", label: "Monochrome" }
];

// src/design-system/components/Wordmark.tsx
import { useId as useId5 } from "react";
import { jsx as jsx43, jsxs as jsxs29 } from "react/jsx-runtime";
function Wordmark({ height = 36, className, sprite, style, ...rest }) {
  const reactId = useId5();
  const uid = reactId.replace(/:/g, "");
  const cls = ["ds-Wordmark", className].filter(Boolean).join(" ");
  if (sprite) {
    return /* @__PURE__ */ jsx43(
      "svg",
      {
        viewBox: "0 0 396 100",
        xmlns: "http://www.w3.org/2000/svg",
        className: cls,
        role: "img",
        "aria-label": "12signals",
        style: { height, width: "auto", ...style },
        ...rest,
        children: /* @__PURE__ */ jsx43("use", { href: `${sprite}#wordmark`, width: "396", height: "100" })
      }
    );
  }
  return /* @__PURE__ */ jsxs29(
    "svg",
    {
      viewBox: "0 0 396 100",
      xmlns: "http://www.w3.org/2000/svg",
      className: cls,
      role: "img",
      "aria-label": "12signals",
      style: { height, width: "auto", ...style },
      ...rest,
      children: [
        /* @__PURE__ */ jsxs29("defs", { children: [
          /* @__PURE__ */ jsxs29("linearGradient", { id: `${uid}-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx43("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx43("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs29("linearGradient", { id: `${uid}-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx43("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx43("stop", { offset: "50%", stopColor: "#7D3BA3" }),
            /* @__PURE__ */ jsx43("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs29("linearGradient", { id: `${uid}-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx43("stop", { offset: "0%", stopColor: "#5C2580" }),
            /* @__PURE__ */ jsx43("stop", { offset: "100%", stopColor: "#C835A5" })
          ] })
        ] }),
        /* @__PURE__ */ jsx43("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-arc)`, strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx43("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-ring)` }),
        /* @__PURE__ */ jsx43("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: `url(#${uid}-main)`, strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx43("circle", { cx: "50", cy: "50", r: "7", fill: `url(#${uid}-main)` }),
        /* @__PURE__ */ jsx43("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#441B67" }),
        /* @__PURE__ */ jsx43("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#5C2580" }),
        /* @__PURE__ */ jsx43("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#7D3BA3" }),
        /* @__PURE__ */ jsx43("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#A832A8" }),
        /* @__PURE__ */ jsx43("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#C835A5" }),
        /* @__PURE__ */ jsx43("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#E838A2" }),
        /* @__PURE__ */ jsxs29("g", { style: { fill: "hsl(var(--primary))" }, children: [
          /* @__PURE__ */ jsx43("path", { d: "M192 0H288V700H213L33 525V405L192 559Z", transform: "translate(105.00,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M50 0H523V90H162L349 263C430 338 513 412 513 523C513 643 412 710 292 710C158 710 58 625 57 491H157C157 568 210 625 287 625H297C363 625 415 584 415 518C415 432 338 380 276 321L50 106Z", transform: "translate(130.90,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M242 -10C358 -10 439 50 439 140C439 230 377 271 301 286L222 302C172 312 152 331 152 366C152 401 187 430 243 430H251C316 430 344 390 349 345H444C444 440 377 510 246 510C146 510 57 456 57 356C57 271 122 229 203 213L276 199C326 189 344 167 344 135C344 95 303 70 251 70H243C184 70 137 95 132 155H37C37 60 109 -10 242 -10Z", transform: "translate(170.38,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M75 0H170V500H75ZM70 590H175V700H70Z", transform: "translate(203.84,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M268 -220C423 -220 513 -125 513 0V500H418V430C398 470 343 510 268 510C150 510 46 430 46 255C46 80 153 0 268 0C343 0 393 40 418 80V10C418 -95 358 -140 273 -140H263C195 -140 141 -115 131 -65H36C46 -155 128 -220 268 -220ZM141 255C141 380 206 430 277 430H285C354 430 418 365 418 255C418 145 349 80 280 80H272C201 80 141 130 141 255Z", transform: "translate(220.29,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M75 0H170V280C170 375 235 430 306 430H314C385 430 415 385 415 315V0H510V335C510 440 445 510 330 510C250 510 200 475 170 430V500H75Z", transform: "translate(260.75,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M210 -10C290 -10 350 35 370 80C370 75 370 25 375 0H465C460 35 460 80 460 110V320C460 422 390 510 257 510C144 510 61 447 55 355H150C156 405 201 430 253 430H261C325 430 365 390 365 320V304L227 293C146 286 45 252 45 138C45 53 115 -10 210 -10ZM140 142C140 188 182 216 240 221L365 231V180C365 120 290 70 229 70H221C174 70 140 101 140 142Z", transform: "translate(300.65,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M75 0H170V700H75Z", transform: "translate(337.05,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx43("path", { d: "M242 -10C358 -10 439 50 439 140C439 230 377 271 301 286L222 302C172 312 152 331 152 366C152 401 187 430 243 430H251C316 430 344 390 349 345H444C444 440 377 510 246 510C146 510 57 456 57 356C57 271 122 229 203 213L276 199C326 189 344 167 344 135C344 95 303 70 251 70H243C184 70 137 95 132 155H37C37 60 109 -10 242 -10Z", transform: "translate(353.50,74.50) scale(0.070000,-0.070000)" })
        ] })
      ]
    }
  );
}

// src/design-system/components/Breadcrumb.tsx
import { jsx as jsx44, jsxs as jsxs30 } from "react/jsx-runtime";
function Breadcrumb({ items, renderLink, className, style }) {
  return /* @__PURE__ */ jsx44(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: ["ds-Breadcrumb", className].filter(Boolean).join(" "),
      style,
      children: /* @__PURE__ */ jsx44("ol", { className: "ds-BreadcrumbList", children: items.map((item, i) => {
        const isLast = i === items.length - 1;
        return /* @__PURE__ */ jsxs30("li", { className: "ds-BreadcrumbItem", children: [
          item.href && !isLast ? renderLink ? /* @__PURE__ */ jsx44("span", { className: "ds-BreadcrumbLink", children: renderLink(item.href, item.label) }) : /* @__PURE__ */ jsx44("a", { className: "ds-BreadcrumbLink", href: item.href, children: item.label }) : /* @__PURE__ */ jsx44("span", { className: "ds-BreadcrumbCurrent", "aria-current": isLast ? "page" : void 0, children: item.label }),
          !isLast && /* @__PURE__ */ jsx44("span", { className: "ds-BreadcrumbSeparator", "aria-hidden": "true", children: "/" })
        ] }, i);
      }) })
    }
  );
}

// src/design-system/tokens/index.ts
var tokens = {
  color: {
    primary: { bg: "var(--color-primary-bg)", fg: "var(--color-primary-fg)" },
    neutral: { bg: "var(--color-neutral-bg)", fg: "var(--color-neutral-fg)" },
    danger: { bg: "var(--color-danger-bg)", fg: "var(--color-danger-fg)" },
    success: { bg: "var(--color-success-bg)", fg: "var(--color-success-fg)" },
    warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning-fg)" },
    accent: { bg: "var(--color-accent-bg)", fg: "var(--color-accent-fg)" },
    secondary: { bg: "var(--color-secondary-bg)", fg: "var(--color-secondary-fg)" },
    border: { default: "var(--color-border-default)" }
  },
  space: { xs: "var(--space-xs)", sm: "var(--space-sm)", md: "var(--space-md)", lg: "var(--space-lg)", xl: "var(--space-xl)" },
  radius: { sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)", pill: "var(--radius-pill)" },
  font: { base: "var(--font-base)" },
  shadow: { sm: "var(--shadow-sm)", md: "var(--shadow-md)" }
};

// src/competitor/claim-utils.ts
var AB_TEST_COLORS = [
  { bg: "hsl(var(--primary) / 0.22)", border: "hsl(var(--primary) / 0.45)" },
  { bg: "hsl(var(--accent) / 0.22)", border: "hsl(var(--accent) / 0.45)" },
  { bg: "hsl(var(--warning) / 0.22)", border: "hsl(var(--warning) / 0.45)" }
];
var claimCompareKey = (txt) => txt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
function detectABTestGroups(ranges) {
  const entries = [];
  let i = 0;
  while (i < ranges.length) {
    const firstKey = claimCompareKey(ranges[i].claim);
    let secondKey = null;
    let j = i + 1;
    while (j < ranges.length) {
      const key = claimCompareKey(ranges[j].claim);
      if (key === firstKey || key === secondKey) {
        j++;
        continue;
      }
      if (secondKey === null) {
        secondKey = key;
        j++;
        continue;
      }
      break;
    }
    const groupLen = j - i;
    if (secondKey !== null && groupLen >= 4) {
      let countA = 0;
      let countB = 0;
      for (let k = i; k < j; k++) {
        const key = claimCompareKey(ranges[k].claim);
        if (key === firstKey) countA++;
        else countB++;
      }
      if (countA >= 2 && countB >= 2) {
        const groupRanges = ranges.slice(i, j);
        const variants = [
          { key: firstKey, displayClaim: ranges[i].claim }
        ];
        for (const r of groupRanges) {
          if (claimCompareKey(r.claim) === secondKey) {
            variants.push({ key: secondKey, displayClaim: r.claim });
            break;
          }
        }
        entries.push({
          kind: "abtest",
          ranges: groupRanges,
          variants,
          from: groupRanges[0].from,
          to: groupRanges[groupRanges.length - 1].to
        });
        i = j;
        continue;
      }
    }
    entries.push({ kind: "normal", range: ranges[i] });
    i++;
  }
  return entries;
}

// src/competitor/ClaimTimeline.tsx
import { Fragment as Fragment8, jsx as jsx45, jsxs as jsxs31 } from "react/jsx-runtime";
function ClaimTimeline({
  claimRanges,
  loading = false,
  error = false,
  locale = "de-DE",
  tickInterval,
  loadingIcon
}) {
  if (loading) {
    return /* @__PURE__ */ jsxs31("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      loadingIcon,
      " Lade Positionierung\u2026"
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx45(Text, { size: "sm", className: "text-destructive", children: "Konnte Positionierung nicht laden." });
  }
  if (claimRanges.length === 0) {
    return /* @__PURE__ */ jsx45(Text, { size: "sm", tone: "muted", children: "Keine Claims gefunden." });
  }
  const ranges = [...claimRanges].sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()
  );
  const start = new Date(
    ranges.reduce(
      (min, r) => Math.min(min, new Date(r.from).getTime()),
      Infinity
    )
  );
  const end = new Date(
    ranges.reduce(
      (max, r) => {
        var _a;
        return Math.max(max, new Date((_a = r.to) != null ? _a : (/* @__PURE__ */ new Date()).toISOString()).getTime());
      },
      -Infinity
    )
  );
  const totalMs = Math.max(1, end.getTime() - start.getTime());
  const totalMonths = Math.round(totalMs / (30.44 * 864e5));
  const fmtShort = (d) => d.toLocaleDateString(locale, { month: "short", year: "2-digit" });
  const fmtFull = (d) => d.toLocaleDateString(locale);
  const percent = (dateStr) => {
    const ms = new Date(dateStr).getTime() - start.getTime();
    return Math.max(0, Math.min(100, ms / totalMs * 100));
  };
  const percentDate = (d) => {
    const ms = d.getTime() - start.getTime();
    return Math.max(0, Math.min(100, ms / totalMs * 100));
  };
  const interval = tickInterval != null ? tickInterval : totalMonths <= 6 ? 1 : totalMonths <= 12 ? 3 : totalMonths <= 24 ? 6 : 12;
  const ticks = (() => {
    const out = [];
    const startMonth = Math.ceil(start.getMonth() / interval) * interval;
    let d = new Date(start.getFullYear(), startMonth, 1);
    if (percentDate(d) < 5) {
      d = new Date(d.getFullYear(), d.getMonth() + interval, 1);
    }
    while (d <= end) {
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const y = String(d.getFullYear() % 100).padStart(2, "0");
      out.push({ left: percentDate(d), label: `${m}/${y}` });
      d = new Date(d.getFullYear(), d.getMonth() + interval, 1);
    }
    return out;
  })();
  const barStyles = (idx) => {
    const isPrimary = idx % 2 === 0;
    return {
      background: isPrimary ? "hsl(var(--tl-bar-1) / 0.18)" : "hsl(var(--tl-bar-2) / 0.18)",
      borderColor: isPrimary ? "hsl(var(--tl-bar-1) / 0.35)" : "hsl(var(--tl-bar-2) / 0.35)"
    };
  };
  const timelineEntries = detectABTestGroups(ranges);
  const entryMinHeight = (entry) => entry.kind === "abtest" ? Math.max(48, 28 + entry.variants.length * 24) : 48;
  const renderMobile = () => /* @__PURE__ */ jsx45("div", { className: "ds-claim-timeline-mobile flex flex-col gap-3", children: timelineEntries.map((entry, idx) => {
    if (entry.kind === "normal") {
      const r = entry.range;
      const left2 = percent(r.from);
      const rightPt2 = r.to ? percent(r.to) : 100;
      const width2 = Math.max(2, rightPt2 - left2);
      return /* @__PURE__ */ jsxs31("div", { className: "border-b border-border/40 pb-3 last:border-b-0 last:pb-0", children: [
        /* @__PURE__ */ jsx45("div", { className: "text-sm font-medium mb-1", children: r.claim }),
        /* @__PURE__ */ jsxs31("div", { className: "text-xs text-muted-foreground mb-2", children: [
          fmtShort(new Date(r.from)),
          " \u2013 ",
          r.to ? fmtShort(new Date(r.to)) : "today"
        ] }),
        /* @__PURE__ */ jsx45("div", { className: "relative h-5 rounded overflow-hidden", style: { background: "hsl(var(--border) / 0.3)" }, children: /* @__PURE__ */ jsx45(
          "div",
          {
            className: "absolute top-0 bottom-0 rounded border",
            style: { left: `${left2}%`, width: `${width2}%`, ...barStyles(idx) }
          }
        ) })
      ] }, idx);
    }
    const left = percent(entry.from);
    const rightPt = entry.to ? percent(entry.to) : 100;
    const width = Math.max(2, rightPt - left);
    return /* @__PURE__ */ jsxs31(
      "div",
      {
        className: "border-b border-border/40 pb-3 last:border-b-0 last:pb-0 border-l-2 pl-2",
        style: { borderLeftColor: "hsl(var(--accent) / 0.5)" },
        children: [
          /* @__PURE__ */ jsx45(Badge, { variant: "accent", tone: "subtle", size: "sm", children: "A/B Test" }),
          entry.variants.map((v, vi) => /* @__PURE__ */ jsxs31("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsx45(
              "span",
              {
                className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                style: { background: AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border }
              }
            ),
            /* @__PURE__ */ jsx45("span", { className: "text-xs text-muted-foreground", children: v.displayClaim })
          ] }, v.key)),
          /* @__PURE__ */ jsxs31("div", { className: "text-xs text-muted-foreground mt-1 mb-2", children: [
            fmtShort(new Date(entry.from)),
            " \u2013 ",
            entry.to ? fmtShort(new Date(entry.to)) : "today"
          ] }),
          /* @__PURE__ */ jsx45("div", { className: "relative h-5 rounded overflow-hidden", style: { background: "hsl(var(--border) / 0.3)" }, children: /* @__PURE__ */ jsx45(
            "div",
            {
              className: "absolute top-0 bottom-0 rounded border",
              style: {
                left: `${left}%`,
                width: `${width}%`,
                background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                borderColor: "hsl(var(--accent) / 0.45)"
              }
            }
          ) })
        ]
      },
      idx
    );
  }) });
  const lineColor = "hsl(var(--foreground) / 0.2)";
  const renderDesktop = () => /* @__PURE__ */ jsx45("div", { className: "ds-claim-timeline-desktop", style: { "--tl-line": lineColor }, children: /* @__PURE__ */ jsxs31("div", { className: "grid grid-cols-[1fr_4fr] gap-x-4 items-center", children: [
    /* @__PURE__ */ jsx45("div", {}),
    /* @__PURE__ */ jsx45("div", { className: "relative h-6 text-xs text-muted-foreground", children: ticks.map((t, i) => /* @__PURE__ */ jsx45(
      "span",
      {
        className: "absolute -translate-x-1/2 top-0 whitespace-nowrap",
        style: { left: `${t.left}%` },
        children: t.label
      },
      i
    )) }),
    /* @__PURE__ */ jsx45("div", { children: timelineEntries.map((entry, idx) => {
      const isLast = idx === timelineEntries.length - 1;
      const rowBorder = isLast ? void 0 : "1px solid var(--tl-line)";
      return entry.kind === "normal" ? /* @__PURE__ */ jsx45(
        "div",
        {
          className: "flex items-center h-12 pr-2",
          style: { borderBottom: rowBorder },
          children: /* @__PURE__ */ jsx45("div", { className: "text-sm font-medium truncate", children: entry.range.claim })
        },
        `left-${idx}`
      ) : /* @__PURE__ */ jsxs31(
        "div",
        {
          className: "flex flex-col justify-center gap-1 py-2 pr-2 border-l-2",
          style: {
            borderLeftColor: "hsl(var(--accent) / 0.5)",
            borderBottom: rowBorder,
            paddingLeft: 8,
            minHeight: entryMinHeight(entry)
          },
          children: [
            /* @__PURE__ */ jsx45(Badge, { variant: "accent", tone: "subtle", size: "sm", children: "A/B Test" }),
            entry.variants.map((v, vi) => /* @__PURE__ */ jsxs31("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx45(
                "span",
                {
                  className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                  style: {
                    "--dot-bg": AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border,
                    background: "var(--dot-bg)"
                  }
                }
              ),
              /* @__PURE__ */ jsx45("span", { className: "text-xs truncate text-muted-foreground", children: v.displayClaim })
            ] }, v.key))
          ]
        },
        `left-${idx}`
      );
    }) }),
    /* @__PURE__ */ jsxs31("div", { className: "relative", children: [
      /* @__PURE__ */ jsx45("div", { className: "absolute inset-0 pointer-events-none", children: ticks.map((t, i) => /* @__PURE__ */ jsx45(
        "div",
        {
          className: "absolute top-0 bottom-0",
          style: {
            left: `${t.left}%`,
            width: 1,
            background: "var(--tl-line)"
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsx45("div", { children: timelineEntries.map((entry, idx) => {
        const isLast = idx === timelineEntries.length - 1;
        const rowBorder = isLast ? void 0 : "1px solid var(--tl-line)";
        return entry.kind === "normal" ? (() => {
          const r = entry.range;
          const left = percent(r.from);
          const rightPoint = r.to ? percent(r.to) : 100;
          const width = Math.max(1, rightPoint - left);
          return /* @__PURE__ */ jsx45(
            "div",
            {
              className: "flex items-center h-12",
              style: { borderBottom: rowBorder },
              children: /* @__PURE__ */ jsx45("div", { className: "relative w-full h-8", children: /* @__PURE__ */ jsx45(
                "div",
                {
                  className: "absolute top-1 bottom-1 rounded border",
                  style: {
                    left: `${left}%`,
                    width: `${width}%`,
                    ...barStyles(idx)
                  },
                  title: `${r.claim} \u2014 ${r.to ? `${fmtFull(new Date(r.from))} \u2013 ${fmtFull(new Date(r.to))}` : `seit ${fmtFull(new Date(r.from))}`}`
                }
              ) })
            },
            `right-${idx}`
          );
        })() : (() => {
          const left = percent(entry.from);
          const rightPoint = entry.to ? percent(entry.to) : 100;
          const width = Math.max(1, rightPoint - left);
          const variantLabels = entry.variants.map((v) => v.displayClaim).join(" / ");
          return /* @__PURE__ */ jsx45(
            "div",
            {
              className: "flex items-center",
              style: { borderBottom: rowBorder, minHeight: entryMinHeight(entry) },
              children: /* @__PURE__ */ jsx45("div", { className: "relative w-full h-8", children: /* @__PURE__ */ jsx45(
                "div",
                {
                  className: "absolute top-1 bottom-1 rounded border",
                  style: {
                    left: `${left}%`,
                    width: `${width}%`,
                    background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                    borderColor: "hsl(var(--accent) / 0.45)"
                  },
                  title: `A/B Test: ${variantLabels} \u2014 ${entry.to ? `${fmtFull(new Date(entry.from))} \u2013 ${fmtFull(new Date(entry.to))}` : `seit ${fmtFull(new Date(entry.from))}`}`
                }
              ) })
            },
            `right-${idx}`
          );
        })();
      }) })
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs31(Fragment8, { children: [
    renderMobile(),
    renderDesktop()
  ] });
}

// src/competitor/kpi-utils.ts
function formatKpiValue(value, unit, locale = "de-DE") {
  const fmt = (opts) => new Intl.NumberFormat(locale, opts).format(value);
  const m = locale.startsWith("de") ? "Mio." : "M";
  const b = locale.startsWith("de") ? "Mrd." : "B";
  const compactCurrency = (symbol, symbolPrefix) => {
    const fmtN = (n, frac) => new Intl.NumberFormat(locale, { maximumFractionDigits: frac }).format(n);
    const wrap = (n, suffix) => symbolPrefix ? `${symbol} ${n} ${suffix}` : `${n} ${suffix} ${symbol}`;
    if (value >= 1e9) return wrap(fmtN(value / 1e9, 1), b);
    if (value >= 1e6) return wrap(fmtN(value / 1e6, 1), m);
    if (symbolPrefix) return `${symbol} ${fmtN(value, 0)}`;
    return `${fmtN(value, 0)} ${symbol}`;
  };
  const deLocale = locale.startsWith("de");
  switch (unit) {
    case "USD":
      return compactCurrency("$", !deLocale);
    case "EUR":
      return compactCurrency("\u20AC", !deLocale);
    case "USD_millions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "EUR_millions":
      return `\u20AC${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "USD_billions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "EUR_billions":
      return `\u20AC${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "CHF":
      return compactCurrency("CHF", true);
    case "CHF_millions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "CHF_billions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "percent":
      return `${fmt({ maximumFractionDigits: 1 })}%`;
    case "count":
      if (value >= 1e9) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1e9)} ${b}`;
      }
      if (value >= 1e6) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1e6)} ${m}`;
      }
      if (value >= 1e4) {
        return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(value / 1e3) * 1e3);
      }
      return fmt({ maximumFractionDigits: 0 });
    case "ratio":
    case "multiple":
      return `${fmt({ maximumFractionDigits: 1 })}x`;
    default:
      return new Intl.NumberFormat(locale).format(value);
  }
}
function qualifierPrefix(qualifier) {
  switch (qualifier) {
    case "approximately":
      return "~";
    case "over":
      return ">";
    case "under":
      return "<";
    default:
      return "";
  }
}
var REVENUE_KEYS = ["revenue_arr", "revenue_total", "revenue_mrr"];
function getRevenue(snapshot) {
  var _a;
  if (!snapshot) return null;
  for (const key of REVENUE_KEYS) {
    if ((_a = snapshot.metrics[key]) == null ? void 0 : _a.length) return { entry: snapshot.metrics[key][0], key };
  }
  return null;
}
function getEmployees(snapshot) {
  var _a, _b;
  return (_b = (_a = snapshot == null ? void 0 : snapshot.metrics["employees"]) == null ? void 0 : _a[0]) != null ? _b : null;
}
function getCustomers(snapshot) {
  var _a, _b, _c;
  if (!snapshot) return null;
  const customers = (_a = snapshot.metrics["customers_total"]) == null ? void 0 : _a[0];
  const users = (_b = snapshot.metrics["users_total"]) == null ? void 0 : _b[0];
  const enterprise = (_c = snapshot.metrics["customers_enterprise"]) == null ? void 0 : _c[0];
  if (users && customers) {
    const ratio = users.value / customers.value;
    if (users.value >= 1e6 || ratio >= 100) {
      return { entry: users, key: "users_total" };
    }
  } else if (users && !customers) {
    return { entry: users, key: "users_total" };
  }
  if (customers) return { entry: customers, key: "customers_total" };
  if (enterprise) return { entry: enterprise, key: "customers_enterprise" };
  return null;
}
function getRevenueGrowthYoY(snapshot) {
  var _a, _b;
  return (_b = (_a = snapshot == null ? void 0 : snapshot.metrics["revenue_growth_yoy"]) == null ? void 0 : _a[0]) != null ? _b : null;
}
var KPI_CATEGORIES = {
  revenue_arr: { category: "revenue", label: "ARR" },
  revenue_mrr: { category: "revenue", label: "MRR" },
  revenue_total: { category: "revenue", label: "Umsatz gesamt" },
  revenue_growth_yoy: { category: "revenue", label: "Umsatzwachstum YoY" },
  valuation: { category: "funding", label: "Bewertung" },
  funding_total: { category: "funding", label: "Funding gesamt" },
  funding_round: { category: "funding", label: "Letzte Runde" },
  funding_stage: { category: "funding", label: "Stage" },
  ebitda: { category: "profitability", label: "EBITDA" },
  net_income: { category: "profitability", label: "Nettoergebnis" },
  gross_margin: { category: "profitability", label: "Bruttomarge" },
  burn_rate: { category: "profitability", label: "Burn Rate" },
  customers_total: { category: "customers", label: "Kunden gesamt" },
  customers_enterprise: { category: "customers", label: "Enterprise-Kunden" },
  nrr: { category: "customers", label: "NRR" },
  churn_rate: { category: "customers", label: "Churn Rate" },
  market_share: { category: "customers", label: "Marktanteil" },
  nps: { category: "customers", label: "NPS" },
  users_total: { category: "users", label: "User gesamt" },
  users_paying: { category: "users", label: "Zahlende User" },
  gmv: { category: "users", label: "GMV" },
  employees: { category: "team", label: "Mitarbeiter" }
};
var CATEGORY_LABELS = {
  revenue: "Revenue",
  funding: "Funding",
  profitability: "Profitability",
  customers: "Customers",
  users: "Users",
  team: "Team"
};
function getKpiSnapshot(competitor) {
  const raw = competitor == null ? void 0 : competitor.kpi_snapshot;
  if (!raw || typeof raw !== "object" || !("metrics" in raw)) return null;
  return raw;
}

// src/competitor/job-functions.ts
var UNKNOWN_JOB_FUNCTION_CODE = "__unknown";
var JOB_FUNCTION_LABELS = {
  acct: "Accounting / Auditing",
  adm: "Administrative",
  advr: "Advertising",
  anls: "Analyst",
  art: "Art / Creative",
  bd: "Business Development",
  cnsl: "Consulting",
  cust: "Customer Service",
  dist: "Distribution",
  dsgn: "Design",
  edu: "Education",
  eng: "Engineering",
  fin: "Finance",
  genb: "General Business",
  hcpr: "HealthCare Provider",
  hr: "Human Resources",
  it: "Information Technology",
  lgl: "Legal",
  mgmt: "Management",
  mnfc: "Manufacturing",
  mrkt: "Marketing",
  othr: "Other",
  pr: "Public Relations",
  prch: "Purchasing",
  prdm: "Product Management",
  prjm: "Project Management",
  prod: "Production",
  qa: "Quality Assurance",
  rsch: "Research",
  sale: "Sales",
  sci: "Science",
  stra: "Strategy / Planning",
  supl: "Supply Chain",
  trng: "Training",
  wrt: "Writing / Editing",
  [UNKNOWN_JOB_FUNCTION_CODE]: "Unknown"
};
var JOB_FUNCTION_VARIANT_MAP = {
  mgmt: "primary",
  stra: "primary",
  genb: "primary",
  bd: "primary",
  cnsl: "primary",
  prjm: "primary",
  prdm: "primary",
  sale: "accent",
  mrkt: "accent",
  advr: "accent",
  pr: "accent",
  art: "accent",
  dsgn: "accent",
  wrt: "accent",
  anls: "success",
  eng: "success",
  it: "success",
  qa: "success",
  sci: "success",
  rsch: "success",
  supl: "warning",
  mnfc: "warning",
  prod: "warning",
  dist: "warning",
  prch: "warning",
  hr: "secondary",
  adm: "secondary",
  cust: "secondary",
  edu: "secondary",
  trng: "secondary",
  hcpr: "secondary",
  acct: "neutral",
  fin: "neutral",
  lgl: "neutral",
  othr: "neutral",
  [UNKNOWN_JOB_FUNCTION_CODE]: "neutral"
};

// src/competitor/KpiCard.tsx
import { Fragment as Fragment9, jsx as jsx46, jsxs as jsxs32 } from "react/jsx-runtime";
function KpiCard({
  icon: Icon,
  label,
  entry,
  locale = "de-DE",
  externalLinkIcon: ExternalLinkIcon,
  hidePeriod
}) {
  var _a;
  const formatted = entry ? `${qualifierPrefix(entry.qualifier)}${formatKpiValue(entry.value, entry.unit, locale)}` : null;
  return /* @__PURE__ */ jsx46(Card, { children: /* @__PURE__ */ jsxs32(Card.Content, { children: [
    /* @__PURE__ */ jsxs32("div", { className: "flex items-center gap-sm mb-sm", children: [
      /* @__PURE__ */ jsx46(Icon, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx46(Text, { size: "sm", tone: "muted", children: label })
    ] }),
    entry && formatted ? /* @__PURE__ */ jsxs32(Fragment9, { children: [
      entry.source_url ? /* @__PURE__ */ jsx46(Tooltip, { content: (_a = entry.source_title) != null ? _a : entry.source_url, children: /* @__PURE__ */ jsxs32(
        "a",
        {
          href: entry.source_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 hover:underline",
          children: [
            /* @__PURE__ */ jsx46(Text, { size: "xl", weight: "bold", children: formatted }),
            ExternalLinkIcon && /* @__PURE__ */ jsx46(ExternalLinkIcon, { className: "h-3.5 w-3.5 text-muted-foreground" })
          ]
        }
      ) }) : /* @__PURE__ */ jsx46(Text, { size: "xl", weight: "bold", children: formatted }),
      entry.period && !hidePeriod && /* @__PURE__ */ jsx46(Text, { size: "sm", tone: "muted", children: entry.period })
    ] }) : /* @__PURE__ */ jsx46(Text, { size: "xl", weight: "bold", tone: "muted", children: "?" })
  ] }) });
}

// src/competitor/CompetitorLogo.tsx
import { useEffect as useEffect9, useState as useState12 } from "react";
import { jsx as jsx47 } from "react/jsx-runtime";
var UNAVAILABLE_LOGOS_KEY = "12signals:brandfetch-unavailable-logos:v1";
var unavailableLogoUrls = null;
function getUnavailableLogoUrls() {
  if (unavailableLogoUrls) return unavailableLogoUrls;
  unavailableLogoUrls = /* @__PURE__ */ new Set();
  if (typeof window === "undefined") return unavailableLogoUrls;
  try {
    const stored = window.localStorage.getItem(UNAVAILABLE_LOGOS_KEY);
    const values = stored ? JSON.parse(stored) : [];
    if (Array.isArray(values)) {
      for (const value of values) {
        if (typeof value === "string" && value) unavailableLogoUrls.add(value);
      }
    }
  } catch {
    unavailableLogoUrls.clear();
  }
  return unavailableLogoUrls;
}
function isUnavailableLogo(src) {
  if (!src) return false;
  return getUnavailableLogoUrls().has(src);
}
function rememberUnavailableLogo(src) {
  if (!src || typeof window === "undefined") return;
  const unavailable = getUnavailableLogoUrls();
  if (unavailable.has(src)) return;
  unavailable.add(src);
  try {
    window.localStorage.setItem(UNAVAILABLE_LOGOS_KEY, JSON.stringify([...unavailable]));
  } catch {
  }
}
function CompetitorLogo({ name, domain, brandfetchClientId, size = 18, deferUnavailableCacheRead = false }) {
  const [failedSrc, setFailedSrc] = useState12(null);
  const [canReadUnavailableCache, setCanReadUnavailableCache] = useState12(!deferUnavailableCacheRead);
  const src = domain && brandfetchClientId ? `https://cdn.brandfetch.io/${domain}/fallback/404/icon.svg?c=${brandfetchClientId}` : void 0;
  const failed = failedSrc === src || canReadUnavailableCache && isUnavailableLogo(src);
  useEffect9(() => {
    if (deferUnavailableCacheRead) setCanReadUnavailableCache(true);
  }, [deferUnavailableCacheRead]);
  if (failed || !src) {
    return /* @__PURE__ */ jsx47(
      "div",
      {
        style: {
          width: size,
          height: size,
          borderRadius: "var(--radius-sm)",
          background: "hsl(var(--muted))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        },
        children: /* @__PURE__ */ jsx47(Text, { as: "span", size: "sm", weight: "medium", children: (name || "?").charAt(0).toUpperCase() })
      }
    );
  }
  return /* @__PURE__ */ jsx47(
    "img",
    {
      src,
      alt: "",
      width: size,
      height: size,
      style: { borderRadius: "var(--radius-sm)", objectFit: "contain", flexShrink: 0 },
      onError: () => {
        rememberUnavailableLogo(src);
        setFailedSrc(src != null ? src : null);
      }
    }
  );
}

// src/competitor/hiring-chart-utils.ts
var MS_IN_DAY = 864e5;
var startOfIsoWeek = (date) => {
  const result = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = result.getUTCDay() || 7;
  if (day !== 1) {
    result.setUTCDate(result.getUTCDate() - (day - 1));
  }
  return result;
};
var addDays = (date, days) => new Date(date.getTime() + days * MS_IN_DAY);
var addWeeks = (date, weeks) => addDays(date, weeks * 7);
var getIsoWeekMeta = (date) => {
  const target = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / MS_IN_DAY + 1) / 7
  );
  return { week, year: target.getUTCFullYear() };
};
function formatJobCount(value, locale = "de-DE") {
  if (locale.startsWith("de")) {
    return `${value} Stelle${value === 1 ? "" : "n"}`;
  }
  return `${value} position${value === 1 ? "" : "s"}`;
}
function buildWeeklyJobData(jobs, maxWeeks = 12, locale = "en") {
  const empty = { weeklyJobData: [], jobFunctionGroups: [] };
  const now = /* @__PURE__ */ new Date();
  const lifecycles = jobs.filter((job) => typeof job.first_detected === "string").map((job) => {
    var _a;
    const start = new Date(job.first_detected);
    const resolvedEnd = job.ended ? new Date(job.ended) : now;
    const end = resolvedEnd.getTime() < start.getTime() ? start : resolvedEnd;
    const code = (_a = job.linkedin_job_function_code) != null ? _a : UNKNOWN_JOB_FUNCTION_CODE;
    return { start, end, code };
  });
  if (lifecycles.length === 0) return empty;
  const jobFunctions = /* @__PURE__ */ new Map();
  lifecycles.forEach((job) => {
    var _a;
    if (!jobFunctions.has(job.code))
      jobFunctions.set(job.code, (_a = JOB_FUNCTION_LABELS[job.code]) != null ? _a : job.code);
  });
  const variantOrder = [
    "primary",
    "accent",
    "success",
    "warning",
    "secondary",
    "neutral"
  ];
  const groupedByVariant = /* @__PURE__ */ new Map();
  Array.from(jobFunctions.entries()).map(([code, label]) => {
    var _a;
    return {
      id: code,
      label,
      variant: (_a = JOB_FUNCTION_VARIANT_MAP[code]) != null ? _a : "neutral"
    };
  }).sort((a, b) => {
    const d = variantOrder.indexOf(a.variant) - variantOrder.indexOf(b.variant);
    if (d !== 0) return d;
    return a.label.localeCompare(b.label, void 0, { sensitivity: "base" });
  }).forEach((entry) => {
    if (!groupedByVariant.has(entry.variant)) groupedByVariant.set(entry.variant, []);
    groupedByVariant.get(entry.variant).push(entry);
  });
  const groups = [];
  groupedByVariant.forEach(
    (list) => list.forEach((meta, idx) => groups.push({ ...meta, tintIndex: idx % 3 }))
  );
  if (groups.length === 0) return empty;
  const lifecyclesByType = /* @__PURE__ */ new Map();
  lifecycles.forEach((job) => {
    if (!lifecyclesByType.has(job.code)) lifecyclesByType.set(job.code, []);
    lifecyclesByType.get(job.code).push({ start: job.start, end: job.end });
  });
  const earliestStart = lifecycles.reduce(
    (e, i) => i.start < e ? i.start : e,
    lifecycles[0].start
  );
  const latestEnd = lifecycles.reduce(
    (l, i) => i.end > l ? i.end : l,
    lifecycles[0].end
  );
  const latestWeekStart = startOfIsoWeek(latestEnd);
  const earliestWeekStart = startOfIsoWeek(earliestStart);
  const desiredStart = addWeeks(latestWeekStart, -(maxWeeks - 1));
  const rangeStart = desiredStart.getTime() < earliestWeekStart.getTime() ? earliestWeekStart : desiredStart;
  const weeks = [];
  for (let cursor = rangeStart; cursor.getTime() <= latestWeekStart.getTime(); cursor = addWeeks(cursor, 1)) {
    weeks.push(cursor);
  }
  if (weeks.length === 0) weeks.push(latestWeekStart);
  const dayMonthFmt = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" });
  let lastIsoYear = null;
  const weeklyJobData = weeks.map((weekStart) => {
    const weekEndExclusive = addWeeks(weekStart, 1);
    const weekEndInclusive = addDays(weekEndExclusive, -1);
    const { week, year } = getIsoWeekMeta(weekStart);
    const label = lastIsoYear === null || year !== lastIsoYear ? `${locale === "de" ? "KW" : "CW"} ${week} (${year})` : `${locale === "de" ? "KW" : "CW"} ${week}`;
    lastIsoYear = year;
    const rangeLabel = `${dayMonthFmt.format(weekStart)} \u2013 ${dayMonthFmt.format(weekEndInclusive)}`;
    const g = groups.map((gm) => {
      var _a;
      const items = (_a = lifecyclesByType.get(gm.id)) != null ? _a : [];
      const value = items.reduce((acc, job) => {
        return job.start < weekEndExclusive && job.end >= weekStart ? acc + 1 : acc;
      }, 0);
      return { id: gm.id, value, detail: `${gm.label} \xB7 ${rangeLabel}` };
    });
    return { label, detail: rangeLabel, groups: g };
  });
  return { weeklyJobData, jobFunctionGroups: groups };
}

// src/competitor/CompetitorInfoCard.tsx
import { Fragment as Fragment10, jsx as jsx48, jsxs as jsxs33 } from "react/jsx-runtime";
function ensureAbsolute(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
function cleanDomain(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
function CompetitorInfoCard({
  name,
  website,
  linkedinUrl,
  description,
  currentClaim,
  externalLinkIcon: ExternalLinkIcon,
  quoteIcon: QuoteIcon,
  linkedinIcon: LinkedinIcon,
  sidebar
}) {
  return /* @__PURE__ */ jsx48(Card, { children: /* @__PURE__ */ jsx48(Card.Content, { children: /* @__PURE__ */ jsxs33("div", { className: "flex flex-col lg:flex-row lg:gap-lg", children: [
    /* @__PURE__ */ jsxs33("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx48(Heading, { level: 2, children: name }),
      /* @__PURE__ */ jsxs33("div", { className: "flex items-center gap-md text-sm", children: [
        website ? /* @__PURE__ */ jsxs33(
          "a",
          {
            href: ensureAbsolute(website),
            target: "_blank",
            rel: "noreferrer",
            className: "text-primary flex items-center gap-1",
            children: [
              cleanDomain(website),
              ExternalLinkIcon && /* @__PURE__ */ jsx48(ExternalLinkIcon, { className: "h-3 w-3" })
            ]
          }
        ) : /* @__PURE__ */ jsx48("span", { className: "text-muted-foreground", children: "No website listed" }),
        linkedinUrl && /* @__PURE__ */ jsxs33(Fragment10, { children: [
          /* @__PURE__ */ jsx48("span", { className: "text-muted-foreground", children: "\xB7" }),
          /* @__PURE__ */ jsxs33(
            "a",
            {
              href: linkedinUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-primary flex items-center gap-1",
              children: [
                "LinkedIn",
                ExternalLinkIcon && /* @__PURE__ */ jsx48(ExternalLinkIcon, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ] }),
      description && /* @__PURE__ */ jsx48(Text, { size: "sm", tone: "muted", className: "mt-sm", children: description })
    ] }),
    (currentClaim || sidebar) && /* @__PURE__ */ jsxs33(Fragment10, { children: [
      /* @__PURE__ */ jsx48("div", { className: "my-md lg:hidden", style: { height: 1, background: "var(--border)" } }),
      /* @__PURE__ */ jsx48("div", { className: "hidden lg:block w-px bg-border shrink-0" }),
      /* @__PURE__ */ jsxs33("div", { className: "lg:w-64 shrink-0 flex flex-col gap-md", children: [
        currentClaim && /* @__PURE__ */ jsxs33("div", { children: [
          /* @__PURE__ */ jsxs33("div", { className: "flex items-center gap-sm mb-xs", children: [
            QuoteIcon && /* @__PURE__ */ jsx48(QuoteIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx48(Text, { size: "sm", tone: "muted", children: "Positioning" })
          ] }),
          /* @__PURE__ */ jsxs33(Text, { size: "sm", weight: "medium", className: "line-clamp-2", children: [
            "\u201C",
            currentClaim,
            "\u201D"
          ] })
        ] }),
        sidebar
      ] })
    ] })
  ] }) }) });
}

// src/competitor/HiringOverview.tsx
import { Fragment as Fragment11, jsx as jsx49, jsxs as jsxs34 } from "react/jsx-runtime";
var VARIANT_CATEGORY_LABELS = {
  primary: "Management & Strategy",
  accent: "Marketing & Sales",
  success: "Engineering & R&D",
  warning: "Production & Logistics",
  secondary: "HR & Administration",
  neutral: "Other"
};
var VARIANT_BG_CLASSES = {
  primary: "ds-bg-primary",
  accent: "ds-bg-accent",
  success: "ds-bg-success",
  warning: "ds-bg-warning",
  secondary: "ds-bg-secondary",
  neutral: "ds-bg-neutral"
};
var COMPARE_WEEKS = 4;
function countActiveAt(jobs, date) {
  const iso = date.toISOString();
  return jobs.filter((j) => {
    if (!j.first_detected || j.first_detected > iso) return false;
    if (j.ended && j.ended < iso) return false;
    return true;
  }).length;
}
function buildCategorySegments(jobs) {
  var _a, _b, _c, _d;
  const groups = /* @__PURE__ */ new Map();
  for (const job of jobs) {
    const code = (_a = job.linkedin_job_function_code) != null ? _a : "__unknown";
    const variant = (_b = JOB_FUNCTION_VARIANT_MAP[code]) != null ? _b : "neutral";
    const fnLabel = (_c = JOB_FUNCTION_LABELS[code]) != null ? _c : code;
    let group = groups.get(variant);
    if (!group) {
      group = { total: 0, byFunction: /* @__PURE__ */ new Map() };
      groups.set(variant, group);
    }
    group.total++;
    group.byFunction.set(fnLabel, ((_d = group.byFunction.get(fnLabel)) != null ? _d : 0) + 1);
  }
  const total = jobs.length;
  return [...groups.entries()].sort((a, b) => {
    if (a[0] === "neutral") return 1;
    if (b[0] === "neutral") return -1;
    return b[1].total - a[1].total;
  }).map(([variant, { total: count, byFunction }]) => ({
    variant,
    label: VARIANT_CATEGORY_LABELS[variant],
    count,
    percent: count / total * 100,
    functions: [...byFunction.entries()].sort((a, b) => b[1] - a[1]).map(([label, c]) => ({ label, count: c }))
  }));
}
function HiringOverview({
  segments: segmentsProp,
  activeJobs,
  activeJobCount,
  jobLifecycle,
  employees,
  employeesIcon: EmployeesIcon,
  rolesIcon: RolesIcon,
  trendUpIcon: TrendUpIcon,
  trendDownIcon: TrendDownIcon,
  unchangedIcon: UnchangedIcon,
  hidePeriod
}) {
  var _a;
  const segments = segmentsProp != null ? segmentsProp : activeJobs ? buildCategorySegments(activeJobs) : [];
  const currentCount = (_a = activeJobCount != null ? activeJobCount : activeJobs == null ? void 0 : activeJobs.length) != null ? _a : 0;
  const compareDate = /* @__PURE__ */ new Date();
  compareDate.setDate(compareDate.getDate() - COMPARE_WEEKS * 7);
  const previousCount = jobLifecycle ? countActiveAt(jobLifecycle, compareDate) : 0;
  const diff = jobLifecycle ? currentCount - previousCount : 0;
  const hasTrend = !!jobLifecycle;
  const hasJobs = segments.length > 0;
  return /* @__PURE__ */ jsxs34(Card, { children: [
    /* @__PURE__ */ jsx49(Card.Header, { children: /* @__PURE__ */ jsx49(Card.Title, { as: "h2", children: "Team & Hiring" }) }),
    /* @__PURE__ */ jsx49(Card.Content, { children: /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-md", children: [
      /* @__PURE__ */ jsxs34("div", { className: "flex gap-xl", children: [
        /* @__PURE__ */ jsxs34("div", { children: [
          /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-sm mb-xs", children: [
            EmployeesIcon && /* @__PURE__ */ jsx49(EmployeesIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx49(Text, { size: "sm", tone: "muted", children: "Employees" })
          ] }),
          employees ? /* @__PURE__ */ jsxs34(Fragment11, { children: [
            /* @__PURE__ */ jsxs34(Text, { size: "xl", weight: "bold", children: [
              qualifierPrefix(employees.qualifier),
              formatKpiValue(employees.value, employees.unit)
            ] }),
            employees.period && !hidePeriod && /* @__PURE__ */ jsx49(Text, { size: "sm", tone: "muted", children: employees.period })
          ] }) : /* @__PURE__ */ jsx49(Text, { size: "xl", weight: "bold", tone: "muted", children: "?" })
        ] }),
        /* @__PURE__ */ jsxs34("div", { children: [
          /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-sm mb-xs", children: [
            RolesIcon && /* @__PURE__ */ jsx49(RolesIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx49(Text, { size: "sm", tone: "muted", children: "Open Roles" })
          ] }),
          /* @__PURE__ */ jsxs34("div", { className: "flex items-baseline gap-sm", children: [
            /* @__PURE__ */ jsx49(Text, { size: "xl", weight: "bold", children: currentCount }),
            hasTrend && /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-1", children: [
              diff > 0 && TrendUpIcon ? /* @__PURE__ */ jsx49(TrendUpIcon, { className: "h-3.5 w-3.5 text-success" }) : diff < 0 && TrendDownIcon ? /* @__PURE__ */ jsx49(TrendDownIcon, { className: "h-3.5 w-3.5 text-destructive" }) : UnchangedIcon ? /* @__PURE__ */ jsx49(UnchangedIcon, { className: "h-3.5 w-3.5 text-muted-foreground" }) : null,
              /* @__PURE__ */ jsx49(Text, { size: "sm", tone: "muted", children: diff === 0 ? "unchanged" : `${diff > 0 ? "+" : ""}${diff} vs. ${COMPARE_WEEKS}w ago` })
            ] })
          ] })
        ] })
      ] }),
      hasJobs && /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-sm", children: [
        /* @__PURE__ */ jsx49(Text, { size: "xs", tone: "muted", weight: "medium", children: "Open roles by function" }),
        /* @__PURE__ */ jsx49("div", { className: "flex h-3 w-full rounded-full overflow-hidden", children: segments.map((seg) => /* @__PURE__ */ jsx49(
          Tooltip,
          {
            className: `h-full block ${VARIANT_BG_CLASSES[seg.variant]}`,
            style: { width: `${seg.percent}%` },
            multiline: true,
            content: /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsx49("span", { className: "font-semibold", children: seg.label }),
              seg.functions.map((fn) => /* @__PURE__ */ jsxs34("span", { children: [
                fn.label,
                ": ",
                fn.count
              ] }, fn.label))
            ] }),
            children: /* @__PURE__ */ jsx49("div", { className: "h-full w-full cursor-default" })
          },
          seg.variant
        )) }),
        /* @__PURE__ */ jsx49("div", { className: "flex flex-wrap gap-x-md gap-y-xs", children: segments.map((seg) => /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-xs", children: [
          /* @__PURE__ */ jsx49(
            "span",
            {
              className: `inline-block h-2.5 w-2.5 rounded-full shrink-0 ${VARIANT_BG_CLASSES[seg.variant]}`
            }
          ),
          /* @__PURE__ */ jsx49(Text, { size: "xs", tone: "muted", children: seg.label })
        ] }, seg.variant)) })
      ] })
    ] }) })
  ] });
}
export {
  AB_TEST_COLORS,
  ActionIconButton,
  ActivityCard,
  Alert,
  Badge,
  BarChart,
  Breadcrumb,
  Button,
  CATEGORY_LABELS,
  Card,
  ClaimTimeline,
  CompetitorInfoCard,
  CompetitorLogo,
  CriterionRow,
  DateTimeInput,
  DateTimeModalInput,
  DevButton,
  Dialog,
  EntityListHeader,
  EntityListRow,
  FilterBadge,
  FilterBar,
  FilterEditor,
  FilterNodeList,
  Heading,
  HiringOverview,
  InlineEditButton,
  Input,
  JOB_FUNCTION_LABELS,
  JOB_FUNCTION_VARIANT_MAP,
  KPI_CATEGORIES,
  KpiCard,
  LOGO_VARIANTS,
  Logo,
  MatrixColumnLabel,
  MatrixDrilldownMenu,
  MatrixDrilldownPath,
  MatrixTable,
  MatrixTableAction,
  MatrixTableBody,
  MatrixTableCell,
  MatrixTableContainer,
  MatrixTableHead,
  MatrixTableHeader,
  MatrixTableRow,
  MatrixTableShell,
  MatrixTableToolbar,
  MatrixViewControl,
  Modal,
  Navigation,
  NavigationBar,
  NavigationBrand,
  NavigationToggle,
  PageHeader,
  PieChart,
  RichText,
  Select,
  SelectMenu,
  SelectOption,
  Separator,
  Skeleton,
  TabNav,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Tag,
  TagField,
  TagList,
  Text,
  TextField,
  ToastProvider,
  Tooltip,
  UNKNOWN_JOB_FUNCTION_CODE,
  Wordmark,
  addDays,
  addWeeks,
  buildCategorySegments,
  buildWeeklyJobData,
  claimCompareKey,
  countActiveCriteria,
  defaultFilterBarLabels,
  defaultOperatorFor,
  detectABTestGroups,
  formatJobCount,
  formatKpiValue,
  getCustomers,
  getDefaultFilterState,
  getEmployees,
  getInputKind,
  getIsoWeekMeta,
  getKpiSnapshot,
  getRevenue,
  getRevenueGrowthYoY,
  isCriterion,
  isCriterionActive,
  isGroup,
  makeCriterion,
  makeGroup,
  makeId,
  makeNamedFilter,
  matchCriterionValue,
  matchNode,
  matchState,
  parseFilters,
  qualifierPrefix,
  resolveFilterBarLabels,
  serializeFilters,
  startOfIsoWeek,
  summarizeFilter,
  toggleLogicAtPath,
  tokens,
  updateAtPath,
  useToast
};
//# sourceMappingURL=index.js.map