import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPen } from 'src/services/svg/element/svg.pen';
import { ITool} from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PenTool implements ITool {

    element: SVGPen | null = null;
    minWidth = 0.5;
    maxWidth = 25;
    constructor(private paletteService: PaletteService) { }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
            return null;

        }
        const pen = new SVGPen(event.svgX, event.svgY);
        pen.setMinWidth(this.minWidth);
        pen.setMaxWidth(this.maxWidth);
        pen.setPrimary(this.paletteService.getPrimary());
        this.element = pen;
        return new CmdSVG(this.element);
    }

    onReleased(event: MouseEvent): void {
        if (!this.element) {
            return;
        }
        this.element.anchors.pop();
        this.element.anchors.pop();
        this.element = null;
        return;
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
            // this.onPressed(event);
        }
    }

}