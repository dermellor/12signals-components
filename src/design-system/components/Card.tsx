import * as React from "react";

type CardRootProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "gradient";
  hover?: "none" | "glow";
};

function CardRoot({ children, variant = "default", hover = "none", className, ...rest }: CardRootProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || hover !== "glow") return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hover]);

  const cn = ["ds-Card", className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={cn} data-variant={variant} data-hover={hover} {...rest}>
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

type CardTitleProps<T extends keyof JSX.IntrinsicElements = "h3"> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

function CardTitle<T extends keyof JSX.IntrinsicElements = "h3">({
  as,
  children,
  className,
  ...rest
}: CardTitleProps<T>) {
  const Comp = (as || "h3") as React.ElementType;
  const cn = ["ds-CardTitle", className].filter(Boolean).join(" ");
  return (
    <Comp className={cn} {...rest}>
      {children}
    </Comp>
  );
}

export const Card = Object.assign(CardRoot, { Header: CardHeader, Content: CardContent, Title: CardTitle });
