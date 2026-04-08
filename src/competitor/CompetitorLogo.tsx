import React, { useState } from "react";
import { Text } from "../design-system/components/Text";

type Props = {
  name: string;
  domain?: string | null;
  brandfetchClientId?: string;
  size?: number;
};

export function CompetitorLogo({ name, domain, brandfetchClientId, size = 28 }: Props) {
  const [failed, setFailed] = useState(false);
  const src = domain && brandfetchClientId
    ? `https://cdn.brandfetch.io/${domain}/fallback/404/icon.svg?c=${brandfetchClientId}`
    : undefined;

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
      onError={() => setFailed(true)}
    />
  );
}
