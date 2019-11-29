import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGInk } from 'src/services/svg/element/svg.ink';
// import { ShowcaseSignal } from 'src/utils/showcase-signal';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class InkTool implements ITool {
    private readonly MAX_ANGLE = 360;
    private readonly MIN_ANGLE = 0;
    private readonly INITIAL_WIDTH = 25;
    private readonly MAX_ANGLE_STEP = 15;
    private readonly MIN_ANGLE_STEP = 1;
    private readonly INK_TIP = 'Ink (P)';
    readonly tip: string;

    element: SVGInk | null = null;
    width: number;
    angle: number;

    constructor(private paletteService: PaletteService) {
        this.tip = this.INK_TIP;
        this.angle = this.MIN_ANGLE;
        this.width = this.INITIAL_WIDTH;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        let cmd: CmdSVG | null = null;
        if (!this.element) {
            this.element = new SVGInk(this.angle, this.width);
            this.element.addPoint(event.svgX, event.svgY);
            this.element.addPoint(event.svgX, event.svgY);
            this.element.setPrimary(this.paletteService.getPrimary());
            cmd = new CmdSVG(this.element);
        }
        return cmd;
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.addPoint(event.svgX, event.svgY);
        }
    }

    onReleased(event: MouseEvent): void {
        this.element = null;
    }

    onWheel(event: WheelEvent): boolean {
        const changeAngle = event.altKey ? this.MIN_ANGLE_STEP : this.MIN_ANGLE_STEP * this.MAX_ANGLE_STEP;
        let newAngle = this.angle + Math.sign(event.deltaY) * changeAngle;

        if (newAngle < this.MIN_ANGLE) {
            newAngle += this.MAX_ANGLE;
        } else if (newAngle > this.MAX_ANGLE) {
            newAngle -= this.MAX_ANGLE;
        }

        this.angle = newAngle;
        if (this.element) {
            this.element.setAngle(this.angle);
        }

        return true;
    }
}
