// src/design-system/components/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      "data-variant": variant,
      "data-size": size,
      className: "ds-Button",
      ...rest,
      children: [
        iconLeft && /* @__PURE__ */ jsx("span", { className: "ds-ButtonIcon", "aria-hidden": true, children: iconLeft }),
        /* @__PURE__ */ jsx("span", { className: "ds-ButtonLabel", children }),
        iconRight && /* @__PURE__ */ jsx("span", { className: "ds-ButtonIcon", "aria-hidden": true, children: iconRight })
      ]
    }
  );
}

// src/design-system/components/Text.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Text({
  as,
  size = "sm",
  weight = "regular",
  tone = "default",
  children,
  className,
  ...rest
}) {
  const Comp = as || "p";
  const mergedClassName = ["ds-Text", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx2(
    Comp,
    {
      "data-size": size,
      "data-weight": weight,
      "data-tone": tone,
      className: mergedClassName,
      ...rest,
      children
    }
  );
}

// src/design-system/components/Card.tsx
import * as React from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var CardNestingContext = React.createContext(false);
function CardRoot({ children, variant = "default", hover = "none", className, ...rest }) {
  const isNested = React.useContext(CardNestingContext);
  const ref = React.useRef(null);
  if (isNested) {
    throw new Error(
      "[ds-Card] Nested Card detected. Cards must not be placed inside other Cards \u2014 use a plain container (div, section) or a different visual treatment instead."
    );
  }
  React.useEffect(() => {
    const el = ref.current;
    if (!el || hover !== "glow") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hover]);
  const cn = ["ds-Card", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3(CardNestingContext.Provider, { value: true, children: /* @__PURE__ */ jsx3("div", { ref, className: cn, "data-variant": variant, "data-hover": hover, ...rest, children }) });
}
function CardHeader({ children, className, variant = "default", ...rest }) {
  const cn = ["ds-CardHeader", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3("div", { className: cn, "data-variant": variant, ...rest, children });
}
function CardContent({ children, className, ...rest }) {
  const cn = ["ds-CardContent", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3("div", { className: cn, ...rest, children });
}
function CardTitle({
  as,
  children,
  className,
  ...rest
}) {
  const Comp = as || "h3";
  const cn = ["ds-CardTitle", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3(Comp, { className: cn, ...rest, children });
}
var Card = Object.assign(CardRoot, { Header: CardHeader, Content: CardContent, Title: CardTitle });

// src/design-system/components/TextField.tsx
import * as React2 from "react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function TextField({ label, description, error, inputProps, ...rest }) {
  const id = React2.useId();
  const describedBy = [];
  if (description) describedBy.push(`${id}-desc`);
  if (error) describedBy.push(`${id}-err`);
  return /* @__PURE__ */ jsxs2("div", { className: "ds-TextField", ...rest, children: [
    /* @__PURE__ */ jsx4("label", { className: "ds-TextFieldLabel", htmlFor: id, children: label }),
    /* @__PURE__ */ jsx4(
      "input",
      {
        id,
        "aria-invalid": !!error,
        "aria-describedby": describedBy.join(" ") || void 0,
        className: "ds-TextFieldInput",
        ...inputProps
      }
    ),
    description && /* @__PURE__ */ jsx4("div", { id: `${id}-desc`, className: "ds-TextFieldDescription", children: description }),
    error && /* @__PURE__ */ jsx4("div", { id: `${id}-err`, className: "ds-TextFieldError", role: "alert", children: error })
  ] });
}

// src/design-system/components/Modal.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return /* @__PURE__ */ jsxs3("div", { className: "ds-ModalRoot", children: [
    /* @__PURE__ */ jsx5("div", { className: "ds-ModalOverlay", onClick: onClose }),
    /* @__PURE__ */ jsxs3("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: "ds-ModalContent", children: [
      title && /* @__PURE__ */ jsx5("div", { className: "ds-ModalHeader", children: /* @__PURE__ */ jsx5("strong", { children: title }) }),
      /* @__PURE__ */ jsx5("div", { className: "ds-ModalBody", children }),
      footer && /* @__PURE__ */ jsx5("div", { className: "ds-ModalFooter", children: footer })
    ] })
  ] });
}

// src/design-system/components/Badge.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function Badge({
  as,
  variant = "solid",
  tone = "solid",
  size = "md",
  children,
  ...rest
}) {
  const Comp = as || "span";
  return /* @__PURE__ */ jsx6(Comp, { className: "ds-Badge", "data-variant": variant, "data-tone": tone, "data-size": size, ...rest, children });
}

// src/design-system/components/Input.tsx
import * as React3 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Input = React3.forwardRef(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx7(
      "input",
      {
        ref,
        className: composedClassName,
        "data-size": size,
        "aria-invalid": invalid || void 0,
        ...rest
      }
    );
  }
);
Input.displayName = "Input";

// src/design-system/components/DateTimeInput.tsx
import * as React4 from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var DateTimeInput = React4.forwardRef(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx8(
      "input",
      {
        ref,
        type: "datetime-local",
        className: composedClassName,
        "data-size": size,
        "aria-invalid": invalid || void 0,
        ...rest
      }
    );
  }
);
DateTimeInput.displayName = "DateTimeInput";

// src/design-system/components/DateTimeModalInput.tsx
import * as React5 from "react";

// src/design-system/components/Dialog.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function Dialog(props) {
  return /* @__PURE__ */ jsx9(Modal, { ...props });
}

// src/design-system/components/DateTimeModalInput.tsx
import { Fragment, jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
function DateTimeModalInput({
  label,
  value,
  onSave,
  displayValue,
  emptyLabel = "Datum setzen",
  size = "md",
  disabled,
  saving,
  saveLabel = "Speichern",
  cancelLabel = "Abbrechen",
  triggerProps
}) {
  const isDisabled = disabled || saving;
  const [open, setOpen] = React5.useState(false);
  const [draft, setDraft] = React5.useState(value);
  const draftRef = React5.useRef(value);
  const inputRef = React5.useRef(null);
  const inputId = React5.useId();
  React5.useEffect(() => {
    if (open) {
      setDraft(value);
      draftRef.current = value;
    }
  }, [open, value]);
  const handleOpen = () => {
    if (isDisabled) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    var _a, _b;
    const liveValue = (_b = (_a = inputRef.current) == null ? void 0 : _a.value) != null ? _b : draftRef.current;
    onSave(liveValue);
    setOpen(false);
  };
  const triggerLabel = (displayValue && displayValue.trim().length > 0 ? displayValue : "") || emptyLabel;
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx10(
      Button,
      {
        size,
        variant: "ghost",
        onClick: handleOpen,
        "aria-label": label,
        disabled: isDisabled,
        ...triggerProps,
        children: triggerLabel
      }
    ),
    /* @__PURE__ */ jsx10(
      Dialog,
      {
        open,
        onClose: handleClose,
        title: label,
        footer: /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ jsx10(Button, { variant: "ghost", onClick: handleClose, disabled: saving, children: cancelLabel }),
          /* @__PURE__ */ jsx10(Button, { onClick: handleSave, disabled: saving, children: saveLabel })
        ] }),
        children: /* @__PURE__ */ jsx10("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-xs)" }, children: /* @__PURE__ */ jsx10(
          DateTimeInput,
          {
            id: inputId,
            size,
            value: draft,
            ref: inputRef,
            onChange: (event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            },
            onInput: (event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            },
            disabled: disabled || saving,
            "aria-label": label,
            autoFocus: true
          }
        ) })
      }
    )
  ] });
}

// src/design-system/components/Select.tsx
import * as React6 from "react";
import { jsx as jsx11, jsxs as jsxs5 } from "react/jsx-runtime";
var Select = React6.forwardRef(
  ({ size = "md", children, className, style, ...rest }, ref) => {
    const withChevron = className == null ? void 0 : className.split(" ").includes("ds-Select--icon");
    return /* @__PURE__ */ jsxs5("div", { className: "ds-SelectWrap", children: [
      /* @__PURE__ */ jsx11(
        "select",
        {
          ref,
          className: ["ds-Select", className].filter(Boolean).join(" "),
          "data-size": size,
          style: {
            ...style,
            ...withChevron ? { backgroundImage: "none", appearance: "none", WebkitAppearance: "none" } : null
          },
          ...rest,
          children
        }
      ),
      withChevron && /* @__PURE__ */ jsx11("span", { className: "ds-SelectChevron", "aria-hidden": true, children: /* @__PURE__ */ jsx11("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx11("path", { d: "M6 8l4 4 4-4" }) }) })
    ] });
  }
);
Select.displayName = "Select";
var SelectOption = (props) => /* @__PURE__ */ jsx11("option", { ...props });

// src/design-system/components/SelectMenu.tsx
import * as React7 from "react";
import { jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";
function SelectMenu({
  options,
  value,
  onValueChange,
  ariaLabel = "Open menu",
  align = "right",
  label,
  className
}) {
  const [open, setOpen] = React7.useState(false);
  const rootRef = React7.useRef(null);
  React7.useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current || !event.target) return;
      if (!rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  return /* @__PURE__ */ jsxs6("div", { ref: rootRef, className: ["ds-SelectMenu", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        className: "ds-SelectMenuTrigger",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-label": ariaLabel,
        onClick: () => setOpen((prev) => !prev),
        children: [
          label && /* @__PURE__ */ jsx12("span", { className: "ds-SelectMenuLabel", children: label }),
          /* @__PURE__ */ jsx12("span", { className: "ds-SelectMenuChevron", "aria-hidden": true, children: /* @__PURE__ */ jsx12("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx12("path", { d: "M6 8l4 4 4-4" }) }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx12("div", { className: "ds-SelectMenuContent", role: "listbox", "data-align": align, children: options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": selected,
          className: "ds-SelectMenuOption",
          disabled: option.disabled,
          onClick: () => {
            if (option.disabled) return;
            onValueChange == null ? void 0 : onValueChange(option.value);
            setOpen(false);
          },
          children: /* @__PURE__ */ jsx12("span", { className: "ds-SelectMenuOptionLabel", children: option.label })
        },
        option.value
      );
    }) })
  ] });
}

// src/design-system/components/Table.tsx
import * as React8 from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
function cx(base, className) {
  return className ? `${base} ${className}` : base;
}
function withSticky(base, sticky) {
  if (!sticky) return base;
  const suffix = sticky === "start" ? "Start" : "End";
  return `${base} ds-TableSticky ds-TableSticky${suffix}`;
}
var TableContainer = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("div", { ref, className: cx("ds-TableContainer", className), ...rest });
});
TableContainer.displayName = "TableContainer";
var Table = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("table", { ref, className: cx("ds-Table", className), ...rest });
});
Table.displayName = "Table";
var TableHeader = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("thead", { ref, className: cx("ds-TableHeader", className), ...rest });
});
TableHeader.displayName = "TableHeader";
var TableBody = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("tbody", { ref, className: cx("ds-TableBody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("tfoot", { ref, className: cx("ds-TableFooter", className), ...rest });
});
TableFooter.displayName = "TableFooter";
var TableRow = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("tr", { ref, className: cx("ds-TableRow", className), ...rest });
});
TableRow.displayName = "TableRow";
var TableHead = React8.forwardRef(
  ({ className, sticky, ...rest }, ref) => {
    return /* @__PURE__ */ jsx13("th", { ref, className: cx(withSticky("ds-TableHead", sticky), className), ...rest });
  }
);
TableHead.displayName = "TableHead";
var TableCell = React8.forwardRef(
  ({ className, sticky, ...rest }, ref) => {
    return /* @__PURE__ */ jsx13("td", { ref, className: cx(withSticky("ds-TableCell", sticky), className), ...rest });
  }
);
TableCell.displayName = "TableCell";
var TableCaption = React8.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx13("caption", { ref, className: cx("ds-TableCaption", className), ...rest });
});
TableCaption.displayName = "TableCaption";

// src/design-system/components/Tabs.tsx
import * as React9 from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var TabsCtx = React9.createContext(null);
function TabsRoot({ value, defaultValue, onValueChange, children, ...rest }) {
  const [internal, setInternal] = React9.useState(defaultValue || "");
  const isControlled = value !== void 0;
  const current = isControlled ? value : internal;
  const set = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange == null ? void 0 : onValueChange(v);
  };
  return /* @__PURE__ */ jsx14(TabsCtx.Provider, { value: { value: current, onChange: set }, children: /* @__PURE__ */ jsx14("div", { className: "ds-Tabs", ...rest, children }) });
}
function TabsList({ children, ...rest }) {
  return /* @__PURE__ */ jsx14("div", { className: "ds-TabsList", role: "tablist", ...rest, children });
}
function TabsTrigger({ value, children, ...rest }) {
  const ctx = React9.useContext(TabsCtx);
  const selected = ctx.value === value;
  return /* @__PURE__ */ jsx14(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": selected,
      "data-state": selected ? "active" : "inactive",
      className: "ds-TabsTrigger",
      onClick: () => ctx.onChange(value),
      ...rest,
      children
    }
  );
}
function TabsContent({ value, children, ...rest }) {
  const ctx = React9.useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return /* @__PURE__ */ jsx14("div", { className: "ds-TabsContent", role: "tabpanel", ...rest, children });
}
var Tabs = Object.assign(TabsRoot, { List: TabsList, Trigger: TabsTrigger, Content: TabsContent });

