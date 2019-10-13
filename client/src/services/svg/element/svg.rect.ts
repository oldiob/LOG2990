import { Renderer2 } from '@angular/core';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { AbsSvgShape } from './svg.abs-shape';

export class SVGRect extends AbsSvgShape {
    protected setPositionAttributes(): void {
        throw new Error("Method not implemented.");
    }

    constructor(x: number, y: number, traceType: TraceType, renderer: Renderer2) {
        super(x, y, traceType, renderer);

        /*this.rectElement = this.renderer.createElement('polygon', 'svg');
        this.x1 = this.x2 = x;
        this.y1 = this.y2 = y;
        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'x', `${this.x1}`);
        this.renderer.setAttribute(this.element, 'y', `${this.y1}`);
        */
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

    setCursor(x: number, y: number) {
        /*this.x2 = x;
        this.y2 = y;
        this.renderer.setAttribute(this.element, 'points', `${this.x1},${this.y1}
                                                            ${this.x2},${this.y1}
                                                            ${this.x2},${this.y2}
                                                            ${this.x1},${this.y2}`);*/
    }
}
