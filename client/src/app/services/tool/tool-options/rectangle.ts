import { ITool } from './i-tool';
import { SVGRect } from 'src/app/services/svg/svg.ect';

export class Rectangle implements ITool {

    private currentRect: SVGRect | null = null;

    constructor() { }

    onPressed(event: MouseEvent): SVGInterface {
        let x: number = event.clientX;
        let y: number = event.clientY;
        this.currentRect = new SVGRect(x, y);
        return this.currentRect;
    }
    onRelease(event: MouseEvent) {
        this.currentRect = null;
    }
    onMotion(event: MouseEvent) {
        if (this.currentRect == null)
            return;
        let x: number = event.clientX;
        let y: number = event.clientY;
        this.currentRect.setP2(x, y);
    }
}
