import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool implements ITool {

    width: number;
    readonly BUTTON_FILENAME: string = 'rectangle.png';
    readonly CURSOR_FILENAME: string = 'rectangle-cursor.svg';

    element: SVGRect | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private svgService: SVGService, private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
        this.width = 1;
    }

    onPressed(event: MouseEvent): void {
        this.element = new SVGRect(event.svgX, event.svgY, this.renderer);

        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());

        this.svgService.addObject(this.element);
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }
    onMotion(event: MouseEvent): void {
        if (this.element != null) {
            this.element.setCursor(event.svgX, event.svgY);
        }
    }
}
