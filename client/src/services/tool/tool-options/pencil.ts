import { Renderer2 } from '@angular/core';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { ITool } from './i-tool';

export class Pencil implements ITool {
    readonly FILENAME = 'pencil.png';
    element: SVGPencil | null;

    constructor(private renderer: Renderer2) { //
    }

    onPressed(x: number, y: number): void {
        this.element = new SVGPencil(this.renderer);
        this.element.addPoint(x, y);
    }
    onMotion(x: number, y: number): void {
        if (this.element != null) {
            this.element.addPoint(x, y);
        }
    }
    onReleased(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }

    leftClick() {
        throw new Error('Method not implemented.');
    }
    leftRelease() {
        throw new Error('Method not implemented.');
    }
}
