import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
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

    width: number;
    angle: number;

    stamp: IStamp;

    renderer: Renderer2;

    constructor(
            rendererProvider: RendererProviderService,
            private paletteService: PaletteService) {

        this.renderer = rendererProvider.renderer;
        this.width = 1;
    }

    onPressed(event: MouseEvent): SVGStamp {
        this.element = new SVGStamp(this.renderer, this.width, this.stamp);
        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());
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
