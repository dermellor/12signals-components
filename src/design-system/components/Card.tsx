import * as React from "react";

type CardRootProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "gradient";
  hover?: "none" | "glow";
};

function CardRoot({ children, variant = "default", hover = "none", className, ...rest }: CardRootProps) {
  const cn = ["ds-Card", className].filter(Boolean).join(" ");
  return (
    <div className={cn} data-variant={variant} data-hover={hover} {...rest}>
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const cn = ["ds-CardHeader", className].filter(Boolean).join(" ");
  return (
    <div className={cn} {...rest}>{children}</div>
  );
}

function CardContent({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const cn = ["ds-CardContent", className].filter(Boolean).join(" ");
  return (
    <div className={cn} {...rest}>{children}</div>
  );
}

function CardTitle({ children, className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  const cn = ["ds-CardTitle", className].filter(Boolean).join(" ");
  return <h3 className={cn} {...rest}>{children}</h3>;
}

function CardDescription({ children, className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) {
  const cn = ["ds-CardDescription", className].filter(Boolean).join(" ");
  return <p className={cn} {...rest}>{children}</p>;
}

export const Card = Object.assign(CardRoot, { Header: CardHeader, Content: CardContent, Title: CardTitle, Description: CardDescription });
