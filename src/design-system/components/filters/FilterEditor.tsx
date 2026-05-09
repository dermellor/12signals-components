import * as React from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Text } from "../Text";
import { FilterNodeList } from "./FilterNodeList";
import { FieldConfig, FilterFieldType, FilterState, NamedFilter } from "./types";
import { countActiveCriteria, summarizeFilter } from "./engine";
import { FilterBarLabels } from "./labels";

type Props = {
  open: boolean;
  filter: NamedFilter | null;
  fieldConfigs: FieldConfig[];
  defaultType?: FilterFieldType;
  labels: FilterBarLabels;
  /** Called with patched filter on every edit. Live-saves to URL. */
  onChange: (next: NamedFilter) => void;
  /** Called when user closes the modal. */
  onClose: () => void;
  /** Called when user removes the filter from the editor. */
  onRemove?: () => void;
};

export function FilterEditor({
  open, filter, fieldConfigs, defaultType, labels, onChange, onClose, onRemove,
}: Props) {
  if (!filter) return null;

  const resolvedDefaultType = defaultType ?? fieldConfigs[0]?.type ?? "";

  const setName = (name: string) => onChange({ ...filter, name });
  const setState = (updater: React.SetStateAction<FilterState>) => {
    const nextState = typeof updater === "function"
      ? (updater as (prev: FilterState) => FilterState)(filter.state)
      : updater;
    onChange({ ...filter, state: nextState });
  };

  const autoSummary = summarizeFilter(filter.state, fieldConfigs, {
    emptyLabel: labels.editorEmpty,
    conditionsLabel: labels.editorConditions,
  });
  const activeCount = countActiveCriteria(filter.state.children);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={labels.editorTitle}
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          {onRemove ? (
            <Button variant="danger" size="sm" onClick={onRemove}>
              {labels.editorDelete}
            </Button>
          ) : <span />}
          <Button variant="primary" size="sm" onClick={onClose}>
            {labels.editorDone}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 min-w-[40rem] max-w-[60rem]">
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-name" className="text-xs text-muted-foreground">
            {labels.editorName}
          </label>
          <Input
            id="filter-name"
            value={filter.name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder={autoSummary}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Text size="sm" weight="medium">
            {labels.editorConditions(activeCount)}
          </Text>
          <FilterNodeList
            nodes={filter.state.children}
            logic={filter.state.logic}
            fieldConfigs={fieldConfigs}
            defaultType={resolvedDefaultType}
            labels={labels}
            onSetState={setState}
            parentPath={[]}
          />
        </div>
      </div>
    </Modal>
  );
}
