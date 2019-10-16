import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BrushTool implements ITool {
    element: SVGBrush | null;

    width: number;
    texture: ITexture;

    renderer: Renderer2;

    constructor(
        rendererProvider: RendererProviderService,
        private paletteService: PaletteService) {

        this.renderer = rendererProvider.renderer;
        this.width = 5;
    }

    onPressed(event: MouseEvent): SVGBrush | null {
        if (this.element) {
            return null;
        }
        this.element = new SVGBrush(this.renderer, this.width, this.texture);
        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());
        this.element.addPoint(event.svgX, event.svgY);

        return this.element;
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            const x = event.svgX;
            const y = event.svgY;
            this.element.addPoint(x, y);
        }
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }
}
