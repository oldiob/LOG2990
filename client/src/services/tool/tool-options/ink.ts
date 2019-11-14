import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGInk } from 'src/services/svg/element/svg.ink';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class InkTool implements ITool {
    element: SVGInk | null = null;
    width = 5;
    readonly tip: string;

    constructor(private paletteService: PaletteService) {
        this.tip = 'Ink (C)';
     }

    onPressed(event: MouseEvent): CmdSVG | null {
        let cmd: CmdSVG | null = null;
        if (!this.element) {
            const x = event.svgX;
            const y = event.svgY;
            this.element = new SVGInk();
            this.element.setWidth(this.width);
            this.element.addPoint(x, y);
            this.element.addPoint(x, y);

            this.element.setPrimary(this.paletteService.getPrimary());

            cmd = new CmdSVG(this.element);
        }
        return cmd;
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
