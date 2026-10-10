import {
  FilterEditor
} from "./chunk-QDUCQUHG.js";
import {
  resolveFilterBarLabels
} from "./chunk-BGFRAABE.js";
import {
  FilterBadge
} from "./chunk-6VT2LBFU.js";
import {
  makeNamedFilter,
  summarizeFilter
} from "./chunk-2WQXNSZC.js";

// src/design-system/components/filters/FilterBar.tsx
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const [editingId, setEditingId] = React.useState(null);
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", "aria-label": sectionAriaLabel, children: [
      systemBadges.map((b) => /* @__PURE__ */ jsx(
        FilterBadge,
        {
          label: b.label,
          active: b.active,
          onToggle: b.onToggle,
          toggleAriaLabel: b.active ? labels.disable : labels.enable
        },
        b.id
      )),
      filters.map((f) => /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
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

export {
  FilterBar
};
//# sourceMappingURL=chunk-ELMCSO63.js.map