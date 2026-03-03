import * as React from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
};

export function Tooltip({ content, children, className, style, multiline }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);

  React.useEffect(() => {
    if (!open || !ref.current) {
      setPos(null);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left + rect.width / 2,
    });
  }, [open]);

  const rootClass = className
    ? `ds-TooltipRoot ${className}`
    : "ds-TooltipRoot";
  const contentClass = multiline
    ? "ds-TooltipContent ds-TooltipContent--portal ds-TooltipContent--multiline"
    : "ds-TooltipContent ds-TooltipContent--portal";

  return (
    <div className={rootClass} style={style} ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && pos && createPortal(
        <div
          role="tooltip"
          className={contentClass}
          style={{ top: pos.top, left: pos.left }}
        >
          {content}
        </div>,
        document.body,
      )}
    </div>
  );
}
