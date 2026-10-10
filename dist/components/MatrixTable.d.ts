import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type MatrixColumnRole = "dimension" | "control" | "metric" | "action";
type MatrixAlign = "left" | "center" | "right";
type MatrixTableShellProps = React.HTMLAttributes<HTMLDivElement>;
declare const MatrixTableShell: React.ForwardRefExoticComponent<MatrixTableShellProps & React.RefAttributes<HTMLDivElement>>;
declare const MatrixTableToolbar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
type MatrixViewControlProps = React.HTMLAttributes<HTMLDivElement> & {
    label: React.ReactNode;
};
declare function MatrixViewControl({ className, label, children, ...rest }: MatrixViewControlProps): react_jsx_runtime.JSX.Element;
declare const MatrixTableContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const MatrixTable: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const MatrixTableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const MatrixTableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const MatrixTableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const MatrixTableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & {
    columnRole?: MatrixColumnRole;
    depth?: number;
    align?: MatrixAlign;
    separator?: boolean;
} & React.RefAttributes<HTMLTableCellElement>>;
declare const MatrixTableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & {
    columnRole?: MatrixColumnRole;
    depth?: number;
    align?: MatrixAlign;
    separator?: boolean;
    repeated?: boolean;
} & React.RefAttributes<HTMLTableCellElement>>;
type MatrixColumnLabelProps = React.HTMLAttributes<HTMLDivElement> & {
    depth?: number;
};
declare function MatrixColumnLabel({ className, depth, children, ...rest }: MatrixColumnLabelProps): react_jsx_runtime.JSX.Element;
type MatrixTableActionProps<T extends React.ElementType = "button"> = {
    as?: T;
    icon: React.ReactNode;
    label: React.ReactNode;
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;
declare function MatrixTableAction<T extends React.ElementType = "button">({ as, icon, label, className, ...rest }: MatrixTableActionProps<T>): react_jsx_runtime.JSX.Element;
type MatrixDrilldownOption = {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
};
type MatrixDrilldownMenuProps = {
    options: MatrixDrilldownOption[];
    onValueChange?: (value: string) => void;
    ariaLabel: string;
    align?: "left" | "right";
    disabled?: boolean;
    className?: string;
};
declare function MatrixDrilldownMenu({ options, onValueChange, ariaLabel, align, disabled, className, }: MatrixDrilldownMenuProps): react_jsx_runtime.JSX.Element;
type MatrixDrilldownPathItem = {
    id: string;
    label: React.ReactNode;
    value: React.ReactNode;
};
type MatrixDrilldownPathProps = React.HTMLAttributes<HTMLDivElement> & {
    items: MatrixDrilldownPathItem[];
    resetLabel: React.ReactNode;
    onReset: () => void;
};
declare function MatrixDrilldownPath({ items, resetLabel, onReset, className, ...rest }: MatrixDrilldownPathProps): react_jsx_runtime.JSX.Element;

export { MatrixColumnLabel, MatrixDrilldownMenu, type MatrixDrilldownOption, MatrixDrilldownPath, type MatrixDrilldownPathItem, MatrixTable, MatrixTableAction, MatrixTableBody, MatrixTableCell, MatrixTableContainer, MatrixTableHead, MatrixTableHeader, MatrixTableRow, MatrixTableShell, MatrixTableToolbar, MatrixViewControl };
