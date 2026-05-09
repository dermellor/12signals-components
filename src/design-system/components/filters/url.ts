import {
  FilterCriterion,
  FilterGroup,
  FilterLogic,
  FilterNode,
  FilterOperator,
  FilterState,
  NamedFilter,
  isCriterion,
} from "./types";

const VALID_OPS: FilterOperator[] = [
  "after", "before", "between", "equals", "startsWith", "contains", "in",
];

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function b64UrlEncode(s: string): string {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64UrlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return decodeURIComponent(escape(atob(b64)));
}

type CritDTO = {
  k: "c"; i: string; t: string; o: string;
  df?: string; dt?: string; nf?: number; nt?: number;
  sv?: string; svs?: string[]; bv?: boolean;
};
type GroupDTO = { k: "g"; i: string; l: "AND" | "OR"; c: NodeDTO[] };
type NodeDTO = CritDTO | GroupDTO;
type StateDTO = { l: "AND" | "OR"; c: NodeDTO[] };
type NamedDTO = { i: string; n?: string; e?: 0; s: StateDTO };
type EnvelopeDTO = { v: 1; f: NamedDTO[] };

function critToDto(c: FilterCriterion): CritDTO {
  const dto: CritDTO = { k: "c", i: c.id, t: c.type, o: c.operator };
  if (c.dateFrom) dto.df = c.dateFrom;
  if (c.dateTo) dto.dt = c.dateTo;
  if (c.numberFrom != null) dto.nf = c.numberFrom;
  if (c.numberTo != null) dto.nt = c.numberTo;
  if (c.stringValue) dto.sv = c.stringValue;
  if (c.stringValues && c.stringValues.length > 0) dto.svs = c.stringValues;
  if (c.booleanValue != null) dto.bv = c.booleanValue;
  return dto;
}

function groupToDto(g: FilterGroup): GroupDTO {
  return { k: "g", i: g.id, l: g.logic, c: g.children.map(nodeToDto) };
}

function nodeToDto(n: FilterNode): NodeDTO {
  return isCriterion(n) ? critToDto(n) : groupToDto(n);
}

function stateToDto(s: FilterState): StateDTO {
  return { l: s.logic, c: s.children.map(nodeToDto) };
}

export interface ParseFiltersOptions {
  /**
   * Map legacy field-type keys to current ones, e.g. { adGroup: "creativeGroup" }.
   * Applied during decode so old URLs keep deserializing after a rename.
   */
  renameTypes?: Record<string, string>;
}

function dtoToCrit(dto: CritDTO, options: ParseFiltersOptions): FilterCriterion | null {
  const renamed = options.renameTypes?.[dto.t];
  const type = renamed ?? dto.t;
  if (typeof type !== "string" || !type) return null;
  if (typeof dto.o !== "string" || !VALID_OPS.includes(dto.o as FilterOperator)) return null;
  return {
    kind: "criterion",
    id: typeof dto.i === "string" ? dto.i : makeId(),
    type,
    operator: dto.o as FilterOperator,
    dateFrom: typeof dto.df === "string" ? dto.df : undefined,
    dateTo: typeof dto.dt === "string" ? dto.dt : undefined,
    numberFrom: typeof dto.nf === "number" ? dto.nf : undefined,
    numberTo: typeof dto.nt === "number" ? dto.nt : undefined,
    stringValue: typeof dto.sv === "string" ? dto.sv : undefined,
    stringValues: Array.isArray(dto.svs) ? dto.svs.filter((v): v is string => typeof v === "string") : undefined,
    booleanValue: typeof dto.bv === "boolean" ? dto.bv : undefined,
  };
}

function dtoToGroup(dto: GroupDTO, options: ParseFiltersOptions): FilterGroup | null {
  if (dto.l !== "AND" && dto.l !== "OR") return null;
  if (!Array.isArray(dto.c)) return null;
  const children: FilterNode[] = [];
  for (const raw of dto.c) {
    const node = dtoToNode(raw, options);
    if (node) children.push(node);
  }
  return {
    kind: "group",
    id: typeof dto.i === "string" ? dto.i : makeId(),
    logic: dto.l as FilterLogic,
    children,
  };
}

function dtoToNode(dto: NodeDTO, options: ParseFiltersOptions): FilterNode | null {
  if (dto?.k === "c") return dtoToCrit(dto, options);
  if (dto?.k === "g") return dtoToGroup(dto, options);
  return null;
}

function dtoToState(dto: StateDTO, options: ParseFiltersOptions): FilterState {
  if (!dto || (dto.l !== "AND" && dto.l !== "OR") || !Array.isArray(dto.c)) {
    return { logic: "AND", children: [] };
  }
  const children: FilterNode[] = [];
  for (const raw of dto.c) {
    const node = dtoToNode(raw, options);
    if (node) children.push(node);
  }
  return { logic: dto.l, children };
}

export function serializeFilters(filters: NamedFilter[]): string {
  const dto: EnvelopeDTO = {
    v: 1,
    f: filters.map((f) => {
      const out: NamedDTO = { i: f.id, s: stateToDto(f.state) };
      if (f.name) out.n = f.name;
      if (!f.enabled) out.e = 0;
      return out;
    }),
  };
  return b64UrlEncode(JSON.stringify(dto));
}

export function parseFilters(
  encoded: string | null | undefined,
  options: ParseFiltersOptions = {},
): NamedFilter[] {
  if (!encoded) return [];
  try {
    const dto = JSON.parse(b64UrlDecode(encoded)) as EnvelopeDTO;
    if (!dto || dto.v !== 1 || !Array.isArray(dto.f)) return [];
    const out: NamedFilter[] = [];
    for (const raw of dto.f) {
      if (!raw || typeof raw !== "object") continue;
      out.push({
        id: typeof raw.i === "string" ? raw.i : makeId(),
        name: typeof raw.n === "string" ? raw.n : "",
        state: dtoToState(raw.s, options),
        enabled: raw.e === 0 ? false : true,
      });
    }
    return out;
  } catch (err) {
    console.warn("[ds/filters] failed to parse filter URL param", err);
    return [];
  }
}
