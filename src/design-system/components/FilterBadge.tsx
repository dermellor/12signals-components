import * as React from "react";

type FilterBadgeProps = {
  label: React.ReactNode;
  active: boolean;
  removable?: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  variant?: "default" | "add" | "subtle";
  size?: "sm" | "md";
  toggleAriaLabel?: string;
  editAriaLabel?: string;
  removeAriaLabel?: string;
  children?: React.ReactNode;
};

export function FilterBadge({
  label,
  active,
  removable = false,
  onToggle,
  onEdit,
  onRemove,
  variant = "default",
  size = "md",
  toggleAriaLabel,
  editAriaLabel = "Edit filter",
  removeAriaLabel = "Remove filter",
  children,
}: FilterBadgeProps) {
  const handle = (cb?: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cb?.();
  };

  return (
    <span
      className="ds-FilterBadge"
      data-variant={variant}
      data-size={size}
      data-state={active ? "active" : "inactive"}
    >
      <button
        type="button"
        className="ds-FilterBadgeToggle"
        aria-pressed={variant === "add" ? undefined : active}
        aria-label={toggleAriaLabel}
        onClick={onToggle}
      >
        <span className="ds-FilterBadgeLabel">{label}</span>
        {children}
      </button>
      {onEdit && (
        <button
          type="button"
          className="ds-FilterBadgeAction"
          aria-label={editAriaLabel}
          onClick={handle(onEdit)}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M8.5 1.5l2 2L4 10l-2.5.5L2 8l6.5-6.5z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      )}
      {removable && onRemove ? (
        <button
          type="button"
          className="ds-FilterBadgeAction"
          aria-label={removeAriaLabel}
          onClick={handle(onRemove)}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </span>
  );
}
