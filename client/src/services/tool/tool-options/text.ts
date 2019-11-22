import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { KeyService } from 'src/services/key/key.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGRectangle } from 'src/services/svg/element/svg.rectangle';
import { SVGText } from 'src/services/svg/element/svg.text';
import { SVGService } from 'src/services/svg/svg.service';
import { Color } from 'src/utils/color';
import { MyInjector } from 'src/utils/injector';
import { TraceType } from './abs-shape-tool';
import { ITool } from './i-tool';
declare type callback = () => void;
@Injectable({
    providedIn: 'root',
})
export class TextTool implements ITool {

    readonly tip: string;
    private TEXTTIP = 'Text (T)';
    private UNSET = '';
    private INITIALSIZE = '15px';
    private SHOWCASE_DEFAULT = 'Rebase';
    element: SVGText | null = null;
    fontSize: string;
    fontStyle: string;
    fontWeigth: string;
    fontFamily: string;
    textAlign: string;
    width: number;

    isEditing: boolean;

    private rect: SVGRectangle | undefined;

    constructor(private keyService: KeyService, private paletteService: PaletteService) {
        this.tip = this.TEXTTIP;
        this.fontWeigth = this.UNSET;
        this.fontStyle = this.UNSET;
        this.fontFamily = this.UNSET;
        this.textAlign = this.UNSET;
        this.fontSize = this.INITIALSIZE;
        this.isEditing = false;
        const DEFAULT_WIDTH = 15;
        this.width = DEFAULT_WIDTH;
    }

    onPressed(event: MouseEvent): CmdSVG | null {
        if (!this.keyService.isTextEnabled) {
            this.finishEdit();
            this.keyService.enableTextEdit();
        }
        if (!this.element) {
            this.startEdit();
            this.element = new SVGText(this.keyService, event.svgX, event.svgY, this.fontFamily,
                this.fontSize, this.textAlign, this.fontStyle, this.fontWeigth);
            this.rect = new SVGRectangle(event.svgX, event.svgY, TraceType.BorderOnly);
            this.rect.setSecondary('#000000');
            this.paletteService.primaryObs$.subscribe((color: Color) => {
                if (this.element !== null) {
                    this.element.setPrimary(color.toRGBA());
                }
            });

            return new CmdSVG(this.element);
        } else if (this.element) {
            if (this.element.isNewElement) {
                this.element.currentSubElement.innerHTML = this.UNSET;
            }
            this.finishEdit();
        }
        return null;
    }

    onMotion(event: MouseEvent): void {
        return;
    }
    onReleased(event: MouseEvent): void {
        if (this.rect) {
            const serv: SVGService = MyInjector.get(SVGService);
            serv.addObject(this.rect);
            this.setRect();
        }
        return;
    }

    private setRect() {
        if (this.rect && this.element) {
            const r: DOMRect = this.element.domRect;
            this.rect.setCursor(r.right, r.bottom, false);
        }
    }

    private removeRect() {
        const serv: SVGService = MyInjector.get(SVGService);
        if (this.rect) {
            serv.removeObject(this.rect);
            this.rect = undefined;
        }
    }

    private removeNewText() {
      const serv: SVGService = MyInjector.get(SVGService);
      if (this.element && this.element.isNewElement) {
          serv.removeObject(this.element);
      }
  }

    onUnSelect(): void {
        this.removeRect();
        this.removeNewText();
        this.element = null;
    }

    onKeydown(event: KeyboardEvent): boolean {
        if (!this.keyService.isTextEnabled) {
            this.finishEdit();
            this.keyService.enableTextEdit();
        }
        let current = this.UNSET;
        if (this.element !== null) {
            if (this.element.isNewElement) {
                this.element.currentSubElement.innerHTML = this.UNSET;
                this.element.isNewElement = false;
            }
            current = this.element.currentSubElement.innerHTML;
            const actions: { [id: string]: callback } = {
                Enter: () => {
                    if (this.element) {
                        if (this.isLineEmpty(current)) {
                            this.element.setCurrentPlaceholder();
                        }
                        this.element.setLineBreak();
                    }
                },
                Backspace: () => {
                    if (this.element) {
                        this.element.removeCharacter();
                    }
                },
            };
            if (event.key in actions) {
                const func: callback = actions[event.key];
                func();
            } else {
                current += event.key;
                this.element.currentSubElement.innerHTML = current;
            }
        }

        this.setRect();
        return true;
    }

    finishEdit(): void {
        this.isEditing = false;
        this.keyService.enableKeys();
        this.element = null;
        this.removeRect();
    }
    startEdit(): void {
        this.isEditing = true;
        this.keyService.disableKeys();
    }
    isLineEmpty(content: string): boolean {
        if (content === this.UNSET) {
            return true;
        }
        return false;
    }

    onShowcase(x: number, y: number): CmdSVG | null {

        const previousElement = this.element;
        const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        mouseEvent.svgX = x / 2.0;
        mouseEvent.svgY = y / 2.0;

        const element = this.onPressed(mouseEvent);

        const textShowcase: object = {
            key: this.SHOWCASE_DEFAULT,
        };
        this.onKeydown(textShowcase as KeyboardEvent);
        this.element = previousElement;
        return element;
    }
}
