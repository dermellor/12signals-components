import * as React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null;
  return (
    <div className="ds-ModalRoot">
      <div className="ds-ModalOverlay" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={title} className="ds-ModalContent">
        {title && <div className="ds-ModalHeader"><strong>{title}</strong></div>}
        <div className="ds-ModalBody">{children}</div>
        {footer && <div className="ds-ModalFooter">{footer}</div>}
      </div>
    </div>
  );
}

