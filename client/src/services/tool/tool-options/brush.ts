import { Injectable, RendererFactory2 } from '@angular/core';
import { PencilService } from './pencil';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGBrush } from 'src/services/svg/element/svg.brush';

@Injectable({
    providedIn: 'root',
})
export class BrushService extends PencilService {
    element: SVGBrush | null;
    readonly FILENAME: string = 'brush.png';

    constructor(factory: RendererFactory2) {
        super(factory);
    }
    onPressed(event: MouseEvent): SVGInterface {
        this.element = new SVGBrush(this.renderer);
        this.element.addPoint(event.svgX, event.svgY);
        this.element.setWidth(this.width);
        return this.element
    }
}
