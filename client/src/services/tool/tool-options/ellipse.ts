import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { AbsShapeTool, TraceType } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class EllipseTool extends AbsShapeTool {
    private readonly DEFAULT_WIDTH = 5;
    private readonly ELLIPSE_TIP = 'Ellipse (2)';
    width: number;
    traceType: TraceType;

    constructor(private paletteService: PaletteService) {
        super();
        this.width = this.DEFAULT_WIDTH;
        this.traceType = TraceType.FillOnly;
        this.tip = this.ELLIPSE_TIP;
    }

    onPressed(event: MouseEvent): CmdSVG {
        this.element = new SVGEllipse(event.svgX, event.svgY, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return new CmdSVG(this.element);
    }
}
