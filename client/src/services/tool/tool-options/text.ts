import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGText } from 'src/services/svg/element/svg.text';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class TextTool implements ITool {

    readonly tip: string;
    element: SVGText | null = null;
    fontSize: string;
    fontStyle: string;
    fontFamily: string;
    constructor() {
        this.tip = 'Text (T)';
        this.fontSize = '';
        this.fontStyle = '';
        this.fontFamily = '';
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        const text = new SVGText(event.svgX, event.svgY, this.fontSize, this.fontStyle, this.fontFamily);
        this.element = text;
        return new CmdSVG(this.element);
    }

    onMotion(event: MouseEvent): void {
        return;
    }
    onReleased(event: MouseEvent): void {
        return;
    }

    onKeydown(event: KeyboardEvent): boolean {
        let current = '';
        if (this.element != null) {
            current = this.element.element.innerHTML;
            if (event.key === 'Backspace') {
                current = current.substring(0, current.length - 1);
            } else if (event.key === 'Enter') {
                // current += '\n'; // alternate solution?
                current += '<br>';
            } else if (event.key === 'alt') {
                //
            } else {

                current += event.key;
                console.log(event.key);
            }

            this.element.element.innerHTML = current;
        }
        return true;
    }

    setFontSize(size: number): void {
        if (this.element != null) {
            this.element.element.setFontSize(size);
        }
    }
    setFontStyle(style: string): void {
        if (this.element != null) {
            this.element.element.setFontStyle(style);
        }
    }
    setFont(font: string): void {
        if (this.element != null) {
            this.element.element.setFont(font);
        }
    }
    finishEdit(): void {
        this.element = null;
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
