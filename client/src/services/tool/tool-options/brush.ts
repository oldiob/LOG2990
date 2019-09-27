import { Renderer2 } from '@angular/core';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { ITool } from './i-tool';
import { SVGService } from 'src/services/svg/svg.service';

export class Brush implements ITool {
    FILENAME = 'brush.png';
    element: SVGBrush | null;

    width: number;

    constructor(private renderer: Renderer2) {
        this.width = 1;
    }

    onPressed(x: number, y: number): void {
        this.element = new SVGBrush(this.renderer);
        this.element.addPoint(x, y);
        this.element.setWidth(this.width);
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
