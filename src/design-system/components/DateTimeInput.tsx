import * as React from "react";

type DateTimeInputProps = {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

export const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return (
      <input
        ref={ref}
        type="datetime-local"
        className={composedClassName}
        data-size={size}
        aria-invalid={invalid || undefined}
        {...rest}
      />
    );
  }
);
DateTimeInput.displayName = "DateTimeInput";
