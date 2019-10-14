import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { RendererProviderService } from '../renderer-provider/renderer-provider.service';

@Injectable({
    providedIn: 'root',
})
export class GridService {

    static readonly MIN_SIZE = 5;
    static readonly MAX_SIZE = 25;
    static readonly DEFAULT_SIZE = 15;
    static readonly MIN_OPACITY = 0.2;
    static readonly MAX_OPACITY = 1.0;

    ref: ElementRef;
    _size: number = GridService.DEFAULT_SIZE;
    savedWidth: number = 0;
    savedHeight: number = 0;
    renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService) {
        this.renderer = rendererProvider.renderer;
    }

    set size(size: number) {
        if (GridService.MIN_SIZE <= size && size <= GridService.MAX_SIZE) {
            this._size = size;
            this.draw(this.savedWidth, this.savedHeight);
        }
    }

    set opacity(opacity: number) {
        if (GridService.MIN_OPACITY <= opacity &&
            opacity <= GridService.MAX_OPACITY) {
            this.renderer.setAttribute(this.ref.nativeElement, 'stroke-opacity', `${opacity}`);
        }
    }

    draw(w: number, h: number): void {
        let ctx: any = this.ref.nativeElement;
        const max_i = w / this._size;
        const max_j = h / this._size;

        this.savedWidth = w;
        this.savedHeight = h;

        while (ctx.firstChild) {
            ctx.removeChild(ctx.firstChild);
        }
        for (let i = 0; i < max_i; ++i) {
            const pos_x = i * this._size;
            const line = this.renderer.createElement('line', 'svg');
            this.renderer.setAttribute(line, 'x1', `${pos_x}`);
            this.renderer.setAttribute(line, 'y1', `0`);
            this.renderer.setAttribute(line, 'x2', `${pos_x}`);
            this.renderer.setAttribute(line, 'y2', `${h}`);
            this.renderer.setAttribute(line, 'stroke', 'black');
            this.renderer.setAttribute(line, 'stroke-width', '1');
            this.renderer.appendChild(ctx, line);
        }
        for (let j = 0; j < max_j; ++j) {
            const pos_y = j * this._size;
            const line = this.renderer.createElement('line', 'svg');
            this.renderer.setAttribute(line, 'x1', `0`);
            this.renderer.setAttribute(line, 'y1', `${pos_y}`);
            this.renderer.setAttribute(line, 'x2', `${w}`);
            this.renderer.setAttribute(line, 'y2', `${pos_y}`);
            this.renderer.setAttribute(line, 'stroke', 'black');
            this.renderer.appendChild(ctx, line);
        }
    }
}
