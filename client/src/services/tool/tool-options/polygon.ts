import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGPolygon } from 'src/services/svg/element/svg.polygon';
import { AbsShapeTool, TraceType } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class PolygonTool extends AbsShapeTool {
    width: number;
    traceType: TraceType;
    nSides: number;
    element: SVGPolygon | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        super();
        this.renderer = rendererProvider.renderer;
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
        this.nSides = 3;
    }

    onPressed(event: MouseEvent): SVGPolygon | null {
        this.element = new SVGPolygon(event.svgX, event.svgY, this.nSides, this.traceType, this.renderer);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return this.element;
    }
}
