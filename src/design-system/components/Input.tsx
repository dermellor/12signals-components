import * as React from "react";

type InputProps = {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return (
      <input
        ref={ref}
        className={composedClassName}
        data-size={size}
        aria-invalid={invalid || undefined}
        {...rest}
      />
    );
  }
);
Input.displayName = "Input";
