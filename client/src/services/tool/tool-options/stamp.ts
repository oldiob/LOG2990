import { Injectable, Renderer2 } from '@angular/core';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';
import { ITool } from './i-tool';
@Injectable({
    providedIn: 'root',
})
export class StampTool implements ITool {
    // à changer
    readonly BUTTON_FILENAME = 'brush.png';
    readonly CURSOR_FILENAME: string = 'brush-cursor.svg';

    element: SVGStamp;
    currentPath: string;
    width: number;
    angle: number;

<<<<<<< HEAD
    stamp: IStamp;

=======
    stampTexture: IStamp;
>>>>>>> Add Select One Of The 5 Emojis
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
        return;
    }
    onReleased(event: MouseEvent): void {
        return;
    }
}
