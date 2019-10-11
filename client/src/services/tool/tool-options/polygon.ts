import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { PolygonType, SVGPolygon } from 'src/services/svg/element/svg.polygon';
import { IShapeTool, TraceType} from './i-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class PolygonTool implements IShapeTool {
    readonly BUTTON_FILENAME: string = 'polygon.png';
    readonly CURSOR_FILENAME: string = 'polygon-cursor.svg';

    width: number;
    traceType: TraceType;
    polygonType: PolygonType;

    element: SVGPolygon | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
        this.width = 1;
        this.traceType = TraceType.FillAndBorder;
        this.polygonType = PolygonType.Dodecagon;
    }

    onPressed(event: MouseEvent): SVGPolygon {
        this.element = new SVGPolygon(event.svgX, event.svgY, this.renderer);

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
            this.element.setCursor(event.svgX, event.svgY, this.polygonType);
        }
    }
}
