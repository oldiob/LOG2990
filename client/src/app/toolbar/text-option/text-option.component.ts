import { Component, OnInit, ViewChild } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { TextTool } from 'src/services/tool/tool-options/text';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../subcomponent/showcase/showcase.component';
import { WidthComponent } from '../subcomponent/width/width.component';
import { TextFormat } from './text-format';

@Component({
    selector: 'app-text-option',
    templateUrl: './text-option.component.html',
    styleUrls: ['./text-option.component.scss', '../toolbar-option.scss'],
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

    private readonly FILE_LOCATION = '../../../../assets/images/';
    DEFAULT_SIZE = '15px';

    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    @ViewChild(WidthComponent, { static: true })
    widthComponent: WidthComponent;

    tip = 'Text (T)';
    images = new Map<ITool, string>([
        [this.text, 'text.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    isBold = false;
    isItalic = false;
    isAlignLeft = true;
    isAlignCenter = false;
    isAlignRight = false;

    currentFontFamily: string;

    fontFamilies: any[];

    constructor(private toolService: ToolService, private text: TextTool) {
        this.tools = [text];
        this.currentTool = this.tools[0];

        const NO_FONT = '';
        this.currentFontFamily = NO_FONT;
    }

    ngOnInit() {
        this.currentTool = this.text;
    }

    select(): void {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    selectFontSize(fontSize: string): void {
        this.text.fontSize = fontSize;
        if (this.text.element !== null) {
            this.text.element.setFontSize(fontSize);
        }
    }

    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        this.text.fontFamily = this.currentFontFamily;
        if (this.text.element !== null) {
            this.text.element.setFontFamily(fontFamily);
        }
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
        if (this.text.element !== null) {
            this.text.element.setTextAlign(textAlign);
        }
    }

    disableAlign(): void {
        this.isAlignLeft = false;
        this.isAlignCenter = false;
        this.isAlignRight = false;
    }

    toggleBold(): void {
        this.isBold = !this.isBold;
        if (this.text.element !== null) {
            if (this.isBold) {
                this.text.element.setFontWeight(TextFormat.BOLD);
                this.text.fontWeigth = TextFormat.BOLD;
            } else {
                this.text.element.setFontWeight(TextFormat.NORMAL);
                this.text.fontWeigth = TextFormat.NORMAL;
            }
        }
    }

    toggleItalic(): void {
        this.isItalic = !this.isItalic;
        if (this.text.element !== null) {
            if (this.isItalic) {
                this.text.element.setFontStyle(TextFormat.ITALIC);
                this.text.fontStyle = TextFormat.ITALIC;
            } else {
                this.text.element.setFontStyle(TextFormat.NORMAL);
                this.text.fontStyle = TextFormat.NORMAL;
            }
        }
    }
}
