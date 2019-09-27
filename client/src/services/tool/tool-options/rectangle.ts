import { SVGRect } from 'src/services/svg/element/svg.rect';
import { ITool } from './i-tool';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class Rectangle implements ITool {
    FILENAME = 'rectangle.png';
    element: SVGInterface | null;

    constructor() {
        //
    }

    onPressed(x: number, y: number): void {
        this.element = new SVGRect(x, y);
    }
    onReleased(x: number, y: number): void {
        this.element = null;
    }
    onMotion(x: number, y: number): void  {
        if (this.element == null) {
            return;
        }

        this.element.addPoint(x, y);
    }
}
