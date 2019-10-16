import { SVGLine } from '../svg.line';
import { IMotif } from './i-motif';

export class FullMotif implements IMotif {
    create(line: SVGLine): void {
        line.element = line.renderer.createElement('line', 'svg');
    }
    addPoint(line: SVGLine, x: number, y: number): void {
        line.renderer.setAttribute(line.element, 'fill', 'none');
        line.renderer.setAttribute(line.element, 'stroke-dasharray', '4');
    }
}
