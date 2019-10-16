import { Renderer2 } from '@angular/core';
import { vectorPlus, vectorMultiply, isAtLine } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';

export class SVGPolygon extends AbsSVGShape {

    private circularPoints: number[][];
    private actualPointsPosition: number[][] = [];

    constructor(x: number, y: number, nSides: number, traceType: number, renderer: Renderer2) {
        super(x, y, traceType, renderer);
        this.hidePerimeter();

        this.shapeElement = this.renderer.createElement('rect', 'svg');
        this.renderer.appendChild(this.element, this.shapeElement);

        this.setOpacities();
        this.setCursor(x, y);

        this.element = this.renderer.createElement('polygon', 'svg');

        const angleBetweenCorners = 2 * Math.PI / nSides;
        for (let i = 0; i < nSides; i++) {
            this.circularPoints.push([Math.cos(i * angleBetweenCorners), -Math.sin(i * angleBetweenCorners)]);
        }
    }

    protected isAtBorder(x: number, y: number) {
        const additionnalWidth = 10.0;
        const width = this.pointSize + additionnalWidth;
        const points = [
            [this.center[0] - this.size[0], this.center[1] - this.size[1]],
            [this.center[0] + this.size[0], this.center[1] - this.size[1]],
            [this.center[0] + this.size[0], this.center[1] + this.size[1]],
            [this.center[0] - this.size[0], this.center[1] + this.size[1]],
            [this.center[0] - this.size[0], this.center[1] - this.size[1]]];

        for (let i = 0; i < 4; i++) {
            if (isAtLine([x, y], points[i], points[i + 1], width)) {
                return true;
            }
        }

        return false;
    }

    protected isInside(x: number, y: number) {
        return (
            this.center[0] - this.size[0] <= x &&
            this.center[0] + this.size[0] >= x &&
            this.center[1] - this.size[1] <= y &&
            this.center[1] + this.size[1] >= y);
    }

    release() {
        this.hidePerimeter();
    }

    onShift(isShift: boolean) {
        // nothing happens
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    protected setPositionAttributes(): void {
        this.renderer.setAttribute(this.element, 'points', this.pointsAttribute());
    }

    setCursor(x: number, y: number) {
        // you habe your this.circularPoints :
        //      a centered Polygon corner positions of radius 1;
        let radius: number;
        if (Math.abs(x - this.startingPoint[1]) < y - this.startingPoint[2]) {
            radius = Math.abs(x + this.startingPoint[1]) / 2;
        } else {
            radius = Math.abs(y + this.startingPoint[2]) / 2;
        }
        for (let i = 0; i < this.circularPoints.length; i++) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiply(this.circularPoints[i], radius), this.center));
        }
    }

    // [[1, 2], [3, 4]] -> 1,2 3,4
    private pointsAttribute(): string {
        return this.actualPointsPosition.map((e) => `${e[0]},${e[1]}`).join(' ');
    }
}
