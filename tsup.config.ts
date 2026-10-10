import { defineConfig } from "tsup";

/**
 * Multi-entry build with code splitting (PLAN.md M4, feed bundle size).
 *
 * A single-file dist barrel defeated tree-shaking in the app build: lazy routes
 * (CompetitorDetail, AdminStats) import BarChart/PieChart from the same module
 * the entry chunk needs Button from, so Rollup had to place the whole library
 * plus its recharts dependency in the entry chunk. Per-component entries let
 * the app tree-shake module by module: BarChart and recharts only land in
 * chunks that actually render charts.
 *
 * Barrel entry `index` stays for the package `exports` map; it re-exports the
 * component chunks without duplicating code.
 */
export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/ActionIconButton": "src/design-system/components/ActionIconButton.tsx",
    "components/ActivityCard": "src/design-system/components/ActivityCard.tsx",
    "components/Alert": "src/design-system/components/Alert.tsx",
    "components/Badge": "src/design-system/components/Badge.tsx",
    "components/BarChart": "src/design-system/components/BarChart.tsx",
    "components/Breadcrumb": "src/design-system/components/Breadcrumb.tsx",
    "components/Button": "src/design-system/components/Button.tsx",
    "components/Card": "src/design-system/components/Card.tsx",
    "components/DateTimeInput": "src/design-system/components/DateTimeInput.tsx",
    "components/DateTimeModalInput": "src/design-system/components/DateTimeModalInput.tsx",
    "components/DevButton": "src/design-system/components/DevButton.tsx",
    "components/Dialog": "src/design-system/components/Dialog.tsx",
    "components/EntityListRow": "src/design-system/components/EntityListRow.tsx",
    "components/FilterBadge": "src/design-system/components/FilterBadge.tsx",
    "components/filters/CriterionRow": "src/design-system/components/filters/CriterionRow.tsx",
    "components/filters/FilterBar": "src/design-system/components/filters/FilterBar.tsx",
    "components/filters/FilterEditor": "src/design-system/components/filters/FilterEditor.tsx",
    "components/filters/FilterNodeList": "src/design-system/components/filters/FilterNodeList.tsx",
    "components/filters/engine": "src/design-system/components/filters/engine.ts",
    "components/filters/labels": "src/design-system/components/filters/labels.ts",
    "components/filters/types": "src/design-system/components/filters/types.ts",
    "components/filters/url": "src/design-system/components/filters/url.ts",
    "components/Heading": "src/design-system/components/Heading.tsx",
    "components/InlineEditButton": "src/design-system/components/InlineEditButton.tsx",
    "components/Input": "src/design-system/components/Input.tsx",
    "components/Logo": "src/design-system/components/Logo.tsx",
    "components/MatrixTable": "src/design-system/components/MatrixTable.tsx",
    "components/Modal": "src/design-system/components/Modal.tsx",
    "components/Navigation": "src/design-system/components/Navigation.tsx",
    "components/NavigationBar": "src/design-system/components/NavigationBar.tsx",
    "components/NavigationBrand": "src/design-system/components/NavigationBrand.tsx",
    "components/NavigationToggle": "src/design-system/components/NavigationToggle.tsx",
    "components/PageHeader": "src/design-system/components/PageHeader.tsx",
    "components/PieChart": "src/design-system/components/PieChart.tsx",
    "components/RichText": "src/design-system/components/RichText.tsx",
    "components/Select": "src/design-system/components/Select.tsx",
    "components/SelectMenu": "src/design-system/components/SelectMenu.tsx",
    "components/Separator": "src/design-system/components/Separator.tsx",
    "components/Skeleton": "src/design-system/components/Skeleton.tsx",
    "components/TabNav": "src/design-system/components/TabNav.tsx",
    "components/Table": "src/design-system/components/Table.tsx",
    "components/Tabs": "src/design-system/components/Tabs.tsx",
    "components/TagField": "src/design-system/components/TagField.tsx",
    "components/Text": "src/design-system/components/Text.tsx",
    "components/TextField": "src/design-system/components/TextField.tsx",
    "components/Toast": "src/design-system/components/Toast.tsx",
    "components/Tooltip": "src/design-system/components/Tooltip.tsx",
    "components/Wordmark": "src/design-system/components/Wordmark.tsx",
    "competitor/ClaimTimeline": "src/competitor/ClaimTimeline.tsx",
    "competitor/CompetitorInfoCard": "src/competitor/CompetitorInfoCard.tsx",
    "competitor/CompetitorLogo": "src/competitor/CompetitorLogo.tsx",
    "competitor/HiringOverview": "src/competitor/HiringOverview.tsx",
    "competitor/KpiCard": "src/competitor/KpiCard.tsx",
    "competitor/claim-utils": "src/competitor/claim-utils.ts",
    "competitor/hiring-chart-utils": "src/competitor/hiring-chart-utils.ts",
    "competitor/job-functions": "src/competitor/job-functions.ts",
    "competitor/kpi-utils": "src/competitor/kpi-utils.ts",
    tokens: "src/design-system/tokens/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2019",
  outDir: "dist",
  splitting: true,
});
