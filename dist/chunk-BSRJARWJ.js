import {
  Text
} from "./chunk-MTQGJRER.js";

// src/competitor/CompetitorLogo.tsx
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var UNAVAILABLE_LOGOS_KEY = "12signals:brandfetch-unavailable-logos:v1";
var unavailableLogoUrls = null;
function getUnavailableLogoUrls() {
  if (unavailableLogoUrls) return unavailableLogoUrls;
  unavailableLogoUrls = /* @__PURE__ */ new Set();
  if (typeof window === "undefined") return unavailableLogoUrls;
  try {
    const stored = window.localStorage.getItem(UNAVAILABLE_LOGOS_KEY);
    const values = stored ? JSON.parse(stored) : [];
    if (Array.isArray(values)) {
      for (const value of values) {
        if (typeof value === "string" && value) unavailableLogoUrls.add(value);
      }
    }
  } catch {
    unavailableLogoUrls.clear();
  }
  return unavailableLogoUrls;
}
function isUnavailableLogo(src) {
  if (!src) return false;
  return getUnavailableLogoUrls().has(src);
}
function rememberUnavailableLogo(src) {
  if (!src || typeof window === "undefined") return;
  const unavailable = getUnavailableLogoUrls();
  if (unavailable.has(src)) return;
  unavailable.add(src);
  try {
    window.localStorage.setItem(UNAVAILABLE_LOGOS_KEY, JSON.stringify([...unavailable]));
  } catch {
  }
}
function CompetitorLogo({ name, domain, brandfetchClientId, size = 18, deferUnavailableCacheRead = false }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const [canReadUnavailableCache, setCanReadUnavailableCache] = useState(!deferUnavailableCacheRead);
  const src = domain && brandfetchClientId ? `https://cdn.brandfetch.io/${domain}/fallback/404/icon.svg?c=${brandfetchClientId}` : void 0;
  const failed = failedSrc === src || canReadUnavailableCache && isUnavailableLogo(src);
  useEffect(() => {
    if (deferUnavailableCacheRead) setCanReadUnavailableCache(true);
  }, [deferUnavailableCacheRead]);
  if (failed || !src) {
    return /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", weight: "medium", children: (name || "?").charAt(0).toUpperCase() })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt: "",
      width: size,
      height: size,
      style: { borderRadius: "var(--radius-sm)", objectFit: "contain", flexShrink: 0 },
      onError: () => {
        rememberUnavailableLogo(src);
        setFailedSrc(src != null ? src : null);
      }
    }
  );
}

export {
  CompetitorLogo
};
//# sourceMappingURL=chunk-BSRJARWJ.js.map