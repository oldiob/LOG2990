import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleService implements ITool {

    width: number;
    readonly FILENAME: string = 'rectangle.png';
    element: SVGRect | null;

    protected renderer: Renderer2;

    constructor(factory: RendererFactory2) {
        this.renderer = factory.createRenderer(null, null);
        this.width = 1;
    }

    onPressed(event: MouseEvent): SVGInterface {
        this.element = new SVGRect(event.svgX, event.svgY, this.renderer);
        return this.element;
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }
    onMotion(event: MouseEvent): void {
        if (this.element != null) {
            this.element.setCursor(event.svgX, event.svgY);
        }
    }
}
