import { SVGLine } from '../svg.line';

export interface IPattern {
    create(line: SVGLine): void;
}
