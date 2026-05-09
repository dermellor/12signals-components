import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default from 'react';
import * as lucide_react from 'lucide-react';

type ButtonProps = {
    variant?: "primary" | "ghost" | "danger" | "accent" | "success" | "link";
    size?: "xs" | "sm" | "md" | "lg";
    loading?: boolean;
    iconLeft?: React$1.ReactNode;
    iconRight?: React$1.ReactNode;
} & Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    children?: React$1.ReactNode;
};
declare function Button({ variant, size, loading, iconLeft, iconRight, children, disabled, className, ...rest }: ButtonProps): react_jsx_runtime.JSX.Element;

type TextProps<T extends keyof JSX.IntrinsicElements = 'p'> = {
    as?: T;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    weight?: "regular" | "medium" | "semibold" | "bold";
    tone?: "default" | "muted";
    children?: React$1.ReactNode;
} & Omit<React$1.ComponentPropsWithoutRef<T>, 'as' | 'children'>;
declare function Text<T extends keyof JSX.IntrinsicElements = 'p'>({ as, size, weight, tone, children, className, ...rest }: TextProps<T>): react_jsx_runtime.JSX.Element;

type CardRootProps = React$1.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "gradient";
    hover?: "none" | "glow";
};
declare function CardRoot({ children, variant, hover, className, ...rest }: CardRootProps): react_jsx_runtime.JSX.Element;
type CardHeaderProps = React$1.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "compact";
};
declare function CardHeader({ children, className, variant, ...rest }: CardHeaderProps): react_jsx_runtime.JSX.Element;
declare function CardContent({ children, className, ...rest }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
type CardTitleProps<T extends keyof JSX.IntrinsicElements = "h3"> = {
    as?: T;
} & React$1.ComponentPropsWithoutRef<T>;
declare function CardTitle<T extends keyof JSX.IntrinsicElements = "h3">({ as, children, className, ...rest }: CardTitleProps<T>): react_jsx_runtime.JSX.Element;
declare const Card: typeof CardRoot & {
    Header: typeof CardHeader;
    Content: typeof CardContent;
    Title: typeof CardTitle;
};

type TextFieldProps = {
    label: string;
    description?: string;
    error?: string;
    inputProps?: React$1.InputHTMLAttributes<HTMLInputElement>;
} & Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>;
declare function TextField({ label, description, error, inputProps, ...rest }: TextFieldProps): react_jsx_runtime.JSX.Element;

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React$1.ReactNode;
    footer?: React$1.ReactNode;
};
declare function Modal({ open, onClose, title, children, footer }: ModalProps): react_jsx_runtime.JSX.Element | null;

type BadgeProps<T extends keyof JSX.IntrinsicElements = "span"> = {
    as?: T;
    variant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary" | "homepage" | "advertising" | "advertising-outline";
    tone?: "solid" | "subtle";
    size?: "sm" | "md";
} & React$1.ComponentPropsWithoutRef<T>;
declare function Badge<T extends keyof JSX.IntrinsicElements = "span">({ as, variant, tone, size, children, ...rest }: BadgeProps<T>): react_jsx_runtime.JSX.Element;

type FilterBadgeProps = {
    label: React$1.ReactNode;
    active: boolean;
    removable?: boolean;
    onToggle: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
    variant?: "default" | "add";
    size?: "sm" | "md";
    toggleAriaLabel?: string;
    editAriaLabel?: string;
    removeAriaLabel?: string;
    children?: React$1.ReactNode;
};
declare function FilterBadge({ label, active, removable, onToggle, onEdit, onRemove, variant, size, toggleAriaLabel, editAriaLabel, removeAriaLabel, children, }: FilterBadgeProps): react_jsx_runtime.JSX.Element;

type FilterLogic = "AND" | "OR";
type FilterOperator = "after" | "before" | "between" | "equals" | "startsWith" | "contains" | "in";
type FilterFieldType = string;
type FieldInputKind = "date" | "number" | "multiEnum" | "enum" | "boolean" | "text";
interface FilterCriterion {
    kind: "criterion";
    id: string;
    type: FilterFieldType;
    operator: FilterOperator;
    dateFrom?: string;
    dateTo?: string;
    numberFrom?: number;
    numberTo?: number;
    stringValue?: string;
    stringValues?: string[];
    booleanValue?: boolean;
}
interface FilterGroup {
    kind: "group";
    id: string;
    logic: FilterLogic;
    children: FilterNode[];
}
type FilterNode = FilterCriterion | FilterGroup;
interface FilterState {
    logic: FilterLogic;
    children: FilterNode[];
}
interface FieldEnumOption {
    value: string;
    label: string;
    hint?: string;
}
interface FieldConfig {
    type: FilterFieldType;
    label: string;
    inputKind: FieldInputKind;
    enumOptions?: FieldEnumOption[];
}
/**
 * One pill in the FilterBar = one NamedFilter. Each carries its own
 * (potentially deeply nested) FilterState. Multiple NamedFilters at the
 * page level are AND-combined.
 */
interface NamedFilter {
    id: string;
    /** User-given name. Empty → render auto-summary instead. */
    name: string;
    state: FilterState;
    enabled: boolean;
}
declare function isCriterion(n: FilterNode): n is FilterCriterion;
declare function isGroup(n: FilterNode): n is FilterGroup;

