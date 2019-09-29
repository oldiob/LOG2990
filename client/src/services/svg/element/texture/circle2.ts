import { SVGBrush } from '../svg.brush';
import { CircleTexture } from './circle';

export class Circle2Texture extends CircleTexture {
    private static readonly BRUSH_CERCLE_DISTANCE_FACTOR: number = 2;

    create(brush: SVGBrush): void {
        brush.element = brush.renderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const radiusSquared = brush.lineWidth * brush.lineWidth;
        const distanceSquared = x - brush.previousX * x - brush.previousX + y - brush.previousY * y - brush.previousY;

        if (distanceSquared > radiusSquared) {
            brush.previousX = x;
            brush.previousY = y;
            super.addPoint(brush, x, y);
            super.addPoint(brush, x - radiusSquared * Circle2Texture.BRUSH_CERCLE_DISTANCE_FACTOR, y);
            super.addPoint(brush, x + radiusSquared * Circle2Texture.BRUSH_CERCLE_DISTANCE_FACTOR, y);
            super.addPoint(brush, x, y - radiusSquared * Circle2Texture.BRUSH_CERCLE_DISTANCE_FACTOR);
            super.addPoint(brush, x, y + radiusSquared * Circle2Texture.BRUSH_CERCLE_DISTANCE_FACTOR);
        }
    }
}