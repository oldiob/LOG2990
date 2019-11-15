import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { ITool } from './i-tool';
@Injectable({
    providedIn: 'root',
})

export class AirbrushTool implements ITool {
    tip: string;
    width?: number | undefined;

    readonly DEFAULT_RATE = 15;
    readonly DEFAULT_DIAMETER = 30;
    readonly CALL_RATE = 15;

    currentX: number;
    currentY: number;

    rate: number;
    diameter: number;

    element: SVGAirbrush | null = null;

    fonction: any;

    constructor() {
        this.width = this.DEFAULT_DIAMETER;
        this.rate = this.DEFAULT_RATE;
        this.diameter = this.DEFAULT_DIAMETER;
    }
    onPressed(event: MouseEvent): CmdSVG | null {
        this.currentX = event.svgX;
        this.currentY = event.svgY;
        if (this.width === undefined) {
            this.width = this.DEFAULT_DIAMETER;
        }
        this.element = new SVGAirbrush(this.currentX, this.currentY);
        this.element.spree(this.rate, this.width, this.currentX, this.currentY);

        this.fonction = setInterval(() => {
            if (this.width === undefined) {
                this.width = this.DEFAULT_DIAMETER;
            }
            if (this.element) {
                this.element.spree(this.rate, this.width, this.currentX, this.currentY);
            }
        }, this.CALL_RATE);

        return new CmdSVG(this.element);
    }
    onMotion(event: MouseEvent): void {
        this.currentX = event.svgX;
        this.currentY = event.svgY;

        if (this.width === undefined) {
            this.width = this.DEFAULT_DIAMETER;
        }
        if (this.element) {
            this.element.spree(this.rate, this.width, event.svgX, event.svgY);
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
