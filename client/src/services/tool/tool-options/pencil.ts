import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PencilService implements ITool {

    readonly FILENAME: string = "pencil.png";
    element: SVGPencil | null;
    width: number;

    protected renderer: Renderer2;

    constructor(factory: RendererFactory2) {
        this.renderer = factory.createRenderer(null, null);
        this.width = 1;
    }

    onPressed(event: MouseEvent): SVGInterface {
        const x = event.svgX;
        const y = event.svgY;
        this.element = new SVGPencil(this.renderer);
        this.element.addPoint(x, y);
        this.element.setWidth(this.width);
        return this.element;
    }
    onMotion(event: MouseEvent): void {
        const x = event.svgX;
        const y = event.svgY;
        if (this.element != null) {
            this.element.addPoint(x, y);
        }
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }

}
