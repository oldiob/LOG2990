import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { KeyService } from 'src/services/key/key.service';
import { PaletteService } from 'src/services/palette/palette.service';
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

    isEditing = false;

    constructor(private keyService: KeyService, private paletteService: PaletteService) {
        this.tip = this.TEXTTIP;
        this.fontSize = this.EMPTYSTRING;
        this.fontStyle = this.EMPTYSTRING;
        this.fontFamily = this.EMPTYSTRING;
        this.textAlign = this.EMPTYSTRING;
        this.fontSize = this.INITIALSIZE;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (this.keyService.getIsDisableText()) {
          this.finishEdit();
          this.keyService.setIsDisableText(false);
        }
        if (!this.element) {
            this.startEdit();
            this.text = new SVGText(this.keyService, event.svgX, event.svgY,
                this.fontSize, this.fontStyle, this.fontWeigth, this.fontFamily, this.textAlign);
            this.text.setFontFamily(this.fontFamily);
            this.text.setFontSize(this.fontSize);
            this.text.setTextAlign(this.textAlign);
            this.text.setFontStyle(this.fontStyle);
            this.text.setFontWeight(this.fontWeigth);
            this.text.setPrimary(this.paletteService.getPrimary());
            this.element = this.text;
            return new CmdSVG(this.element);
        } else if (this.element) {
            this.finishEdit();
        }
        return null;
    }

    onMotion(event: MouseEvent): void {
        return;
    }
    onReleased(event: MouseEvent): void {
        return;
    }

    onKeydown(event: KeyboardEvent): boolean {
        if (this.keyService.getIsDisableText()) {
          this.finishEdit();
          this.keyService.setIsDisableText(false);
        }
        let current = this.EMPTYSTRING;
        if (this.element != null) {
            current = this.element.currentSubElement.innerHTML;
            const actions: { [id: string]: callback } = {
                Backspace: () => { if (this.element) { current = current.substring(0, current.length - 1); } },
                Enter: () => { if (this.element) {
                  if (this.isLineEmpty(current)) {
                    this.text.setCurrentPlaceholder();
                  }
                  this.text.setLineBreak(); } },
            };
            if (event.key in actions) {
                const func: callback = actions[event.key];
                func();
            } else {
                current += event.key;
                if (this.paletteService.swap) {
                    this.text.setPrimary(this.paletteService.getPrimary());
                }
                this.element.currentSubElement.innerHTML = current;
            }
            //
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
        if (this.element !== null) {
            this.element.setFontWeight(weight);
        }
    }

    setFontFamily(font: string): void {
        this.fontFamily = font;
        if (this.element != null) {
            this.element.setFontFamily(font);
        }
    }

    setTextAlign(align: string): void {
        this.textAlign = align;
        if (this.element != null) {
            this.element.setTextAlign(align);
        }
    }

    finishEdit(): void {
        this.isEditing = false;
        this.keyService.setIsBlocking(false);
        this.element = null;
    }
    startEdit(): void {
      this.isEditing = true;
      this.keyService.setIsBlocking(true);
    }
    isLineEmpty(content: string): boolean {
        if (content === '') {
            return true;
        }
        return false;
    }

    // onShowcase(x: number, y: number): SVGText | null {

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
