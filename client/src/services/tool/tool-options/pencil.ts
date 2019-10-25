import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { ITool } from './i-tool';
import { CmdSVG } from 'src/services/cmd/cmd.svg';

@Injectable({
    providedIn: 'root',
})
export class PencilTool implements ITool {
    element: SVGPencil | null = null;
    width: number = 5;

    constructor(private paletteService: PaletteService) { }

    onPressed(event: MouseEvent): void {
        if (!this.element) {
            const x = event.svgX;
            const y = event.svgY;
            this.element = new SVGPencil();
            this.element.setWidth(this.width);
            this.element.addPoint(x, y);
            this.element.addPoint(x, y);

            this.element.setPrimary(this.paletteService.getPrimary());

            new CmdSVG(this.element);
        }
    }
    onMotion(event: MouseEvent): void {
        if (this.element) {
            const x = event.svgX;
            const y = event.svgY;
            this.element.addPoint(x, y);
        }
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }

}
