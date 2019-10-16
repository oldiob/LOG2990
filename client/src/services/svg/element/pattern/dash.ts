import { SVGLine } from '../svg.line';
import { IPattern } from './i-pattern';

export class DashMotif implements IPattern {
    create(line: SVGLine): void {
        line.element = line.renderer.createElement('g', 'svg');
    }
    addPoint(line: SVGLine, x: number, y: number): void {
        // line.renderer.setAttribute(line.element, 'fill', 'none');
        // line.renderer.setAttribute(line.element, 'stroke-dasharray', '4');
    }
}
