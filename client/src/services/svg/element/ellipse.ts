import { Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { vMinus, vMultiply, vPlus } from 'src/utils/math';

export class SVGEllipse implements SVGInterface {
    element: any;

    startingPoint: number[];
    center: number[];
    radii: number[];

    pointSize = 1;
    stroke = 1;
    fill = 1;

    traceType: TraceType;

    constructor(x: number, y: number, private renderer: Renderer2) {
        this.element = this.renderer.createElement('ellipse', 'svg');
        this.startingPoint = this.center = [x, y];
        this.radii = [0, 0];

        this.renderer.setAttribute(this.element, 'fill', 'none');

        this.setAttributes();
    }

    isAt(x: number, y: number): boolean {
        switch (this.traceType) {
            case TraceType.BorderOnly:
                return this.isAtBorder(x, y);
            case TraceType.FillOnly:
                return this.isInside(x, y);
            case TraceType.FillAndBorder:
                return this.isInside(x, y) || this.isAtBorder(x, y);
        }

        return false;
    }

    private isAtBorder(x: number, y: number) {
        const originalRadii = this.radii;
        const widthDelta = [this.pointSize / 2.0, this.pointSize / 2.0];

        this.radii = vPlus(originalRadii, widthDelta);
        const insideBiggerElipse = this.isInside(x, y);

        this.radii = vMinus(originalRadii, widthDelta);
        const insideSmallerElipse = this.isInside(x, y);

        this.radii = originalRadii;
        return insideBiggerElipse && !insideSmallerElipse;
    }

    private isInside(x: number, y: number) {
        const relativeX = x - this.center[0];
        const relativeY = y - this.center[1];

        const ys: number[] = this.ellipseYs(relativeX);
        return relativeY >= ys[1] && relativeY <= ys[0];
    }

    isIn(x: number, y: number, r: number): boolean {
        return true;
    }
    setPrimary(color: string): void {
        if (this.fill === 1) {
            this.renderer.setAttribute(this.element, 'fill', color);
        }
    }
    setSecondary(color: string): void {
        if (this.stroke === 1) {
            this.renderer.setAttribute(this.element, 'stroke', color);
        }
    }
    setPointSize(pointSize: number): void {
        this.pointSize = pointSize;
        this.renderer.setAttribute(this.element, 'stroke-width', this.pointSize.toString());
    }
    setTraceType(traceType: TraceType): void {
        switch (traceType) {
            case TraceType.BorderOnly:
                this.fill = 0;
                this.stroke = 1;
                break;
            case TraceType.FillOnly:
                this.fill = 1;
                this.stroke = 0;
                break;
            case TraceType.FillAndBorder:
                this.fill = 1;
                this.stroke = 1;
                break;
        }

        this.renderer.setAttribute(this.element, 'fill-opacity', `${this.fill}`);
        this.renderer.setAttribute(this.element, 'stroke-opacity', `${this.stroke}`);

        this.traceType = traceType;
    }
    setCursor(x: number, y: number, shift: boolean) {
        const point: number[] = [x, y];
        const vectorToCenter = vMultiply(vMinus(point, this.startingPoint), 0.5);

        if (shift) {
            const min = Math.min(Math.abs(vectorToCenter[0]), Math.abs(vectorToCenter[1]));
            vectorToCenter[0] = Math.sign(vectorToCenter[0]) * min;
            vectorToCenter[1] = Math.sign(vectorToCenter[1]) * min;
        }
        this.radii = [Math.abs(vectorToCenter[0]), Math.abs(vectorToCenter[1])];
        this.center = vPlus(vectorToCenter, this.startingPoint);

        this.setAttributes();
    }

    private setAttributes() {
        this.renderer.setAttribute(this.element, 'cx', `${this.center[0]}`);
        this.renderer.setAttribute(this.element, 'cy', `${this.center[1]}`);
        this.renderer.setAttribute(this.element, 'rx', `${this.radii[0]}`);
        this.renderer.setAttribute(this.element, 'ry', `${this.radii[1]}`);
    }

    private ellipseYs(x: number): number[] {
        const sqrtInside = (1.0 - ((x * x) / (this.radii[0] * this.radii[0]))) * (this.radii[1] * this.radii[1]);

        // x outide elipse, clearly impossible to be inside
        if (sqrtInside < 0) {
            const impossibleOutcome = [-1, 1];
            return impossibleOutcome;
        }

        const verticalModule = Math.sqrt(sqrtInside);
        return [verticalModule, -verticalModule];
    }
}
