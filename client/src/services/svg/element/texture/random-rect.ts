import { SVGBrush } from '../svg.brush';
import { RectTexture } from './rect';

export class RandomRectTecture extends RectTexture {
    static readonly BRUSH_OBJECT_NUMBER: number = 2;
    static readonly BRUSH_RECT_FACTOR: number = 2;

    create(brush: SVGBrush): void {
        brush.element = brush.renderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        for (let i = 0; i < RandomRectTecture.BRUSH_OBJECT_NUMBER; i++) {
            const randX = this.randomDeviation(brush.lineWidth * RandomRectTecture.BRUSH_RECT_FACTOR);
            const randY = this.randomDeviation(brush.lineWidth * RandomRectTecture.BRUSH_RECT_FACTOR);

            super.addPoint(brush, x + randX, y + randY);
        }
    }

    private randomDeviation(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
