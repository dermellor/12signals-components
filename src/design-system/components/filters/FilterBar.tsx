import * as React from "react";
import { FilterBadge } from "../FilterBadge";
import { FieldConfig, FilterFieldType, NamedFilter } from "./types";
import { makeNamedFilter, summarizeFilter } from "./engine";
import { FilterEditor } from "./FilterEditor";
import { FilterBarLabels, resolveFilterBarLabels } from "./labels";

export type SystemBadge = {
  id: string;
  label: string;
  active: boolean;
  onToggle: () => void;
};

type Props = {
  filters: NamedFilter[];
  onChange: (next: NamedFilter[]) => void;
  fieldConfigs: FieldConfig[];
  defaultType?: FilterFieldType;
  systemBadges?: SystemBadge[];
  /** Override any subset of the default English labels. */
  labels?: Partial<FilterBarLabels>;
  /** Section aria-label. Defaults to "Filters". */
  sectionAriaLabel?: string;
};

export function FilterBar({
  filters,
  onChange,
  fieldConfigs,
  defaultType,
  systemBadges = [],
  labels: labelsProp,
  sectionAriaLabel = "Filters",
}: Props) {
  const labels = resolveFilterBarLabels(labelsProp);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const editing = filters.find((f) => f.id === editingId) ?? null;

  const updateFilter = (next: NamedFilter) => {
    onChange(filters.map((f) => (f.id === next.id ? next : f)));
  };

  const removeFilter = (id: string) => {
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
      // Discard empty drafts on close.
      removeFilter(editing.id);
      return;
    }
    setEditingId(null);
  };

  const labelFor = (f: NamedFilter): string =>
    f.name || summarizeFilter(f.state, fieldConfigs, { emptyLabel: labels.emptyLabel });

  return (
    <>
      <div className="flex flex-wrap items-center gap-2" aria-label={sectionAriaLabel}>
        {systemBadges.map((b) => (
          <FilterBadge
            key={b.id}
            label={b.label}
            active={b.active}
            onToggle={b.onToggle}
            toggleAriaLabel={b.active ? labels.disable : labels.enable}
          />
        ))}
        {filters.map((f) => (
          <FilterBadge
            key={f.id}
            label={labelFor(f)}
            active={f.enabled}
            removable
            onToggle={() => updateFilter({ ...f, enabled: !f.enabled })}
            onEdit={() => setEditingId(f.id)}
            onRemove={() => removeFilter(f.id)}
            toggleAriaLabel={f.enabled ? labels.disable : labels.enable}
            editAriaLabel={labels.edit}
            removeAriaLabel={labels.remove}
          />
        ))}
        <FilterBadge
          variant="add"
          label={`+ ${labels.addFilter}`}
          active={false}
          onToggle={addNew}
          toggleAriaLabel={labels.addFilter}
        />
      </div>

      <FilterEditor
        open={editingId != null}
        filter={editing}
        fieldConfigs={fieldConfigs}
        defaultType={defaultType}
        labels={labels}
        onChange={updateFilter}
        onClose={closeEditor}
        onRemove={editing ? () => removeFilter(editing.id) : undefined}
      />
    </>
  );
}
