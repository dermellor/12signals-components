import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type ToastItem = {
    id: number;
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "info" | "success" | "warning" | "danger";
};
type ToastContextType = {
    show: (t: Omit<ToastItem, 'id'>) => void;
};
declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useToast(): ToastContextType;

export { ToastProvider, useToast };
