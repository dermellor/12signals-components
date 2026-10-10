import {
  Card
} from "./chunk-OO3JNWQC.js";
import {
  Text
} from "./chunk-MTQGJRER.js";
import {
  Badge
} from "./chunk-O7AERZ63.js";

// src/design-system/components/ActivityCard.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ACCENT_BADGES = {
  breaking: { label: "Breaking", variant: "accent", tone: "solid" }
};
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
  media,
  timestamp,
  href,
  ariaLabel,
  hover = "glow",
  accent
}) {
  var _a, _b, _c;
  const accentBadge = accent ? ACCENT_BADGES[accent] : null;
  const effectiveLabel = (_a = accentBadge == null ? void 0 : accentBadge.label) != null ? _a : categoryLabel;
  const effectiveVariant = (_b = accentBadge == null ? void 0 : accentBadge.variant) != null ? _b : categoryVariant;
  const effectiveTone = (_c = accentBadge == null ? void 0 : accentBadge.tone) != null ? _c : categoryTone;
  const badge = effectiveLabel ? /* @__PURE__ */ jsx(Badge, { variant: effectiveVariant, tone: effectiveTone, "aria-label": `Kategorie: ${effectiveLabel}`, children: effectiveLabel }) : null;
  const hasTitleContent = Boolean(titleNode || title);
  return /* @__PURE__ */ jsxs(
    Card,
    {
      variant: "gradient",
      hover,
      style: { position: "relative", padding: "var(--space-lg)" },
      "data-clickable": href ? "true" : "false",
      "data-accent": accent || void 0,
      role: "article",
      "aria-label": ariaLabel || headline || title,
      className: "ds-ActivityCard",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "ds-ActivityCard-layout", children: [
          /* @__PURE__ */ jsxs("div", { className: "ds-ActivityCard-topline", children: [
            icon && /* @__PURE__ */ jsx("div", { "aria-hidden": true, style: { display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: icon }),
            hasTitleContent && /* @__PURE__ */ jsx(
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
                children: titleNode || /* @__PURE__ */ jsx(Text, { as: "span", size: "xs", tone: "muted", children: title })
              }
            ),
            badge,
            extraBadges
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ds-ActivityCard-content", "data-has-media": media ? "true" : "false", children: [
            /* @__PURE__ */ jsxs("div", { className: "ds-ActivityCard-textcol", children: [
              headline && /* @__PURE__ */ jsx("div", { className: "ds-ActivityCard-headline", children: /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", weight: "medium", children: headline }) }),
              description && /* @__PURE__ */ jsx("div", { className: "ds-ActivityCard-description", style: { overflowWrap: "anywhere", wordBreak: "break-word" }, children: /* @__PURE__ */ jsx(Text, { as: "div", size: "sm", tone: "muted", children: description }) }),
              timestamp && /* @__PURE__ */ jsx("div", { className: "ds-ActivityCard-timestamp", children: /* @__PURE__ */ jsx(Text, { as: "span", size: "xs", tone: "muted", children: timestamp }) })
            ] }),
            media && /* @__PURE__ */ jsx("div", { className: "ds-ActivityCard-media", children: media })
          ] })
        ] }),
        href && /* @__PURE__ */ jsx(
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

export {
  ActivityCard
};
//# sourceMappingURL=chunk-QRF6BE3R.js.map