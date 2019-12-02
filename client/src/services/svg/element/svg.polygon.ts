import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorMinus, vectorMultiplyConst, vectorPlus } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';

export class SVGPolygon extends AbsSVGShape {

    private circularPoints: number[][];
    private actualPointsPosition: number[][];
    private nSides: number;

    constructor(x: number, y: number, nSides: number, traceType: number) {
        super(x, y, traceType);

        this.circularPoints = [];
        this.actualPointsPosition = [];

        const shapeElement = DOMRenderer.createElement('polygon', 'svg');
        DOMRenderer.appendChild(this.element, shapeElement);
        this.nSides = nSides;
        this.setOpacities();
        this.setCursor(x, y);

        const angleBetweenCorners = 2 * Math.PI / this.nSides;
        for (let i = 0; i < this.nSides; i++) {
            this.circularPoints.push([Math.sin(i * angleBetweenCorners), -Math.cos(i * angleBetweenCorners)]);
        }
    }

    protected isAtBorder(x: number, y: number) {
        const ORIGINAL_SIZE = this.size;
        const widthDelta = [this.pointSize / 2.0, this.pointSize / 2.0];

        this.size = vectorPlus(ORIGINAL_SIZE, widthDelta);
        for (const circularPoint of this.circularPoints) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiplyConst(circularPoint, this.size[1]), this.center));
        }
        const INSIDE_OUTER_ELLIPSE = this.isInside(x, y);

        this.size = vectorMinus(ORIGINAL_SIZE, widthDelta);
        for (const circularPoint of this.circularPoints) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiplyConst(circularPoint, this.size[1]), this.center));
        }
        const INSIDE_INNER_ELLIPSE = this.isInside(x, y);

        this.size = ORIGINAL_SIZE;
        return INSIDE_OUTER_ELLIPSE && !INSIDE_INNER_ELLIPSE;

    }

    protected isInside(x: number, y: number): boolean {

        let inside = false;
        let i = 0;
        for (let j = this.actualPointsPosition.length - 1; i < this.actualPointsPosition.length; j = i++) {
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

    release(): void {
        super.release();
    }

    onShift(isShift: boolean) {
        //
    }

    protected setPositionAttributes(): void {
        DOMRenderer.setAttribute(this.element.children[1], 'points', this.pointsAttribute());
    }

    setCursor(x: number, y: number): void {
        this.updateCoordinates(x, y, true);
        this.updatePerimeter();

        this.actualPointsPosition = [];
        for (const circularPoint of this.circularPoints) {
            this.actualPointsPosition.push(vectorPlus(vectorMultiplyConst(circularPoint, this.size[1]), this.center));
        }
        this.setPositionAttributes();
    }

    private pointsAttribute(): string {
        return this.actualPointsPosition.map((e) => `${e[0]},${e[1]}`).join(' ');
    }
}
