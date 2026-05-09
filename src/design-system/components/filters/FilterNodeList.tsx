import * as React from "react";
import { ChevronDown, FolderPlus, Layers, Plus, X } from "lucide-react";
import { Button } from "../Button";
import {
  FieldConfig,
  FilterCriterion,
  FilterFieldType,
  FilterLogic,
  FilterNode,
  FilterState,
  isCriterion,
} from "./types";
import { CriterionRow } from "./CriterionRow";
import {
  getInputKind,
  makeCriterion,
  makeGroup,
  toggleLogicAtPath,
  updateAtPath,
} from "./engine";
import { FilterBarLabels } from "./labels";

type Props = {
  nodes: FilterNode[];
  logic: FilterLogic;
  fieldConfigs: FieldConfig[];
  defaultType: FilterFieldType;
  labels: FilterBarLabels;
  onSetState: React.Dispatch<React.SetStateAction<FilterState>>;
  parentPath: string[];
};

export function FilterNodeList({
  nodes, logic, fieldConfigs, defaultType, labels, onSetState, parentPath,
}: Props) {
  const updateChildren = React.useCallback(
    (updater: (children: FilterNode[]) => FilterNode[]) => {
      onSetState((prev) => updateAtPath(prev, parentPath, updater));
    },
    [onSetState, parentPath],
  );

  const toggleSelfLogic = React.useCallback(() => {
    onSetState((prev) => toggleLogicAtPath(prev, parentPath));
  }, [onSetState, parentPath]);

  const updateCriterion = (id: string, patch: Partial<FilterCriterion>) => {
    updateChildren((children) =>
      children.map((ch) =>
        isCriterion(ch) && ch.id === id ? { ...ch, ...patch } : ch,
      ),
    );
  };

  const removeNode = (id: string) => {
    updateChildren((children) => children.filter((ch) => ch.id !== id));
  };

  const addCriterion = () => {
    updateChildren((children) => [
      ...children,
      makeCriterion(defaultType, getInputKind(fieldConfigs, defaultType)),
    ]);
  };

  const addGroup = () => {
    const inverted: FilterLogic = logic === "AND" ? "OR" : "AND";
    const kind = getInputKind(fieldConfigs, defaultType);
    updateChildren((children) => [
      ...children,
      makeGroup(inverted, [
        makeCriterion(defaultType, kind),
        makeCriterion(defaultType, kind),
      ]),
    ]);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {nodes.map((node, idx) => (
        <div key={node.id}>
          {idx > 0 && nodes.length > 1 && (
            <div className="py-0.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSelfLogic}
                title={labels.toggleLogic}
                className="px-2 py-0.5 text-xs font-medium border border-success/40 bg-success/10 text-success hover:bg-success/20"
              >
                {labels.logic(logic)}
              </Button>
            </div>
          )}

          {isCriterion(node) ? (
            <CriterionRow
              criterion={node}
              fieldConfigs={fieldConfigs}
              labels={labels}
              onUpdate={(patch) => updateCriterion(node.id, patch)}
              onRemove={() => removeNode(node.id)}
            />
          ) : (
            <div
              className="rounded-lg border px-3 py-2 relative"
              style={{
                borderColor: "hsl(var(--success) / 0.4)",
                backgroundColor: "hsl(var(--success) / 0.06)",
              }}
            >
              <header className="flex items-center justify-between mb-1.5">
                <span
                  className="text-xs font-medium inline-flex items-center gap-1"
                  style={{ color: "hsl(var(--success))" }}
                >
                  <Layers size={12} aria-hidden />
                  {labels.groupLabel(node.logic)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNode(node.id)}
                  aria-label={labels.removeGroup}
                  title={labels.removeGroup}
                >
                  <X size={14} aria-hidden />
                </Button>
              </header>
              <FilterNodeList
                nodes={node.children}
                logic={node.logic}
                fieldConfigs={fieldConfigs}
                defaultType={defaultType}
                labels={labels}
                onSetState={onSetState}
                parentPath={[...parentPath, node.id]}
              />
            </div>
          )}
        </div>
      ))}

      <AddNodeMenu
        labels={labels}
        onAddCriterion={addCriterion}
        onAddGroup={addGroup}
      />
    </div>
  );
}

function AddNodeMenu({
  onAddCriterion,
  onAddGroup,
  labels,
}: {
  onAddCriterion: () => void;
  onAddGroup: () => void;
  labels: FilterBarLabels;
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative inline-block pt-1">
      <Button
        variant="ghost"
        size="xs"
        onClick={() => setOpen((v) => !v)}
        iconLeft={<Plus size={12} aria-hidden />}
        iconRight={<ChevronDown size={10} aria-hidden />}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {labels.add}
      </Button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-popover text-popover-foreground shadow-md p-1"
        >
          <Button
            variant="ghost"
            size="xs"
            className="w-full justify-start"
            onClick={() => { onAddCriterion(); setOpen(false); }}
            iconLeft={<Plus size={12} aria-hidden />}
          >
            {labels.addCondition}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="w-full justify-start"
            onClick={() => { onAddGroup(); setOpen(false); }}
            iconLeft={<FolderPlus size={12} aria-hidden />}
          >
            {labels.addGroup}
          </Button>
        </div>
      )}
    </div>
  );
}
