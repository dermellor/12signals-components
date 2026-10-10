import * as React from 'react';

declare const Button: React.ForwardRefExoticComponent<{
    variant?: "primary" | "ghost" | "danger" | "accent" | "success" | "link";
    size?: "xs" | "sm" | "md" | "lg";
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;

export { Button };
