import React, { useEffect, useState } from "react";
import { Text } from "../design-system/components/Text";

const UNAVAILABLE_LOGOS_KEY = "12signals:brandfetch-unavailable-logos:v1";

type Props = {
  name: string;
  domain?: string | null;
  brandfetchClientId?: string;
  size?: number;
  deferUnavailableCacheRead?: boolean;
};

let unavailableLogoUrls: Set<string> | null = null;

function getUnavailableLogoUrls() {
  if (unavailableLogoUrls) return unavailableLogoUrls;
  unavailableLogoUrls = new Set();

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

function isUnavailableLogo(src?: string) {
  if (!src) return false;
  return getUnavailableLogoUrls().has(src);
}

function rememberUnavailableLogo(src?: string) {
  if (!src || typeof window === "undefined") return;

  const unavailable = getUnavailableLogoUrls();
  if (unavailable.has(src)) return;

  unavailable.add(src);

  try {
    window.localStorage.setItem(UNAVAILABLE_LOGOS_KEY, JSON.stringify([...unavailable]));
  } catch {
    // Browser storage can be unavailable or full; the in-memory cache still avoids repeats in this session.
  }
}

export function CompetitorLogo({ name, domain, brandfetchClientId, size = 18, deferUnavailableCacheRead = false }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [canReadUnavailableCache, setCanReadUnavailableCache] = useState(!deferUnavailableCacheRead);
  const src = domain && brandfetchClientId
    ? `https://cdn.brandfetch.io/${domain}/fallback/404/icon.svg?c=${brandfetchClientId}`
    : undefined;
  const failed = failedSrc === src || (canReadUnavailableCache && isUnavailableLogo(src));

  useEffect(() => {
    if (deferUnavailableCacheRead) setCanReadUnavailableCache(true);
  }, [deferUnavailableCacheRead]);

  if (failed || !src) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "var(--radius-sm)",
          background: "hsl(var(--muted))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Text as="span" size="sm" weight="medium">{(name || "?").charAt(0).toUpperCase()}</Text>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: "var(--radius-sm)", objectFit: "contain", flexShrink: 0 }}
      onError={() => {
        rememberUnavailableLogo(src);
        setFailedSrc(src ?? null);
      }}
    />
  );
}
