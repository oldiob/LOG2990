import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { SVGService } from 'src/services/svg/svg.service';
import { IShapeTool, TraceType } from './i-shape-tool';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool implements IShapeTool {
    readonly BUTTON_FILENAME: string = 'rectangle.png';
    readonly CURSOR_FILENAME: string = 'rectangle-cursor.svg';

    width: number;
    traceType: TraceType;

    element: SVGRect | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
        this.width = 1;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): SVGInterface {
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
        if (this.element != null) {
            this.element.setCursor(event.svgX, event.svgY);
        }
    }
}
