import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGCalligraphy } from 'src/services/svg/element/svg.calligraphy';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class CalligraphyTool implements ITool {
    readonly tip: string;
    width: number;

    element: SVGCalligraphy | null = null;
    minWidth = 0.5;
    maxWidth = 25;
    constructor(private paletteService: PaletteService) {
        this.tip = 'Calligraphy (P)';
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
            return null;

        }
        const calligraphy = new SVGCalligraphy(event.svgX, event.svgY);
        this.element = calligraphy;

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
