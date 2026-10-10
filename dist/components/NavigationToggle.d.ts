import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type NavigationToggleProps = {
    ariaLabel?: string;
    icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
declare function NavigationToggle({ ariaLabel, icon, ...rest }: NavigationToggleProps): react_jsx_runtime.JSX.Element;

export { NavigationToggle };
