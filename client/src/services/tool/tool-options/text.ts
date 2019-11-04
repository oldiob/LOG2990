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
    INITIALSIZE = '15px';
    element: SVGText | null = null;
    fontSize: string;
    fontStyle: string;
    fontWeigth: string;
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
        this.fontSize = this.INITIALSIZE;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        this.text = new SVGText(event.svgX, event.svgY, this.fontSize, this.fontStyle, this.fontWeigth, this.fontFamily, this.textAlign);
        this.text.setFontFamily(this.fontFamily);
        this.text.setFontSize(this.fontSize);
        this.text.setTextAlign(this.textAlign);
        this.text.setFontStyle(this.fontStyle);
        this.text.setFontWeight(this.fontWeigth);
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
                Backspace: () => { if (this.element) { current = current.substring(0, current.length - 1); } },
                Enter: () => { if (this.element) { this.text.setLineBreak(); } },
            };
            if (event.key in actions) {
                const func: callback = actions[event.key];
                func();
            } else {
                current += event.key;
            }
            this.element.element.innerHTML = current;
        }
        return true;
    }

    setFontSize(size: string): void {
        this.fontStyle = size;
        if (this.element != null) {
            this.element.setFontSize(size);
        }
    }
    setFontStyle(style: string): void {
        this.fontStyle = style;
        if (this.element != null) {
            this.element.setFontStyle(style);
        }
    }
    setFontWeight(weight: string): void {
      console.log('bolded');
        this.fontWeigth = weight;
        if (this.element != null) {
            this.element.setFontWeight(weight);
        }
    }
    setFont(font: string): void {
        this.fontFamily = font;
        if (this.element != null) {
            this.element.setFontFamily(font);
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
