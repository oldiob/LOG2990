import { SVGBrush } from '../svg.brush';
import { CircleTexture } from './circle';

export class RandomCircleTexture extends CircleTexture {
    static readonly BRUSH_OBJECT_NUMBER: number = 2;
    static readonly BRUSH_RECT_FACTOR: number = 2;

    create(brush: SVGBrush): void {
        super.create(brush);
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        for (let i = 0; i < RandomCircleTexture.BRUSH_OBJECT_NUMBER; i++) {
            const randX = this.randomDeviation(brush.lineWidth * RandomCircleTexture.BRUSH_RECT_FACTOR);
            const randY = this.randomDeviation(brush.lineWidth * RandomCircleTexture.BRUSH_RECT_FACTOR);

            super.addPoint(brush, x + randX, y + randY);
        }
    }

    private randomDeviation(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
