import * as React from "react";

type SelectProps = {
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = "md", children, ...rest }, ref) => (
    <select ref={ref} className="ds-Select" data-size={size} {...rest}>
      {children}
    </select>
  )
);
Select.displayName = "Select";

export const SelectOption = (
  props: React.OptionHTMLAttributes<HTMLOptionElement> & { children?: React.ReactNode }
) => <option {...props} />;

