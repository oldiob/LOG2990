import { Renderer2 } from '@angular/core';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { ITool } from './i-tool';

export class Pencil implements ITool {
    readonly FILENAME = 'pencil.png';
    element: SVGPencil | null;

    constructor(private renderer: Renderer2) { //
    }

    onPressed(event: MouseEvent): void {
        this.element = new SVGPencil(this.renderer);
        this.element.addPoint(event.clientX, event.clientY);
    }
    onMotion(event: MouseEvent): void {
        if (this.element != null) {
            this.element.addPoint(event.clientX, event.clientY);
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
