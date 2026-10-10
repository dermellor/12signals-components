import {
  formatKpiValue,
  qualifierPrefix
} from "./chunk-OCIO7S25.js";
import {
  Tooltip
} from "./chunk-CL3B7R6Z.js";
import {
  Card
} from "./chunk-OO3JNWQC.js";
import {
  Text
} from "./chunk-MTQGJRER.js";

// src/competitor/KpiCard.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function KpiCard({
  icon: Icon,
  label,
  entry,
  locale = "de-DE",
  externalLinkIcon: ExternalLinkIcon,
  hidePeriod
}) {
  var _a;
  const formatted = entry ? `${qualifierPrefix(entry.qualifier)}${formatKpiValue(entry.value, entry.unit, locale)}` : null;
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(Card.Content, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-sm mb-sm", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: label })
    ] }),
    entry && formatted ? /* @__PURE__ */ jsxs(Fragment, { children: [
      entry.source_url ? /* @__PURE__ */ jsx(Tooltip, { content: (_a = entry.source_title) != null ? _a : entry.source_url, children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: entry.source_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 hover:underline",
          children: [
            /* @__PURE__ */ jsx(Text, { size: "xl", weight: "bold", children: formatted }),
            ExternalLinkIcon && /* @__PURE__ */ jsx(ExternalLinkIcon, { className: "h-3.5 w-3.5 text-muted-foreground" })
          ]
        }
      ) }) : /* @__PURE__ */ jsx(Text, { size: "xl", weight: "bold", children: formatted }),
      entry.period && !hidePeriod && /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: entry.period })
    ] }) : /* @__PURE__ */ jsx(Text, { size: "xl", weight: "bold", tone: "muted", children: "?" })
  ] }) });
}

export {
  KpiCard
};
//# sourceMappingURL=chunk-3NWZIDMT.js.map