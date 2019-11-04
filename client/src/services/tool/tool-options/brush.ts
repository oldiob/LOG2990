import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGBrush } from 'src/services/svg/element/svg.brush';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BrushTool implements ITool {
    element: SVGBrush | null;

    readonly tip: string;
    width: number;
    texture: ITexture;

    constructor(private paletteService: PaletteService) {
        this.width = 5;
        this.tip = 'Brush (W)';
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        let cmd: CmdSVG | null = null;
        if (!this.element) {
            this.element = new SVGBrush(this.width, this.texture);
            this.element.setPrimary(this.paletteService.getPrimary());
            this.element.setSecondary(this.paletteService.getSecondary());
            this.element.addPoint(event.svgX, event.svgY);
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
