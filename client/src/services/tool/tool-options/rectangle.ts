import { SVGRect } from 'src/services/svg/element/svg.rect';
import { ITool } from './i-tool';

export class Rectangle implements ITool {
    FILENAME = 'rectangle.png';
    element: SVGRect | null = null;

    constructor() {
        //
    }

    onReleased(event: MouseEvent): void  {
        throw new Error('Method not implemented.');
    }

    onPressed(event: MouseEvent): void {
        const x: number = event.clientX;
        const y: number = event.clientY;
        this.element = new SVGRect(x, y);
    }
    onRelease(event: MouseEvent): void {
        this.element = null;
    }
    onMotion(event: MouseEvent): void  {
        if (this.element == null) {
            return;
        }

        const x: number = event.clientX;
        const y: number = event.clientY;
        this.element.setP2(x, y);
    }
}