declare function makeNamedFilter(initial?: Partial<NamedFilter>): NamedFilter;
declare function makeId(): string;
declare function defaultOperatorFor(kind: FieldInputKind): FilterOperator;
declare function makeCriterion(type: FilterFieldType, kind: FieldInputKind, patch?: Partial<FilterCriterion>): FilterCriterion;
declare function makeGroup(logic?: FilterLogic, prefilled?: FilterCriterion[]): FilterGroup;
declare function getDefaultFilterState(): FilterState;
declare function isCriterionActive(c: FilterCriterion): boolean;
declare function countActiveCriteria(nodes: FilterNode[]): number;
declare function matchCriterionValue(value: unknown, kind: FieldInputKind, c: FilterCriterion): boolean;
/**
 * Walk a node tree, matching each leaf criterion via the consumer-supplied
 * matchLeaf adapter. Group logic is handled here.
 */
declare function matchNode<T>(ad: T, node: FilterNode, matchLeaf: (ad: T, c: FilterCriterion) => boolean): boolean;
declare function matchState<T>(ad: T, state: FilterState, matchLeaf: (ad: T, c: FilterCriterion) => boolean): boolean;
/**
 * Auto-derived label for a NamedFilter pill. Used when the user has not
 * named the filter explicitly. Tries to be useful for the common cases
 * (1 criterion → field+value, multiple → field list, complex → count).
 */
interface SummarizeOptions {
    emptyLabel?: string;
    conditionsLabel?: (count: number) => string;
    valueLabels?: Record<FilterFieldType, Record<string, string>>;
}
declare function summarizeFilter(state: FilterState, fieldConfigs: FieldConfig[], options?: SummarizeOptions): string;
declare function updateAtPath(state: FilterState, path: string[], updater: (children: FilterNode[]) => FilterNode[]): FilterState;
declare function toggleLogicAtPath(state: FilterState, path: string[]): FilterState;
declare function getInputKind(configs: FieldConfig[], type: FilterFieldType): FieldInputKind;

interface ParseFiltersOptions {
    /**
     * Map legacy field-type keys to current ones, e.g. { adGroup: "creativeGroup" }.
     * Applied during decode so old URLs keep deserializing after a rename.
     */
    renameTypes?: Record<string, string>;
}
declare function serializeFilters(filters: NamedFilter[]): string;
declare function parseFilters(encoded: string | null | undefined, options?: ParseFiltersOptions): NamedFilter[];

/**
 * All user-facing strings used by the filter components. Each consumer
 * passes a `labels` prop to FilterBar; missing keys fall back to the
 * English defaults below. To localize, wrap your `t(...)` calls into a
 * matching object.
 */
interface FilterBarLabels {
    enable: string;
    disable: string;
    addFilter: string;
    edit: string;
    remove: string;
    emptyLabel: string;
    editorTitle: string;
    editorName: string;
    editorDone: string;
    editorDelete: string;
    editorEmpty: string;
    editorConditions: (count: number) => string;
    add: string;
    addCondition: string;
    addGroup: string;
    removeGroup: string;
    toggleLogic: string;
    groupLabel: (logic: FilterLogic) => string;
    logic: (logic: FilterLogic) => string;
    dimensionAriaLabel: string;
    operatorAriaLabel: string;
    dateFromAriaLabel: string;
    dateToAriaLabel: string;
    searchPlaceholder: string;
    pickValue: string;
    pickValues: string;
    yes: string;
    no: string;
    and: string;
    noResults: string;
    nSelected: (count: number) => string;
    opAtLeast: string;
    opAtMost: string;
    opBetween: string;
    opContains: string;
    opStartsWith: string;
    opEquals: string;
    opAfter: string;
    opBefore: string;
}
declare const defaultFilterBarLabels: FilterBarLabels;
declare function resolveFilterBarLabels(partial?: Partial<FilterBarLabels>): FilterBarLabels;

type Props$8 = {
    criterion: FilterCriterion;
    fieldConfigs: FieldConfig[];
    labels: FilterBarLabels;
    onUpdate: (patch: Partial<FilterCriterion>) => void;
    onRemove: () => void;
};
declare function CriterionRow({ criterion, fieldConfigs, labels, onUpdate, onRemove }: Props$8): react_jsx_runtime.JSX.Element;

type Props$7 = {
    nodes: FilterNode[];
    logic: FilterLogic;
    fieldConfigs: FieldConfig[];
    defaultType: FilterFieldType;
    labels: FilterBarLabels;
    onSetState: React$1.Dispatch<React$1.SetStateAction<FilterState>>;
    parentPath: string[];
};
declare function FilterNodeList({ nodes, logic, fieldConfigs, defaultType, labels, onSetState, parentPath, }: Props$7): react_jsx_runtime.JSX.Element;

