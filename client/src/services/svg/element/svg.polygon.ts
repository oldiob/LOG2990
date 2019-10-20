import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { vectorMinus, vectorMultiply, vectorPlus } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';

export class SVGPolygon extends AbsSVGShape {
    constructor(x: number, y: number, nSides: number, traceType: number) {
        super(x, y, traceType);

        this.shapeElement = RendererProvider.renderer.createElement('polygon', 'svg');
        RendererProvider.renderer.appendChild(this.element, this.shapeElement);
        this.nSides = nSides;
        this.setOpacities();
        this.setCursor(x, y, false);

        const angleBetweenCorners = 2 * Math.PI / nSides;
        for (let i = 0; i < nSides; i++) {
            this.circularPoints.push([Math.sin(i * angleBetweenCorners), -Math.cos(i * angleBetweenCorners)]);
        }
    }

    private circularPoints: number[][] = [];
    private actualPointsPosition: number[][] = [];
    nSides: number;

    protected isAtBorder(x: number, y: number) {
        const ORIGINAL_SIZE = this.size;
        const widthDelta = [this.pointSize / 2.0, this.pointSize / 2.0];

        this.size = vectorPlus(ORIGINAL_SIZE, widthDelta);
        for (const circularPoint of this.circularPoints) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiply(circularPoint, this.size[1]), this.center));
        }
        const INSIDE_OUTER_ELLIPSE = this.isInside(x, y);

        this.size = vectorMinus(ORIGINAL_SIZE, widthDelta);
        for (const circularPoint of this.circularPoints) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiply(circularPoint, this.size[1]), this.center));
        }
        const INSIDE_INNER_ELLIPSE = this.isInside(x, y);

        this.size = ORIGINAL_SIZE;
        return INSIDE_OUTER_ELLIPSE && !INSIDE_INNER_ELLIPSE;

    }

    protected isInside(x: number, y: number) {

        let inside = false;
        for (let i = 0, j = this.actualPointsPosition.length - 1; i < this.actualPointsPosition.length; j = i++) {
            const x1 = this.actualPointsPosition[i][0];
            const y1 = this.actualPointsPosition[i][1];
            const x2 = this.actualPointsPosition[j][0];
            const y2 = this.actualPointsPosition[j][1];

            const intersect = ((y1 > y) !== (y2 > y))
            && (x < (x2 - x1) * (y - y1) / (y2 - y1) + x1);
            if (intersect) { inside = !inside; }
        }

        return inside;
    }

    release() {
        this.hidePerimeter();
    }

    onShift(isShift: boolean) {
        this.setCursor(this.endingPoint[0], this.endingPoint[1], isShift);
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    protected setPositionAttributes(): void {
        RendererProvider.renderer.setAttribute(this.shapeElement, 'points', this.pointsAttribute());
    }

    setCursor(x: number, y: number, isShift: boolean) {
        this.updateCoordinates(x, y, isShift);
        if (isShift) {
            this.showPerimeter();
            this.updatePerimeter();
        } else {
            this.hidePerimeter();
        }

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
