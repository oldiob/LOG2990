import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPen } from 'src/services/svg/element/svg.pen';
import { ITool} from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PenTool implements ITool {
    tip: string;
    width?: number | undefined;

    element: SVGPen | null = null;
    minWidth = 0.5;
    maxWidth = 25;
    constructor(private paletteService: PaletteService) {
        this.tip = 'Pen (Y)';
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
