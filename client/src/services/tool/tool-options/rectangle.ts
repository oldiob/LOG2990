import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { IShapeTool, TraceType } from './i-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool implements IShapeTool {
    width: number;
    traceType: TraceType;

    element: SVGRect | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): SVGRect | null {
        if (this.element) {
            return null;
        }
        this.element = new SVGRect(event.svgX, event.svgY, this.renderer);

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
        if (this.element) {
            this.element.setCursor(event.svgX, event.svgY, event.shiftKey);
        }
    }

    onShift(): void {
        // not yet implemented
    }
}
