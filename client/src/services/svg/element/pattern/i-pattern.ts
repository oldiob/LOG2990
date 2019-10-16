import { SVGLine } from '../svg.line';

export interface IPattern {
    create(line: SVGLine): void;
    addPoint(line: SVGLine, x: number, y: number): void;
}
