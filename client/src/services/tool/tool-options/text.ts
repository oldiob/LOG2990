import { Injectable } from '@angular/core';
import { ITool } from './i-tool';
@Injectable({
    providedIn: 'root',
})
export class TextTool implements ITool {

    width: number;
    angle: number;

    constructor() {
        //
    }

    onPressed(event: MouseEvent): null {
        return null;
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
