import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { TraceType, AbsShapeTool } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool implements IShapeTool {
    angle: number;
    width: number;
    traceType: TraceType;
    element: SVGRect | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        super();
        this.renderer = rendererProvider.renderer;
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): SVGRect | null {
        this.element = new SVGRect(event.svgX, event.svgY, this.traceType, this.renderer);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return this.element;
    }
}
