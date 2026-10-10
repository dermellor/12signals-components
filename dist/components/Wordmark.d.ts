import * as react_jsx_runtime from 'react/jsx-runtime';

type WordmarkProps = {
    /** Height controls size (width derives from aspect ratio) */
    height?: number | string;
    className?: string;
    /** URL to SVG sprite file. When set, renders <use href> instead of inline SVG. */
    sprite?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "xmlns">;
declare function Wordmark({ height, className, sprite, style, ...rest }: WordmarkProps): react_jsx_runtime.JSX.Element;

export { Wordmark };
