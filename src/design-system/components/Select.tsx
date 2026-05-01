import * as React from "react";

type SelectProps = {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "plain";
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

function textFromNode(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}

function selectValueToString(value: SelectProps["value"] | SelectProps["defaultValue"]) {
  if (Array.isArray(value)) return value[0] == null ? undefined : String(value[0]);
  return value == null ? undefined : String(value);
}

function selectedOptionLabel(children: React.ReactNode, value: SelectProps["value"] | SelectProps["defaultValue"]) {
  const options = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>> =>
      React.isValidElement(child),
  );
  const selectedValue = selectValueToString(value);
  const selected =
    selectedValue == null
      ? options.find((option) => option.props.selected) ?? options[0]
      : options.find((option) => {
          const optionText = textFromNode(option.props.children);
          return String(option.props.value ?? optionText) === selectedValue;
        });
  return selected ? textFromNode(selected.props.children).trim() : "";
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = "md",
      variant = "default",
      children,
      className,
      style,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const classNames = className?.split(" ").filter(Boolean) ?? [];
    const isIconSelect = classNames.includes("ds-Select--icon");
    const withChevron = isIconSelect || variant === "plain";
    const currentValue = value !== undefined ? value : uncontrolledValue;
    const plainLabel = variant === "plain" ? selectedOptionLabel(children, currentValue) : "";

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (value === undefined) setUncontrolledValue(event.currentTarget.value);
      onChange?.(event);
    };

    return (
      <div className="ds-SelectWrap" data-variant={variant}>
        {variant === "plain" ? (
          <span className="ds-SelectPlainSizer" aria-hidden>
            {plainLabel || "\u00a0"}
          </span>
        ) : null}
        <select
          ref={ref}
          className={["ds-Select", className].filter(Boolean).join(" ")}
          data-size={size}
          data-variant={variant}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
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
