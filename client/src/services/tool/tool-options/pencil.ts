import { Renderer2 } from '@angular/core';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { ITool } from './i-tool';

export class Pencil implements ITool {
    FILENAME = 'pencil.png';
    element: SVGPencil | null;
    width: number;

    protected renderer: Renderer2;

    constructor(renderer: Renderer2) {
        this.renderer = renderer;
        this.width = 1;
    }

    onPressed(x: number, y: number): void {
        this.element = new SVGPencil(this.renderer);
        this.element.setWidth(this.width);
        this.element.addPoint(x, y);
        this.element.addPoint(x + 1, y + 1);
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
