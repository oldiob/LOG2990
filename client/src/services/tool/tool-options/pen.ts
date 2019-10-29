import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPen } from 'src/services/svg/element/svg.pen';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PenTool implements ITool {
    width: number;
    element: SVGPen | null = null;
    minWidth: number;
    maxWidth: number;

    constructor(private paletteService: PaletteService) {
        this.minWidth = 5;
        this.maxWidth = 10;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
            return null;

        }
        const line = new SVGPen(event.svgX, event.svgY);
        line.setMinWidth(this.minWidth);
        line.setMaxWidth(this.maxWidth);
        line.setPrimary(this.paletteService.getPrimary());
        this.element = line;
        return new CmdSVG(this.element);
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
        this.element.setCursor(event.svgX, event.svgY);
        const previousElement = this.element;

        const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        mouseEvent.svgX = event.svgX;
        mouseEvent.svgY = event.svgY;
        mouseEvent.doubleClick = false;

        const action = this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        mouseEvent.svgX = event.svgX;
        mouseEvent.svgY = event.svgY;
        mouseEvent.doubleClick = false;
        this.onMotion(mouseEvent);

        this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        mouseEvent.svgX = event.svgX;
        mouseEvent.svgY = event.svgY;
        mouseEvent.doubleClick = false;
        this.onMotion(mouseEvent);

        this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        this.onPressed(mouseEvent);
        mouseEvent.doubleClick = true;
        this.onReleased(mouseEvent);

        this.element = previousElement;
        }
    }

    onReleased(event: MouseEvent): void {
        this.element = null;
        return;
    }

}
