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

    onPressed(event: MouseEvent): void {
        this.element = new SVGPolygon(event.svgX, event.svgY, this.nSides, this.traceType);
        this.setElementAttributes(this.paletteService.getPrimary(), this.paletteService.getSecondary(), this.width);
        this.addShape();
    }

    onShowcase(x: number, y: number): SVGPolygon | null {
        // const previousElement = this.element;

        // const center = [x / 2.0, y / 2.0];
        // const offset = 70;

        // const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        // mouseEvent.svgX = center[0] - offset;
        // mouseEvent.svgY = center[1] - offset;

        // const element = this.onPressed(mouseEvent);

        // mouseEvent.svgX = center[0] + offset;
        // mouseEvent.svgY = center[1] + offset;
        // this.onMotion(mouseEvent);
        // this.onReleased(mouseEvent);

        // this.element = previousElement;
        // return element;
        return null;
    }
}
