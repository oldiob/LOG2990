import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGEllipse } from 'src/services/svg/element/ellipse';
import { IShapeTool, TraceType } from './i-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class EllipseTool implements IShapeTool {
    readonly BUTTON_FILENAME: string = 'rectangle.png';
    readonly CURSOR_FILENAME: string = 'rectangle-cursor.svg';
    width: number;
    angle: number;
    traceType: TraceType;
    element: SVGEllipse | null;

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
