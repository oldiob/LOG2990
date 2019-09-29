import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PencilTool implements ITool {
    readonly FILENAME: string = 'pencil.png';

    element: SVGPencil | null;
    width: number;

    protected renderer: Renderer2;

    constructor(
            rendererProvider: RendererProviderService,
            private svgService: SVGService,
            private paletteService: PaletteService) {

        this.renderer = rendererProvider.renderer;
        this.width = 1;
    }

    onPressed(event: MouseEvent): void {
        const x = event.svgX;
        const y = event.svgY;
        this.element = new SVGPencil(this.renderer);
        this.element.setWidth(this.width);
        this.element.addPoint(x, y);

        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());

        this.svgService.addObject(this.element);
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
