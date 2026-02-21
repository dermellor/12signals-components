#!/usr/bin/env node
/**
 * generate-logo-assets.mjs
 *
 * Source of truth: src/design-system/assets/logos.svg
 *
 * Generates:
 *   ../12signals-app/public/logos.svg              — 1:1 copy (sprite for <use href>)
 *   ../12signals-app/public/12signals-logo.svg     — #logo-default as standalone SVG
 *   ../12signals-app/public/12signals-wordmark.svg — #wordmark as standalone SVG
 *   ../12signals-app/public/12signals-wordmark@2x.png — wordmark rendered to PNG @2x
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "src/design-system/assets/logos.svg");
const OUT = resolve(ROOT, "../12signals-app/public");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract the content of a <symbol id="…"> and return a standalone SVG string. */
function extractSymbol(sprite, id, { width, height, fillOverride } = {}) {
  // Match <symbol id="…" viewBox="…">…</symbol> (dotAll)
  const re = new RegExp(
    `<symbol\\s+id="${id}"\\s+viewBox="([^"]+)"[^>]*>([\\s\\S]*?)</symbol>`
  );
  const m = sprite.match(re);
  if (!m) throw new Error(`Symbol #${id} not found in sprite`);
  const [, viewBox, inner] = m;

  const dims = [
    width ? ` width="${width}"` : "",
    height ? ` height="${height}"` : "",
  ].join("");

  let body = inner;

  // Replace currentColor with a concrete color for standalone files
  if (fillOverride) {
    body = body.replace(/fill="currentColor"/g, `fill="${fillOverride}"`);
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${dims}>`,
    body,
    `</svg>`,
    "",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const sprite = readFileSync(SRC, "utf-8");

// 1) Copy sprite as-is
mkdirSync(OUT, { recursive: true });
writeFileSync(resolve(OUT, "logos.svg"), sprite);
console.log("  logos.svg");

// 2) Standalone logo (no text, just the icon)
const logoSvg = extractSymbol(sprite, "logo-default");
writeFileSync(resolve(OUT, "12signals-logo.svg"), logoSvg);
console.log("  12signals-logo.svg");

// 3) Standalone wordmark (currentColor → #2e0d59 for standalone use)
const wordmarkSvg = extractSymbol(sprite, "wordmark", {
  fillOverride: "#2e0d59",
});
writeFileSync(resolve(OUT, "12signals-wordmark.svg"), wordmarkSvg);
console.log("  12signals-wordmark.svg");

// 4) PNG @2x via resvg
try {
  const { Resvg } = await import("@resvg/resvg-js");
  const SCALE = 2;
  // Use the wordmark with concrete fill for PNG rendering
  const pngWordmark = extractSymbol(sprite, "wordmark", {
    width: "396",
    height: "100",
    fillOverride: "#2e0d59",
  });
  const resvg = new Resvg(pngWordmark, {
    fitTo: { mode: "zoom", value: SCALE },
    background: "rgba(0,0,0,0)",
  });
  const png = resvg.render().asPng();
  writeFileSync(resolve(OUT, "12signals-wordmark@2x.png"), png);
  console.log("  12signals-wordmark@2x.png");
} catch (err) {
  console.error(
    "  [warn] PNG generation skipped — @resvg/resvg-js not installed.\n" +
      "         Run: npm i -D @resvg/resvg-js"
  );
}

console.log("\nDone.");
