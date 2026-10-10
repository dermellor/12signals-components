import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type TabsRootProps = {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
declare function TabsRoot({ value, defaultValue, onValueChange, children, ...rest }: TabsRootProps): react_jsx_runtime.JSX.Element;
declare function TabsList({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
type TabsTriggerProps = {
    value: string;
    children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
declare function TabsTrigger({ value, children, ...rest }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
type TabsContentProps = {
    value: string;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
declare function TabsContent({ value, children, ...rest }: TabsContentProps): react_jsx_runtime.JSX.Element | null;
declare const Tabs: typeof TabsRoot & {
    List: typeof TabsList;
    Trigger: typeof TabsTrigger;
    Content: typeof TabsContent;
};

export { Tabs };
