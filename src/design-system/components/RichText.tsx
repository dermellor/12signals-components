import * as React from "react";

type RichTextProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
};

export function RichText({ as, children, ...rest }: RichTextProps) {
  const Comp = (as || 'div') as React.ElementType;
  return (
    <Comp className="ds-RichText" {...rest}>
      {children}
    </Comp>
  );
}
