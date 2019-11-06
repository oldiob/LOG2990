import { Injectable } from '@angular/core';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { KeyService } from 'src/services/key/key.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGText } from 'src/services/svg/element/svg.text';
import { Color } from 'src/utils/color';
import { ITool } from './i-tool';
declare type callback = () => void;
@Injectable({
    providedIn: 'root',
})
export class TextTool implements ITool {

    readonly tip: string;
    TEXTTIP = 'Text (T)';
    UNSET = '';
    INITIALSIZE = '15px';
    element: SVGText | null = null;
    fontSize: string;
    fontStyle: string;
    fontWeigth: string;
    fontFamily: string;
    textAlign: string;
    width: number;

    isEditing: boolean;

    constructor(private keyService: KeyService,  private paletteService: PaletteService) {
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
        if (this.keyService.getIsDisableText()) {
            this.finishEdit();
            this.keyService.setIsDisableText(false);
        }
        if (!this.element) {
            this.startEdit();
            this.element = new SVGText(this.keyService, event.svgX, event.svgY, this.fontFamily,
                                    this.fontSize, this.textAlign, this.fontStyle, this.fontWeigth);
            this.paletteService.primaryObs$.subscribe((color: Color) => {
                if (this.element !== null) {
                    this.element.setPrimary(color.toString());
                }
            });

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

    onUnSelect(): void {
        this.element = null;
    }

    onKeydown(event: KeyboardEvent): boolean {
        if (this.keyService.getIsDisableText()) {
            this.finishEdit();
            this.keyService.setIsDisableText(false);
        }
        let current = this.UNSET;
        if (this.element !== null) {
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
            };
            if (event.key in actions) {
                const func: callback = actions[event.key];
                func();
            } else {
                current += event.key;
                this.element.currentSubElement.innerHTML = current;
            }
        }
        return true;
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
        if (content === this.UNSET) {
            return true;
        }
        return false;
    }
    isLineEmpty(content: string): boolean {
        if (content === '') {
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
            key: 'Rebase',
        };
        this.onKeydown(textShowcase as KeyboardEvent);
        this.element = previousElement;
        return element;
    }
}
