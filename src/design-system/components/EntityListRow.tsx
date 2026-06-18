import * as React from "react";
import { Text } from "./Text";

export type EntityListSortDirection = "asc" | "desc";

export type EntityListColumn = {
  key: string;
  label: React.ReactNode;
  width?: string;
  headerOffset?: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
};

function getGridTemplate(columns: EntityListColumn[]) {
  const columnTemplate = columns.length
    ? columns.map((column) => column.width ?? "minmax(7rem, 1fr)").join(" ")
    : "minmax(0, 1fr)";
  return `${columnTemplate} 2rem`;
}

function getGridStyle(columns: EntityListColumn[], style?: React.CSSProperties) {
  return {
    "--ds-EntityList-grid-template": getGridTemplate(columns),
    ...style,
  } as React.CSSProperties;
}

export type EntityListHeaderProps = {
  columns: EntityListColumn[];
  sortKey?: string;
  sortDirection?: EntityListSortDirection;
  onSortChange?: (key: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function EntityListHeader({
  columns,
  sortKey,
  sortDirection = "asc",
  onSortChange,
  className,
  style,
  ...rest
}: EntityListHeaderProps) {
  return (
    <div
      role="row"
      className={["ds-EntityListHeader", className].filter(Boolean).join(" ")}
      style={getGridStyle(columns, style)}
      {...rest}
    >
      {columns.map((column) => {
        const isActive = sortKey === column.key;
        const ariaSort = isActive ? (sortDirection === "asc" ? "ascending" : "descending") : "none";

        return (
          <div
            key={column.key}
            role="columnheader"
            aria-sort={ariaSort}
            className="ds-EntityListHeader-cell"
            data-align={column.align ?? "start"}
            style={{ "--ds-EntityListHeader-cell-offset": column.headerOffset ?? "0px" } as React.CSSProperties}
          >
            {column.sortable && onSortChange ? (
              <button
                type="button"
                className="ds-EntityListHeader-sortButton"
                data-active={isActive ? "true" : "false"}
                onClick={() => onSortChange(column.key)}
              >
                <span>{column.label}</span>
                {isActive && (
                  <span aria-hidden="true" className="ds-EntityListHeader-sortIcon">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            ) : (
              <Text as="span" size="sm" tone="muted" weight="medium">
                {column.label}
              </Text>
            )}
          </div>
        );
      })}
      <div aria-hidden="true" className="ds-EntityListHeader-trailing" />
    </div>
  );
}

export type EntityListRowProps = {
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

export function EntityListRow({
  columns,
  icon,
  title,
  detail,
  cells = [],
  trailingIcon,
  ariaLabel,
  href,
  renderLink,
  className,
  style,
  ...rest
}: EntityListRowProps) {
  const content = (
    <>
      <div className="ds-EntityListRow-cell ds-EntityListRow-primary" data-align={columns[0]?.align ?? "start"}>
        {icon && <div className="ds-EntityListRow-icon">{icon}</div>}
        <div className="ds-EntityListRow-mainContent">
          <Text as="span" size="md" weight="semibold" className="ds-EntityListRow-title">
            {title}
          </Text>
          {detail && <div className="ds-EntityListRow-detail">{detail}</div>}
        </div>
      </div>
      {columns.slice(1).map((column, index) => (
        <div
          key={column.key}
          className="ds-EntityListRow-cell"
          data-align={column.align ?? "start"}
          data-secondary="true"
        >
          <div className="ds-EntityListRow-cellContent">{cells[index] ?? null}</div>
        </div>
      ))}
      <div className="ds-EntityListRow-trailing" aria-hidden="true">
        {trailingIcon}
      </div>
    </>
  );

  const main = (
    <>
      {href ? (
        <a href={href} className="ds-EntityListRow-link" aria-label={ariaLabel}>
          {content}
        </a>
      ) : renderLink ? (
        renderLink(content, "ds-EntityListRow-link")
      ) : (
        <div className="ds-EntityListRow-static">{content}</div>
      )}
    </>
  );

  return (
    <div
      {...rest}
      className={["ds-EntityListRow group/row", className].filter(Boolean).join(" ")}
      data-clickable={href || renderLink ? "true" : "false"}
      style={getGridStyle(columns, style)}
    >
      {main}
    </div>
  );
}
