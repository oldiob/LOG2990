import { Injectable } from '@angular/core';
import { SVGText } from 'src/services/svg/element/svg.text';
import { ITool } from './i-tool';
import { CmdSVG } from 'src/services/cmd/cmd.svg';

@Injectable({
    providedIn: 'root',
})
export class TextTool implements ITool {

    readonly tip: string;
    element: SVGText | null = null;
    width: number;
    angle: number;

    constructor() {
        this.tip = 'Text (T)';
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        const text = new SVGText(event.svgX, event.svgY);
        this.element = text;
        return new CmdSVG(this.element);
    }

    onMotion(event: MouseEvent): void {
        return;
    }
    onReleased(event: MouseEvent): void {
        return;
    }

    // onShowcase(x: number, y: number): SVGStamp | null {
    //     const previousElement = this.element;

    //     const mouseEvent: MouseEvent = new MouseEvent('', undefined);
    //     mouseEvent.svgX = x / 2.0;
    //     mouseEvent.svgY = y / 2.0;

    //     const element = this.onPressed(mouseEvent);
    //     this.onReleased(mouseEvent);

    //     this.element = previousElement;
    //     return element;
    // }
}
