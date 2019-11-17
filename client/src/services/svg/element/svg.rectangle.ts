import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';
import { AbsSVGShape } from './svg.abs-shape';

export class SVGRectangle extends AbsSVGShape {

    constructor(x: number, y: number, traceType: TraceType) {
        super(x, y, traceType);
        this.hidePerimeter();

        const shapeElement = DOMRenderer.createElement('rect', 'svg');
        DOMRenderer.appendChild(this.element, shapeElement);

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
        super.release();
    }

    onShift(isShift: boolean) {
        this.setCursor(this.endingPoint[0], this.endingPoint[1], isShift);
    }

    protected setPositionAttributes(): void {
        DOMRenderer.setAttribute(this.element.children[1], 'x', `${this.center[0] - this.size[0]}`);
        DOMRenderer.setAttribute(this.element.children[1], 'y', `${this.center[1] - this.size[1]}`);
        DOMRenderer.setAttribute(this.element.children[1], 'width', `${2 * this.size[0]}`);
        DOMRenderer.setAttribute(this.element.children[1], 'height', `${2 * this.size[1]}`);
    }
}
