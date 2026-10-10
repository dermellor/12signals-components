import {
  isCriterion
} from "./chunk-KEQRP7TE.js";

// src/design-system/components/filters/url.ts
var VALID_OPS = [
  "after",
  "before",
  "between",
  "equals",
  "startsWith",
  "contains",
  "in"
];
function makeId() {
  return Math.random().toString(36).slice(2, 10);
}
function b64UrlEncode(s) {
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64UrlDecode(s) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - s.length % 4);
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return decodeURIComponent(escape(atob(b64)));
}
function critToDto(c) {
  const dto = { k: "c", i: c.id, t: c.type, o: c.operator };
  if (c.dateFrom) dto.df = c.dateFrom;
  if (c.dateTo) dto.dt = c.dateTo;
  if (c.numberFrom != null) dto.nf = c.numberFrom;
  if (c.numberTo != null) dto.nt = c.numberTo;
  if (c.stringValue) dto.sv = c.stringValue;
  if (c.stringValues && c.stringValues.length > 0) dto.svs = c.stringValues;
  if (c.booleanValue != null) dto.bv = c.booleanValue;
  return dto;
}
function groupToDto(g) {
  return { k: "g", i: g.id, l: g.logic, c: g.children.map(nodeToDto) };
}
function nodeToDto(n) {
  return isCriterion(n) ? critToDto(n) : groupToDto(n);
}
function stateToDto(s) {
  return { l: s.logic, c: s.children.map(nodeToDto) };
}
function dtoToCrit(dto, options) {
  var _a;
  const renamed = (_a = options.renameTypes) == null ? void 0 : _a[dto.t];
  const type = renamed != null ? renamed : dto.t;
  if (typeof type !== "string" || !type) return null;
  if (typeof dto.o !== "string" || !VALID_OPS.includes(dto.o)) return null;
  return {
    kind: "criterion",
    id: typeof dto.i === "string" ? dto.i : makeId(),
    type,
    operator: dto.o,
    dateFrom: typeof dto.df === "string" ? dto.df : void 0,
    dateTo: typeof dto.dt === "string" ? dto.dt : void 0,
    numberFrom: typeof dto.nf === "number" ? dto.nf : void 0,
    numberTo: typeof dto.nt === "number" ? dto.nt : void 0,
    stringValue: typeof dto.sv === "string" ? dto.sv : void 0,
    stringValues: Array.isArray(dto.svs) ? dto.svs.filter((v) => typeof v === "string") : void 0,
    booleanValue: typeof dto.bv === "boolean" ? dto.bv : void 0
  };
}
function dtoToGroup(dto, options) {
  if (dto.l !== "AND" && dto.l !== "OR") return null;
  if (!Array.isArray(dto.c)) return null;
  const children = [];
  for (const raw of dto.c) {
    const node = dtoToNode(raw, options);
    if (node) children.push(node);
  }
  return {
    kind: "group",
    id: typeof dto.i === "string" ? dto.i : makeId(),
    logic: dto.l,
    children
  };
}
function dtoToNode(dto, options) {
  if ((dto == null ? void 0 : dto.k) === "c") return dtoToCrit(dto, options);
  if ((dto == null ? void 0 : dto.k) === "g") return dtoToGroup(dto, options);
  return null;
}
function dtoToState(dto, options) {
  if (!dto || dto.l !== "AND" && dto.l !== "OR" || !Array.isArray(dto.c)) {
    return { logic: "AND", children: [] };
  }
  const children = [];
  for (const raw of dto.c) {
    const node = dtoToNode(raw, options);
    if (node) children.push(node);
  }
  return { logic: dto.l, children };
}
function serializeFilters(filters) {
  const dto = {
    v: 1,
    f: filters.map((f) => {
      const out = { i: f.id, s: stateToDto(f.state) };
      if (f.name) out.n = f.name;
      if (!f.enabled) out.e = 0;
      return out;
    })
  };
  return b64UrlEncode(JSON.stringify(dto));
}
function parseFilters(encoded, options = {}) {
  if (!encoded) return [];
  try {
    const dto = JSON.parse(b64UrlDecode(encoded));
    if (!dto || dto.v !== 1 || !Array.isArray(dto.f)) return [];
    const out = [];
    for (const raw of dto.f) {
      if (!raw || typeof raw !== "object") continue;
      out.push({
        id: typeof raw.i === "string" ? raw.i : makeId(),
        name: typeof raw.n === "string" ? raw.n : "",
        state: dtoToState(raw.s, options),
        enabled: raw.e === 0 ? false : true
      });
    }
    return out;
  } catch (err) {
    console.warn("[ds/filters] failed to parse filter URL param", err);
    return [];
  }
}

export {
  serializeFilters,
  parseFilters
};
//# sourceMappingURL=chunk-E35RVTRX.js.map