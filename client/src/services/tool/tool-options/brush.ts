import { Renderer2, Injectable } from '@angular/core';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { SVGCustom } from 'src/services/svg/element/svg.custom';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BrushTool implements ITool {
    FILENAME = 'brush.png';
    element: SVGInterface | null;

    width: number;

    constructor(private renderer: Renderer2) {
        this.width = 1;
    }
    onPressed(event: MouseEvent): void {
        this.element = new SVGBrush(this.renderer);
        /*this.element.setWidth(this.width);
        this.element.addPoint(event.svgX, event.svgY);

        this.element = new SVGCustom(this.renderer);
        this.element.setWidth(this.width);

        this.element.addPoint(event.svgX, event.svgY);
        return this.element;*/
    }

    onMotion(event: MouseEvent): void {
        if (this.element != null) {
            //this.element.addPoint(x, y);
        }
    }
    onReleased(event: MouseEvent): void {
        throw new Error('Method not implemented.');
    }

    leftClick() {
        throw new Error('Method not implemented.');
    }
    leftRelease() {
        throw new Error('Method not implemented.');
    }
}
