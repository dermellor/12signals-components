import * as React from "react";
import { X } from "lucide-react";
import { Button } from "../Button";
import {
  FieldConfig,
  FieldInputKind,
  FilterCriterion,
  FilterFieldType,
  FilterOperator,
} from "./types";
import { defaultOperatorFor } from "./engine";
import { FilterBarLabels } from "./labels";

type Props = {
  criterion: FilterCriterion;
  fieldConfigs: FieldConfig[];
  labels: FilterBarLabels;
  onUpdate: (patch: Partial<FilterCriterion>) => void;
  onRemove: () => void;
};

const SELECT_CLASS =
  "border border-border rounded-md px-2 py-1 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-success/40 focus:border-success";
const INPUT_CLASS = SELECT_CLASS;

export function CriterionRow({ criterion, fieldConfigs, labels, onUpdate, onRemove }: Props) {
  const config = fieldConfigs.find((f) => f.type === criterion.type) ?? fieldConfigs[0];
  const inputKind: FieldInputKind = config?.inputKind ?? "text";

  const handleTypeChange = (nextType: FilterFieldType) => {
    const nextConfig = fieldConfigs.find((f) => f.type === nextType);
    const nextKind = nextConfig?.inputKind ?? "text";
    const nextOperator: FilterOperator =
      nextKind === inputKind ? criterion.operator : defaultOperatorFor(nextKind);
    onUpdate({
      type: nextType,
      operator: nextOperator,
      dateFrom: undefined,
      dateTo: undefined,
      numberFrom: undefined,
      numberTo: undefined,
      stringValue: undefined,
      stringValues: undefined,
      booleanValue: undefined,
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <select
        value={criterion.type}
        onChange={(e) => handleTypeChange(e.target.value as FilterFieldType)}
        className={SELECT_CLASS}
        aria-label={labels.dimensionAriaLabel}
      >
        {fieldConfigs.map((f) => (
          <option key={f.type} value={f.type}>{f.label}</option>
        ))}
      </select>

      {(inputKind === "date" || inputKind === "number" || inputKind === "text") && (
        <select
          value={criterion.operator}
          onChange={(e) => onUpdate({ operator: e.target.value as FilterOperator })}
          className={SELECT_CLASS}
          aria-label={labels.operatorAriaLabel}
        >
          {inputKind === "number" ? (
            <>
              <option value="after">{labels.opAtLeast}</option>
              <option value="before">{labels.opAtMost}</option>
              <option value="between">{labels.opBetween}</option>
            </>
          ) : inputKind === "text" ? (
            <>
              <option value="contains">{labels.opContains}</option>
              <option value="startsWith">{labels.opStartsWith}</option>
              <option value="equals">{labels.opEquals}</option>
            </>
          ) : (
            <>
              <option value="after">{labels.opAfter}</option>
              <option value="before">{labels.opBefore}</option>
              <option value="between">{labels.opBetween}</option>
            </>
          )}
        </select>
      )}

      {inputKind === "date" && (
        <>
          <input
            type="date"
            value={criterion.dateFrom ?? ""}
            onChange={(e) => onUpdate({ dateFrom: e.target.value || undefined })}
            className={INPUT_CLASS}
            aria-label={labels.dateFromAriaLabel}
          />
          {criterion.operator === "between" && (
            <>
              <span className="text-sm text-muted-foreground">{labels.and}</span>
              <input
                type="date"
                value={criterion.dateTo ?? ""}
                onChange={(e) => onUpdate({ dateTo: e.target.value || undefined })}
                className={INPUT_CLASS}
                aria-label={labels.dateToAriaLabel}
              />
            </>
          )}
        </>
      )}

      {inputKind === "number" && (
        <>
          <input
            type="number"
            value={criterion.numberFrom ?? ""}
            onChange={(e) =>
              onUpdate({
                numberFrom: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
            className={`${INPUT_CLASS} w-24`}
          />
          {criterion.operator === "between" && (
            <>
              <span className="text-sm text-muted-foreground">{labels.and}</span>
              <input
                type="number"
                value={criterion.numberTo ?? ""}
                onChange={(e) =>
                  onUpdate({
                    numberTo: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className={`${INPUT_CLASS} w-24`}
              />
            </>
          )}
        </>
      )}

      {inputKind === "text" && (
        <input
          type="text"
          value={criterion.stringValue ?? ""}
          onChange={(e) => onUpdate({ stringValue: e.target.value })}
          placeholder={labels.searchPlaceholder}
          className={`${INPUT_CLASS} min-w-[200px]`}
        />
      )}

      {inputKind === "enum" && (
        <select
          value={criterion.stringValue ?? ""}
          onChange={(e) => onUpdate({ stringValue: e.target.value || undefined })}
          className={`${SELECT_CLASS} min-w-[160px]`}
        >
          <option value="">{labels.pickValue}</option>
          {(config?.enumOptions ?? []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}

      {inputKind === "multiEnum" && (
        <MultiEnumPicker
          options={config?.enumOptions ?? []}
          selected={criterion.stringValues ?? []}
          onChange={(vals) =>
            onUpdate({ stringValues: vals.length > 0 ? vals : undefined })
          }
          labels={labels}
        />
      )}

      {inputKind === "boolean" && (
        <select
          value={
            criterion.booleanValue == null
              ? ""
              : criterion.booleanValue
                ? "true"
                : "false"
          }
          onChange={(e) =>
            onUpdate({
              booleanValue:
                e.target.value === "" ? undefined : e.target.value === "true",
            })
          }
          className={SELECT_CLASS}
        >
          <option value="">{labels.pickValue}</option>
          <option value="true">{labels.yes}</option>
          <option value="false">{labels.no}</option>
        </select>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        aria-label={labels.remove}
        title={labels.remove}
      >
        <X size={14} aria-hidden />
      </Button>
    </div>
  );
}

function MultiEnumPicker({
  options,
  selected,
  onChange,
  labels,
}: {
  options: { value: string; label: string; hint?: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
  labels: FilterBarLabels;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const wrapRef = React.useRef<HTMLDivElement>(null);

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

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const summary =
    selected.length === 0
      ? labels.pickValues
      : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label ?? selected[0]
        : labels.nSelected(selected.length);

  const toggle = (value: string) => {
    if (selected.includes(value)) onChange(selected.filter((v) => v !== value));
    else onChange([...selected, value]);
  };

  return (
    <div ref={wrapRef} className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="border border-border bg-background min-w-[160px] justify-between"
      >
        <span className="truncate">{summary}</span>
      </Button>
      {open && (
        <div
          role="dialog"
          className="absolute z-50 mt-1 w-72 rounded-md border border-border bg-popover text-popover-foreground shadow-lg p-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            autoFocus
            className={`${INPUT_CLASS} w-full mb-2`}
          />
          <ul role="listbox" aria-multiselectable="true" className="max-h-56 overflow-auto">
            {filtered.length === 0 ? (
              <li className="px-2 py-1 text-xs text-muted-foreground">
                {labels.noResults}
              </li>
            ) : (
              filtered.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <li key={opt.value}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      aria-selected={isSelected}
                      onClick={() => toggle(opt.value)}
                    >
                      <span className="inline-flex h-4 w-4 mr-2 items-center justify-center rounded border border-border">
                        {isSelected ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                            <path d="M1 5l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        ) : null}
                      </span>
                      <span className="truncate">{opt.label}</span>
                      {opt.hint ? <span className="ml-auto text-xs text-muted-foreground">{opt.hint}</span> : null}
                    </Button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
