import {
  Input
} from "./chunk-A2PAJG25.js";
import {
  FilterNodeList
} from "./chunk-CECTF2UF.js";
import {
  Modal
} from "./chunk-YOKH3JJ5.js";
import {
  countActiveCriteria,
  summarizeFilter
} from "./chunk-2WQXNSZC.js";
import {
  Text
} from "./chunk-MTQGJRER.js";
import {
  Button
} from "./chunk-LRWW7BLR.js";

// src/design-system/components/filters/FilterEditor.tsx
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open,
      onClose,
      title: labels.editorTitle,
      footer: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [
        onRemove ? /* @__PURE__ */ jsx(Button, { variant: "danger", size: "sm", onClick: onRemove, children: labels.editorDelete }) : /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx(Button, { variant: "primary", size: "sm", onClick: onClose, children: labels.editorDone })
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 min-w-[40rem] max-w-[60rem]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "filter-name", className: "text-xs text-muted-foreground", children: labels.editorName }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "filter-name",
              value: filter.name,
              onChange: (e) => setName(e.target.value),
              placeholder: autoSummary
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", weight: "medium", children: labels.editorConditions(activeCount) }),
          /* @__PURE__ */ jsx(
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

export {
  FilterEditor
};
//# sourceMappingURL=chunk-QDUCQUHG.js.map