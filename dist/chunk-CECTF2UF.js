import {
  CriterionRow
} from "./chunk-UZZ72JVV.js";
import {
  getInputKind,
  makeCriterion,
  makeGroup,
  toggleLogicAtPath,
  updateAtPath
} from "./chunk-2WQXNSZC.js";
import {
  isCriterion
} from "./chunk-KEQRP7TE.js";
import {
  Button
} from "./chunk-LRWW7BLR.js";

// src/design-system/components/filters/FilterNodeList.tsx
import * as React from "react";
import { ChevronDown, FolderPlus, Layers, Plus, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function FilterNodeList({
  nodes,
  logic,
  fieldConfigs,
  defaultType,
  labels,
  onSetState,
  parentPath
}) {
  const updateChildren = React.useCallback(
    (updater) => {
      onSetState((prev) => updateAtPath(prev, parentPath, updater));
    },
    [onSetState, parentPath]
  );
  const toggleSelfLogic = React.useCallback(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    nodes.map((node, idx) => /* @__PURE__ */ jsxs("div", { children: [
      idx > 0 && nodes.length > 1 && /* @__PURE__ */ jsx("div", { className: "py-0.5", children: /* @__PURE__ */ jsx(
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
      isCriterion(node) ? /* @__PURE__ */ jsx(
        CriterionRow,
        {
          criterion: node,
          fieldConfigs,
          labels,
          onUpdate: (patch) => updateCriterion(node.id, patch),
          onRemove: () => removeNode(node.id)
        }
      ) : /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-lg border px-3 py-2 relative",
          style: {
            borderColor: "hsl(var(--success) / 0.4)",
            backgroundColor: "hsl(var(--success) / 0.06)"
          },
          children: [
            /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "text-xs font-medium inline-flex items-center gap-1",
                  style: { color: "hsl(var(--success))" },
                  children: [
                    /* @__PURE__ */ jsx(Layers, { size: 12, "aria-hidden": true }),
                    labels.groupLabel(node.logic)
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => removeNode(node.id),
                  "aria-label": labels.removeGroup,
                  title: labels.removeGroup,
                  children: /* @__PURE__ */ jsx(X, { size: 14, "aria-hidden": true })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
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
  const wrapRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { ref: wrapRef, className: "relative inline-block pt-1", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "xs",
        onClick: () => setOpen((v) => !v),
        iconLeft: /* @__PURE__ */ jsx(Plus, { size: 12, "aria-hidden": true }),
        iconRight: /* @__PURE__ */ jsx(ChevronDown, { size: 10, "aria-hidden": true }),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        children: labels.add
      }
    ),
    open && /* @__PURE__ */ jsxs(
      "div",
      {
        role: "menu",
        className: "absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-popover text-popover-foreground shadow-md p-1",
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "xs",
              className: "w-full justify-start",
              onClick: () => {
                onAddCriterion();
                setOpen(false);
              },
              iconLeft: /* @__PURE__ */ jsx(Plus, { size: 12, "aria-hidden": true }),
              children: labels.addCondition
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "xs",
              className: "w-full justify-start",
              onClick: () => {
                onAddGroup();
                setOpen(false);
              },
              iconLeft: /* @__PURE__ */ jsx(FolderPlus, { size: 12, "aria-hidden": true }),
              children: labels.addGroup
            }
          )
        ]
      }
    )
  ] });
}

export {
  FilterNodeList
};
//# sourceMappingURL=chunk-CECTF2UF.js.map