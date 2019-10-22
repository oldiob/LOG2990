import { ElementRef, Injectable } from '@angular/core';
import { DOMRenderer } from '../../utils/dom-renderer';

@Injectable({
    providedIn: 'root',
})
export class GridService {

    static readonly MIN_STEP = 5;
    static readonly MAX_STEP = 25;
    static readonly DEFAULT_STEP = 15;
    static readonly MIN_OPACITY = 0.2;
    static readonly MAX_OPACITY = 1.0;

    ref: ElementRef;
    mStep: number = GridService.DEFAULT_STEP;
    width: number;
    height: number;

    constructor() {
        //
    }

    set step(step: number) {
        if (GridService.MIN_STEP <= step && step <= GridService.MAX_STEP) {
            if (step !== this.mStep) {
                this.mStep = step;
                this.draw();
            }
        }
    }

    set opacity(opacity: number) {
        if (GridService.MIN_OPACITY <= opacity &&
            opacity <= GridService.MAX_OPACITY) {
            DOMRenderer.setAttribute(this.ref.nativeElement, 'stroke-opacity', `${opacity}`);
        }
    }

    draw(): void {
        const ctx: any = this.ref.nativeElement;
        const maxI = this.width / this.mStep;
        const maxJ = this.height / this.mStep;

        while (ctx.firstChild) {
            ctx.removeChild(ctx.firstChild);
        }
        for (let i = 0; i < maxI; ++i) {
            const pos_x = i * this.mStep;
            const line = DOMRenderer.createElement('line', 'svg');
            DOMRenderer.setAttribute(line, 'x1', `${pos_x}`);
            DOMRenderer.setAttribute(line, 'y1', `0`);
            DOMRenderer.setAttribute(line, 'x2', `${pos_x}`);
            DOMRenderer.setAttribute(line, 'y2', `${this.height}`);
            DOMRenderer.setAttribute(line, 'stroke', 'black');
            DOMRenderer.setAttribute(line, 'stroke-width', '1');
            DOMRenderer.appendChild(ctx, line);
        }
        for (let j = 0; j < maxJ; ++j) {
            const pos_y = j * this.mStep;
            const line = DOMRenderer.createElement('line', 'svg');
            DOMRenderer.setAttribute(line, 'x1', `0`);
            DOMRenderer.setAttribute(line, 'y1', `${pos_y}`);
            DOMRenderer.setAttribute(line, 'x2', `${this.width}`);
            DOMRenderer.setAttribute(line, 'y2', `${pos_y}`);
            DOMRenderer.setAttribute(line, 'stroke', 'black');
            DOMRenderer.appendChild(ctx, line);
        }
    }
}
