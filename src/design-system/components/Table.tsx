import * as React from "react";

function cx(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export type TableStickyPosition = "start" | "end";
type StickyPosition = TableStickyPosition;

function withSticky(base: string, sticky?: StickyPosition) {
  if (!sticky) return base;
  const suffix = sticky === "start" ? "Start" : "End";
  return `${base} ds-TableSticky ds-TableSticky${suffix}`;
}

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => {
  return <div ref={ref} className={cx("ds-TableContainer", className)} {...rest} />;
});
TableContainer.displayName = "TableContainer";

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...rest }, ref) => {
  return <table ref={ref} className={cx("ds-Table", className)} {...rest} />;
});
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => {
  return <thead ref={ref} className={cx("ds-TableHeader", className)} {...rest} />;
});
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => {
  return <tbody ref={ref} className={cx("ds-TableBody", className)} {...rest} />;
});
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...rest }, ref) => {
  return <tfoot ref={ref} className={cx("ds-TableFooter", className)} {...rest} />;
});
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...rest }, ref) => {
  return <tr ref={ref} className={cx("ds-TableRow", className)} {...rest} />;
});
TableRow.displayName = "TableRow";

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  sticky?: StickyPosition;
};

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sticky, ...rest }, ref) => {
    return <th ref={ref} className={cx(withSticky("ds-TableHead", sticky), className)} {...rest} />;
  },
);
TableHead.displayName = "TableHead";

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  sticky?: StickyPosition;
};

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, sticky, ...rest }, ref) => {
    return <td ref={ref} className={cx(withSticky("ds-TableCell", sticky), className)} {...rest} />;
  },
);
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...rest }, ref) => {
  return <caption ref={ref} className={cx("ds-TableCaption", className)} {...rest} />;
});
TableCaption.displayName = "TableCaption";
