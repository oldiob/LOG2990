import { Renderer2 } from '@angular/core';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { AbsSvgShape } from './svg.abs-shape';

export class SVGRect extends AbsSvgShape {

    constructor(x: number, y: number, traceType: TraceType, renderer: Renderer2) {
        super(x, y, traceType, renderer);
        this.hidePerimeter();

        this.shapeElement = this.renderer.createElement('rect', 'svg');
        this.renderer.appendChild(this.element, this.shapeElement);

        this.setOpacities();
        this.setCursor(x, y, false);
    }

    protected isAtBorder(x: number, y: number) {
        /*const additionnalWidth = 10.0;
        const width = this.pointSize + additionnalWidth;
        const points = [
            [this.x1, this.y1],
            [this.x2, this.y1],
            [this.x2, this.y2],
            [this.x1, this.y2],
            [this.x1, this.y1]];

        for (let i = 0; i < 4; i++) {
            if (atLine([x, y], [points[i], points[i + 1]], width)) {
                return true;
            }
        }*/

        return false;
    }

    protected isInside(x: number, y: number) {
        /*const minX: number = Math.min(this.x1, this.x2);
        const maxX: number = Math.max(this.x1, this.x2);
        const minY: number = Math.min(this.y1, this.y2);
        const maxY: number = Math.max(this.y1, this.y2);
        return (minX <= x && x <= maxX && minY <= y && y <= maxY);
        */ return false;
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

    protected setPositionAttributes(): void {
        this.renderer.setAttribute(this.shapeElement, 'x', `${this.center[0] - this.size[0]}`);
        this.renderer.setAttribute(this.shapeElement, 'y', `${this.center[1] - this.size[1]}`);
        this.renderer.setAttribute(this.shapeElement, 'width', `${2 * this.size[0]}`);
        this.renderer.setAttribute(this.shapeElement, 'height', `${2 * this.size[1]}`);
    }
}
