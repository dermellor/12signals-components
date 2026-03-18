import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default from 'react';
import * as lucide_react from 'lucide-react';

type ButtonProps = {
    variant?: "primary" | "ghost" | "danger" | "accent" | "success" | "link";
    size?: "sm" | "md" | "lg";
    iconLeft?: React$1.ReactNode;
    iconRight?: React$1.ReactNode;
} & React$1.ButtonHTMLAttributes<HTMLButtonElement>;
declare function Button({ variant, size, iconLeft, iconRight, children, ...rest }: ButtonProps): react_jsx_runtime.JSX.Element;

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
declare function CardHeader({ children, className, ...rest }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
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
    variant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary";
    tone?: "solid" | "subtle";
    size?: "sm" | "md";
} & React$1.ComponentPropsWithoutRef<T>;
declare function Badge<T extends keyof JSX.IntrinsicElements = "span">({ as, variant, tone, size, children, ...rest }: BadgeProps<T>): react_jsx_runtime.JSX.Element;

declare const Input: React$1.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    invalid?: boolean;
} & React$1.InputHTMLAttributes<HTMLInputElement> & React$1.RefAttributes<HTMLInputElement>>;

declare const DateTimeInput: React$1.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    invalid?: boolean;
} & Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & React$1.RefAttributes<HTMLInputElement>>;

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
    categoryLabel?: string;
    categoryVariant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary";
    categoryTone?: "solid" | "subtle";
    meta?: string;
    description?: React$1.ReactNode;
    timestamp?: string;
    href?: string;
    ariaLabel?: string;
    hover?: "none" | "glow";
};
declare function ActivityCard({ icon, title, titleNode, categoryLabel, categoryVariant, categoryTone, meta, description, timestamp, href, ariaLabel, hover, }: ActivityCardProps): react_jsx_runtime.JSX.Element;

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
};
declare function BarChart({ data, ariaLabel, xAxisLabel, yAxisLabel, valueFormatter, groups: providedGroups, }: BarChartProps): react_jsx_runtime.JSX.Element;

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

type Props = {
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
declare function ClaimTimeline({ claimRanges, loading, error, locale, tickInterval, loadingIcon, }: Props): react_jsx_runtime.JSX.Element;

export { type ABTestGroup, AB_TEST_COLORS, type ActionIcon, ActionIconButton, ActivityCard, Alert, Badge, BarChart, type BarChartDataPoint, type BarChartGroupMeta, type BarChartGroupVariant, Breadcrumb, type BreadcrumbItem, Button, Card, type ClaimRange, ClaimTimeline, DateTimeInput, DateTimeModalInput, DevButton, Dialog, Heading, Input, LOGO_VARIANTS, Logo, Modal, Navigation, NavigationBar, NavigationBrand, type NavigationItem, NavigationToggle, type NormalClaimEntry, PageHeader, PieChart, type PieChartCenterLabel, type PieChartSlice, type PieChartSliceVariant, RichText, Select, SelectMenu, type SelectMenuOption, SelectOption, Separator, Skeleton, TabNav, type TabNavItem, Table, TableBody, TableCaption, TableCell, TableContainer, TableFooter, TableHead, TableHeader, TableRow, type TableStickyPosition, Tabs, Tag, TagField, TagList, Text, TextField, type TimelineEntry, ToastProvider, Tooltip, Wordmark, claimCompareKey, detectABTestGroups, tokens, useToast };
