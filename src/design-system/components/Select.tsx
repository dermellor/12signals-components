import * as React from "react";

type SelectProps = {
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = "md", children, className, style, ...rest }, ref) => {
    const withChevron = className?.split(" ").includes("ds-Select--icon");
    return (
      <div className="ds-SelectWrap">
        <select
          ref={ref}
          className={["ds-Select", className].filter(Boolean).join(" ")}
          data-size={size}
          style={{
            ...style,
            ...(withChevron ? { backgroundImage: "none", appearance: "none", WebkitAppearance: "none" } : null),
          }}
          {...rest}
        >
          {children}
        </select>
        {withChevron && (
          <span className="ds-SelectChevron" aria-hidden>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8l4 4 4-4" />
            </svg>
          </span>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export const SelectOption = (
  props: React.OptionHTMLAttributes<HTMLOptionElement> & { children?: React.ReactNode }
) => <option {...props} />;
