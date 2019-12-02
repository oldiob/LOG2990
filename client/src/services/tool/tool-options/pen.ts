import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPen } from 'src/services/svg/element/svg.pen';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PenTool implements ITool {

    private readonly DEFAULT_MAXWIDTH = 25;
    private readonly DEFAULT_MINWIDTH = 0.5;
    private readonly PEN_TIP = 'Pen (Y)';
    readonly tip: string;

    minWidth: number;
    maxWidth: number;
    element: SVGPen | null;

    constructor(private paletteService: PaletteService) {
        this.tip = this.PEN_TIP;
        this.element = null;
        this.minWidth = this.DEFAULT_MINWIDTH;
        this.maxWidth = this.DEFAULT_MAXWIDTH;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
            return null;

        }
        const pen = new SVGPen(event.svgX, event.svgY);
        this.element = pen;
        this.element.setMinWidth(this.minWidth);
        this.element.setMaxWidth(this.maxWidth);
        this.element.setWidth(this.maxWidth);
        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.addAnchor(event.svgX, event.svgY);
        return new CmdSVG(this.element);
    }

    onReleased(event: MouseEvent): void {
        this.element = null;
        return;
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
        }
    }

}