type Props$6 = {
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
declare function FilterEditor({ open, filter, fieldConfigs, defaultType, labels, onChange, onClose, onRemove, }: Props$6): react_jsx_runtime.JSX.Element | null;

type SystemBadge = {
    id: string;
    label: string;
    active: boolean;
    onToggle: () => void;
};
type Props$5 = {
    filters: NamedFilter[];
    onChange: (next: NamedFilter[]) => void;
    fieldConfigs: FieldConfig[];
    defaultType?: FilterFieldType;
    systemBadges?: SystemBadge[];
    /** Override any subset of the default English labels. */
    labels?: Partial<FilterBarLabels>;
    /** Section aria-label. Defaults to "Filters". */
    sectionAriaLabel?: string;
};
declare function FilterBar({ filters, onChange, fieldConfigs, defaultType, systemBadges, labels: labelsProp, sectionAriaLabel, }: Props$5): react_jsx_runtime.JSX.Element;

declare const Input: React$1.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    invalid?: boolean;
} & React$1.InputHTMLAttributes<HTMLInputElement> & React$1.RefAttributes<HTMLInputElement>>;

declare const DateTimeInput: React$1.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    invalid?: boolean;
} & Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & React$1.RefAttributes<HTMLInputElement>>;

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
    triggerProps?: Omit<React$1.ComponentProps<typeof Button>, "children" | "onClick" | "disabled" | "size" | "variant">;
};
declare function DateTimeModalInput({ label, value, onSave, displayValue, emptyLabel, size, disabled, saving, saveLabel, cancelLabel, triggerProps, }: DateTimeModalInputProps): react_jsx_runtime.JSX.Element;

declare const Select: React$1.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    variant?: "default" | "plain";
    children?: React$1.ReactNode;
} & React$1.SelectHTMLAttributes<HTMLSelectElement> & React$1.RefAttributes<HTMLSelectElement>>;
declare const SelectOption: (props: React$1.OptionHTMLAttributes<HTMLOptionElement> & {
    children?: React$1.ReactNode;
}) => react_jsx_runtime.JSX.Element;

type SelectMenuOption = {
    value: string;
    label: React$1.ReactNode;
    disabled?: boolean;
};
type SelectMenuProps = {
    options: SelectMenuOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    align?: "left" | "right";
    label?: React$1.ReactNode;
    className?: string;
};
declare function SelectMenu({ options, value, onValueChange, ariaLabel, align, label, className, }: SelectMenuProps): react_jsx_runtime.JSX.Element;

type TableStickyPosition = "start" | "end";
type StickyPosition = TableStickyPosition;
declare const TableContainer: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const Table: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableElement> & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React$1.ForwardRefExoticComponent<React$1.ThHTMLAttributes<HTMLTableCellElement> & {
    sticky?: StickyPosition;
} & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React$1.ForwardRefExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & {
    sticky?: StickyPosition;
} & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCaptionElement> & React$1.RefAttributes<HTMLTableCaptionElement>>;

type MatrixColumnRole = "dimension" | "control" | "metric" | "action";
type MatrixAlign = "left" | "center" | "right";
type MatrixTableShellProps = React$1.HTMLAttributes<HTMLDivElement>;
declare const MatrixTableShell: React$1.ForwardRefExoticComponent<MatrixTableShellProps & React$1.RefAttributes<HTMLDivElement>>;
declare const MatrixTableToolbar: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
type MatrixViewControlProps = React$1.HTMLAttributes<HTMLDivElement> & {
    label: React$1.ReactNode;
};
declare function MatrixViewControl({ className, label, children, ...rest }: MatrixViewControlProps): react_jsx_runtime.JSX.Element;
declare const MatrixTableContainer: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const MatrixTable: React$1.ForwardRefExoticComponent<React$1.TableHTMLAttributes<HTMLTableElement> & React$1.RefAttributes<HTMLTableElement>>;
declare const MatrixTableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const MatrixTableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const MatrixTableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
declare const MatrixTableHead: React$1.ForwardRefExoticComponent<React$1.ThHTMLAttributes<HTMLTableCellElement> & {
    columnRole?: MatrixColumnRole;
    depth?: number;
    align?: MatrixAlign;
    separator?: boolean;
} & React$1.RefAttributes<HTMLTableCellElement>>;
declare const MatrixTableCell: React$1.ForwardRefExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & {
    columnRole?: MatrixColumnRole;
    depth?: number;
    align?: MatrixAlign;
    separator?: boolean;
    repeated?: boolean;
} & React$1.RefAttributes<HTMLTableCellElement>>;
type MatrixColumnLabelProps = React$1.HTMLAttributes<HTMLDivElement> & {
    depth?: number;
};
declare function MatrixColumnLabel({ className, depth, children, ...rest }: MatrixColumnLabelProps): react_jsx_runtime.JSX.Element;
type MatrixTableActionProps<T extends React$1.ElementType = "button"> = {
    as?: T;
    icon: React$1.ReactNode;
    label: React$1.ReactNode;
    className?: string;
} & Omit<React$1.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;
declare function MatrixTableAction<T extends React$1.ElementType = "button">({ as, icon, label, className, ...rest }: MatrixTableActionProps<T>): react_jsx_runtime.JSX.Element;
type MatrixDrilldownOption = {
    value: string;
    label: React$1.ReactNode;
    disabled?: boolean;
};
type MatrixDrilldownMenuProps = {
    options: MatrixDrilldownOption[];
    onValueChange?: (value: string) => void;
    label: React$1.ReactNode;
    ariaLabel: string;
    align?: "left" | "right";
    disabled?: boolean;
    className?: string;
};
declare function MatrixDrilldownMenu({ options, onValueChange, label, ariaLabel, align, disabled, className, }: MatrixDrilldownMenuProps): react_jsx_runtime.JSX.Element;
type MatrixDrilldownPathItem = {
    id: string;
    label: React$1.ReactNode;
    value: React$1.ReactNode;
};
type MatrixDrilldownPathProps = React$1.HTMLAttributes<HTMLDivElement> & {
    items: MatrixDrilldownPathItem[];
    resetLabel: React$1.ReactNode;
    onReset: () => void;
};
declare function MatrixDrilldownPath({ items, resetLabel, onReset, className, ...rest }: MatrixDrilldownPathProps): react_jsx_runtime.JSX.Element;

