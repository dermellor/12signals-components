import * as React from "react";
import { Button } from "./Button";
import { DateTimeInput } from "./DateTimeInput";
import { Dialog } from "./Dialog";

type DateTimeModalInputProps = {
  label: string;
  value: string;
  onSave: (value: string) => void;
  displayValue?: string;
  emptyLabel?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  saving?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  triggerProps?: Omit<
    React.ComponentProps<typeof Button>,
    "children" | "onClick" | "disabled" | "size" | "variant"
  >;
};

export function DateTimeModalInput({
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
  triggerProps,
}: DateTimeModalInputProps) {
  const isDisabled = disabled || saving;
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const draftRef = React.useRef(value);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const inputId = React.useId();

  React.useEffect(() => {
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
    const liveValue = inputRef.current?.value ?? draftRef.current;
    onSave(liveValue);
    setOpen(false);
  };

  const triggerLabel =
    (displayValue && displayValue.trim().length > 0 ? displayValue : "") || emptyLabel;

  return (
    <>
      <Button
        size={size}
        variant="ghost"
        onClick={handleOpen}
        aria-label={label}
        disabled={isDisabled}
        {...triggerProps}
      >
        {triggerLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        title={label}
        footer={
          <div style={{ display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={handleClose} disabled={saving}>
              {cancelLabel}
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saveLabel}
            </Button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
          <DateTimeInput
            id={inputId}
            size={size}
            value={draft}
            ref={inputRef}
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            }}
            onInput={(event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            }}
            disabled={disabled || saving}
            aria-label={label}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
}
