import {
  defaultOperatorFor
} from "./chunk-2WQXNSZC.js";
import {
  Button
} from "./chunk-LRWW7BLR.js";

// src/design-system/components/filters/CriterionRow.tsx
import * as React from "react";
import { X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsx(
      "select",
      {
        value: criterion.type,
        onChange: (e) => handleTypeChange(e.target.value),
        className: SELECT_CLASS,
        "aria-label": labels.dimensionAriaLabel,
        children: fieldConfigs.map((f) => /* @__PURE__ */ jsx("option", { value: f.type, children: f.label }, f.type))
      }
    ),
    (inputKind === "date" || inputKind === "number" || inputKind === "text") && /* @__PURE__ */ jsx(
      "select",
      {
        value: criterion.operator,
        onChange: (e) => onUpdate({ operator: e.target.value }),
        className: SELECT_CLASS,
        "aria-label": labels.operatorAriaLabel,
        children: inputKind === "number" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("option", { value: "after", children: labels.opAtLeast }),
          /* @__PURE__ */ jsx("option", { value: "before", children: labels.opAtMost }),
          /* @__PURE__ */ jsx("option", { value: "between", children: labels.opBetween })
        ] }) : inputKind === "text" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("option", { value: "contains", children: labels.opContains }),
          /* @__PURE__ */ jsx("option", { value: "startsWith", children: labels.opStartsWith }),
          /* @__PURE__ */ jsx("option", { value: "equals", children: labels.opEquals })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("option", { value: "after", children: labels.opAfter }),
          /* @__PURE__ */ jsx("option", { value: "before", children: labels.opBefore }),
          /* @__PURE__ */ jsx("option", { value: "between", children: labels.opBetween })
        ] })
      }
    ),
    inputKind === "date" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          value: (_c = criterion.dateFrom) != null ? _c : "",
          onChange: (e) => onUpdate({ dateFrom: e.target.value || void 0 }),
          className: INPUT_CLASS,
          "aria-label": labels.dateFromAriaLabel
        }
      ),
      criterion.operator === "between" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: labels.and }),
        /* @__PURE__ */ jsx(
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
    inputKind === "number" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
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
      criterion.operator === "between" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: labels.and }),
        /* @__PURE__ */ jsx(
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
    inputKind === "text" && /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: (_g = criterion.stringValue) != null ? _g : "",
        onChange: (e) => onUpdate({ stringValue: e.target.value }),
        placeholder: labels.searchPlaceholder,
        className: `${INPUT_CLASS} min-w-[200px]`
      }
    ),
    inputKind === "enum" && /* @__PURE__ */ jsxs(
      "select",
      {
        value: (_h = criterion.stringValue) != null ? _h : "",
        onChange: (e) => onUpdate({ stringValue: e.target.value || void 0 }),
        className: `${SELECT_CLASS} min-w-[160px]`,
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: labels.pickValue }),
          ((_i = config == null ? void 0 : config.enumOptions) != null ? _i : []).map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
        ]
      }
    ),
    inputKind === "multiEnum" && /* @__PURE__ */ jsx(
      MultiEnumPicker,
      {
        options: (_j = config == null ? void 0 : config.enumOptions) != null ? _j : [],
        selected: (_k = criterion.stringValues) != null ? _k : [],
        onChange: (vals) => onUpdate({ stringValues: vals.length > 0 ? vals : void 0 }),
        labels
      }
    ),
    inputKind === "boolean" && /* @__PURE__ */ jsxs(
      "select",
      {
        value: criterion.booleanValue == null ? "" : criterion.booleanValue ? "true" : "false",
        onChange: (e) => onUpdate({
          booleanValue: e.target.value === "" ? void 0 : e.target.value === "true"
        }),
        className: SELECT_CLASS,
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: labels.pickValue }),
          /* @__PURE__ */ jsx("option", { value: "true", children: labels.yes }),
          /* @__PURE__ */ jsx("option", { value: "false", children: labels.no })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onRemove,
        "aria-label": labels.remove,
        title: labels.remove,
        children: /* @__PURE__ */ jsx(X, { size: 14, "aria-hidden": true })
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
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
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
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);
  const summary = selected.length === 0 ? labels.pickValues : selected.length === 1 ? (_b = (_a = options.find((o) => o.value === selected[0])) == null ? void 0 : _a.label) != null ? _b : selected[0] : labels.nSelected(selected.length);
  const toggle = (value) => {
    if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
    else onChange([...selected, value]);
  };
  return /* @__PURE__ */ jsxs("div", { ref: wrapRef, className: "relative inline-block", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => setOpen((v) => !v),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        className: "border border-border bg-background min-w-[160px] justify-between",
        children: /* @__PURE__ */ jsx("span", { className: "truncate", children: summary })
      }
    ),
    open && /* @__PURE__ */ jsxs(
      "div",
      {
        role: "dialog",
        className: "absolute z-50 mt-1 w-72 rounded-md border border-border bg-popover text-popover-foreground shadow-lg p-2",
        children: [
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx("ul", { role: "listbox", "aria-multiselectable": "true", className: "max-h-56 overflow-auto", children: filtered.length === 0 ? /* @__PURE__ */ jsx("li", { className: "px-2 py-1 text-xs text-muted-foreground", children: labels.noResults }) : filtered.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "w-full justify-start",
                "aria-selected": isSelected,
                onClick: () => toggle(opt.value),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-flex h-4 w-4 mr-2 items-center justify-center rounded border border-border", children: isSelected ? /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M1 5l3 3 5-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }) }) : null }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: opt.label }),
                  opt.hint ? /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: opt.hint }) : null
                ]
              }
            ) }, opt.value);
          }) })
        ]
      }
    )
  ] });
}

export {
  CriterionRow
};
//# sourceMappingURL=chunk-UZZ72JVV.js.map