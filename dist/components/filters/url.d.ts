import { NamedFilter } from './types.js';

interface ParseFiltersOptions {
    /**
     * Map legacy field-type keys to current ones, e.g. { adGroup: "creativeGroup" }.
     * Applied during decode so old URLs keep deserializing after a rename.
     */
    renameTypes?: Record<string, string>;
}
declare function serializeFilters(filters: NamedFilter[]): string;
declare function parseFilters(encoded: string | null | undefined, options?: ParseFiltersOptions): NamedFilter[];

export { type ParseFiltersOptions, parseFilters, serializeFilters };
