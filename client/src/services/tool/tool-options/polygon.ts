import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
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

    constructor(private paletteService: PaletteService) {
        super();
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
        this.nSides = 3;
    }

    onPressed(event: MouseEvent): SVGPolygon | null {
        this.element = new SVGPolygon(event.svgX, event.svgY, this.nSides, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return this.element;
    }
}
