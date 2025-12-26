import * as React from "react";

type TextFieldProps = {
  label: string;
  description?: string;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export function TextField({ label, description, error, inputProps, ...rest }: TextFieldProps) {
  const id = React.useId();
  const describedBy: string[] = [];
  if (description) describedBy.push(`${id}-desc`);
  if (error) describedBy.push(`${id}-err`);

  return (
    <div className="ds-TextField" {...rest}>
      <label className="ds-TextFieldLabel" htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy.join(' ') || undefined}
        className="ds-TextFieldInput"
        {...inputProps}
      />
      {description && <div id={`${id}-desc`} className="ds-TextFieldDescription">{description}</div>}
      {error && <div id={`${id}-err`} className="ds-TextFieldError" role="alert">{error}</div>}
    </div>
  );
}

