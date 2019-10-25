import { Injectable } from '@angular/core';
import { IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';
import { ITool } from './i-tool';
import { CmdSVG } from 'src/services/cmd/cmd.svg';

@Injectable({
    providedIn: 'root',
})
export class StampTool implements ITool {
    private readonly MAX_ANGLE = 360;
    private readonly MIN_ANGLE = 0;
    private readonly MULTI_15 = 15;
    private readonly DEGREE = 1;
    private readonly IMAGESIZE = 12.5;
    element: SVGStamp | null = null;
    currentPath: string;
    width: number;
    angle: number;

    stampTexture: IStamp;
    constructor() {
        this.width = this.IMAGESIZE;
        this.angle = this.MIN_ANGLE;
        this.currentPath = '';
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        let cmd: CmdSVG | null = null;
        if (!this.element) {
            this.element = new SVGStamp(this.width, this.stampTexture, this.angle, this.currentPath);
            this.element.addPoint(event.svgX, event.svgY);
            cmd = new CmdSVG(this.element);
        }
        return cmd;
    }

    onReleased(event: MouseEvent): void {
        this.element = null;
    }

    onWheel(event: WheelEvent): boolean {
        const changeAngle = event.altKey ? this.DEGREE : this.DEGREE * this.MULTI_15;
        let newAngle = this.angle + Math.sign(event.deltaY) * changeAngle;

        if (newAngle < this.MIN_ANGLE) {
            newAngle += this.MAX_ANGLE;
        } else if (newAngle > this.MAX_ANGLE) {
            newAngle -= this.MAX_ANGLE;
        }

        this.angle = newAngle;
        return true;
    }

    onShowcase(x: number, y: number): SVGStamp | null {
        // const previousElement = this.element;

        // const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        // mouseEvent.svgX = x / 2.0;
        // mouseEvent.svgY = y / 2.0;

        // const element = this.onPressed(mouseEvent);
        // this.onReleased(mouseEvent);

        // this.element = previousElement;
        // return element;
        return null;
    }
}
