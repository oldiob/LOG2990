import { SVGLine } from '../svg.line';

export interface IMotif {
    create(line: SVGLine): void;
    addPoint(line: SVGLine, x: number, y: number): void;
}
