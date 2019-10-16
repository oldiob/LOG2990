import { Injectable, Renderer2 } from '@angular/core';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';
import { ITool } from './i-tool';
@Injectable({
    providedIn: 'root',
})
export class StampTool implements ITool {
    private readonly MAX_ANGLE = 360;
    private readonly MIN_ANGLE = 0;
    private readonly MULTI_15 = 15;
    private readonly DEGREE = 1;

    element: SVGStamp | null;
    currentPath: string;
    width: number;
    angle: number;

    stampTexture: IStamp;
    renderer: Renderer2;
    constructor(rendererProvider: RendererProviderService) {
        this.renderer = rendererProvider.renderer;
        this.width = 25;
        this.angle = 0;
        this.currentPath = '';
    }

    onPressed(event: MouseEvent): SVGStamp {
        this.element = new SVGStamp(this.renderer, this.width, this.stampTexture, this.angle, this.currentPath);
        this.element.addPoint(event.svgX, event.svgY);
        return this.element;
    }

    onMotion(event: MouseEvent): void {
        this.element = null;
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }

    onWheel(event: WheelEvent): boolean {
        const changeAngle = event.altKey ? this.DEGREE : this.DEGREE * this.MULTI_15;
        let newAngle = this.angle + Math.sign(event.deltaY) * changeAngle;

        if (newAngle < this.MIN_ANGLE) {
            newAngle += this.MAX_ANGLE;
        } else if (newAngle > this.MAX_ANGLE) {
            newAngle -= this.MAX_ANGLE;
        }

        this.angle = newAngle;
        return true;
    }
}
