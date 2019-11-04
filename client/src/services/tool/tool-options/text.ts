import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGText } from 'src/services/svg/element/svg.text';
import { ITool } from './i-tool';

declare type callback = () => void;
@Injectable({
    providedIn: 'root',
})
export class TextTool implements ITool {

    readonly tip: string;
    TEXTTIP = 'Text (T)';
    EMPTYSTRING = '';
    INITIALSIZE = 15;
    element: SVGText | null = null;
    fontSize: string;
    fontStyle: string;
    fontFamily: string;
    textAlign: string;
    width: number;
    text: SVGText;
    constructor() {
        this.tip = this.TEXTTIP;
        this.fontSize = this.EMPTYSTRING;
        this.fontStyle = this.EMPTYSTRING;
        this.fontFamily = this.EMPTYSTRING;
        this.textAlign = this.EMPTYSTRING;
        this.width = this.INITIALSIZE;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        this.text = new SVGText(event.svgX, event.svgY, this.fontSize, this.fontStyle, this.fontFamily, this.textAlign);
        this.text.setFontFamily(this.fontFamily);
        this.text.setFontSize(this.width);
        this.text.setTextAlign(this.textAlign);
        this.text.setFontStyle(this.fontStyle);
        this.element = this.text;
        return new CmdSVG(this.element);
    }

    onMotion(event: MouseEvent): void {
        return;
    }
    onReleased(event: MouseEvent): void {
        return;
    }

    onKeydown(event: KeyboardEvent): boolean {
        let current = this.EMPTYSTRING;
        if (this.element != null) {
            current = this.element.element.innerHTML;
            const actions: { [id: string]: callback } = {
                Backspace: () => { if (this.element) {current = current.substring(0, current.length - 1); } },
                Enter: () => { if (this.element) { this.text.setLineBreak(); } },
            };
            if (event.key in actions) {
                const func: callback = actions[event.key];
                func();
            }  else {
                current += event.key;
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
