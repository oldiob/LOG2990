import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPolygon } from 'src/services/svg/element/svg.polygon';
import { AbsShapeTool, TraceType } from './abs-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class PolygonTool extends AbsShapeTool {

    private readonly POLYGON_TIP = 'Polygone (3)';
    private readonly DEFAULT_WIDTH = 5;
    private readonly DEFAULT_SIDES = 3;
    private readonly POLYGON_OFFSET = 70;

    nSides: number;
    width: number;
    traceType: TraceType;
    element: SVGPolygon | null;

    constructor(private paletteService: PaletteService) {
        super();

        this.width = this.DEFAULT_WIDTH;
        this.traceType = TraceType.FillOnly;
        this.nSides = this.DEFAULT_SIDES;
        this.tip = this.POLYGON_TIP;
    }

    onPressed(event: MouseEvent): CmdSVG {
        this.element = new SVGPolygon(event.svgX, event.svgY, this.nSides, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        return new CmdSVG(this.element);
    }

    onShowcase(x: number, y: number): CmdSVG | null {
        const previousElement = this.element;

        const center = [x / 2.0, y / 2.0];
        const offset = this.POLYGON_OFFSET;

        const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        mouseEvent.svgX = center[0] - offset;
        mouseEvent.svgY = center[1] - offset;

        const action = this.onPressed(mouseEvent);

        mouseEvent.svgX = center[0] + offset;
        mouseEvent.svgY = center[1] + offset;
        this.onMotion(mouseEvent);
        this.onReleased(mouseEvent);

        this.element = previousElement;
        return action;
    }
}
