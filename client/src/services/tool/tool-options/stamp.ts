import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { IStamp } from 'src/services/svg/element/stamp/i-stamp';
import { SVGStamp } from 'src/services/svg/element/svg.stamp';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class StampTool implements ITool {

    private readonly MAX_ANGLE = 360;
    private readonly MIN_ANGLE = 0;
    private readonly MULTI_15 = 15;
    private readonly DEGREE = 1;
    private readonly IMAGESIZE = 12.5;
    private readonly STAMP_TIP = 'Stamp';
    private element: SVGStamp | null;
    readonly tip: string;

    currentPath: string;
    width: number;
    angle: number;
    emoji: IStamp;

    constructor() {
        this.element = null;
        this.width = this.IMAGESIZE;
        this.angle = this.MIN_ANGLE;
        this.currentPath = '';
        this.tip = this.STAMP_TIP;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (this.currentPath === '') {
            return null;
        }
        this.element = new SVGStamp(event.svgX, event.svgY, this.width, this.emoji, this.angle, this.currentPath);
        return new CmdSVG(this.element);
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

    onShowcase(x: number, y: number): CmdSVG | null {
        const previousElement = this.element;

        const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        mouseEvent.svgX = x / 2.0;
        mouseEvent.svgY = y / 2.0;

        const action = this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        this.element = previousElement;
        return action;
    }

    onMotion(event: MouseEvent): void {
        //
    }
}
