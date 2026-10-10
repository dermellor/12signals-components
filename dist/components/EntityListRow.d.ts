import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type EntityListSortDirection = "asc" | "desc";
type EntityListColumn = {
    key: string;
    label: React.ReactNode;
    width?: string;
    headerOffset?: string;
    sortable?: boolean;
    align?: "start" | "center" | "end";
};
type EntityListHeaderProps = {
    columns: EntityListColumn[];
    sortKey?: string;
    sortDirection?: EntityListSortDirection;
    onSortChange?: (key: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;
declare function EntityListHeader({ columns, sortKey, sortDirection, onSortChange, className, style, ...rest }: EntityListHeaderProps): react_jsx_runtime.JSX.Element;
type EntityListRowProps = {
    columns: EntityListColumn[];
    icon?: React.ReactNode;
    title: React.ReactNode;
    detail?: React.ReactNode;
    cells?: React.ReactNode[];
    trailingIcon?: React.ReactNode;
    ariaLabel?: string;
    href?: string;
    renderLink?: (children: React.ReactNode, className: string) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;
declare function EntityListRow({ columns, icon, title, detail, cells, trailingIcon, ariaLabel, href, renderLink, className, style, ...rest }: EntityListRowProps): react_jsx_runtime.JSX.Element;

export { type EntityListColumn, EntityListHeader, type EntityListHeaderProps, EntityListRow, type EntityListRowProps, type EntityListSortDirection };
