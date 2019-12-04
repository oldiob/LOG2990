import { Component, OnInit, ViewChild } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { TextTool } from 'src/services/tool/tool-options/text';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';
import { WidthComponent } from '../subcomponent/width/width.component';
import { TextFormat } from './text-format';

@Component({
    selector: 'app-text-option',
    templateUrl: './text-option.component.html',
    styleUrls: ['../toolbar-option.scss', './text-option.component.scss'],
})

export class TextOptionComponent implements OnInit, IOption<ITool> {
    fonts = [
        'Arial',
        'Times New Roman',
        'Lucida Console',
        'Verdana',
        'Garamond',
        'Comic Sans MS',
        'Lucida Sans Unicode',
        'Tahoma',
        'Courier',
        'Trebuchet MS',
        'Palatino Linotype',
    ];
    DEFAULT_SIZE = '15px';

    @ViewChild(WidthComponent, { static: true })
    widthComponent: WidthComponent;

    tip = 'Text (T)';
    currentTool: ITool;

    isBold = false;
    isItalic = false;
    isAlignLeft = true;
    isAlignCenter = false;
    isAlignRight = false;

    currentFontFamily: string;

    fontFamilies: any[];

    constructor(private toolService: ToolService, private text: TextTool) { }

    ngOnInit() {
        const NO_FONT = '';
        this.currentFontFamily = NO_FONT;
        this.currentTool = this.text;
    }

    select(): void {
        this.toolService.currentTool = this.text;
    }

    getImage(): string {
        const FILENAME = 'text.png';
        return FILENAME;
    }

    selectFontSize(fontSize: number): void {
        this.text.fontSize = fontSize;
        if (this.text.element) {
            this.text.element.setFontSize(fontSize);
        }

        ShowcaseSignal.emit();
    }

    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        this.text.fontFamily = this.currentFontFamily;
        if (this.text.element) {
            this.text.element.setFontFamily(fontFamily);
        }

        ShowcaseSignal.emit();
    }

    selectTextAlign(textAlign: string): void {
        this.disableAlign();
        if (textAlign === TextFormat.ALIGNLEFT) {
            this.isAlignLeft = true;
        } else if (textAlign === TextFormat.ALIGNCENTER) {
            this.isAlignCenter = true;
        } else if (textAlign === TextFormat.ALIGNRIGHT) {
            this.isAlignRight = true;
        }
        if (this.text.element) {
            this.text.element.setTextAlign(textAlign);
        }
        this.text.setTextAlign(textAlign);

    }

    disableAlign(): void {
        this.isAlignLeft = false;
        this.isAlignCenter = false;
        this.isAlignRight = false;
    }

    toggleBold(): void {
        this.isBold = !this.isBold;
        if (this.text.element) {
            if (this.isBold) {
                this.text.element.setFontWeight(TextFormat.BOLD);
                this.text.fontWeigth = TextFormat.BOLD;
            } else {
                this.text.element.setFontWeight(TextFormat.NORMAL);
                this.text.fontWeigth = TextFormat.NORMAL;
            }
            ShowcaseSignal.emit();
        }
    }

    toggleItalic(): void {
        this.isItalic = !this.isItalic;
        if (this.text.element) {
            if (this.isItalic) {
                this.text.element.setFontStyle(TextFormat.ITALIC);
                this.text.fontStyle = TextFormat.ITALIC;
            } else {
                this.text.element.setFontStyle(TextFormat.NORMAL);
                this.text.fontStyle = TextFormat.NORMAL;
            }
            ShowcaseSignal.emit();
        }
    }
}
