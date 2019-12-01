import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { ITool } from './i-tool';
@Injectable({
    providedIn: 'root',
})

export class AirbrushTool implements ITool {
    readonly tip: string;
    width: number;

    private readonly DEFAULT_RATE = 15;
    private readonly DEFAULT_DIAMETER = 5;
    private readonly CALL_RATE = 15;

    private currentX: number;
    private currentY: number;

    private rate: number;
    diameter: number;

    element: SVGAirbrush | null = null;

    fonction: any;

    constructor(private paletteService: PaletteService) {
        this.width = this.DEFAULT_DIAMETER;
        this.rate = this.DEFAULT_RATE;
        this.diameter = this.DEFAULT_DIAMETER;
        this.tip = 'Airbrush (A)';
    }
    onPressed(event: MouseEvent): CmdSVG | null {
        this.currentX = event.svgX;
        this.currentY = event.svgY;
        this.element = new SVGAirbrush(this.currentX, this.currentY, this.width);
        this.element.setPrimary(this.paletteService.getPrimary());
        this.fonction = setInterval(() => {
            if (this.element) {
                this.element.addSpray(this.rate, this.width, this.currentX, this.currentY);
            }
        }, this.CALL_RATE);

        return new CmdSVG(this.element);
    }
    onMotion(event: MouseEvent): void {
        this.currentX = event.svgX;
        this.currentY = event.svgY;
        if (this.element) {
            this.element.addSpray(this.rate, this.width, event.svgX, event.svgY);
        }
    }
    onReleased(event: MouseEvent): void {
        clearTimeout(this.fonction);
        this.element = null;
    }

    setRate(rate: number) {
        this.rate = rate;
    }
}