// src/design-system/components/Alert.tsx
import { jsx as jsx15, jsxs as jsxs7 } from "react/jsx-runtime";
function Alert({ variant = "info", title, children, ...rest }) {
  return /* @__PURE__ */ jsxs7("div", { className: "ds-Alert", role: variant === "danger" ? "alert" : "status", "data-variant": variant, ...rest, children: [
    title && /* @__PURE__ */ jsx15("div", { className: "ds-AlertTitle", children: title }),
    children && /* @__PURE__ */ jsx15("div", { className: "ds-AlertDescription", children })
  ] });
}

// src/design-system/components/Tooltip.tsx
import * as React10 from "react";
import { createPortal } from "react-dom";
import { jsx as jsx16, jsxs as jsxs8 } from "react/jsx-runtime";
function Tooltip({ content, children, className, style, multiline }) {
  const [open, setOpen] = React10.useState(false);
  const ref = React10.useRef(null);
  const [pos, setPos] = React10.useState(null);
  React10.useEffect(() => {
    if (!open || !ref.current) {
      setPos(null);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left + rect.width / 2
    });
  }, [open]);
  const rootClass = className ? `ds-TooltipRoot ${className}` : "ds-TooltipRoot";
  const contentClass = multiline ? "ds-TooltipContent ds-TooltipContent--portal ds-TooltipContent--multiline" : "ds-TooltipContent ds-TooltipContent--portal";
  return /* @__PURE__ */ jsxs8("div", { className: rootClass, style, ref, onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), children: [
    children,
    open && pos && createPortal(
      /* @__PURE__ */ jsx16(
        "div",
        {
          role: "tooltip",
          className: contentClass,
          style: { top: pos.top, left: pos.left },
          children: content
        }
      ),
      document.body
    )
  ] });
}

// src/design-system/components/Toast.tsx
import * as React11 from "react";
import { jsx as jsx17, jsxs as jsxs9 } from "react/jsx-runtime";
var ToastCtx = React11.createContext(null);
function ToastProvider({ children }) {
  const [items, setItems] = React11.useState([]);
  const idRef = React11.useRef(1);
  const show = (t) => {
    const id = idRef.current++;
    setItems((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3500);
  };
  return /* @__PURE__ */ jsxs9(ToastCtx.Provider, { value: { show }, children: [
    children,
    /* @__PURE__ */ jsx17("div", { className: "ds-ToastViewport", "aria-live": "polite", "aria-atomic": "true", children: items.map((i) => /* @__PURE__ */ jsxs9("div", { className: "ds-Toast", "data-variant": i.variant || "info", children: [
      i.title && /* @__PURE__ */ jsx17("div", { className: "ds-ToastTitle", children: i.title }),
      i.description && /* @__PURE__ */ jsx17("div", { className: "ds-ToastDescription", children: i.description })
    ] }, i.id)) })
  ] });
}
function useToast() {
  const ctx = React11.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// src/design-system/components/Separator.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
function Separator({ orientation = "horizontal", ...rest }) {
  return /* @__PURE__ */ jsx18("div", { role: "separator", className: "ds-Separator", "data-orientation": orientation, ...rest });
}

// src/design-system/components/Skeleton.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
function Skeleton({ round, style, ...rest }) {
  return /* @__PURE__ */ jsx19("div", { className: "ds-Skeleton", style: { borderRadius: round ? "var(--radius-pill)" : void 0, ...style }, ...rest });
}

// src/design-system/components/PageHeader.tsx
import { jsx as jsx20, jsxs as jsxs10 } from "react/jsx-runtime";
function PageHeader({ title, subtitle, actions, ...rest }) {
  return /* @__PURE__ */ jsxs10("header", { className: "ds-PageHeader", ...rest, children: [
    /* @__PURE__ */ jsxs10("div", { className: "ds-PageHeaderMain", children: [
      /* @__PURE__ */ jsx20(Text, { as: "h1", size: "2xl", weight: "semibold", children: title }),
      subtitle && /* @__PURE__ */ jsx20(Text, { size: "sm", as: "p", children: subtitle })
    ] }),
    actions && /* @__PURE__ */ jsx20("div", { className: "ds-PageHeaderActions", children: actions })
  ] });
}

// src/design-system/components/ActivityCard.tsx
import { jsx as jsx21, jsxs as jsxs11 } from "react/jsx-runtime";
function ActivityCard({
  icon,
  title,
  titleNode,
  headline,
  competitorIcon,
  categoryLabel,
  categoryVariant = "outline",
  categoryTone = "solid",
  extraBadges,
  meta,
  description,
  timestamp,
  href,
  ariaLabel,
  hover = "glow"
}) {
  const badge = categoryLabel ? /* @__PURE__ */ jsx21(Badge, { variant: categoryVariant, tone: categoryTone, "aria-label": `Kategorie: ${categoryLabel}`, children: categoryLabel }) : null;
  const hasTitleContent = Boolean(titleNode || title);
  return /* @__PURE__ */ jsxs11(
    Card,
    {
      variant: "gradient",
      hover,
      style: { position: "relative", padding: "var(--space-lg)" },
      "data-clickable": href ? "true" : "false",
      role: "article",
      "aria-label": ariaLabel || headline || title,
      className: "ds-ActivityCard",
      children: [
        /* @__PURE__ */ jsxs11("div", { className: "ds-ActivityCard-layout", children: [
          /* @__PURE__ */ jsxs11("div", { className: "ds-ActivityCard-topline", children: [
            icon && /* @__PURE__ */ jsx21("div", { "aria-hidden": true, style: { display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: icon }),
            hasTitleContent && /* @__PURE__ */ jsx21(
              "div",
              {
                style: {
                  minWidth: 0,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  ...titleNode ? { position: "relative", zIndex: href ? 2 : 0 } : void 0
                },
                children: titleNode || /* @__PURE__ */ jsx21(Text, { as: "span", size: "xs", tone: "muted", children: title })
              }
            ),
            badge,
            extraBadges
          ] }),
          headline && /* @__PURE__ */ jsx21("div", { className: "ds-ActivityCard-headline", children: /* @__PURE__ */ jsx21(Text, { as: "span", size: "sm", weight: "medium", children: headline }) }),
          /* @__PURE__ */ jsxs11("div", { className: "ds-ActivityCard-body", children: [
            description && /* @__PURE__ */ jsx21("div", { style: { overflowWrap: "anywhere", wordBreak: "break-word" }, children: /* @__PURE__ */ jsx21(Text, { as: "div", size: "sm", tone: "muted", children: description }) }),
            timestamp && /* @__PURE__ */ jsx21("div", { style: { marginTop: "var(--space-sm)" }, children: /* @__PURE__ */ jsx21(Text, { as: "span", size: "xs", tone: "muted", children: timestamp }) })
          ] })
        ] }),
        href && /* @__PURE__ */ jsx21(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": ariaLabel || headline || title,
            style: { position: "absolute", inset: 0, zIndex: 1 }
          }
        )
      ]
    }
  );
}

// src/design-system/components/RichText.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
function RichText({ as, children, ...rest }) {
  const Comp = as || "div";
  return /* @__PURE__ */ jsx22(Comp, { className: "ds-RichText", ...rest, children });
}

// src/design-system/components/DevButton.tsx
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
function DevButton({
  children,
  type = "button",
  ...rest
}) {
  return /* @__PURE__ */ jsxs12(
    "button",
    {
      type,
      className: "ds-DevButton",
      ...rest,
      children: [
        /* @__PURE__ */ jsx23("span", { "aria-hidden": true, children: "[" }),
        /* @__PURE__ */ jsx23("span", { className: "ds-DevButtonLabel", children }),
        /* @__PURE__ */ jsx23("span", { "aria-hidden": true, children: "]" })
      ]
    }
  );
}

// src/design-system/components/TagField.tsx
import * as React12 from "react";
import { jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
function Tag({ children, onRemove, removeAriaLabel }) {
  return /* @__PURE__ */ jsxs13("span", { className: "ds-Tag", children: [
    /* @__PURE__ */ jsx24("span", { className: "ds-TagLabel", children }),
    onRemove && /* @__PURE__ */ jsx24(
      "button",
      {
        type: "button",
        className: "ds-TagRemove",
        onClick: onRemove,
        "aria-label": removeAriaLabel != null ? removeAriaLabel : `Remove ${String(children)}`,
        children: "\xD7"
      }
    )
  ] });
}
function TagList({ tags, onRemove, emptyLabel }) {
  if (tags.length === 0 && emptyLabel) {
    return /* @__PURE__ */ jsx24("div", { className: "ds-TagListEmpty", children: emptyLabel });
  }
  return /* @__PURE__ */ jsx24("div", { className: "ds-TagList", children: tags.map((tag, index) => /* @__PURE__ */ jsx24(
    Tag,
    {
      onRemove: onRemove ? () => onRemove(tag, index) : void 0,
      children: tag
    },
    `${tag}-${index}`
  )) });
}
function TagField({
  label,
  values,
  onChange,
  description,
  error,
  placeholder,
  disabled,
  addOnBlur = true,
  ariaLabel
}) {
  const inputId = React12.useId();
  const descriptionId = description ? `${inputId}-desc` : void 0;
  const errorId = error ? `${inputId}-err` : void 0;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  const [inputValue, setInputValue] = React12.useState("");
  const addTag = React12.useCallback(
    (raw) => {
      if (disabled) return;
      const next = raw.trim();
      if (!next) return;
      if (values.includes(next)) {
        setInputValue("");
        return;
      }
      onChange([...values, next]);
      setInputValue("");
    },
    [disabled, onChange, values]
  );
  const removeTag = React12.useCallback(
    (index) => {
      if (disabled) return;
      const next = values.filter((_, idx) => idx !== index);
      onChange(next);
    },
    [disabled, onChange, values]
  );
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (event.key !== "Tab") {
        event.preventDefault();
      }
      addTag(inputValue);
      return;
    }
    if (event.key === "Backspace" && !inputValue && values.length > 0) {
      event.preventDefault();
      removeTag(values.length - 1);
    }
  };
  const handleBlur = () => {
    if (addOnBlur) {
      addTag(inputValue);
    }
  };
  return /* @__PURE__ */ jsxs13("div", { className: "ds-TagField", children: [
    /* @__PURE__ */ jsx24("label", { className: "ds-TagFieldLabel", htmlFor: inputId, children: label }),
    /* @__PURE__ */ jsxs13(
      "div",
      {
        className: "ds-TagFieldControl",
        "data-disabled": disabled ? "true" : "false",
        "data-invalid": error ? "true" : "false",
        children: [
          /* @__PURE__ */ jsx24(
            TagList,
            {
              tags: values,
              onRemove: disabled ? void 0 : (_, index) => removeTag(index)
            }
          ),
          /* @__PURE__ */ jsx24(
            "input",
            {
              id: inputId,
              "aria-label": ariaLabel != null ? ariaLabel : label,
              className: "ds-TagInput",
              value: inputValue,
              onChange: (event) => setInputValue(event.currentTarget.value),
              onKeyDown: handleKeyDown,
              onBlur: handleBlur,
              placeholder: values.length === 0 ? placeholder : void 0,
              "aria-invalid": error ? "true" : void 0,
              "aria-describedby": describedBy,
              disabled
            }
          )
        ]
      }
    ),
    description && /* @__PURE__ */ jsx24("div", { id: descriptionId, className: "ds-TagFieldDescription", children: description }),
    error && /* @__PURE__ */ jsx24("div", { id: errorId, className: "ds-TagFieldError", role: "alert", children: error })
  ] });
}

// src/design-system/components/BarChart.tsx
import * as React13 from "react";
import {
  ResponsiveContainer,
  BarChart as RCBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as Tooltip2
} from "recharts";

// src/design-system/components/Heading.tsx
import { jsx as jsx25 } from "react/jsx-runtime";
function Heading({ level = 2, className, children, ...rest }) {
  const Comp = `h${level}`;
  const cn = ["ds-Heading", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx25(Comp, { className: cn, "data-level": level, ...rest, children });
}

// src/design-system/components/BarChart.tsx
import { jsx as jsx26, jsxs as jsxs14 } from "react/jsx-runtime";
var VARIANT_CYCLE = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral"
];
var VARIANT_COLORS = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 90%, transparent)"
};
var getVariantColor = (variant = "primary") => {
  var _a;
  return (_a = VARIANT_COLORS[variant]) != null ? _a : VARIANT_COLORS.primary;
};
var isGroupedPoint = (point) => "groups" in point;
var ChartTooltip = ({
  active,
  payload,
  label,
  groups,
  valueFormatter,
  tooltipFilter
}) => {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  if (tooltipFilter && !tooltipFilter(String(label))) return null;
  const detail = (_b = (_a = payload[0]) == null ? void 0 : _a.payload) == null ? void 0 : _b.detail;
  const entries = payload.filter((item) => typeof item.value === "number" && item.value > 0).map((item) => {
    var _a2, _b2;
    const meta = groups.find((group) => group.id === item.dataKey);
    return {
      id: item.dataKey,
      label: (_a2 = meta == null ? void 0 : meta.label) != null ? _a2 : String(item.dataKey),
      value: Number(item.value),
      variant: (_b2 = meta == null ? void 0 : meta.variant) != null ? _b2 : "primary"
    };
  });
  if (entries.length === 0) return null;
  return /* @__PURE__ */ jsxs14("div", { className: "ds-BarChartTooltip", children: [
    /* @__PURE__ */ jsx26("div", { className: "ds-BarChartTooltipLabel", children: label }),
    detail && /* @__PURE__ */ jsx26("div", { className: "ds-BarChartTooltipDetail", children: detail }),
    /* @__PURE__ */ jsx26("ul", { className: "ds-BarChartTooltipList", children: entries.map((entry) => /* @__PURE__ */ jsxs14("li", { className: "ds-BarChartTooltipItem", children: [
      /* @__PURE__ */ jsx26("span", { className: "ds-BarChartLegendSwatch", "data-variant": entry.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx26("span", { className: "ds-BarChartTooltipName", children: entry.label }),
      /* @__PURE__ */ jsx26("span", { className: "ds-BarChartTooltipValue", children: valueFormatter(entry.value) })
    ] }, `${entry.id}-${entry.label}`)) })
  ] });
};
var FilteredCursor = (props) => {
  var _a;
  const { tooltipFilter, x, y, width, height, payload } = props;
  const label = (_a = payload == null ? void 0 : payload[0]) == null ? void 0 : _a.payload;
  const labelStr = label == null ? void 0 : label.label;
  if (!labelStr || !tooltipFilter(labelStr)) return null;
  return /* @__PURE__ */ jsx26(
    "rect",
    {
      x,
      y,
      width,
      height,
      fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)"
    }
  );
};
function BarChart({
  data,
  ariaLabel,
  xAxisLabel,
  yAxisLabel,
  valueFormatter = (value) => `${value}`,
  groups: providedGroups,
  tooltipFilter
}) {
  const hasGroupedData = data.length > 0 && data.every(isGroupedPoint);
  const derivedGroupOrder = React13.useMemo(() => {
    if (!hasGroupedData) return [];
    const seen = /* @__PURE__ */ new Set();
    const order = [];
    for (const point of data) {
      if (!isGroupedPoint(point)) continue;
      for (const group of point.groups) {
        if (!seen.has(group.id)) {
          seen.add(group.id);
          order.push(group.id);
        }
      }
    }
    return order;
  }, [data, hasGroupedData, providedGroups]);
  const resolvedGroups = React13.useMemo(() => {
    var _a;
    if (hasGroupedData && derivedGroupOrder.length === 0) return [];
    const metaById = new Map(providedGroups == null ? void 0 : providedGroups.map((group) => [group.id, group]));
    if (hasGroupedData) {
      return derivedGroupOrder.map((id, index) => {
        var _a2, _b, _c;
        const meta = metaById.get(id);
        const variant = (_a2 = meta == null ? void 0 : meta.variant) != null ? _a2 : VARIANT_CYCLE[index % VARIANT_CYCLE.length];
        return {
          id,
          label: (_b = meta == null ? void 0 : meta.label) != null ? _b : id,
          variant,
          tintIndex: (_c = meta == null ? void 0 : meta.tintIndex) != null ? _c : 0
        };
      });
    }
    const fallback = (_a = providedGroups == null ? void 0 : providedGroups[0]) != null ? _a : {
      id: "default",
      label: "Value",
      variant: "primary",
      tintIndex: 0
    };
    return [fallback];
  }, [derivedGroupOrder, hasGroupedData, providedGroups]);
  const normalizedData = React13.useMemo(() => {
    if (data.length === 0) return [];
    if (!hasGroupedData) {
      return data.map((point) => {
        var _a, _b, _c, _d, _e, _f;
        return {
          label: point.label,
          detail: "detail" in point ? point.detail : void 0,
          bars: [
            {
              id: (_b = (_a = resolvedGroups[0]) == null ? void 0 : _a.id) != null ? _b : "default",
              value: "value" in point ? point.value : 0,
              detail: "detail" in point ? point.detail : void 0,
              variant: (_d = (_c = resolvedGroups[0]) == null ? void 0 : _c.variant) != null ? _d : "primary",
              tintIndex: (_f = (_e = resolvedGroups[0]) == null ? void 0 : _e.tintIndex) != null ? _f : 0
            }
          ]
        };
      });
    }
    const groupedData = data.filter(isGroupedPoint);
    return groupedData.map((point) => ({
      label: point.label,
      detail: point.detail,
      bars: resolvedGroups.map((group) => {
        var _a, _b;
        const match = point.groups.find((item) => item.id === group.id);
        return {
          id: group.id,
          value: (_a = match == null ? void 0 : match.value) != null ? _a : 0,
          detail: (_b = match == null ? void 0 : match.detail) != null ? _b : point.detail,
          variant: group.variant
        };
      })
    }));
  }, [data, resolvedGroups, hasGroupedData]);
  const chartData = React13.useMemo(
    () => normalizedData.map((point) => {
      const entry = {
        label: point.label,
        detail: point.detail
      };
      point.bars.forEach((bar) => {
        entry[bar.id] = bar.value;
      });
      return entry;
    }),
    [normalizedData]
  );
  const axisTickStyle = {
    fill: "hsl(var(--muted-foreground))",
    fontSize: 12
  };
  return /* @__PURE__ */ jsxs14("figure", { className: "ds-BarChart", role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs14("div", { className: "ds-BarChartGrid", children: [
      yAxisLabel && /* @__PURE__ */ jsx26(Heading, { level: 3, "aria-hidden": true, children: yAxisLabel }),
      /* @__PURE__ */ jsx26("div", { className: "ds-BarChartChart", children: /* @__PURE__ */ jsx26(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs14(RCBarChart, { data: chartData, margin: { top: 24, right: 16, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsx26(
          XAxis,
          {
            dataKey: "label",
            tick: axisTickStyle,
            tickLine: { stroke: "var(--color-border-default)" },
            axisLine: { stroke: "var(--color-border-default)" },
            interval: 0
          }
        ),
        /* @__PURE__ */ jsx26(
          YAxis,
          {
            tick: axisTickStyle,
            tickLine: { stroke: "var(--color-border-default)" },
            axisLine: { stroke: "var(--color-border-default)" },
            allowDecimals: false,
            width: 32
          }
        ),
        /* @__PURE__ */ jsx26(
          Tooltip2,
          {
            cursor: tooltipFilter ? /* @__PURE__ */ jsx26(FilteredCursor, { tooltipFilter }) : { fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)" },
            content: /* @__PURE__ */ jsx26(ChartTooltip, { groups: resolvedGroups, valueFormatter, tooltipFilter })
          }
        ),
        resolvedGroups.map((group, index) => {
          var _a;
          return /* @__PURE__ */ jsx26(
            Bar,
            {
              dataKey: group.id,
              stackId: "jobs",
              fill: getVariantColor((_a = group.variant) != null ? _a : "primary"),
              isAnimationActive: false,
              radius: index === resolvedGroups.length - 1 ? [8, 8, 0, 0] : 0,
              maxBarSize: 48
            },
            group.id
          );
        })
      ] }) }) }),
      xAxisLabel && /* @__PURE__ */ jsx26("div", { className: "ds-BarChartAxisCaption", "aria-hidden": true, children: xAxisLabel })
    ] }),
    /* @__PURE__ */ jsx26("dl", { className: "ds-BarChartTable", children: normalizedData.map(
      (point, pointIndex) => point.bars.map((bar, barIndex) => {
        var _a;
        const groupMeta = resolvedGroups.find((group) => group.id === bar.id);
        return /* @__PURE__ */ jsxs14("div", { className: "ds-BarChartTableRow", children: [
          /* @__PURE__ */ jsx26("dt", { children: `${point.label} \u2013 ${(_a = groupMeta == null ? void 0 : groupMeta.label) != null ? _a : bar.id}` }),
          /* @__PURE__ */ jsx26("dd", { children: valueFormatter(bar.value) })
        ] }, `table-${point.label}-${bar.id}-${pointIndex}-${barIndex}`);
      })
    ) })
  ] });
}

