import { isAtLine, vectorMultiply, vectorPlus } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

export class SVGPolygon extends AbsSVGShape {

    private circularPoints: number[][] = [];
    private actualPointsPosition: number[][] = [];

    constructor(x: number, y: number, nSides: number, traceType: number) {
        super(x, y, traceType);

        this.shapeElement = RendererProvider.renderer.createElement('polygon', 'svg');
        RendererProvider.renderer.appendChild(this.element, this.shapeElement);

        this.setOpacities();
        this.setCursor(x, y);

        const angleBetweenCorners = 2 * Math.PI / nSides;
        for (let i = 0; i < nSides; i++) {
            this.circularPoints.push([Math.sin(i * angleBetweenCorners), -Math.cos(i * angleBetweenCorners)]);
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
        RendererProvider.renderer.setAttribute(this.shapeElement, 'points', this.pointsAttribute());
    }

    setCursor(x: number, y: number) {
        this.updateCoordinates(x, y, true);
        this.updatePerimeter();

        this.actualPointsPosition = [];
        for (const circularPoint of this.circularPoints) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiply(circularPoint, this.size[1]), this.center));
        }
        this.setPositionAttributes();
    }

    // [[1, 2], [3, 4]] -> 1,2 3,4
    private pointsAttribute(): string {
        return this.actualPointsPosition.map((e) => `${e[0]},${e[1]}`).join(' ');
    }
}
