import * as React from "react";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
} & React.HTMLAttributes<HTMLDivElement>;

export function Separator({ orientation = "horizontal", ...rest }: SeparatorProps) {
  return <div role="separator" className="ds-Separator" data-orientation={orientation} {...rest} />;
}