// src/design-system/components/PieChart.tsx
import * as React14 from "react";
import {
  ResponsiveContainer as ResponsiveContainer2,
  PieChart as RCPieChart,
  Pie,
  Cell,
  Tooltip as Tooltip3
} from "recharts";
import { jsx as jsx27, jsxs as jsxs15 } from "react/jsx-runtime";
var VARIANT_CYCLE2 = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral"
];
var VARIANT_COLORS2 = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 90%, transparent)"
};
var getVariantColor2 = (variant = "primary") => {
  var _a;
  return (_a = VARIANT_COLORS2[variant]) != null ? _a : VARIANT_COLORS2.primary;
};
var ChartTooltip2 = ({
  active,
  payload,
  valueFormatter
}) => {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const entries = payload.filter((item) => typeof item.value === "number").map((item) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return {
      id: String((_d = (_c = (_b2 = (_a2 = item.payload) == null ? void 0 : _a2.id) != null ? _b2 : item.dataKey) != null ? _c : item.name) != null ? _d : "slice"),
      label: String((_h = (_g = (_f = (_e = item.payload) == null ? void 0 : _e.label) != null ? _f : item.name) != null ? _g : item.dataKey) != null ? _h : "Slice"),
      value: Number((_i = item.value) != null ? _i : 0),
      variant: (_k = (_j = item.payload) == null ? void 0 : _j.variant) != null ? _k : "primary",
      detail: (_l = item.payload) == null ? void 0 : _l.detail
    };
  }).filter((entry) => entry.value > 0);
  if (entries.length === 0) return null;
  return /* @__PURE__ */ jsxs15("div", { className: "ds-PieChartTooltip", children: [
    /* @__PURE__ */ jsx27("div", { className: "ds-PieChartTooltipLabel", children: (_a = entries[0]) == null ? void 0 : _a.label }),
    ((_b = entries[0]) == null ? void 0 : _b.detail) && /* @__PURE__ */ jsx27("div", { className: "ds-PieChartTooltipDetail", children: entries[0].detail }),
    /* @__PURE__ */ jsx27("ul", { className: "ds-PieChartTooltipList", children: entries.map((entry) => /* @__PURE__ */ jsxs15("li", { className: "ds-PieChartTooltipItem", children: [
      /* @__PURE__ */ jsx27("span", { className: "ds-PieChartLegendSwatch", "data-variant": entry.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx27("span", { className: "ds-PieChartTooltipName", children: entry.label }),
      /* @__PURE__ */ jsx27("span", { className: "ds-PieChartTooltipValue", children: valueFormatter(entry.value) })
    ] }, `${entry.id}-${entry.label}`)) })
  ] });
};
var normalizeSlices = (data) => {
  return data.map((slice, index) => {
    var _a;
    return {
      ...slice,
      variant: (_a = slice.variant) != null ? _a : VARIANT_CYCLE2[index % VARIANT_CYCLE2.length]
    };
  });
};
function PieChart({
  data,
  ariaLabel,
  valueFormatter = (value) => `${value}`,
  centerLabel,
  showLegend = true,
  variant = "default"
}) {
  const slices = React14.useMemo(() => normalizeSlices(data), [data]);
  const total = React14.useMemo(
    () => slices.reduce((sum, slice) => sum + Math.max(0, slice.value), 0),
    [slices]
  );
  if (slices.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs15("figure", { className: "ds-PieChart", role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs15("div", { className: variant === "plain" ? "ds-PieChartChart ds-PieChartChart--plain" : "ds-PieChartChart", children: [
      /* @__PURE__ */ jsx27(ResponsiveContainer2, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs15(RCPieChart, { children: [
        /* @__PURE__ */ jsx27(
          Pie,
          {
            data: slices,
            dataKey: "value",
            nameKey: "label",
            innerRadius: "55%",
            outerRadius: "85%",
            stroke: "var(--color-border-default)",
            strokeWidth: 1,
            paddingAngle: 1,
            isAnimationActive: false,
            children: slices.map((slice) => /* @__PURE__ */ jsx27(Cell, { fill: getVariantColor2(slice.variant) }, slice.id))
          }
        ),
        /* @__PURE__ */ jsx27(
          Tooltip3,
          {
            cursor: { fill: "transparent" },
            wrapperStyle: { outline: "none" },
            content: /* @__PURE__ */ jsx27(ChartTooltip2, { valueFormatter })
          }
        )
      ] }) }),
      centerLabel && /* @__PURE__ */ jsxs15("div", { className: "ds-PieChartCenter", children: [
        /* @__PURE__ */ jsx27("div", { className: "ds-PieChartCenterValue", children: centerLabel.value }),
        centerLabel.description && /* @__PURE__ */ jsx27("div", { className: "ds-PieChartCenterDescription", children: centerLabel.description })
      ] }),
      !centerLabel && /* @__PURE__ */ jsxs15("div", { className: "ds-PieChartCenter", children: [
        /* @__PURE__ */ jsx27("div", { className: "ds-PieChartCenterValue", children: valueFormatter(total) }),
        /* @__PURE__ */ jsx27("div", { className: "ds-PieChartCenterDescription", children: "Total" })
      ] })
    ] }),
    showLegend && /* @__PURE__ */ jsx27("ul", { className: "ds-PieChartLegend", role: "list", children: slices.map((slice) => /* @__PURE__ */ jsxs15("li", { className: "ds-PieChartLegendItem", children: [
      /* @__PURE__ */ jsx27("span", { className: "ds-PieChartLegendSwatch", "data-variant": slice.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx27("span", { className: "ds-PieChartLegendLabel", children: slice.label }),
      /* @__PURE__ */ jsx27("span", { className: "ds-PieChartLegendValue", children: valueFormatter(slice.value) })
    ] }, `legend-${slice.id}`)) }),
    /* @__PURE__ */ jsxs15("dl", { className: "ds-PieChartTable", children: [
      slices.map((slice) => /* @__PURE__ */ jsxs15("div", { className: "ds-PieChartTableRow", children: [
        /* @__PURE__ */ jsx27("dt", { children: slice.label }),
        /* @__PURE__ */ jsx27("dd", { children: valueFormatter(slice.value) })
      ] }, `table-${slice.id}`)),
      /* @__PURE__ */ jsxs15("div", { className: "ds-PieChartTableRow", children: [
        /* @__PURE__ */ jsx27("dt", { children: "Total" }),
        /* @__PURE__ */ jsx27("dd", { children: valueFormatter(total) })
      ] })
    ] })
  ] });
}

// src/design-system/components/TabNav.tsx
import * as React15 from "react";
import { jsx as jsx28, jsxs as jsxs16 } from "react/jsx-runtime";
function TabNav({ items, value, onValueChange, ariaLabel, className, style }) {
  const listRef = React15.useRef(null);
  React15.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () => {
      const nav = el.closest(".ds-TabNav");
      if (!nav) return;
      const triggers = el.querySelectorAll(".ds-TabNavTrigger");
      const tabCount = triggers.length;
      const containerWidth = el.clientWidth;
      triggers.forEach((t) => {
        t.style.minWidth = "";
        t.style.maxWidth = "";
      });
      if (el.scrollWidth > containerWidth && tabCount > 1) {
        const gap = parseFloat(getComputedStyle(el).gap) || 8;
        const visibleFull = Math.min(tabCount - 1, containerWidth < 360 ? 2 : 3);
        const w = Math.floor((containerWidth - visibleFull * gap) / (visibleFull + 0.35));
        triggers.forEach((t) => {
          t.style.minWidth = `${w}px`;
          t.style.maxWidth = `${w}px`;
        });
      }
      requestAnimationFrame(() => {
        nav.toggleAttribute("data-scroll-start", el.scrollLeft > 2);
        nav.toggleAttribute("data-scroll-end", el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsx28("nav", { className: ["ds-TabNav", className].filter(Boolean).join(" "), "aria-label": ariaLabel, style, children: /* @__PURE__ */ jsx28("ul", { className: "ds-TabNavList", role: "tablist", ref: listRef, children: items.map((item) => {
    const active = item.value === value;
    return /* @__PURE__ */ jsx28("li", { className: "ds-TabNavItem", children: /* @__PURE__ */ jsxs16(
      "button",
      {
        type: "button",
        className: "ds-TabNavTrigger",
        role: "tab",
        "aria-selected": active,
        "data-state": active ? "active" : "inactive",
        onClick: () => onValueChange == null ? void 0 : onValueChange(item.value),
        children: [
          /* @__PURE__ */ jsx28("span", { className: "ds-TabNavLabel", children: item.label }),
          item.description && /* @__PURE__ */ jsx28("span", { className: "ds-TabNavDescription", children: item.description }),
          item.badge && /* @__PURE__ */ jsx28("span", { className: "ds-TabNavBadge", children: item.badge })
        ]
      }
    ) }, item.value);
  }) }) });
}

// src/design-system/components/ActionIconButton.tsx
import { Eye, Trash2, Save, Pencil, Loader2, Power, Star } from "lucide-react";
import { jsx as jsx29 } from "react/jsx-runtime";
var actionMeta = {
  view: { label: "Ansehen", Icon: Eye },
  delete: { label: "L\xF6schen", Icon: Trash2 },
  save: { label: "Speichern", Icon: Save },
  edit: { label: "Editieren", Icon: Pencil },
  deactivate: { label: "Deaktivieren", Icon: Power },
  star: { label: "Stern setzen", Icon: Star }
};
function ActionIconButton({
  action,
  loading = false,
  selected = false,
  "aria-label": ariaLabel,
  title,
  ...rest
}) {
  const { Icon, label } = actionMeta[action];
  const resolvedLabel = ariaLabel != null ? ariaLabel : label;
  return /* @__PURE__ */ jsx29(
    "button",
    {
      type: "button",
      "data-action": action,
      "data-selected": selected ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      className: "ds-ActionIconButton",
      "aria-label": resolvedLabel,
      "aria-busy": loading || void 0,
      title: title != null ? title : label,
      ...rest,
      children: loading ? /* @__PURE__ */ jsx29(Loader2, { "aria-hidden": true, focusable: false, className: "ds-ActionIconButtonSpinner" }) : /* @__PURE__ */ jsx29(Icon, { "aria-hidden": true, focusable: false })
    }
  );
}

// src/design-system/components/InlineEditButton.tsx
import { Pencil as Pencil2 } from "lucide-react";
import { jsx as jsx30 } from "react/jsx-runtime";
function InlineEditButton({
  "aria-label": ariaLabel,
  title,
  ...rest
}) {
  return /* @__PURE__ */ jsx30(
    "button",
    {
      type: "button",
      className: "ds-InlineEditButton",
      "aria-label": ariaLabel != null ? ariaLabel : "Bearbeiten",
      title: title != null ? title : "Bearbeiten",
      ...rest,
      children: /* @__PURE__ */ jsx30(Pencil2, { "aria-hidden": true, focusable: false })
    }
  );
}

// src/design-system/components/Navigation.tsx
import * as React16 from "react";
import { Fragment as Fragment2, jsx as jsx31, jsxs as jsxs17 } from "react/jsx-runtime";
function Navigation({
  items,
  value,
  onValueChange,
  ariaLabel,
  orientation = "vertical",
  className,
  style
}) {
  const handleSelect = React16.useCallback(
    (item) => {
      var _a;
      if (item.disabled) return;
      (_a = item.onSelect) == null ? void 0 : _a.call(item, item.value);
      onValueChange == null ? void 0 : onValueChange(item.value);
    },
    [onValueChange]
  );
  return /* @__PURE__ */ jsx31(
    "nav",
    {
      className: ["ds-Navigation", className].filter(Boolean).join(" "),
      "aria-label": ariaLabel,
      "data-orientation": orientation,
      style,
      children: /* @__PURE__ */ jsx31("ul", { className: "ds-NavigationList", children: items.map((item) => {
        const active = item.value === value;
        const content = /* @__PURE__ */ jsxs17(Fragment2, { children: [
          item.icon && /* @__PURE__ */ jsx31("span", { className: "ds-NavigationIcon", "aria-hidden": true, children: item.icon }),
          /* @__PURE__ */ jsxs17("span", { className: "ds-NavigationText", children: [
            /* @__PURE__ */ jsx31("span", { className: "ds-NavigationLabel", children: item.label }),
            item.description && /* @__PURE__ */ jsx31("span", { className: "ds-NavigationDescription", children: item.description })
          ] }),
          item.badge && /* @__PURE__ */ jsx31("span", { className: "ds-NavigationBadge", children: item.badge })
        ] });
        return /* @__PURE__ */ jsx31("li", { className: "ds-NavigationItem", children: item.href ? /* @__PURE__ */ jsx31(
          "a",
          {
            href: item.href,
            className: "ds-NavigationLink",
            "data-state": active ? "active" : "inactive",
            "aria-current": active ? "page" : void 0,
            "aria-disabled": item.disabled || void 0,
            onClick: (event) => {
              if (item.disabled) {
                event.preventDefault();
                return;
              }
              handleSelect(item);
            },
            children: content
          }
        ) : /* @__PURE__ */ jsx31(
          "button",
          {
            type: "button",
            className: "ds-NavigationLink",
            "data-state": active ? "active" : "inactive",
            "aria-current": active ? "page" : void 0,
            disabled: item.disabled,
            onClick: () => handleSelect(item),
            children: content
          }
        ) }, item.value);
      }) })
    }
  );
}

// src/design-system/components/NavigationBar.tsx
import { Fragment as Fragment3, jsx as jsx32, jsxs as jsxs18 } from "react/jsx-runtime";
function NavigationBar({
  title,
  subtitle,
  brand,
  brandAccessory,
  leading,
  actions,
  leadingPosition = "left",
  className,
  ...rest
}) {
  const showLeadingLeft = leading && leadingPosition === "left";
  const showLeadingRight = leading && leadingPosition === "right";
  return /* @__PURE__ */ jsxs18("header", { className: ["ds-NavigationBar", className].filter(Boolean).join(" "), ...rest, children: [
    showLeadingLeft && /* @__PURE__ */ jsx32("div", { className: "ds-NavigationBarLeading", children: leading }),
    /* @__PURE__ */ jsx32("div", { className: "ds-NavigationBarBrand", children: brand ? /* @__PURE__ */ jsxs18(Fragment3, { children: [
      /* @__PURE__ */ jsxs18("div", { className: "ds-NavigationBarBrandContent", children: [
        brand,
        brandAccessory && /* @__PURE__ */ jsx32("div", { className: "ds-NavigationBarBrandAccessory", children: brandAccessory })
      ] }),
      subtitle && /* @__PURE__ */ jsx32(Text, { size: "xs", tone: "muted", children: subtitle })
    ] }) : /* @__PURE__ */ jsxs18(Fragment3, { children: [
      title != null && /* @__PURE__ */ jsx32(Text, { as: "div", weight: "semibold", children: title }),
      subtitle && /* @__PURE__ */ jsx32(Text, { size: "xs", tone: "muted", children: subtitle })
    ] }) }),
    actions && /* @__PURE__ */ jsx32("div", { className: "ds-NavigationBarActions", children: actions }),
    showLeadingRight && /* @__PURE__ */ jsx32("div", { className: "ds-NavigationBarLeading", children: leading })
  ] });
}

// src/design-system/components/NavigationBrand.tsx
import { Fragment as Fragment4, jsx as jsx33, jsxs as jsxs19 } from "react/jsx-runtime";
function NavigationBrand({ href, logo, label, className, ...rest }) {
  const content = /* @__PURE__ */ jsxs19(Fragment4, { children: [
    logo && /* @__PURE__ */ jsx33("span", { className: "ds-NavigationBrandLogo", "aria-hidden": true, children: logo }),
    label && /* @__PURE__ */ jsx33("span", { className: "ds-NavigationBrandLabel", children: label })
  ] });
  return /* @__PURE__ */ jsx33("div", { className: ["ds-NavigationBrand", className].filter(Boolean).join(" "), ...rest, children: href ? /* @__PURE__ */ jsx33("a", { className: "ds-NavigationBrandLink", href, children: content }) : /* @__PURE__ */ jsx33("div", { className: "ds-NavigationBrandLink", children: content }) });
}

// src/design-system/components/NavigationToggle.tsx
import { jsx as jsx34, jsxs as jsxs20 } from "react/jsx-runtime";
function NavigationToggle({ ariaLabel = "Toggle navigation", icon, ...rest }) {
  return /* @__PURE__ */ jsx34("button", { type: "button", className: "ds-NavigationToggle", "aria-label": ariaLabel, ...rest, children: /* @__PURE__ */ jsx34("span", { className: "ds-NavigationToggleIcon", "aria-hidden": true, children: icon != null ? icon : /* @__PURE__ */ jsxs20("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx34("path", { d: "M4 7h16" }),
    /* @__PURE__ */ jsx34("path", { d: "M4 12h16" }),
    /* @__PURE__ */ jsx34("path", { d: "M4 17h16" })
  ] }) }) });
}

// src/design-system/components/Logo.tsx
import { useId as useId4 } from "react";
import { jsx as jsx35, jsxs as jsxs21 } from "react/jsx-runtime";
function LogoSvg({ uid, variant, sizeStyle, className, ...rest }) {
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  const shared = { xmlns: "http://www.w3.org/2000/svg", className: cls, "data-variant": variant, role: "img", "aria-label": "12signals", style: sizeStyle, ...rest };
  switch (variant) {
    case "inverted":
      return /* @__PURE__ */ jsxs21("svg", { viewBox: "-9 -9 117 117", ...shared, children: [
        /* @__PURE__ */ jsxs21("defs", { children: [
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-bg`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-inv-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsx35("stop", { offset: "50%", stopColor: "white", stopOpacity: "0.55" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.3" })
          ] }),
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-inv-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.75" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.4" })
          ] }),
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-inv-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.85" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx35("rect", { x: "-9", y: "-9", width: "117", height: "117", rx: "26", ry: "26", fill: `url(#${uid}-bg)` }),
        /* @__PURE__ */ jsx35("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-inv-arc)`, strokeWidth: "5.5", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx35("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-inv-ring)` }),
        /* @__PURE__ */ jsxs21("mask", { id: `${uid}-inv-needle`, children: [
          /* @__PURE__ */ jsx35("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: "white", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx35("circle", { cx: "50", cy: "50", r: "7", fill: "white" })
        ] }),
        /* @__PURE__ */ jsx35("rect", { x: "0", y: "0", width: "100", height: "100", fill: `url(#${uid}-inv-main)`, mask: `url(#${uid}-inv-needle)` }),
        /* @__PURE__ */ jsx35("circle", { cx: "67.0", cy: "20.5", r: "2.8", fill: "white", opacity: "0.8" }),
        /* @__PURE__ */ jsx35("circle", { cx: "77.8", cy: "30.5", r: "2.8", fill: "white", opacity: "0.7" }),
        /* @__PURE__ */ jsx35("circle", { cx: "83.5", cy: "44.1", r: "2.8", fill: "white", opacity: "0.65" }),
        /* @__PURE__ */ jsx35("circle", { cx: "82.8", cy: "58.8", r: "2.8", fill: "white", opacity: "0.5" }),
        /* @__PURE__ */ jsx35("circle", { cx: "76.0", cy: "71.8", r: "2.8", fill: "white", opacity: "0.4" }),
        /* @__PURE__ */ jsx35("circle", { cx: "64.3", cy: "80.8", r: "2.8", fill: "white", opacity: "0.35" })
      ] });
    case "monochrome":
      return /* @__PURE__ */ jsxs21("svg", { viewBox: "8 10 82 80", ...shared, children: [
        /* @__PURE__ */ jsx35("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: "#1A1C1E", strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx35("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: "#1A1C1E" }),
        /* @__PURE__ */ jsx35("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: "#1A1C1E", strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx35("circle", { cx: "50", cy: "50", r: "7", fill: "#1A1C1E" }),
        /* @__PURE__ */ jsx35("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#333333" }),
        /* @__PURE__ */ jsx35("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#555555" }),
        /* @__PURE__ */ jsx35("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#777777" }),
        /* @__PURE__ */ jsx35("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#999999" }),
        /* @__PURE__ */ jsx35("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#BBBBBB" }),
        /* @__PURE__ */ jsx35("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#DDDDDD" })
      ] });
    // "default" = V2 Gradient Flow
    default:
      return /* @__PURE__ */ jsxs21("svg", { viewBox: "8 10 82 80", ...shared, children: [
        /* @__PURE__ */ jsxs21("defs", { children: [
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx35("stop", { offset: "50%", stopColor: "#7D3BA3" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs21("linearGradient", { id: `${uid}-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx35("stop", { offset: "0%", stopColor: "#5C2580" }),
            /* @__PURE__ */ jsx35("stop", { offset: "100%", stopColor: "#C835A5" })
          ] })
        ] }),
        /* @__PURE__ */ jsx35("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-arc)`, strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx35("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-ring)` }),
        /* @__PURE__ */ jsx35("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: `url(#${uid}-main)`, strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx35("circle", { cx: "50", cy: "50", r: "7", fill: `url(#${uid}-main)` }),
        /* @__PURE__ */ jsx35("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#441B67" }),
        /* @__PURE__ */ jsx35("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#5C2580" }),
        /* @__PURE__ */ jsx35("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#7D3BA3" }),
        /* @__PURE__ */ jsx35("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#A832A8" }),
        /* @__PURE__ */ jsx35("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#C835A5" }),
        /* @__PURE__ */ jsx35("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#E838A2" })
      ] });
  }
}
function Logo({ variant = "default", size = 36, sprite, className, style, ...rest }) {
  const reactId = useId4();
  const uid = reactId.replace(/:/g, "");
  const sizeStyle = { width: size, height: size, ...style };
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  if (sprite) {
    return /* @__PURE__ */ jsx35(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: cls,
        "data-variant": variant,
        role: "img",
        "aria-label": "12signals",
        style: sizeStyle,
        ...rest,
        children: /* @__PURE__ */ jsx35("use", { href: `${sprite}#logo-${variant}`, width: "100%", height: "100%" })
      }
    );
  }
  return /* @__PURE__ */ jsx35(LogoSvg, { uid, variant, sizeStyle, className, ...rest });
}
var LOGO_VARIANTS = [
  { value: "default", label: "Gradient Flow" },
  { value: "inverted", label: "Inverted" },
  { value: "monochrome", label: "Monochrome" }
];

// src/design-system/components/Wordmark.tsx
import { useId as useId5 } from "react";
import { jsx as jsx36, jsxs as jsxs22 } from "react/jsx-runtime";
function Wordmark({ height = 36, className, sprite, style, ...rest }) {
  const reactId = useId5();
  const uid = reactId.replace(/:/g, "");
  const cls = ["ds-Wordmark", className].filter(Boolean).join(" ");
  if (sprite) {
    return /* @__PURE__ */ jsx36(
      "svg",
      {
        viewBox: "0 0 396 100",
        xmlns: "http://www.w3.org/2000/svg",
        className: cls,
        role: "img",
        "aria-label": "12signals",
        style: { height, width: "auto", ...style },
        ...rest,
        children: /* @__PURE__ */ jsx36("use", { href: `${sprite}#wordmark`, width: "396", height: "100" })
      }
    );
  }
  return /* @__PURE__ */ jsxs22(
    "svg",
    {
      viewBox: "0 0 396 100",
      xmlns: "http://www.w3.org/2000/svg",
      className: cls,
      role: "img",
      "aria-label": "12signals",
      style: { height, width: "auto", ...style },
      ...rest,
      children: [
        /* @__PURE__ */ jsxs22("defs", { children: [
          /* @__PURE__ */ jsxs22("linearGradient", { id: `${uid}-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx36("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx36("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs22("linearGradient", { id: `${uid}-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx36("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx36("stop", { offset: "50%", stopColor: "#7D3BA3" }),
            /* @__PURE__ */ jsx36("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs22("linearGradient", { id: `${uid}-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx36("stop", { offset: "0%", stopColor: "#5C2580" }),
            /* @__PURE__ */ jsx36("stop", { offset: "100%", stopColor: "#C835A5" })
          ] })
        ] }),
        /* @__PURE__ */ jsx36("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-arc)`, strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx36("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-ring)` }),
        /* @__PURE__ */ jsx36("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: `url(#${uid}-main)`, strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx36("circle", { cx: "50", cy: "50", r: "7", fill: `url(#${uid}-main)` }),
        /* @__PURE__ */ jsx36("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#441B67" }),
        /* @__PURE__ */ jsx36("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#5C2580" }),
        /* @__PURE__ */ jsx36("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#7D3BA3" }),
        /* @__PURE__ */ jsx36("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#A832A8" }),
        /* @__PURE__ */ jsx36("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#C835A5" }),
        /* @__PURE__ */ jsx36("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#E838A2" }),
        /* @__PURE__ */ jsxs22("g", { style: { fill: "hsl(var(--primary))" }, children: [
          /* @__PURE__ */ jsx36("path", { d: "M192 0H288V700H213L33 525V405L192 559Z", transform: "translate(105.00,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M50 0H523V90H162L349 263C430 338 513 412 513 523C513 643 412 710 292 710C158 710 58 625 57 491H157C157 568 210 625 287 625H297C363 625 415 584 415 518C415 432 338 380 276 321L50 106Z", transform: "translate(130.90,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M242 -10C358 -10 439 50 439 140C439 230 377 271 301 286L222 302C172 312 152 331 152 366C152 401 187 430 243 430H251C316 430 344 390 349 345H444C444 440 377 510 246 510C146 510 57 456 57 356C57 271 122 229 203 213L276 199C326 189 344 167 344 135C344 95 303 70 251 70H243C184 70 137 95 132 155H37C37 60 109 -10 242 -10Z", transform: "translate(170.38,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M75 0H170V500H75ZM70 590H175V700H70Z", transform: "translate(203.84,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M268 -220C423 -220 513 -125 513 0V500H418V430C398 470 343 510 268 510C150 510 46 430 46 255C46 80 153 0 268 0C343 0 393 40 418 80V10C418 -95 358 -140 273 -140H263C195 -140 141 -115 131 -65H36C46 -155 128 -220 268 -220ZM141 255C141 380 206 430 277 430H285C354 430 418 365 418 255C418 145 349 80 280 80H272C201 80 141 130 141 255Z", transform: "translate(220.29,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M75 0H170V280C170 375 235 430 306 430H314C385 430 415 385 415 315V0H510V335C510 440 445 510 330 510C250 510 200 475 170 430V500H75Z", transform: "translate(260.75,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M210 -10C290 -10 350 35 370 80C370 75 370 25 375 0H465C460 35 460 80 460 110V320C460 422 390 510 257 510C144 510 61 447 55 355H150C156 405 201 430 253 430H261C325 430 365 390 365 320V304L227 293C146 286 45 252 45 138C45 53 115 -10 210 -10ZM140 142C140 188 182 216 240 221L365 231V180C365 120 290 70 229 70H221C174 70 140 101 140 142Z", transform: "translate(300.65,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M75 0H170V700H75Z", transform: "translate(337.05,74.50) scale(0.070000,-0.070000)" }),
          /* @__PURE__ */ jsx36("path", { d: "M242 -10C358 -10 439 50 439 140C439 230 377 271 301 286L222 302C172 312 152 331 152 366C152 401 187 430 243 430H251C316 430 344 390 349 345H444C444 440 377 510 246 510C146 510 57 456 57 356C57 271 122 229 203 213L276 199C326 189 344 167 344 135C344 95 303 70 251 70H243C184 70 137 95 132 155H37C37 60 109 -10 242 -10Z", transform: "translate(353.50,74.50) scale(0.070000,-0.070000)" })
        ] })
      ]
    }
  );
}

// src/design-system/components/Breadcrumb.tsx
import { jsx as jsx37, jsxs as jsxs23 } from "react/jsx-runtime";
function Breadcrumb({ items, renderLink, className, style }) {
  return /* @__PURE__ */ jsx37(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: ["ds-Breadcrumb", className].filter(Boolean).join(" "),
      style,
      children: /* @__PURE__ */ jsx37("ol", { className: "ds-BreadcrumbList", children: items.map((item, i) => {
        const isLast = i === items.length - 1;
        return /* @__PURE__ */ jsxs23("li", { className: "ds-BreadcrumbItem", children: [
          item.href && !isLast ? renderLink ? /* @__PURE__ */ jsx37("span", { className: "ds-BreadcrumbLink", children: renderLink(item.href, item.label) }) : /* @__PURE__ */ jsx37("a", { className: "ds-BreadcrumbLink", href: item.href, children: item.label }) : /* @__PURE__ */ jsx37("span", { className: "ds-BreadcrumbCurrent", "aria-current": isLast ? "page" : void 0, children: item.label }),
          !isLast && /* @__PURE__ */ jsx37("span", { className: "ds-BreadcrumbSeparator", "aria-hidden": "true", children: "/" })
        ] }, i);
      }) })
    }
  );
}

// src/design-system/tokens/index.ts
var tokens = {
  color: {
    primary: { bg: "var(--color-primary-bg)", fg: "var(--color-primary-fg)" },
    neutral: { bg: "var(--color-neutral-bg)", fg: "var(--color-neutral-fg)" },
    danger: { bg: "var(--color-danger-bg)", fg: "var(--color-danger-fg)" },
    success: { bg: "var(--color-success-bg)", fg: "var(--color-success-fg)" },
    warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning-fg)" },
    accent: { bg: "var(--color-accent-bg)", fg: "var(--color-accent-fg)" },
    secondary: { bg: "var(--color-secondary-bg)", fg: "var(--color-secondary-fg)" },
    border: { default: "var(--color-border-default)" }
  },
  space: { xs: "var(--space-xs)", sm: "var(--space-sm)", md: "var(--space-md)", lg: "var(--space-lg)", xl: "var(--space-xl)" },
  radius: { sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)", pill: "var(--radius-pill)" },
  font: { base: "var(--font-base)" },
  shadow: { sm: "var(--shadow-sm)", md: "var(--shadow-md)" }
};

// src/competitor/claim-utils.ts
var AB_TEST_COLORS = [
  { bg: "hsl(var(--primary) / 0.22)", border: "hsl(var(--primary) / 0.45)" },
  { bg: "hsl(var(--accent) / 0.22)", border: "hsl(var(--accent) / 0.45)" },
  { bg: "hsl(var(--warning) / 0.22)", border: "hsl(var(--warning) / 0.45)" }
];
var claimCompareKey = (txt) => txt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
function detectABTestGroups(ranges) {
  const entries = [];
  let i = 0;
  while (i < ranges.length) {
    const firstKey = claimCompareKey(ranges[i].claim);
    let secondKey = null;
    let j = i + 1;
    while (j < ranges.length) {
      const key = claimCompareKey(ranges[j].claim);
      if (key === firstKey || key === secondKey) {
        j++;
        continue;
      }
      if (secondKey === null) {
        secondKey = key;
        j++;
        continue;
      }
      break;
    }
    const groupLen = j - i;
    if (secondKey !== null && groupLen >= 4) {
      let countA = 0;
      let countB = 0;
      for (let k = i; k < j; k++) {
        const key = claimCompareKey(ranges[k].claim);
        if (key === firstKey) countA++;
        else countB++;
      }
      if (countA >= 2 && countB >= 2) {
        const groupRanges = ranges.slice(i, j);
        const variants = [
          { key: firstKey, displayClaim: ranges[i].claim }
        ];
        for (const r of groupRanges) {
          if (claimCompareKey(r.claim) === secondKey) {
            variants.push({ key: secondKey, displayClaim: r.claim });
            break;
          }
        }
        entries.push({
          kind: "abtest",
          ranges: groupRanges,
          variants,
          from: groupRanges[0].from,
          to: groupRanges[groupRanges.length - 1].to
        });
        i = j;
        continue;
      }
    }
    entries.push({ kind: "normal", range: ranges[i] });
    i++;
  }
  return entries;
}

// src/competitor/ClaimTimeline.tsx
import { Fragment as Fragment5, jsx as jsx38, jsxs as jsxs24 } from "react/jsx-runtime";
function ClaimTimeline({
  claimRanges,
  loading = false,
  error = false,
  locale = "de-DE",
  tickInterval,
  loadingIcon
}) {
  if (loading) {
    return /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      loadingIcon,
      " Lade Positionierung\u2026"
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx38(Text, { size: "sm", className: "text-destructive", children: "Konnte Positionierung nicht laden." });
  }
  if (claimRanges.length === 0) {
    return /* @__PURE__ */ jsx38(Text, { size: "sm", tone: "muted", children: "Keine Claims gefunden." });
  }
  const ranges = [...claimRanges].sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()
  );
  const start = new Date(
    ranges.reduce(
      (min, r) => Math.min(min, new Date(r.from).getTime()),
      Infinity
    )
  );
  const end = new Date(
    ranges.reduce(
      (max, r) => {
        var _a;
        return Math.max(max, new Date((_a = r.to) != null ? _a : (/* @__PURE__ */ new Date()).toISOString()).getTime());
      },
      -Infinity
    )
  );
  const totalMs = Math.max(1, end.getTime() - start.getTime());
  const totalMonths = Math.round(totalMs / (30.44 * 864e5));
  const fmtShort = (d) => d.toLocaleDateString(locale, { month: "short", year: "2-digit" });
  const fmtFull = (d) => d.toLocaleDateString(locale);
  const percent = (dateStr) => {
    const ms = new Date(dateStr).getTime() - start.getTime();
    return Math.max(0, Math.min(100, ms / totalMs * 100));
  };
  const percentDate = (d) => {
    const ms = d.getTime() - start.getTime();
    return Math.max(0, Math.min(100, ms / totalMs * 100));
  };
  const interval = tickInterval != null ? tickInterval : totalMonths <= 6 ? 1 : totalMonths <= 12 ? 3 : totalMonths <= 24 ? 6 : 12;
  const ticks = (() => {
    const out = [];
    const startMonth = Math.ceil(start.getMonth() / interval) * interval;
    let d = new Date(start.getFullYear(), startMonth, 1);
    if (percentDate(d) < 5) {
      d = new Date(d.getFullYear(), d.getMonth() + interval, 1);
    }
    while (d <= end) {
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const y = String(d.getFullYear() % 100).padStart(2, "0");
      out.push({ left: percentDate(d), label: `${m}/${y}` });
      d = new Date(d.getFullYear(), d.getMonth() + interval, 1);
    }
    return out;
  })();
  const barStyles = (idx) => {
    const isPrimary = idx % 2 === 0;
    return {
      background: isPrimary ? "hsl(var(--tl-bar-1) / 0.18)" : "hsl(var(--tl-bar-2) / 0.18)",
      borderColor: isPrimary ? "hsl(var(--tl-bar-1) / 0.35)" : "hsl(var(--tl-bar-2) / 0.35)"
    };
  };
  const timelineEntries = detectABTestGroups(ranges);
  const entryMinHeight = (entry) => entry.kind === "abtest" ? Math.max(48, 28 + entry.variants.length * 24) : 48;
  const renderMobile = () => /* @__PURE__ */ jsx38("div", { className: "ds-claim-timeline-mobile flex flex-col gap-3", children: timelineEntries.map((entry, idx) => {
    if (entry.kind === "normal") {
      const r = entry.range;
      const left2 = percent(r.from);
      const rightPt2 = r.to ? percent(r.to) : 100;
      const width2 = Math.max(2, rightPt2 - left2);
      return /* @__PURE__ */ jsxs24("div", { className: "border-b border-border/40 pb-3 last:border-b-0 last:pb-0", children: [
        /* @__PURE__ */ jsx38("div", { className: "text-sm font-medium mb-1", children: r.claim }),
        /* @__PURE__ */ jsxs24("div", { className: "text-xs text-muted-foreground mb-2", children: [
          fmtShort(new Date(r.from)),
          " \u2013 ",
          r.to ? fmtShort(new Date(r.to)) : "today"
        ] }),
        /* @__PURE__ */ jsx38("div", { className: "relative h-5 rounded overflow-hidden", style: { background: "hsl(var(--border) / 0.3)" }, children: /* @__PURE__ */ jsx38(
          "div",
          {
            className: "absolute top-0 bottom-0 rounded border",
            style: { left: `${left2}%`, width: `${width2}%`, ...barStyles(idx) }
          }
        ) })
      ] }, idx);
    }
    const left = percent(entry.from);
    const rightPt = entry.to ? percent(entry.to) : 100;
    const width = Math.max(2, rightPt - left);
    return /* @__PURE__ */ jsxs24(
      "div",
      {
        className: "border-b border-border/40 pb-3 last:border-b-0 last:pb-0 border-l-2 pl-2",
        style: { borderLeftColor: "hsl(var(--accent) / 0.5)" },
        children: [
          /* @__PURE__ */ jsx38(Badge, { variant: "accent", tone: "subtle", size: "sm", children: "A/B Test" }),
          entry.variants.map((v, vi) => /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsx38(
              "span",
              {
                className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                style: { background: AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border }
              }
            ),
            /* @__PURE__ */ jsx38("span", { className: "text-xs text-muted-foreground", children: v.displayClaim })
          ] }, v.key)),
          /* @__PURE__ */ jsxs24("div", { className: "text-xs text-muted-foreground mt-1 mb-2", children: [
            fmtShort(new Date(entry.from)),
            " \u2013 ",
            entry.to ? fmtShort(new Date(entry.to)) : "today"
          ] }),
          /* @__PURE__ */ jsx38("div", { className: "relative h-5 rounded overflow-hidden", style: { background: "hsl(var(--border) / 0.3)" }, children: /* @__PURE__ */ jsx38(
            "div",
            {
              className: "absolute top-0 bottom-0 rounded border",
              style: {
                left: `${left}%`,
                width: `${width}%`,
                background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                borderColor: "hsl(var(--accent) / 0.45)"
              }
            }
          ) })
        ]
      },
      idx
    );
  }) });
  const lineColor = "hsl(var(--foreground) / 0.2)";
  const renderDesktop = () => /* @__PURE__ */ jsx38("div", { className: "ds-claim-timeline-desktop", style: { "--tl-line": lineColor }, children: /* @__PURE__ */ jsxs24("div", { className: "grid grid-cols-[1fr_4fr] gap-x-4 items-center", children: [
    /* @__PURE__ */ jsx38("div", {}),
    /* @__PURE__ */ jsx38("div", { className: "relative h-6 text-xs text-muted-foreground", children: ticks.map((t, i) => /* @__PURE__ */ jsx38(
      "span",
      {
        className: "absolute -translate-x-1/2 top-0 whitespace-nowrap",
        style: { left: `${t.left}%` },
        children: t.label
      },
      i
    )) }),
    /* @__PURE__ */ jsx38("div", { children: timelineEntries.map((entry, idx) => {
      const isLast = idx === timelineEntries.length - 1;
      const rowBorder = isLast ? void 0 : "1px solid var(--tl-line)";
      return entry.kind === "normal" ? /* @__PURE__ */ jsx38(
        "div",
        {
          className: "flex items-center h-12 pr-2",
          style: { borderBottom: rowBorder },
          children: /* @__PURE__ */ jsx38("div", { className: "text-sm font-medium truncate", children: entry.range.claim })
        },
        `left-${idx}`
      ) : /* @__PURE__ */ jsxs24(
        "div",
        {
          className: "flex flex-col justify-center gap-1 py-2 pr-2 border-l-2",
          style: {
            borderLeftColor: "hsl(var(--accent) / 0.5)",
            borderBottom: rowBorder,
            paddingLeft: 8,
            minHeight: entryMinHeight(entry)
          },
          children: [
            /* @__PURE__ */ jsx38(Badge, { variant: "accent", tone: "subtle", size: "sm", children: "A/B Test" }),
            entry.variants.map((v, vi) => /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx38(
                "span",
                {
                  className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                  style: {
                    "--dot-bg": AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border,
                    background: "var(--dot-bg)"
                  }
                }
              ),
              /* @__PURE__ */ jsx38("span", { className: "text-xs truncate text-muted-foreground", children: v.displayClaim })
            ] }, v.key))
          ]
        },
        `left-${idx}`
      );
    }) }),
    /* @__PURE__ */ jsxs24("div", { className: "relative", children: [
      /* @__PURE__ */ jsx38("div", { className: "absolute inset-0 pointer-events-none", children: ticks.map((t, i) => /* @__PURE__ */ jsx38(
        "div",
        {
          className: "absolute top-0 bottom-0",
          style: {
            left: `${t.left}%`,
            width: 1,
            background: "var(--tl-line)"
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsx38("div", { children: timelineEntries.map((entry, idx) => {
        const isLast = idx === timelineEntries.length - 1;
        const rowBorder = isLast ? void 0 : "1px solid var(--tl-line)";
        return entry.kind === "normal" ? (() => {
          const r = entry.range;
          const left = percent(r.from);
          const rightPoint = r.to ? percent(r.to) : 100;
          const width = Math.max(1, rightPoint - left);
          return /* @__PURE__ */ jsx38(
            "div",
            {
              className: "flex items-center h-12",
              style: { borderBottom: rowBorder },
              children: /* @__PURE__ */ jsx38("div", { className: "relative w-full h-8", children: /* @__PURE__ */ jsx38(
                "div",
                {
                  className: "absolute top-1 bottom-1 rounded border",
                  style: {
                    left: `${left}%`,
                    width: `${width}%`,
                    ...barStyles(idx)
                  },
                  title: `${r.claim} \u2014 ${r.to ? `${fmtFull(new Date(r.from))} \u2013 ${fmtFull(new Date(r.to))}` : `seit ${fmtFull(new Date(r.from))}`}`
                }
              ) })
            },
            `right-${idx}`
          );
        })() : (() => {
          const left = percent(entry.from);
          const rightPoint = entry.to ? percent(entry.to) : 100;
          const width = Math.max(1, rightPoint - left);
          const variantLabels = entry.variants.map((v) => v.displayClaim).join(" / ");
          return /* @__PURE__ */ jsx38(
            "div",
            {
              className: "flex items-center",
              style: { borderBottom: rowBorder, minHeight: entryMinHeight(entry) },
              children: /* @__PURE__ */ jsx38("div", { className: "relative w-full h-8", children: /* @__PURE__ */ jsx38(
                "div",
                {
                  className: "absolute top-1 bottom-1 rounded border",
                  style: {
                    left: `${left}%`,
                    width: `${width}%`,
                    background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                    borderColor: "hsl(var(--accent) / 0.45)"
                  },
                  title: `A/B Test: ${variantLabels} \u2014 ${entry.to ? `${fmtFull(new Date(entry.from))} \u2013 ${fmtFull(new Date(entry.to))}` : `seit ${fmtFull(new Date(entry.from))}`}`
                }
              ) })
            },
            `right-${idx}`
          );
        })();
      }) })
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs24(Fragment5, { children: [
    renderMobile(),
    renderDesktop()
  ] });
}

// src/competitor/kpi-utils.ts
function formatKpiValue(value, unit, locale = "de-DE") {
  const fmt = (opts) => new Intl.NumberFormat(locale, opts).format(value);
  const m = locale.startsWith("de") ? "Mio." : "M";
  const b = locale.startsWith("de") ? "Mrd." : "B";
  switch (unit) {
    case "USD":
      return fmt({ style: "currency", currency: "USD", maximumFractionDigits: 0 });
    case "EUR":
      return fmt({ style: "currency", currency: "EUR", maximumFractionDigits: 0 });
    case "USD_millions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "EUR_millions":
      return `\u20AC${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "USD_billions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "EUR_billions":
      return `\u20AC${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "CHF":
      return `CHF ${fmt({ maximumFractionDigits: 0 })}`;
    case "CHF_millions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "CHF_billions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "percent":
      return `${fmt({ maximumFractionDigits: 1 })}%`;
    case "count":
      if (value >= 1e9) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1e9)} ${b}`;
      }
      if (value >= 1e6) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1e6)} ${m}`;
      }
      if (value >= 1e4) {
        return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(value / 1e3) * 1e3);
      }
      return fmt({ maximumFractionDigits: 0 });
    case "ratio":
    case "multiple":
      return `${fmt({ maximumFractionDigits: 1 })}x`;
    default:
      return new Intl.NumberFormat(locale).format(value);
  }
}
function qualifierPrefix(qualifier) {
  switch (qualifier) {
    case "approximately":
      return "~";
    case "over":
      return ">";
    case "under":
      return "<";
    default:
      return "";
  }
}
var REVENUE_KEYS = ["revenue_arr", "revenue_total", "revenue_mrr"];
function getRevenue(snapshot) {
  var _a;
  if (!snapshot) return null;
  for (const key of REVENUE_KEYS) {
    if ((_a = snapshot.metrics[key]) == null ? void 0 : _a.length) return { entry: snapshot.metrics[key][0], key };
  }
  return null;
}
function getEmployees(snapshot) {
  var _a, _b;
  return (_b = (_a = snapshot == null ? void 0 : snapshot.metrics["employees"]) == null ? void 0 : _a[0]) != null ? _b : null;
}
function getCustomers(snapshot) {
  var _a, _b;
  if (!snapshot) return null;
  const customers = (_a = snapshot.metrics["customers_total"]) == null ? void 0 : _a[0];
  const users = (_b = snapshot.metrics["users_total"]) == null ? void 0 : _b[0];
  if (users && customers) {
    const ratio = users.value / customers.value;
    if (users.value >= 1e6 || ratio >= 100) {
      return { entry: users, key: "users_total" };
    }
  } else if (users && !customers) {
    return { entry: users, key: "users_total" };
  }
  if (customers) return { entry: customers, key: "customers_total" };
  return null;
}
function getRevenueGrowthYoY(snapshot) {
  var _a, _b;
  return (_b = (_a = snapshot == null ? void 0 : snapshot.metrics["revenue_growth_yoy"]) == null ? void 0 : _a[0]) != null ? _b : null;
}
var KPI_CATEGORIES = {
  revenue_arr: { category: "revenue", label: "ARR" },
  revenue_mrr: { category: "revenue", label: "MRR" },
  revenue_total: { category: "revenue", label: "Umsatz gesamt" },
  revenue_growth_yoy: { category: "revenue", label: "Umsatzwachstum YoY" },
  valuation: { category: "funding", label: "Bewertung" },
  funding_total: { category: "funding", label: "Funding gesamt" },
  funding_round: { category: "funding", label: "Letzte Runde" },
  funding_stage: { category: "funding", label: "Stage" },
  ebitda: { category: "profitability", label: "EBITDA" },
  net_income: { category: "profitability", label: "Nettoergebnis" },
  gross_margin: { category: "profitability", label: "Bruttomarge" },
  burn_rate: { category: "profitability", label: "Burn Rate" },
  customers_total: { category: "customers", label: "Kunden gesamt" },
  customers_enterprise: { category: "customers", label: "Enterprise-Kunden" },
  nrr: { category: "customers", label: "NRR" },
  churn_rate: { category: "customers", label: "Churn Rate" },
  market_share: { category: "customers", label: "Marktanteil" },
  nps: { category: "customers", label: "NPS" },
  users_total: { category: "users", label: "User gesamt" },
  users_paying: { category: "users", label: "Zahlende User" },
  gmv: { category: "users", label: "GMV" },
  employees: { category: "team", label: "Mitarbeiter" }
};
var CATEGORY_LABELS = {
  revenue: "Revenue",
  funding: "Funding",
  profitability: "Profitability",
  customers: "Customers",
  users: "Users",
  team: "Team"
};
function getKpiSnapshot(competitor) {
  const raw = competitor == null ? void 0 : competitor.kpi_snapshot;
  if (!raw || typeof raw !== "object" || !("metrics" in raw)) return null;
  return raw;
}

// src/competitor/job-functions.ts
var UNKNOWN_JOB_FUNCTION_CODE = "__unknown";
var JOB_FUNCTION_LABELS = {
  acct: "Accounting / Auditing",
  adm: "Administrative",
  advr: "Advertising",
  anls: "Analyst",
  art: "Art / Creative",
  bd: "Business Development",
  cnsl: "Consulting",
  cust: "Customer Service",
  dist: "Distribution",
  dsgn: "Design",
  edu: "Education",
  eng: "Engineering",
  fin: "Finance",
  genb: "General Business",
  hcpr: "HealthCare Provider",
  hr: "Human Resources",
  it: "Information Technology",
  lgl: "Legal",
  mgmt: "Management",
  mnfc: "Manufacturing",
  mrkt: "Marketing",
  othr: "Other",
  pr: "Public Relations",
  prch: "Purchasing",
  prdm: "Product Management",
  prjm: "Project Management",
  prod: "Production",
  qa: "Quality Assurance",
  rsch: "Research",
  sale: "Sales",
  sci: "Science",
  stra: "Strategy / Planning",
  supl: "Supply Chain",
  trng: "Training",
  wrt: "Writing / Editing",
  [UNKNOWN_JOB_FUNCTION_CODE]: "Unknown"
};
var JOB_FUNCTION_VARIANT_MAP = {
  mgmt: "primary",
  stra: "primary",
  genb: "primary",
  bd: "primary",
  cnsl: "primary",
  prjm: "primary",
  prdm: "primary",
  sale: "accent",
  mrkt: "accent",
  advr: "accent",
  pr: "accent",
  art: "accent",
  dsgn: "accent",
  wrt: "accent",
  anls: "success",
  eng: "success",
  it: "success",
  qa: "success",
  sci: "success",
  rsch: "success",
  supl: "warning",
  mnfc: "warning",
  prod: "warning",
  dist: "warning",
  prch: "warning",
  hr: "secondary",
  adm: "secondary",
  cust: "secondary",
  edu: "secondary",
  trng: "secondary",
  hcpr: "secondary",
  acct: "neutral",
  fin: "neutral",
  lgl: "neutral",
  othr: "neutral",
  [UNKNOWN_JOB_FUNCTION_CODE]: "neutral"
};

// src/competitor/KpiCard.tsx
import { Fragment as Fragment6, jsx as jsx39, jsxs as jsxs25 } from "react/jsx-runtime";
function KpiCard({
  icon: Icon,
  label,
  entry,
  locale = "de-DE",
  externalLinkIcon: ExternalLinkIcon
}) {
  var _a;
  const formatted = entry ? `${qualifierPrefix(entry.qualifier)}${formatKpiValue(entry.value, entry.unit, locale)}` : null;
  return /* @__PURE__ */ jsx39(Card, { children: /* @__PURE__ */ jsxs25(Card.Content, { children: [
    /* @__PURE__ */ jsxs25("div", { className: "flex items-center gap-sm mb-sm", children: [
      /* @__PURE__ */ jsx39(Icon, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx39(Text, { size: "sm", tone: "muted", children: label })
    ] }),
    entry && formatted ? /* @__PURE__ */ jsxs25(Fragment6, { children: [
      entry.source_url ? /* @__PURE__ */ jsx39(Tooltip, { content: (_a = entry.source_title) != null ? _a : entry.source_url, children: /* @__PURE__ */ jsxs25(
        "a",
        {
          href: entry.source_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 hover:underline",
          children: [
            /* @__PURE__ */ jsx39(Text, { size: "xl", weight: "bold", children: formatted }),
            ExternalLinkIcon && /* @__PURE__ */ jsx39(ExternalLinkIcon, { className: "h-3.5 w-3.5 text-muted-foreground" })
          ]
        }
      ) }) : /* @__PURE__ */ jsx39(Text, { size: "xl", weight: "bold", children: formatted }),
      entry.period && /* @__PURE__ */ jsx39(Text, { size: "sm", tone: "muted", children: entry.period })
    ] }) : /* @__PURE__ */ jsx39(Text, { size: "xl", weight: "bold", tone: "muted", children: "?" })
  ] }) });
}

// src/competitor/CompetitorLogo.tsx
import { useState as useState7 } from "react";
import { jsx as jsx40 } from "react/jsx-runtime";
function CompetitorLogo({ name, domain, brandfetchClientId, size = 18 }) {
  const [failed, setFailed] = useState7(false);
  const src = domain && brandfetchClientId ? `https://cdn.brandfetch.io/${domain}/fallback/404/icon.svg?c=${brandfetchClientId}` : void 0;
  if (failed || !src) {
    return /* @__PURE__ */ jsx40(
      "div",
      {
        style: {
          width: size,
          height: size,
          borderRadius: "var(--radius-sm)",
          background: "hsl(var(--muted))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        },
        children: /* @__PURE__ */ jsx40(Text, { as: "span", size: "sm", weight: "medium", children: (name || "?").charAt(0).toUpperCase() })
      }
    );
  }
  return /* @__PURE__ */ jsx40(
    "img",
    {
      src,
      alt: "",
      width: size,
      height: size,
      style: { borderRadius: "var(--radius-sm)", objectFit: "contain", flexShrink: 0 },
      onError: () => setFailed(true)
    }
  );
}

// src/competitor/hiring-chart-utils.ts
var MS_IN_DAY = 864e5;
var startOfIsoWeek = (date) => {
  const result = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = result.getUTCDay() || 7;
  if (day !== 1) {
    result.setUTCDate(result.getUTCDate() - (day - 1));
  }
  return result;
};
var addDays = (date, days) => new Date(date.getTime() + days * MS_IN_DAY);
var addWeeks = (date, weeks) => addDays(date, weeks * 7);
var getIsoWeekMeta = (date) => {
  const target = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / MS_IN_DAY + 1) / 7
  );
  return { week, year: target.getUTCFullYear() };
};
function formatJobCount(value, locale = "de-DE") {
  if (locale.startsWith("de")) {
    return `${value} Stelle${value === 1 ? "" : "n"}`;
  }
  return `${value} position${value === 1 ? "" : "s"}`;
}
function buildWeeklyJobData(jobs, maxWeeks = 12, locale = "en") {
  const empty = { weeklyJobData: [], jobFunctionGroups: [] };
  const now = /* @__PURE__ */ new Date();
  const lifecycles = jobs.filter((job) => typeof job.first_detected === "string").map((job) => {
    var _a;
    const start = new Date(job.first_detected);
    const resolvedEnd = job.ended ? new Date(job.ended) : now;
    const end = resolvedEnd.getTime() < start.getTime() ? start : resolvedEnd;
    const code = (_a = job.linkedin_job_function_code) != null ? _a : UNKNOWN_JOB_FUNCTION_CODE;
    return { start, end, code };
  });
  if (lifecycles.length === 0) return empty;
  const jobFunctions = /* @__PURE__ */ new Map();
  lifecycles.forEach((job) => {
    var _a;
    if (!jobFunctions.has(job.code))
      jobFunctions.set(job.code, (_a = JOB_FUNCTION_LABELS[job.code]) != null ? _a : job.code);
  });
  const variantOrder = [
    "primary",
    "accent",
    "success",
    "warning",
    "secondary",
    "neutral"
  ];
  const groupedByVariant = /* @__PURE__ */ new Map();
  Array.from(jobFunctions.entries()).map(([code, label]) => {
    var _a;
    return {
      id: code,
      label,
      variant: (_a = JOB_FUNCTION_VARIANT_MAP[code]) != null ? _a : "neutral"
    };
  }).sort((a, b) => {
    const d = variantOrder.indexOf(a.variant) - variantOrder.indexOf(b.variant);
    if (d !== 0) return d;
    return a.label.localeCompare(b.label, void 0, { sensitivity: "base" });
  }).forEach((entry) => {
    if (!groupedByVariant.has(entry.variant)) groupedByVariant.set(entry.variant, []);
    groupedByVariant.get(entry.variant).push(entry);
  });
  const groups = [];
  groupedByVariant.forEach(
    (list) => list.forEach((meta, idx) => groups.push({ ...meta, tintIndex: idx % 3 }))
  );
  if (groups.length === 0) return empty;
  const lifecyclesByType = /* @__PURE__ */ new Map();
  lifecycles.forEach((job) => {
    if (!lifecyclesByType.has(job.code)) lifecyclesByType.set(job.code, []);
    lifecyclesByType.get(job.code).push({ start: job.start, end: job.end });
  });
  const earliestStart = lifecycles.reduce(
    (e, i) => i.start < e ? i.start : e,
    lifecycles[0].start
  );
  const latestEnd = lifecycles.reduce(
    (l, i) => i.end > l ? i.end : l,
    lifecycles[0].end
  );
  const latestWeekStart = startOfIsoWeek(latestEnd);
  const earliestWeekStart = startOfIsoWeek(earliestStart);
  const desiredStart = addWeeks(latestWeekStart, -(maxWeeks - 1));
  const rangeStart = desiredStart.getTime() < earliestWeekStart.getTime() ? earliestWeekStart : desiredStart;
  const weeks = [];
  for (let cursor = rangeStart; cursor.getTime() <= latestWeekStart.getTime(); cursor = addWeeks(cursor, 1)) {
    weeks.push(cursor);
  }
  if (weeks.length === 0) weeks.push(latestWeekStart);
  const dayMonthFmt = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" });
  let lastIsoYear = null;
  const weeklyJobData = weeks.map((weekStart) => {
    const weekEndExclusive = addWeeks(weekStart, 1);
    const weekEndInclusive = addDays(weekEndExclusive, -1);
    const { week, year } = getIsoWeekMeta(weekStart);
    const label = lastIsoYear === null || year !== lastIsoYear ? `${locale === "de" ? "KW" : "CW"} ${week} (${year})` : `${locale === "de" ? "KW" : "CW"} ${week}`;
    lastIsoYear = year;
    const rangeLabel = `${dayMonthFmt.format(weekStart)} \u2013 ${dayMonthFmt.format(weekEndInclusive)}`;
    const g = groups.map((gm) => {
      var _a;
      const items = (_a = lifecyclesByType.get(gm.id)) != null ? _a : [];
      const value = items.reduce((acc, job) => {
        return job.start < weekEndExclusive && job.end >= weekStart ? acc + 1 : acc;
      }, 0);
      return { id: gm.id, value, detail: `${gm.label} \xB7 ${rangeLabel}` };
    });
    return { label, detail: rangeLabel, groups: g };
  });
  return { weeklyJobData, jobFunctionGroups: groups };
}

// src/competitor/CompetitorInfoCard.tsx
import { Fragment as Fragment7, jsx as jsx41, jsxs as jsxs26 } from "react/jsx-runtime";
function ensureAbsolute(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
function cleanDomain(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
function CompetitorInfoCard({
  name,
  website,
  linkedinUrl,
  description,
  currentClaim,
  externalLinkIcon: ExternalLinkIcon,
  quoteIcon: QuoteIcon,
  linkedinIcon: LinkedinIcon,
  sidebar
}) {
  return /* @__PURE__ */ jsx41(Card, { children: /* @__PURE__ */ jsx41(Card.Content, { children: /* @__PURE__ */ jsxs26("div", { className: "flex flex-col lg:flex-row lg:gap-lg", children: [
    /* @__PURE__ */ jsxs26("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx41(Heading, { level: 2, children: name }),
      /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-md text-sm", children: [
        website ? /* @__PURE__ */ jsxs26(
          "a",
          {
            href: ensureAbsolute(website),
            target: "_blank",
            rel: "noreferrer",
            className: "text-primary flex items-center gap-1",
            children: [
              cleanDomain(website),
              ExternalLinkIcon && /* @__PURE__ */ jsx41(ExternalLinkIcon, { className: "h-3 w-3" })
            ]
          }
        ) : /* @__PURE__ */ jsx41("span", { className: "text-muted-foreground", children: "No website listed" }),
        linkedinUrl && /* @__PURE__ */ jsxs26(Fragment7, { children: [
          /* @__PURE__ */ jsx41("span", { className: "text-muted-foreground", children: "\xB7" }),
          /* @__PURE__ */ jsxs26(
            "a",
            {
              href: linkedinUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-primary flex items-center gap-1",
              children: [
                "LinkedIn",
                ExternalLinkIcon && /* @__PURE__ */ jsx41(ExternalLinkIcon, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ] }),
      description && /* @__PURE__ */ jsx41(Text, { size: "sm", tone: "muted", className: "mt-sm", children: description })
    ] }),
    (currentClaim || sidebar) && /* @__PURE__ */ jsxs26(Fragment7, { children: [
      /* @__PURE__ */ jsx41("div", { className: "my-md lg:hidden", style: { height: 1, background: "var(--border)" } }),
      /* @__PURE__ */ jsx41("div", { className: "hidden lg:block w-px bg-border shrink-0" }),
      /* @__PURE__ */ jsxs26("div", { className: "lg:w-64 shrink-0 flex flex-col gap-md", children: [
        currentClaim && /* @__PURE__ */ jsxs26("div", { children: [
          /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-sm mb-xs", children: [
            QuoteIcon && /* @__PURE__ */ jsx41(QuoteIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx41(Text, { size: "sm", tone: "muted", children: "Positioning" })
          ] }),
          /* @__PURE__ */ jsxs26(Text, { size: "sm", weight: "medium", className: "line-clamp-2", children: [
            "\u201C",
            currentClaim,
            "\u201D"
          ] })
        ] }),
        sidebar
      ] })
    ] })
  ] }) }) });
}

// src/competitor/HiringOverview.tsx
import { Fragment as Fragment8, jsx as jsx42, jsxs as jsxs27 } from "react/jsx-runtime";
var VARIANT_CATEGORY_LABELS = {
  primary: "Management & Strategy",
  accent: "Marketing & Sales",
  success: "Engineering & R&D",
  warning: "Production & Logistics",
  secondary: "HR & Administration",
  neutral: "Other"
};
var VARIANT_BG_CLASSES = {
  primary: "ds-bg-primary",
  accent: "ds-bg-accent",
  success: "ds-bg-success",
  warning: "ds-bg-warning",
  secondary: "ds-bg-secondary",
  neutral: "ds-bg-neutral"
};
var COMPARE_WEEKS = 4;
function countActiveAt(jobs, date) {
  const iso = date.toISOString();
  return jobs.filter((j) => {
    if (!j.first_detected || j.first_detected > iso) return false;
    if (j.ended && j.ended < iso) return false;
    return true;
  }).length;
}
function buildCategorySegments(jobs) {
  var _a, _b, _c, _d;
  const groups = /* @__PURE__ */ new Map();
  for (const job of jobs) {
    const code = (_a = job.linkedin_job_function_code) != null ? _a : "__unknown";
    const variant = (_b = JOB_FUNCTION_VARIANT_MAP[code]) != null ? _b : "neutral";
    const fnLabel = (_c = JOB_FUNCTION_LABELS[code]) != null ? _c : code;
    let group = groups.get(variant);
    if (!group) {
      group = { total: 0, byFunction: /* @__PURE__ */ new Map() };
      groups.set(variant, group);
    }
    group.total++;
    group.byFunction.set(fnLabel, ((_d = group.byFunction.get(fnLabel)) != null ? _d : 0) + 1);
  }
  const total = jobs.length;
  return [...groups.entries()].sort((a, b) => {
    if (a[0] === "neutral") return 1;
    if (b[0] === "neutral") return -1;
    return b[1].total - a[1].total;
  }).map(([variant, { total: count, byFunction }]) => ({
    variant,
    label: VARIANT_CATEGORY_LABELS[variant],
    count,
    percent: count / total * 100,
    functions: [...byFunction.entries()].sort((a, b) => b[1] - a[1]).map(([label, c]) => ({ label, count: c }))
  }));
}
function HiringOverview({
  segments: segmentsProp,
  activeJobs,
  activeJobCount,
  jobLifecycle,
  employees,
  employeesIcon: EmployeesIcon,
  rolesIcon: RolesIcon,
  trendUpIcon: TrendUpIcon,
  trendDownIcon: TrendDownIcon,
  unchangedIcon: UnchangedIcon
}) {
  var _a;
  const segments = segmentsProp != null ? segmentsProp : activeJobs ? buildCategorySegments(activeJobs) : [];
  const currentCount = (_a = activeJobCount != null ? activeJobCount : activeJobs == null ? void 0 : activeJobs.length) != null ? _a : 0;
  const compareDate = /* @__PURE__ */ new Date();
  compareDate.setDate(compareDate.getDate() - COMPARE_WEEKS * 7);
  const previousCount = jobLifecycle ? countActiveAt(jobLifecycle, compareDate) : 0;
  const diff = jobLifecycle ? currentCount - previousCount : 0;
  const hasTrend = !!jobLifecycle;
  const hasJobs = segments.length > 0;
  return /* @__PURE__ */ jsxs27(Card, { children: [
    /* @__PURE__ */ jsx42(Card.Header, { children: /* @__PURE__ */ jsx42(Card.Title, { as: "h2", children: "Team & Hiring" }) }),
    /* @__PURE__ */ jsx42(Card.Content, { children: /* @__PURE__ */ jsxs27("div", { className: "flex flex-col gap-md", children: [
      /* @__PURE__ */ jsxs27("div", { className: "flex gap-xl", children: [
        /* @__PURE__ */ jsxs27("div", { children: [
          /* @__PURE__ */ jsxs27("div", { className: "flex items-center gap-sm mb-xs", children: [
            EmployeesIcon && /* @__PURE__ */ jsx42(EmployeesIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx42(Text, { size: "sm", tone: "muted", children: "Employees" })
          ] }),
          employees ? /* @__PURE__ */ jsxs27(Fragment8, { children: [
            /* @__PURE__ */ jsxs27(Text, { size: "xl", weight: "bold", children: [
              qualifierPrefix(employees.qualifier),
              formatKpiValue(employees.value, employees.unit)
            ] }),
            employees.period && /* @__PURE__ */ jsx42(Text, { size: "sm", tone: "muted", children: employees.period })
          ] }) : /* @__PURE__ */ jsx42(Text, { size: "xl", weight: "bold", tone: "muted", children: "?" })
        ] }),
        /* @__PURE__ */ jsxs27("div", { children: [
          /* @__PURE__ */ jsxs27("div", { className: "flex items-center gap-sm mb-xs", children: [
            RolesIcon && /* @__PURE__ */ jsx42(RolesIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx42(Text, { size: "sm", tone: "muted", children: "Open Roles" })
          ] }),
          /* @__PURE__ */ jsxs27("div", { className: "flex items-baseline gap-sm", children: [
            /* @__PURE__ */ jsx42(Text, { size: "xl", weight: "bold", children: currentCount }),
            hasTrend && /* @__PURE__ */ jsxs27("div", { className: "flex items-center gap-1", children: [
              diff > 0 && TrendUpIcon ? /* @__PURE__ */ jsx42(TrendUpIcon, { className: "h-3.5 w-3.5 text-success" }) : diff < 0 && TrendDownIcon ? /* @__PURE__ */ jsx42(TrendDownIcon, { className: "h-3.5 w-3.5 text-destructive" }) : UnchangedIcon ? /* @__PURE__ */ jsx42(UnchangedIcon, { className: "h-3.5 w-3.5 text-muted-foreground" }) : null,
              /* @__PURE__ */ jsx42(Text, { size: "sm", tone: "muted", children: diff === 0 ? "unchanged" : `${diff > 0 ? "+" : ""}${diff} vs. ${COMPARE_WEEKS}w ago` })
            ] })
          ] })
        ] })
      ] }),
      hasJobs && /* @__PURE__ */ jsxs27("div", { className: "flex flex-col gap-sm", children: [
        /* @__PURE__ */ jsx42(Text, { size: "xs", tone: "muted", weight: "medium", children: "Open roles by function" }),
        /* @__PURE__ */ jsx42("div", { className: "flex h-3 w-full rounded-full overflow-hidden", children: segments.map((seg) => /* @__PURE__ */ jsx42(
          Tooltip,
          {
            className: `h-full block ${VARIANT_BG_CLASSES[seg.variant]}`,
            style: { width: `${seg.percent}%` },
            multiline: true,
            content: /* @__PURE__ */ jsxs27("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsx42("span", { className: "font-semibold", children: seg.label }),
              seg.functions.map((fn) => /* @__PURE__ */ jsxs27("span", { children: [
                fn.label,
                ": ",
                fn.count
              ] }, fn.label))
            ] }),
            children: /* @__PURE__ */ jsx42("div", { className: "h-full w-full cursor-default" })
          },
          seg.variant
        )) }),
        /* @__PURE__ */ jsx42("div", { className: "flex flex-wrap gap-x-md gap-y-xs", children: segments.map((seg) => /* @__PURE__ */ jsxs27("div", { className: "flex items-center gap-xs", children: [
          /* @__PURE__ */ jsx42(
            "span",
            {
              className: `inline-block h-2.5 w-2.5 rounded-full shrink-0 ${VARIANT_BG_CLASSES[seg.variant]}`
            }
          ),
          /* @__PURE__ */ jsx42(Text, { size: "xs", tone: "muted", children: seg.label })
        ] }, seg.variant)) })
      ] })
    ] }) })
  ] });
}
export {
  AB_TEST_COLORS,
  ActionIconButton,
  ActivityCard,
  Alert,
  Badge,
  BarChart,
  Breadcrumb,
  Button,
  CATEGORY_LABELS,
  Card,
  ClaimTimeline,
  CompetitorInfoCard,
  CompetitorLogo,
  DateTimeInput,
  DateTimeModalInput,
  DevButton,
  Dialog,
  Heading,
  HiringOverview,
  InlineEditButton,
  Input,
  JOB_FUNCTION_LABELS,
  JOB_FUNCTION_VARIANT_MAP,
  KPI_CATEGORIES,
  KpiCard,
  LOGO_VARIANTS,
  Logo,
  Modal,
  Navigation,
  NavigationBar,
  NavigationBrand,
  NavigationToggle,
  PageHeader,
  PieChart,
  RichText,
  Select,
  SelectMenu,
  SelectOption,
  Separator,
  Skeleton,
  TabNav,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Tag,
  TagField,
  TagList,
  Text,
  TextField,
  ToastProvider,
  Tooltip,
  UNKNOWN_JOB_FUNCTION_CODE,
  Wordmark,
  addDays,
  addWeeks,
  buildCategorySegments,
  buildWeeklyJobData,
  claimCompareKey,
  detectABTestGroups,
  formatJobCount,
  formatKpiValue,
  getCustomers,
  getEmployees,
  getIsoWeekMeta,
  getKpiSnapshot,
  getRevenue,
  getRevenueGrowthYoY,
  qualifierPrefix,
  startOfIsoWeek,
  tokens,
  useToast
};
//# sourceMappingURL=index.js.map