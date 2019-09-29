import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BrushTool implements ITool {
    readonly BUTTON_FILENAME = 'brush.png';
    readonly CURSOR_FILENAME: string = 'brush-cursor.svg';

    element: SVGBrush;

    width: number;

    texture: ITexture;

    renderer: Renderer2;

    constructor(
            rendererProvider: RendererProviderService,
            private svgService: SVGService,
            private paletteService: PaletteService) {

        this.renderer = rendererProvider.renderer;
        this.width = 1;
    }

    createFilters() {
        const filterBlur = this.renderer.createElement('filter', 'svg');
        this.renderer.setAttribute(filterBlur, 'id', 'blur');
        const filterBlurContent = this.renderer.createElement('feGaussianBlur', 'svg');
        this.renderer.setAttribute(filterBlurContent, 'stdDeviation', '2');
        this.renderer.appendChild(filterBlur, filterBlurContent);
        this.renderer.appendChild(this.svgService.entry.nativeElement, filterBlur);
    }

    onPressed(event: MouseEvent): void {
        this.createFilters();
        this.element = new SVGBrush(this.renderer, this.width, this.texture);
        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());
        this.svgService.addObject(this.element);
    }

    onMotion(event: MouseEvent): void {
        const x = event.svgX;
        const y = event.svgY;
        this.element.addPoint(x, y);
    }
    onReleased(event: MouseEvent): void {
        return;
    }
}
