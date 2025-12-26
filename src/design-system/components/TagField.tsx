import * as React from "react";

type TagProps = {
  children: React.ReactNode;
  onRemove?: () => void;
  removeAriaLabel?: string;
};

export function Tag({ children, onRemove, removeAriaLabel }: TagProps) {
  return (
    <span className="ds-Tag">
      <span className="ds-TagLabel">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="ds-TagRemove"
          onClick={onRemove}
          aria-label={removeAriaLabel ?? `Remove ${String(children)}`}
        >
          ×
        </button>
      )}
    </span>
  );
}

type TagListProps = {
  tags: string[];
  onRemove?: (tag: string, index: number) => void;
  emptyLabel?: React.ReactNode;
};

export function TagList({ tags, onRemove, emptyLabel }: TagListProps) {
  if (tags.length === 0 && emptyLabel) {
    return <div className="ds-TagListEmpty">{emptyLabel}</div>;
  }
  return (
    <div className="ds-TagList">
      {tags.map((tag, index) => (
        <Tag
          key={`${tag}-${index}`}
          onRemove={onRemove ? () => onRemove(tag, index) : undefined}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}

type TagFieldProps = {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  addOnBlur?: boolean;
  ariaLabel?: string;
};

export function TagField({
  label,
  values,
  onChange,
  description,
  error,
  placeholder,
  disabled,
  addOnBlur = true,
  ariaLabel,
}: TagFieldProps) {
  const inputId = React.useId();
  const descriptionId = description ? `${inputId}-desc` : undefined;
  const errorId = error ? `${inputId}-err` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const [inputValue, setInputValue] = React.useState("");

  const addTag = React.useCallback(
    (raw: string) => {
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

  const removeTag = React.useCallback(
    (index: number) => {
      if (disabled) return;
      const next = values.filter((_, idx) => idx !== index);
      onChange(next);
    },
    [disabled, onChange, values]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div className="ds-TagField">
      <label className="ds-TagFieldLabel" htmlFor={inputId}>
        {label}
      </label>
      <div
        className="ds-TagFieldControl"
        data-disabled={disabled ? "true" : "false"}
        data-invalid={error ? "true" : "false"}
      >
        <TagList
          tags={values}
          onRemove={disabled ? undefined : (_, index) => removeTag(index)}
        />
        <input
          id={inputId}
          aria-label={ariaLabel ?? label}
          className="ds-TagInput"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={values.length === 0 ? placeholder : undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
        />
      </div>
      {description && (
        <div id={descriptionId} className="ds-TagFieldDescription">
          {description}
        </div>
      )}
      {error && (
        <div id={errorId} className="ds-TagFieldError" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
