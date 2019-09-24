import { SVGRect } from 'src/services/svg/element/svg.rect';
import { SVGInterface } from '../../svg/element/svg.interface';
import { ITool } from './i-tool';

export class Rectangle implements ITool {
    FILENAME: string = "rectangle.png";

    private currentRect: SVGRect | null = null;

    constructor() {//
    }

    onReleased(event: MouseEvent): void  {
        throw new Error('Method not implemented.');
    }

    onPressed(event: MouseEvent): SVGInterface | null {
        const x: number = event.clientX;
        const y: number = event.clientY;
        this.currentRect = new SVGRect(x, y);
        return null;//this.currentRect;
    }
    onRelease(event: MouseEvent): void {
        this.currentRect = null;
    }
    onMotion(event: MouseEvent): void  {
        if (this.currentRect == null) {
            return;
        }
        const x: number = event.clientX;
        const y: number = event.clientY;
        this.currentRect.setP2(x, y);
    }
}
