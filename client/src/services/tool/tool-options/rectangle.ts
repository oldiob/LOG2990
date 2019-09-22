import { SVGRect } from 'src/services/svg/svg.rect';
import { SVGInterface } from '../../svg/svg.interface';
import { ITool } from './i-tool';

export class Rectangle implements ITool {

  private currentRect: SVGRect | null = null;

  constructor() {//
 }

  onReleased(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

    onPressed(event: MouseEvent): SVGInterface {
        const x: number = event.clientX;
        const y: number = event.clientY;
        this.currentRect = new SVGRect(x, y);
        return this.currentRect;
    }
    onRelease(event: MouseEvent) {
        this.currentRect = null;
    }
    onMotion(event: MouseEvent) {
        if (this.currentRect == null) {
            return;
        }
        const x: number = event.clientX;
        const y: number = event.clientY;
        this.currentRect.setP2(x, y);
    }
}