type TabsRootProps = {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    children?: React$1.ReactNode;
} & React$1.HTMLAttributes<HTMLDivElement>;
declare function TabsRoot({ value, defaultValue, onValueChange, children, ...rest }: TabsRootProps): react_jsx_runtime.JSX.Element;
declare function TabsList({ children, ...rest }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
type TabsTriggerProps = {
    value: string;
    children?: React$1.ReactNode;
} & React$1.ButtonHTMLAttributes<HTMLButtonElement>;
declare function TabsTrigger({ value, children, ...rest }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
type TabsContentProps = {
    value: string;
    children?: React$1.ReactNode;
} & React$1.HTMLAttributes<HTMLDivElement>;
declare function TabsContent({ value, children, ...rest }: TabsContentProps): react_jsx_runtime.JSX.Element | null;
declare const Tabs: typeof TabsRoot & {
    List: typeof TabsList;
    Trigger: typeof TabsTrigger;
    Content: typeof TabsContent;
};

type AlertProps = {
    variant?: "info" | "success" | "warning" | "danger";
    title?: React$1.ReactNode;
    children?: React$1.ReactNode;
} & React$1.HTMLAttributes<HTMLDivElement>;
declare function Alert({ variant, title, children, ...rest }: AlertProps): react_jsx_runtime.JSX.Element;

type DialogProps = React$1.ComponentProps<typeof Modal>;
declare function Dialog(props: DialogProps): react_jsx_runtime.JSX.Element;

type TooltipProps = {
    content: React$1.ReactNode;
    children: React$1.ReactElement;
    className?: string;
    style?: React$1.CSSProperties;
    multiline?: boolean;
};
declare function Tooltip({ content, children, className, style, multiline }: TooltipProps): react_jsx_runtime.JSX.Element;

type ToastItem = {
    id: number;
    title?: React$1.ReactNode;
    description?: React$1.ReactNode;
    variant?: "info" | "success" | "warning" | "danger";
};
type ToastContextType = {
    show: (t: Omit<ToastItem, 'id'>) => void;
};
declare function ToastProvider({ children }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useToast(): ToastContextType;

type SeparatorProps = {
    orientation?: "horizontal" | "vertical";
} & React$1.HTMLAttributes<HTMLDivElement>;
declare function Separator({ orientation, ...rest }: SeparatorProps): react_jsx_runtime.JSX.Element;

type SkeletonProps = React$1.HTMLAttributes<HTMLDivElement> & {
    round?: boolean;
};
declare function Skeleton({ round, style, ...rest }: SkeletonProps): react_jsx_runtime.JSX.Element;

type PageHeaderProps = {
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    actions?: React$1.ReactNode;
} & React$1.HTMLAttributes<HTMLDivElement>;
declare function PageHeader({ title, subtitle, actions, ...rest }: PageHeaderProps): react_jsx_runtime.JSX.Element;

type ActivityCardProps = {
    icon?: React$1.ReactNode;
    title: string;
    titleNode?: React$1.ReactNode;
    headline?: string;
    competitorIcon?: React$1.ReactNode;
    categoryLabel?: string;
    categoryVariant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary" | "homepage" | "advertising";
    categoryTone?: "solid" | "subtle";
    extraBadges?: React$1.ReactNode;
    meta?: string;
    description?: React$1.ReactNode;
    media?: React$1.ReactNode;
    timestamp?: string;
    href?: string;
    ariaLabel?: string;
    hover?: "none" | "glow";
};
declare function ActivityCard({ icon, title, titleNode, headline, competitorIcon, categoryLabel, categoryVariant, categoryTone, extraBadges, meta, description, media, timestamp, href, ariaLabel, hover, }: ActivityCardProps): react_jsx_runtime.JSX.Element;

type EntityListSortDirection = "asc" | "desc";
type EntityListColumn = {
    key: string;
    label: React$1.ReactNode;
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
} & React$1.HTMLAttributes<HTMLDivElement>;
declare function EntityListHeader({ columns, sortKey, sortDirection, onSortChange, className, style, ...rest }: EntityListHeaderProps): react_jsx_runtime.JSX.Element;
type EntityListRowProps = {
    columns: EntityListColumn[];
    icon?: React$1.ReactNode;
    title: React$1.ReactNode;
    cells?: React$1.ReactNode[];
    trailingIcon?: React$1.ReactNode;
    ariaLabel?: string;
    href?: string;
    renderLink?: (children: React$1.ReactNode, className: string) => React$1.ReactNode;
} & Omit<React$1.HTMLAttributes<HTMLDivElement>, "title">;
declare function EntityListRow({ columns, icon, title, cells, trailingIcon, ariaLabel, href, renderLink, className, style, ...rest }: EntityListRowProps): react_jsx_runtime.JSX.Element;

type RichTextProps = React$1.HTMLAttributes<HTMLDivElement> & {
    as?: keyof JSX.IntrinsicElements;
    children?: React$1.ReactNode;
};
declare function RichText({ as, children, ...rest }: RichTextProps): react_jsx_runtime.JSX.Element;

type DevButtonProps = React$1.ButtonHTMLAttributes<HTMLButtonElement>;
declare function DevButton({ children, type, ...rest }: DevButtonProps): react_jsx_runtime.JSX.Element;

type TagProps = {
    children: React$1.ReactNode;
    onRemove?: () => void;
    removeAriaLabel?: string;
};
declare function Tag({ children, onRemove, removeAriaLabel }: TagProps): react_jsx_runtime.JSX.Element;
type TagListProps = {
    tags: string[];
    onRemove?: (tag: string, index: number) => void;
    emptyLabel?: React$1.ReactNode;
};
declare function TagList({ tags, onRemove, emptyLabel }: TagListProps): react_jsx_runtime.JSX.Element;
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
declare function TagField({ label, values, onChange, description, error, placeholder, disabled, addOnBlur, ariaLabel, }: TagFieldProps): react_jsx_runtime.JSX.Element;

type BarChartGroupVariant = "primary" | "accent" | "success" | "warning" | "secondary" | "neutral";
type BarChartGroupMeta = {
    id: string;
    label: string;
    variant?: BarChartGroupVariant;
    tintIndex?: number;
};
type BarChartDataPoint = {
    label: string;
    value: number;
    detail?: string;
} | {
    label: string;
    detail?: string;
    groups: {
        id: string;
        value: number;
        detail?: string;
    }[];
};
type BarChartProps = {
    data: BarChartDataPoint[];
    ariaLabel: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    valueFormatter?: (value: number) => string;
    groups?: BarChartGroupMeta[];
    /** Optional filter — tooltip is only shown when this returns true for the hovered label */
    tooltipFilter?: (label: string) => boolean;
};
declare function BarChart({ data, ariaLabel, xAxisLabel, yAxisLabel, valueFormatter, groups: providedGroups, tooltipFilter, }: BarChartProps): react_jsx_runtime.JSX.Element;

type PieChartSliceVariant = "primary" | "accent" | "success" | "warning" | "secondary" | "neutral";
type PieChartSlice = {
    id: string;
    label: string;
    value: number;
    detail?: string;
    variant?: PieChartSliceVariant;
};
type PieChartCenterLabel = {
    value: string;
    description?: string;
};
type PieChartProps = {
    data: PieChartSlice[];
    ariaLabel: string;
    valueFormatter?: (value: number) => string;
    centerLabel?: PieChartCenterLabel;
    showLegend?: boolean;
    variant?: "default" | "plain";
};
declare function PieChart({ data, ariaLabel, valueFormatter, centerLabel, showLegend, variant, }: PieChartProps): react_jsx_runtime.JSX.Element | null;

type TabNavItem = {
    value: string;
    label: string;
    description?: string;
    badge?: React$1.ReactNode;
};
type TabNavProps = {
    items: TabNavItem[];
    value: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    className?: string;
    style?: React$1.CSSProperties;
};
declare function TabNav({ items, value, onValueChange, ariaLabel, className, style }: TabNavProps): react_jsx_runtime.JSX.Element;

declare const actionMeta: {
    readonly view: {
        readonly label: "Ansehen";
        readonly Icon: lucide_react.LucideIcon;
    };
    readonly delete: {
        readonly label: "Löschen";
        readonly Icon: lucide_react.LucideIcon;
    };
    readonly save: {
        readonly label: "Speichern";
        readonly Icon: lucide_react.LucideIcon;
    };
    readonly edit: {
        readonly label: "Editieren";
        readonly Icon: lucide_react.LucideIcon;
    };
    readonly deactivate: {
        readonly label: "Deaktivieren";
        readonly Icon: lucide_react.LucideIcon;
    };
    readonly star: {
        readonly label: "Stern setzen";
        readonly Icon: lucide_react.LucideIcon;
    };
};
type ActionIcon = keyof typeof actionMeta;
type ActionIconButtonProps = {
    action: ActionIcon;
    loading?: boolean;
    selected?: boolean;
} & Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, "children">;
declare function ActionIconButton({ action, loading, selected, "aria-label": ariaLabel, title, ...rest }: ActionIconButtonProps): react_jsx_runtime.JSX.Element;

type InlineEditButtonProps = Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, "children">;
declare function InlineEditButton({ "aria-label": ariaLabel, title, ...rest }: InlineEditButtonProps): react_jsx_runtime.JSX.Element;

type NavigationItem = {
    value: string;
    label: string;
    description?: string;
    icon?: React$1.ReactNode;
    badge?: React$1.ReactNode;
    href?: string;
    disabled?: boolean;
    onSelect?: (value: string) => void;
};
type NavigationProps = {
    items: NavigationItem[];
    value?: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    orientation?: "vertical" | "horizontal";
    className?: string;
    style?: React$1.CSSProperties;
};
declare function Navigation({ items, value, onValueChange, ariaLabel, orientation, className, style, }: NavigationProps): react_jsx_runtime.JSX.Element;

type NavigationBarProps = {
    title?: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    brand?: React$1.ReactNode;
    brandAccessory?: React$1.ReactNode;
    leading?: React$1.ReactNode;
    actions?: React$1.ReactNode;
    leadingPosition?: "left" | "right";
} & React$1.HTMLAttributes<HTMLElement>;
declare function NavigationBar({ title, subtitle, brand, brandAccessory, leading, actions, leadingPosition, className, ...rest }: NavigationBarProps): react_jsx_runtime.JSX.Element;

type NavigationBrandProps = {
    href?: string;
    logo?: React$1.ReactNode;
    label?: React$1.ReactNode;
} & React$1.HTMLAttributes<HTMLElement>;
declare function NavigationBrand({ href, logo, label, className, ...rest }: NavigationBrandProps): react_jsx_runtime.JSX.Element;

type NavigationToggleProps = {
    ariaLabel?: string;
    icon?: React$1.ReactNode;
} & React$1.ButtonHTMLAttributes<HTMLButtonElement>;
declare function NavigationToggle({ ariaLabel, icon, ...rest }: NavigationToggleProps): react_jsx_runtime.JSX.Element;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = {
    level?: HeadingLevel;
} & React$1.HTMLAttributes<HTMLHeadingElement>;
declare function Heading({ level, className, children, ...rest }: HeadingProps): react_jsx_runtime.JSX.Element;

type LogoVariant = "default" | "inverted" | "monochrome";
type LogoProps = {
    /** Logo color variant */
    variant?: LogoVariant;
    size?: number | string;
    /** URL to SVG sprite file. When set, renders <use href> instead of inline SVG. */
    sprite?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns" | "width" | "height">;
declare function Logo({ variant, size, sprite, className, style, ...rest }: LogoProps): react_jsx_runtime.JSX.Element;
declare const LOGO_VARIANTS: {
    value: LogoVariant;
    label: string;
}[];

type WordmarkProps = {
    /** Height controls size (width derives from aspect ratio) */
    height?: number | string;
    className?: string;
    /** URL to SVG sprite file. When set, renders <use href> instead of inline SVG. */
    sprite?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns">;
declare function Wordmark({ height, className, sprite, style, ...rest }: WordmarkProps): react_jsx_runtime.JSX.Element;

type BreadcrumbItem = {
    label: string;
    href?: string;
};
type BreadcrumbProps = {
    items: BreadcrumbItem[];
    renderLink?: (href: string, children: React$1.ReactNode) => React$1.ReactNode;
    className?: string;
    style?: React$1.CSSProperties;
};
declare function Breadcrumb({ items, renderLink, className, style }: BreadcrumbProps): react_jsx_runtime.JSX.Element;

declare const tokens: {
    readonly color: {
        readonly primary: {
            readonly bg: "var(--color-primary-bg)";
            readonly fg: "var(--color-primary-fg)";
        };
        readonly neutral: {
            readonly bg: "var(--color-neutral-bg)";
            readonly fg: "var(--color-neutral-fg)";
        };
        readonly danger: {
            readonly bg: "var(--color-danger-bg)";
            readonly fg: "var(--color-danger-fg)";
        };
        readonly success: {
            readonly bg: "var(--color-success-bg)";
            readonly fg: "var(--color-success-fg)";
        };
        readonly warning: {
            readonly bg: "var(--color-warning-bg)";
            readonly fg: "var(--color-warning-fg)";
        };
        readonly accent: {
            readonly bg: "var(--color-accent-bg)";
            readonly fg: "var(--color-accent-fg)";
        };
        readonly secondary: {
            readonly bg: "var(--color-secondary-bg)";
            readonly fg: "var(--color-secondary-fg)";
        };
        readonly border: {
            readonly default: "var(--color-border-default)";
        };
    };
    readonly space: {
        readonly xs: "var(--space-xs)";
        readonly sm: "var(--space-sm)";
        readonly md: "var(--space-md)";
        readonly lg: "var(--space-lg)";
        readonly xl: "var(--space-xl)";
    };
    readonly radius: {
        readonly sm: "var(--radius-sm)";
        readonly md: "var(--radius-md)";
        readonly lg: "var(--radius-lg)";
        readonly pill: "var(--radius-pill)";
    };
    readonly font: {
        readonly base: "var(--font-base)";
    };
    readonly shadow: {
        readonly sm: "var(--shadow-sm)";
        readonly md: "var(--shadow-md)";
    };
};

type ClaimRange = {
    claim: string;
    from: string;
    to: string | null;
};
type NormalClaimEntry = {
    kind: "normal";
    range: ClaimRange;
};
type ABTestGroup = {
    kind: "abtest";
    ranges: ClaimRange[];
    variants: {
        key: string;
        displayClaim: string;
    }[];
    from: string;
    to: string | null;
};
type TimelineEntry = NormalClaimEntry | ABTestGroup;
declare const AB_TEST_COLORS: {
    bg: string;
    border: string;
}[];
declare const claimCompareKey: (txt: string) => string;
/**
 * Detect A/B test patterns: exactly 2 claims flipping back and forth rapidly
 * (>=4 ranges, both claims appearing >=2 times). Single reverts or slowly
 * iterating through different claims are NOT flagged as A/B tests.
 */
declare function detectABTestGroups(ranges: ClaimRange[]): TimelineEntry[];

type Props$4 = {
    claimRanges: ClaimRange[];
    loading?: boolean;
    error?: boolean;
    /** Locale for date formatting (default "de-DE") */
    locale?: string;
    /** Months between tick labels (default: auto based on range) */
    tickInterval?: number;
    /** Optional loading spinner element (e.g. lucide Loader2) */
    loadingIcon?: React__default.ReactNode;
};
declare function ClaimTimeline({ claimRanges, loading, error, locale, tickInterval, loadingIcon, }: Props$4): react_jsx_runtime.JSX.Element;

type KpiEntry = {
    value: number;
    unit: string;
    period?: string;
    qualifier?: "exact" | "approximately" | "over" | "under" | "projected";
    reported_at?: string;
    context?: string;
    source_url?: string;
    source_title?: string;
    source_authority?: "first_party" | "linkedin" | null;
    outlier?: boolean;
};
type KpiSnapshot = {
    metrics: Record<string, KpiEntry[]>;
};
declare function formatKpiValue(value: number, unit: string, locale?: string): string;
declare function qualifierPrefix(qualifier?: string): string;
declare function getRevenue(snapshot: KpiSnapshot | null): {
    entry: KpiEntry;
    key: string;
} | null;
declare function getEmployees(snapshot: KpiSnapshot | null): KpiEntry | null;
/**
 * Returns the most relevant audience metric.
 * For B2C products (high user counts or extreme user/customer ratio),
 * users_total is more meaningful than customers_total.
 */
declare function getCustomers(snapshot: KpiSnapshot | null): {
    entry: KpiEntry;
    key: string;
} | null;
declare function getRevenueGrowthYoY(snapshot: KpiSnapshot | null): KpiEntry | null;
type KpiCategoryDef = {
    category: string;
    label: string;
};
declare const KPI_CATEGORIES: Record<string, KpiCategoryDef>;
declare const CATEGORY_LABELS: Record<string, string>;
declare function getKpiSnapshot(competitor: Record<string, unknown>): KpiSnapshot | null;

type JobFunctionVariant = "primary" | "accent" | "success" | "warning" | "secondary" | "neutral";
declare const UNKNOWN_JOB_FUNCTION_CODE = "__unknown";
declare const JOB_FUNCTION_LABELS: Record<string, string>;
declare const JOB_FUNCTION_VARIANT_MAP: Record<string, JobFunctionVariant>;

type Props$3 = {
    /** lucide-react icon component */
    icon: React__default.ComponentType<{
        className?: string;
    }>;
    label: string;
    entry: KpiEntry | null;
    /** Locale for number formatting (default "de-DE") */
    locale?: string;
    /** External link icon component (optional, for source links) */
    externalLinkIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Hide the period/year below the value */
    hidePeriod?: boolean;
};
declare function KpiCard({ icon: Icon, label, entry, locale, externalLinkIcon: ExternalLinkIcon, hidePeriod, }: Props$3): react_jsx_runtime.JSX.Element;

type Props$2 = {
    name: string;
    domain?: string | null;
    brandfetchClientId?: string;
    size?: number;
    deferUnavailableCacheRead?: boolean;
};
declare function CompetitorLogo({ name, domain, brandfetchClientId, size, deferUnavailableCacheRead }: Props$2): react_jsx_runtime.JSX.Element;

type JobFunctionMeta = {
    id: string;
    label: string;
    variant: JobFunctionVariant;
    tintIndex?: number;
};
type WeeklyJobPoint = {
    label: string;
    detail: string;
    groups: {
        id: string;
        value: number;
        detail: string;
    }[];
};
type JobLifecycleInput = {
    first_detected: string | null;
    ended: string | null;
    linkedin_job_function_code: string | null;
};
declare const startOfIsoWeek: (date: Date) => Date;
declare const addDays: (date: Date, days: number) => Date;
declare const addWeeks: (date: Date, weeks: number) => Date;
declare const getIsoWeekMeta: (date: Date) => {
    week: number;
    year: number;
};
declare function formatJobCount(value: number, locale?: string): string;
declare function buildWeeklyJobData(jobs: JobLifecycleInput[], maxWeeks?: number, locale?: "en" | "de"): {
    weeklyJobData: WeeklyJobPoint[];
    jobFunctionGroups: JobFunctionMeta[];
};

type Props$1 = {
    name: string;
    website?: string | null;
    linkedinUrl?: string | null;
    description?: string | null;
    currentClaim?: string | null;
    /** Icon for external links (e.g. lucide ExternalLink) */
    externalLinkIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for positioning quote (e.g. lucide MessageSquareQuote) */
    quoteIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for LinkedIn (e.g. lucide Linkedin) */
    linkedinIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Optional sidebar content (e.g. leadership section in app) */
    sidebar?: React__default.ReactNode;
};
declare function CompetitorInfoCard({ name, website, linkedinUrl, description, currentClaim, externalLinkIcon: ExternalLinkIcon, quoteIcon: QuoteIcon, linkedinIcon: LinkedinIcon, sidebar, }: Props$1): react_jsx_runtime.JSX.Element;

type FunctionBreakdown = {
    label: string;
    count: number;
};
type CategorySegment = {
    variant: JobFunctionVariant;
    label: string;
    count: number;
    percent: number;
    functions: FunctionBreakdown[];
};
type ActiveJob = {
    linkedin_job_function_code: string | null;
};
type JobLifecycleEntry = {
    first_detected: string | null;
    ended: string | null;
};
declare function buildCategorySegments(jobs: ActiveJob[]): CategorySegment[];
type Props = {
    /** Pre-computed segments, or pass activeJobs to compute automatically */
    segments?: CategorySegment[];
    /** Active jobs — used to compute segments if not provided */
    activeJobs?: ActiveJob[];
    /** Total active job count (overrides activeJobs.length) */
    activeJobCount?: number | null;
    /** Job lifecycle data for trend calculation */
    jobLifecycle?: JobLifecycleEntry[];
    /** Employee KPI entry */
    employees: KpiEntry | null;
    /** Icon for employees stat (e.g. lucide Building2) */
    employeesIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for open roles stat (e.g. lucide Briefcase) */
    rolesIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for trending up (e.g. lucide TrendingUp) */
    trendUpIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for trending down (e.g. lucide TrendingDown) */
    trendDownIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for no change (e.g. lucide Minus) */
    unchangedIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Hide the period/year below the employees value */
    hidePeriod?: boolean;
};
declare function HiringOverview({ segments: segmentsProp, activeJobs, activeJobCount, jobLifecycle, employees, employeesIcon: EmployeesIcon, rolesIcon: RolesIcon, trendUpIcon: TrendUpIcon, trendDownIcon: TrendDownIcon, unchangedIcon: UnchangedIcon, hidePeriod, }: Props): react_jsx_runtime.JSX.Element;

export { type ABTestGroup, AB_TEST_COLORS, type ActionIcon, ActionIconButton, type ActiveJob, ActivityCard, Alert, Badge, BarChart, type BarChartDataPoint, type BarChartGroupMeta, type BarChartGroupVariant, Breadcrumb, type BreadcrumbItem, Button, CATEGORY_LABELS, Card, type CategorySegment, type ClaimRange, ClaimTimeline, CompetitorInfoCard, CompetitorLogo, CriterionRow, DateTimeInput, DateTimeModalInput, DevButton, Dialog, type EntityListColumn, EntityListHeader, type EntityListHeaderProps, EntityListRow, type EntityListRowProps, type EntityListSortDirection, type FieldConfig, type FieldEnumOption, type FieldInputKind, FilterBadge, FilterBar, type FilterBarLabels, type FilterCriterion, FilterEditor, type FilterFieldType, type FilterGroup, type FilterLogic, type FilterNode, FilterNodeList, type FilterOperator, type FilterState, Heading, HiringOverview, InlineEditButton, Input, JOB_FUNCTION_LABELS, JOB_FUNCTION_VARIANT_MAP, type JobFunctionMeta, type JobFunctionVariant, type JobLifecycleEntry, type JobLifecycleInput, KPI_CATEGORIES, KpiCard, type KpiCategoryDef, type KpiEntry, type KpiSnapshot, LOGO_VARIANTS, Logo, MatrixColumnLabel, MatrixDrilldownMenu, type MatrixDrilldownOption, MatrixDrilldownPath, type MatrixDrilldownPathItem, MatrixTable, MatrixTableAction, MatrixTableBody, MatrixTableCell, MatrixTableContainer, MatrixTableHead, MatrixTableHeader, MatrixTableRow, MatrixTableShell, MatrixTableToolbar, MatrixViewControl, Modal, type NamedFilter, Navigation, NavigationBar, NavigationBrand, type NavigationItem, NavigationToggle, type NormalClaimEntry, PageHeader, type ParseFiltersOptions, PieChart, type PieChartCenterLabel, type PieChartSlice, type PieChartSliceVariant, RichText, Select, SelectMenu, type SelectMenuOption, SelectOption, Separator, Skeleton, type SummarizeOptions, type SystemBadge, TabNav, type TabNavItem, Table, TableBody, TableCaption, TableCell, TableContainer, TableFooter, TableHead, TableHeader, TableRow, type TableStickyPosition, Tabs, Tag, TagField, TagList, Text, TextField, type TimelineEntry, ToastProvider, Tooltip, UNKNOWN_JOB_FUNCTION_CODE, type WeeklyJobPoint, Wordmark, addDays, addWeeks, buildCategorySegments, buildWeeklyJobData, claimCompareKey, countActiveCriteria, defaultFilterBarLabels, defaultOperatorFor, detectABTestGroups, formatJobCount, formatKpiValue, getCustomers, getDefaultFilterState, getEmployees, getInputKind, getIsoWeekMeta, getKpiSnapshot, getRevenue, getRevenueGrowthYoY, isCriterion, isCriterionActive, isGroup, makeCriterion, makeGroup, makeId, makeNamedFilter, matchCriterionValue, matchNode, matchState, parseFilters, qualifierPrefix, resolveFilterBarLabels, serializeFilters, startOfIsoWeek, summarizeFilter, toggleLogicAtPath, tokens, updateAtPath, useToast };
