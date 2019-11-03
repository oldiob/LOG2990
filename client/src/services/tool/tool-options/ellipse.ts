import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { AbsShapeTool, TraceType } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class EllipseTool extends AbsShapeTool {
    width: number;
    traceType: TraceType;

    constructor(private paletteService: PaletteService) {
        super();
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
        this.tip = 'Ellipse (2)';
    }

    onPressed(event: MouseEvent): CmdSVG {
        this.element = new SVGEllipse(event.svgX, event.svgY, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return new CmdSVG(this.element);
    }
}
