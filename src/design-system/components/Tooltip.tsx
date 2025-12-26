import * as React from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
};

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div className="ds-TooltipRoot" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <div role="tooltip" className="ds-TooltipContent">
          {content}
        </div>
      )}
    </div>
  );
}

