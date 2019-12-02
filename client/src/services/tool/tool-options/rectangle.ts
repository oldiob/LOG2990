import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGRectangle } from 'src/services/svg/element/svg.rectangle';
import { AbsShapeTool, TraceType } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool extends AbsShapeTool {

    private readonly DEFAULT_WIDTH = 5;
    private readonly RECT_TIP = 'Rectangle (1)';

    width: number;
    traceType: TraceType;
    element: SVGRectangle | null;

    constructor(private paletteService: PaletteService) {
        super();
        this.width = this.DEFAULT_WIDTH;
        this.traceType = TraceType.FillOnly;
        this.tip = this.RECT_TIP;
        this.element = null;
    }

    onPressed(event: MouseEvent): CmdSVG {
        this.element = new SVGRectangle(event.svgX, event.svgY, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return new CmdSVG(this.element);
    }
}
