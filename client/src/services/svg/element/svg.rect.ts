import { Renderer2 } from '@angular/core';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { AbsSVGShape } from './svg.abs-shape';
import { isAtLine } from 'src/utils/math';

export class SVGRect extends AbsSVGShape {

    constructor(x: number, y: number, traceType: TraceType, renderer: Renderer2) {
        super(x, y, traceType, renderer);
        this.hidePerimeter();

        this.shapeElement = this.renderer.createElement('rect', 'svg');
        this.renderer.appendChild(this.element, this.shapeElement);

        this.setOpacities();
        this.setCursor(x, y, false);
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
            if (isAtLine([x, y], [points[i], points[i + 1]], width)) {
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

    isIn(x: number, y: number, r: number): boolean {
        return true;
    }

    setCursor(x: number, y: number, isShift: boolean) {
        this.updateCoordinates(x, y, isShift);

        if (isShift) {
            this.showPerimeter();
            this.updatePerimeter();
        } else {
            this.hidePerimeter();
        }

        this.setPositionAttributes();
    }

    release() {
        this.hidePerimeter();
    }

    onShift(isShift: boolean) {
        this.setCursor(this.endingPoint[0], this.endingPoint[1], isShift);
    }

    protected setPositionAttributes(): void {
        this.renderer.setAttribute(this.shapeElement, 'x', `${this.center[0] - this.size[0]}`);
        this.renderer.setAttribute(this.shapeElement, 'y', `${this.center[1] - this.size[1]}`);
        this.renderer.setAttribute(this.shapeElement, 'width', `${2 * this.size[0]}`);
        this.renderer.setAttribute(this.shapeElement, 'height', `${2 * this.size[1]}`);
    }
}
