import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorMinus, vectorPlus } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';

export class SVGEllipse extends AbsSVGShape {

    constructor(x: number, y: number, traceType: TraceType) {
        super(x, y, traceType);

        const shapeElement   = DOMRenderer.createElement('ellipse', 'svg');
        DOMRenderer.appendChild(this.element, shapeElement);

        this.setOpacities();
        this.setCursor(x, y, false);
    }

    protected isAtBorder(x: number, y: number): boolean {
        const ORIGINAL_SIZE = this.size;
        const widthDelta = [this.pointSize / 2.0, this.pointSize / 2.0];

        this.size = vectorPlus(ORIGINAL_SIZE, widthDelta);
        const INSIDE_OUTER_ELLIPSE = this.isInside(x, y);

        this.size = vectorMinus(ORIGINAL_SIZE, widthDelta);
        const INSIDE_INNER_ELLIPSE = this.isInside(x, y);

        this.size = ORIGINAL_SIZE;
        return INSIDE_OUTER_ELLIPSE && !INSIDE_INNER_ELLIPSE;
    }

    protected isInside(x: number, y: number): boolean {
        const RELATIVE_X = x - this.center[0];
        const RELATIVE_Y = y - this.center[1];

        const minMaxY: number[] = this.ellipseSize(RELATIVE_X);
        return RELATIVE_Y >= minMaxY[1] && RELATIVE_Y <= minMaxY[0];
    }

    setCursor(x: number, y: number, isShift: boolean) {
        this.updateCoordinates(x, y, isShift);
        this.updatePerimeter();

        this.setPositionAttributes();
    }

    release(): void {
        super.release();
    }

    onShift(isShift: boolean): void {
        this.setCursor(this.endingPoint[0], this.endingPoint[1], isShift);
    }

    protected setPositionAttributes(): void {
        DOMRenderer.setAttribute(this.element.children[1], 'cx', `${this.center[0]}`);
        DOMRenderer.setAttribute(this.element.children[1], 'cy', `${this.center[1]}`);
        DOMRenderer.setAttribute(this.element.children[1], 'rx', `${this.size[0]}`);
        DOMRenderer.setAttribute(this.element.children[1], 'ry', `${this.size[1]}`);
    }

    private ellipseSize(x: number): number[] {
        const INSIDE_SQRT = (1.0 - ((x * x) / (this.size[0] * this.size[0]))) * (this.size[1] * this.size[1]);

        if (INSIDE_SQRT < 0) {
            const IMPOSSIBLE_OUTCOME = [-1, 1];
            return IMPOSSIBLE_OUTCOME;
        }

        const verticalModule = Math.sqrt(INSIDE_SQRT);
        return [verticalModule, -verticalModule];
    }
}
