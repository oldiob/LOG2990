import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { TraceType, AbsShapeTool } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool extends AbsShapeTool {
    width: number;
    traceType: TraceType;
    element: SVGRect | null;

    constructor(private paletteService: PaletteService) {
        super();
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): SVGRect | null {
        this.element = new SVGRect(event.svgX, event.svgY, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return this.element;
    }
}
