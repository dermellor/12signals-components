import * as react_jsx_runtime from 'react/jsx-runtime';
import * as lucide_react from 'lucide-react';
import * as React from 'react';

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
    size?: "default" | "sm";
    tone?: "default" | "subtle";
    loading?: boolean;
    selected?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;
declare function ActionIconButton({ action, size, tone, loading, selected, "aria-label": ariaLabel, title, className, ...rest }: ActionIconButtonProps): react_jsx_runtime.JSX.Element;

export { type ActionIcon, ActionIconButton };
