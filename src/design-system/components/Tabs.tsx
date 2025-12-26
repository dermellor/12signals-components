import * as React from "react";

type TabsContextType = {
  value: string;
  onChange: (v: string) => void;
};
const TabsCtx = React.createContext<TabsContextType | null>(null);

type TabsRootProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function TabsRoot({ value, defaultValue, onValueChange, children, ...rest }: TabsRootProps) {
  const [internal, setInternal] = React.useState(defaultValue || "");
  const isControlled = value !== undefined;
  const current = isControlled ? (value as string) : internal;
  const set = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsCtx.Provider value={{ value: current, onChange: set }}>
      <div className="ds-Tabs" {...rest}>{children}</div>
    </TabsCtx.Provider>
  );
}

function TabsList({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="ds-TabsList" role="tablist" {...rest}>{children}</div>;
}

type TabsTriggerProps = {
  value: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function TabsTrigger({ value, children, ...rest }: TabsTriggerProps) {
  const ctx = React.useContext(TabsCtx)!;
  const selected = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-state={selected ? "active" : "inactive"}
      className="ds-TabsTrigger"
      onClick={() => ctx.onChange(value)}
      {...rest}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function TabsContent({ value, children, ...rest }: TabsContentProps) {
  const ctx = React.useContext(TabsCtx)!;
  if (ctx.value !== value) return null;
  return <div className="ds-TabsContent" role="tabpanel" {...rest}>{children}</div>;
}

export const Tabs = Object.assign(TabsRoot, { List: TabsList, Trigger: TabsTrigger, Content: TabsContent });

