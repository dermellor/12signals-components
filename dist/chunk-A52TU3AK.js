import {
  Card
} from "./chunk-OO3JNWQC.js";
import {
  Text
} from "./chunk-MTQGJRER.js";
import {
  Heading
} from "./chunk-LPOOXJF6.js";

// src/competitor/CompetitorInfoCard.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(Card.Content, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:gap-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx(Heading, { level: 2, children: name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-md text-sm", children: [
        website ? /* @__PURE__ */ jsxs(
          "a",
          {
            href: ensureAbsolute(website),
            target: "_blank",
            rel: "noreferrer",
            className: "text-primary flex items-center gap-1",
            children: [
              cleanDomain(website),
              ExternalLinkIcon && /* @__PURE__ */ jsx(ExternalLinkIcon, { className: "h-3 w-3" })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No website listed" }),
        linkedinUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "\xB7" }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: linkedinUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-primary flex items-center gap-1",
              children: [
                "LinkedIn",
                ExternalLinkIcon && /* @__PURE__ */ jsx(ExternalLinkIcon, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ] }),
      description && /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", className: "mt-sm", children: description })
    ] }),
    (currentClaim || sidebar) && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "my-md lg:hidden", style: { height: 1, background: "var(--border)" } }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-px bg-border shrink-0" }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-64 shrink-0 flex flex-col gap-md", children: [
        currentClaim && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-sm mb-xs", children: [
            QuoteIcon && /* @__PURE__ */ jsx(QuoteIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: "Positioning" })
          ] }),
          /* @__PURE__ */ jsxs(Text, { size: "sm", weight: "medium", className: "line-clamp-2", children: [
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

export {
  CompetitorInfoCard
};
//# sourceMappingURL=chunk-A52TU3AK.js.map