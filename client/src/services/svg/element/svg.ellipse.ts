import { Renderer2 } from '@angular/core';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { vMinus, vPlus } from 'src/utils/math';
import { AbsSvgShape } from './svg.abs-shape';

export class SVGEllipse extends AbsSvgShape {

    stroke = 1;
    fill = 1;

    traceType: TraceType;

    constructor(x: number, y: number, traceType: TraceType, renderer: Renderer2) {
        super(x, y, traceType, renderer);

        this.shapeElement = this.renderer.createElement('ellipse', 'svg');
        this.renderer.appendChild(this.element, this.shapeElement);

        this.setOpacities();
        this.setCursor(x, y, false);
    }

    protected isAtBorder(x: number, y: number) {
        const originalSize = this.size;
        const widthDelta = [this.pointSize / 2.0, this.pointSize / 2.0];

        this.size = vPlus(originalSize, widthDelta);
        const insideBiggerElipse = this.isInside(x, y);

        this.size = vMinus(originalSize, widthDelta);
        const insideSmallerElipse = this.isInside(x, y);

        this.size = originalSize;
        return insideBiggerElipse && !insideSmallerElipse;
    }

    protected isInside(x: number, y: number) {
        const relativeX = x - this.center[0];
        const relativeY = y - this.center[1];

        const ys: number[] = this.ellipseYs(relativeX);
        return relativeY >= ys[1] && relativeY <= ys[0];
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

    protected setPositionAttributes() {
        this.renderer.setAttribute(this.shapeElement, 'cx', `${this.center[0]}`);
        this.renderer.setAttribute(this.shapeElement, 'cy', `${this.center[1]}`);
        this.renderer.setAttribute(this.shapeElement, 'rx', `${this.size[0]}`);
        this.renderer.setAttribute(this.shapeElement, 'ry', `${this.size[1]}`);
    }

    private ellipseYs(x: number): number[] {
        const sqrtInside = (1.0 - ((x * x) / (this.size[0] * this.size[0]))) * (this.size[1] * this.size[1]);

        // x outide elipse, clearly impossible to be inside
        if (sqrtInside < 0) {
            const impossibleOutcome = [-1, 1];
            return impossibleOutcome;
        }

        const verticalModule = Math.sqrt(sqrtInside);
        return [verticalModule, -verticalModule];
    }
}
