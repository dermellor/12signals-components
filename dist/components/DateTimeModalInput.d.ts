import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { Button } from './Button.js';

type DateTimeModalInputProps = {
    label: string;
    value: string;
    onSave: (value: string) => void;
    displayValue?: string;
    emptyLabel?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    saving?: boolean;
    saveLabel?: string;
    cancelLabel?: string;
    triggerProps?: Omit<React.ComponentProps<typeof Button>, "children" | "onClick" | "disabled" | "size" | "variant">;
};
declare function DateTimeModalInput({ label, value, onSave, displayValue, emptyLabel, size, disabled, saving, saveLabel, cancelLabel, triggerProps, }: DateTimeModalInputProps): react_jsx_runtime.JSX.Element;

export { DateTimeModalInput };
