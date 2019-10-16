import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { TraceType, AbsShapeTool } from './abs-shape-tool';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { AbsSVGShape } from 'src/services/svg/element/svg.abs-shape';

@Injectable({
    providedIn: 'root',
})
export class EllipseTool extends AbsShapeTool {
    width: number;
    traceType: TraceType;
    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        super();
        this.renderer = rendererProvider.renderer;
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): AbsSVGShape {
        this.element = new SVGEllipse(event.svgX, event.svgY, this.traceType, this.renderer);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return this.element;
    }
}
