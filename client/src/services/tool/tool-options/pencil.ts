import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PencilTool implements ITool {
    element: SVGPencil | null;
    width: number;

    protected renderer: Renderer2;

    constructor(
            rendererProvider: RendererProviderService,
            private paletteService: PaletteService) {

        this.renderer = rendererProvider.renderer;
        this.width = 5;
    }

    onPressed(event: MouseEvent): SVGPencil {
        const x = event.svgX;
        const y = event.svgY;
        this.element = new SVGPencil(this.renderer);
        this.element.setWidth(this.width);
        this.element.addPoint(x, y);
        this.element.addPoint(x, y);

        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());

        return this.element;
    }
    onMotion(event: MouseEvent): void {
        if (this.element == null) {
            throw new Error('Motion event on null element');
        }
        const x = event.svgX;
        const y = event.svgY;
        this.element.addPoint(x, y);
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }

}
