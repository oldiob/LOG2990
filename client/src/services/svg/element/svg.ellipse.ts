import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { vectorMinus, vectorPlus } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider.service';

export class SVGEllipse extends AbsSVGShape {

    stroke = 1;
    fill = 1;

    traceType: TraceType;

    constructor(x: number, y: number, traceType: TraceType) {
        super(x, y, traceType);

        this.shapeElement = RendererProvider.renderer.createElement('ellipse', 'svg');
        RendererProvider.renderer.appendChild(this.element, this.shapeElement);

        this.setOpacities();
        this.setCursor(x, y, false);
    }

    protected isAtBorder(x: number, y: number) {
        const ORIGINAL_SIZE = this.size;
        const widthDelta = [this.pointSize / 2.0, this.pointSize / 2.0];

        this.size = vectorPlus(ORIGINAL_SIZE, widthDelta);
        const INSIDE_OUTER_ELLIPSE = this.isInside(x, y);

        this.size = vectorMinus(ORIGINAL_SIZE, widthDelta);
        const INSIDE_INNER_ELLIPSE = this.isInside(x, y);

        this.size = ORIGINAL_SIZE;
        return INSIDE_OUTER_ELLIPSE && !INSIDE_INNER_ELLIPSE;
    }

    protected isInside(x: number, y: number) {
        const RELATIVE_X = x - this.center[0];
        const RELATIVE_Y = y - this.center[1];

        const minMaxY: number[] = this.ellipseYs(RELATIVE_X);
        return RELATIVE_Y >= minMaxY[1] && RELATIVE_Y <= minMaxY[0];
    }

    isIn(x: number, y: number, r: number): boolean {
        return true;
    }

    setCursor(x: number, y: number, isShift: boolean) {
        this.updateCoordinates(x, y, isShift);
        this.updatePerimeter();

        this.setPositionAttributes();
    }

    release() {
        this.hidePerimeter();
    }

    onShift(isShift: boolean) {
        this.setCursor(this.endingPoint[0], this.endingPoint[1], isShift);
    }

    protected setPositionAttributes() {
        RendererProvider.renderer.setAttribute(this.shapeElement, 'cx', `${this.center[0]}`);
        RendererProvider.renderer.setAttribute(this.shapeElement, 'cy', `${this.center[1]}`);
        RendererProvider.renderer.setAttribute(this.shapeElement, 'rx', `${this.size[0]}`);
        RendererProvider.renderer.setAttribute(this.shapeElement, 'ry', `${this.size[1]}`);
    }

    private ellipseYs(x: number): number[] {
        const INSIDE_SQRT = (1.0 - ((x * x) / (this.size[0] * this.size[0]))) * (this.size[1] * this.size[1]);

        // x outide elipse, clearly impossible to be inside
        if (INSIDE_SQRT < 0) {
            const IMPOSSIBLE_OUTCOME = [-1, 1];
            return IMPOSSIBLE_OUTCOME;
        }

        const verticalModule = Math.sqrt(INSIDE_SQRT);
        return [verticalModule, -verticalModule];
    }
}
