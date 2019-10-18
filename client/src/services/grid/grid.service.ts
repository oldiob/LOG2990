import { ElementRef, Injectable } from '@angular/core';
import { RendererProvider } from '../renderer-provider/renderer-provider';

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
            RendererProvider.renderer.setAttribute(this.ref.nativeElement, 'stroke-opacity', `${opacity}`);
        }
    }

    draw(): void {
        let ctx: any = this.ref.nativeElement;
        const max_i = this.width / this.mStep;
        const max_j = this.height / this.mStep;

        while (ctx.firstChild) {
            ctx.removeChild(ctx.firstChild);
        }
        for (let i = 0; i < max_i; ++i) {
            const pos_x = i * this.mStep;
            const line = RendererProvider.renderer.createElement('line', 'svg');
            RendererProvider.renderer.setAttribute(line, 'x1', `${pos_x}`);
            RendererProvider.renderer.setAttribute(line, 'y1', `0`);
            RendererProvider.renderer.setAttribute(line, 'x2', `${pos_x}`);
            RendererProvider.renderer.setAttribute(line, 'y2', `${this.height}`);
            RendererProvider.renderer.setAttribute(line, 'stroke', 'black');
            RendererProvider.renderer.setAttribute(line, 'stroke-width', '1');
            RendererProvider.renderer.appendChild(ctx, line);
        }
        for (let j = 0; j < max_j; ++j) {
            const pos_y = j * this.mStep;
            const line = RendererProvider.renderer.createElement('line', 'svg');
            RendererProvider.renderer.setAttribute(line, 'x1', `0`);
            RendererProvider.renderer.setAttribute(line, 'y1', `${pos_y}`);
            RendererProvider.renderer.setAttribute(line, 'x2', `${this.width}`);
            RendererProvider.renderer.setAttribute(line, 'y2', `${pos_y}`);
            RendererProvider.renderer.setAttribute(line, 'stroke', 'black');
            RendererProvider.renderer.appendChild(ctx, line);
        }
    }
}
