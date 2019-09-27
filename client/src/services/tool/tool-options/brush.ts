import { SVGBrush } from '../../svg/element/svg.brush';
import { Pencil } from './pencil';
import { Renderer2 } from '@angular/core';

export class Brush extends Pencil {
    element: SVGBrush | null;
    FILENAME = 'brush.png';

    constructor(renderer: Renderer2) {
        super(renderer);
    }

    onPressed(x: number, y: number): void {
        this.element = new SVGBrush(this.renderer);
        this.element.addPoint(x, y);
        this.element.setWidth(this.width);
    }
}
