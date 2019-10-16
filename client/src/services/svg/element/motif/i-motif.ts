import { SVGLine } from '../svg.line';

export interface IMotif {
    create(line: SVGLine, polyline: SVGLine, fullline: SVGLine): void;
    addPoint(line: SVGLine, polyline: SVGLine, fullline: SVGLine, x: number, y: number): void;
}
