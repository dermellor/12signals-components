import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
};
declare function Modal({ open, onClose, title, children, footer }: ModalProps): react_jsx_runtime.JSX.Element | null;

export { Modal };
