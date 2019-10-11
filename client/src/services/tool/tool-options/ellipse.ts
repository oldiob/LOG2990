import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { IShapeTool, TraceType } from './i-shape-tool';
import { SVGEllipse } from 'src/services/svg/element/ellipse';

@Injectable({
    providedIn: 'root',
})
export class EllipseTool implements IShapeTool {
    readonly BUTTON_FILENAME: string = 'rectangle.png';
    readonly CURSOR_FILENAME: string = 'rectangle-cursor.svg';

    width: number;
    traceType: TraceType;

    element: SVGEllipse | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): SVGEllipse {
        this.element = new SVGEllipse(event.svgX, event.svgY, this.renderer);

        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());
        this.element.setPointSize(this.width);
        this.element.setTraceType(this.traceType);
        return this.element;
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }
    onMotion(event: MouseEvent): void {
        if (this.element != null) {
            this.element.setCursor(event.svgX, event.svgY, event.shiftKey);
        }
    }
}
