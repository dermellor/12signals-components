// src/design-system/components/Modal.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return /* @__PURE__ */ jsxs("div", { className: "ds-ModalRoot", children: [
    /* @__PURE__ */ jsx("div", { className: "ds-ModalOverlay", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: "ds-ModalContent", children: [
      title && /* @__PURE__ */ jsx("div", { className: "ds-ModalHeader", children: /* @__PURE__ */ jsx("strong", { children: title }) }),
      /* @__PURE__ */ jsx("div", { className: "ds-ModalBody", children }),
      footer && /* @__PURE__ */ jsx("div", { className: "ds-ModalFooter", children: footer })
    ] })
  ] });
}

export {
  Modal
};
//# sourceMappingURL=chunk-YOKH3JJ5.js.map