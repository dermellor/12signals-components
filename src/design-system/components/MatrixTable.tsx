import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ListTree } from "lucide-react";

function cx(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

type MatrixColumnRole = "dimension" | "control" | "metric" | "action";
type MatrixAlign = "left" | "center" | "right";

type MatrixTableShellProps = React.HTMLAttributes<HTMLDivElement>;

export const MatrixTableShell = React.forwardRef<HTMLDivElement, MatrixTableShellProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cx("ds-MatrixTableShell", className)} {...rest} />
  ),
);
MatrixTableShell.displayName = "MatrixTableShell";

export const MatrixTableToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx("ds-MatrixTableToolbar", className)} {...rest} />
));
MatrixTableToolbar.displayName = "MatrixTableToolbar";

type MatrixViewControlProps = React.HTMLAttributes<HTMLDivElement> & {
  label: React.ReactNode;
};

export function MatrixViewControl({
  className,
  label,
  children,
  ...rest
}: MatrixViewControlProps) {
  return (
    <div className={cx("ds-MatrixViewControl", className)} {...rest}>
      <span className="ds-MatrixViewControlLabel">{label}</span>
      <div className="ds-MatrixViewControlInput">{children}</div>
    </div>
  );
}

export const MatrixTableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx("ds-MatrixTableContainer", className)} {...rest} />
));
MatrixTableContainer.displayName = "MatrixTableContainer";

export const MatrixTable = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...rest }, ref) => (
  <table ref={ref} className={cx("ds-MatrixTable", className)} {...rest} />
));
MatrixTable.displayName = "MatrixTable";

export const MatrixTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => (
  <thead ref={ref} className={cx("ds-MatrixTableHeader", className)} {...rest} />
));
MatrixTableHeader.displayName = "MatrixTableHeader";

export const MatrixTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => (
  <tbody ref={ref} className={cx("ds-MatrixTableBody", className)} {...rest} />
));
MatrixTableBody.displayName = "MatrixTableBody";

export const MatrixTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...rest }, ref) => (
  <tr ref={ref} className={cx("ds-MatrixTableRow", className)} {...rest} />
));
MatrixTableRow.displayName = "MatrixTableRow";

type MatrixTableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  columnRole?: MatrixColumnRole;
  depth?: number;
  align?: MatrixAlign;
  separator?: boolean;
};

export const MatrixTableHead = React.forwardRef<HTMLTableCellElement, MatrixTableHeadProps>(
  ({ className, columnRole = "dimension", depth, align = "left", separator, ...rest }, ref) => (
    <th
      ref={ref}
      className={cx("ds-MatrixTableHead", className)}
      data-column-role={columnRole}
      data-depth={depth}
      data-align={align}
      data-separator={separator ? "true" : undefined}
      {...rest}
    />
  ),
);
MatrixTableHead.displayName = "MatrixTableHead";

type MatrixTableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  columnRole?: MatrixColumnRole;
  depth?: number;
  align?: MatrixAlign;
  separator?: boolean;
  repeated?: boolean;
};

export const MatrixTableCell = React.forwardRef<HTMLTableCellElement, MatrixTableCellProps>(
  (
    {
      className,
      columnRole = "dimension",
      depth,
      align = "left",
      separator,
      repeated,
      ...rest
    },
    ref,
  ) => (
    <td
      ref={ref}
      className={cx("ds-MatrixTableCell", className)}
      data-column-role={columnRole}
      data-depth={depth}
      data-align={align}
      data-separator={separator ? "true" : undefined}
      data-repeated={repeated ? "true" : undefined}
      {...rest}
    />
  ),
);
MatrixTableCell.displayName = "MatrixTableCell";

type MatrixColumnLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  depth?: number;
};

export function MatrixColumnLabel({
  className,
  depth,
  children,
  ...rest
}: MatrixColumnLabelProps) {
  return (
    <div
      className={cx("ds-MatrixColumnLabel", className)}
      data-depth={depth}
      {...rest}
    >
      <span className="ds-MatrixColumnLabelText">{children}</span>
    </div>
  );
}

type MatrixTableActionProps<T extends React.ElementType = "button"> = {
  as?: T;
  icon: React.ReactNode;
  label: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function MatrixTableAction<T extends React.ElementType = "button">({
  as,
  icon,
  label,
  className,
  ...rest
}: MatrixTableActionProps<T>) {
  const Comp = (as ?? "button") as React.ElementType;
  return (
    <Comp className={cx("ds-MatrixTableAction", className)} {...rest}>
      <span className="ds-MatrixTableActionIcon" aria-hidden>
        {icon}
      </span>
      <span className="ds-SrOnly">{label}</span>
    </Comp>
  );
}

export type MatrixDrilldownOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type MatrixDrilldownMenuProps = {
  options: MatrixDrilldownOption[];
  onValueChange?: (value: string) => void;
  label: React.ReactNode;
  ariaLabel: string;
  align?: "left" | "right";
  disabled?: boolean;
  className?: string;
};

export function MatrixDrilldownMenu({
  options,
  onValueChange,
  label,
  ariaLabel,
  align = "right",
  disabled,
  className,
}: MatrixDrilldownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);
  const isDisabled = disabled || options.length === 0;

  React.useEffect(() => {
    if (!open || !rootRef.current) {
      setPos(null);
      return;
    }

    const updatePosition = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        left: align === "right" ? rect.right : rect.left,
      });
    };
    updatePosition();

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current || !event.target) return;
      const target = event.target as Node;
      if (
        !rootRef.current.contains(target) &&
        !contentRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, open]);

  return (
    <div ref={rootRef} className={cx("ds-MatrixDrilldownMenu", className)}>
      <button
        type="button"
        className="ds-MatrixDrilldownTrigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        disabled={isDisabled}
        data-open={open ? "true" : undefined}
        onClick={() => {
          if (!isDisabled) setOpen((prev) => !prev);
        }}
      >
        <ListTree aria-hidden focusable={false} className="ds-MatrixDrilldownPrimaryIcon" />
        <span className="ds-MatrixDrilldownLabel">{label}</span>
        <ChevronDown aria-hidden focusable={false} className="ds-MatrixDrilldownChevron" />
      </button>
      {open && !isDisabled && pos
        ? createPortal(
            <div
              ref={contentRef}
              className="ds-MatrixDrilldownContent ds-MatrixDrilldownContent--portal"
              role="menu"
              data-align={align}
              style={{
                top: pos.top,
                left: pos.left,
              }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  className="ds-MatrixDrilldownOption"
                  disabled={option.disabled}
                  onClick={() => {
                    if (option.disabled) return;
                    onValueChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export type MatrixDrilldownPathItem = {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
};

type MatrixDrilldownPathProps = React.HTMLAttributes<HTMLDivElement> & {
  items: MatrixDrilldownPathItem[];
  resetLabel: React.ReactNode;
  onReset: () => void;
};

export function MatrixDrilldownPath({
  items,
  resetLabel,
  onReset,
  className,
  ...rest
}: MatrixDrilldownPathProps) {
  return (
    <div className={cx("ds-MatrixDrilldownPath", className)} {...rest}>
      <button type="button" className="ds-MatrixDrilldownPathReset" onClick={onReset}>
        {resetLabel}
      </button>
      {items.map((item) => (
        <span key={item.id} className="ds-MatrixDrilldownPathItem">
          <span className="ds-MatrixDrilldownPathLabel">{item.label}</span>
          <span className="ds-MatrixDrilldownPathValue">{item.value}</span>
        </span>
      ))}
    </div>
  );
}
