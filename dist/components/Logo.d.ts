import * as react_jsx_runtime from 'react/jsx-runtime';

type LogoVariant = "default" | "inverted" | "monochrome";
type LogoProps = {
    /** Logo color variant */
    variant?: LogoVariant;
    size?: number | string;
    /** URL to SVG sprite file. When set, renders <use href> instead of inline SVG. */
    sprite?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns" | "width" | "height">;
declare function Logo({ variant, size, sprite, className, style, ...rest }: LogoProps): react_jsx_runtime.JSX.Element;
declare const LOGO_VARIANTS: {
    value: LogoVariant;
    label: string;
}[];

export { LOGO_VARIANTS, Logo };
