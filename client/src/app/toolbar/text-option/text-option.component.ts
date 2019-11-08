import { Component, OnInit, ViewChild } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { TextTool } from 'src/services/tool/tool-options/text';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { WidthComponent } from '../width/width.component';

@Component({
    selector: 'app-text-option',
    templateUrl: './text-option.component.html',
    styleUrls: ['./text-option.component.scss', '../toolbar-option.scss'],
})
export class TextOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    EMPTYSTRING = '';
    DEFAULT_SIZE = '15px';
    BOLD = 'bold';
    NORMAL = 'normal';
    ITALIC = 'italic';
    ALIGNLEFT = 'start';
    ALIGNCENTER = 'middle';
    ALIGNRIGHT = 'end';
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

        this.fontFamilies = [] = [
            { value: 0, fontFamily: 'Arial' },
            { value: 1, fontFamily: 'Times New Roman' },
            { value: 2, fontFamily: 'Lucida Console' },
            { value: 3, fontFamily: 'Verdana' },
            { value: 4, fontFamily: 'Garamond' },
            { value: 5, fontFamily: 'Comic Sans MS' },
            { value: 6, fontFamily: 'Lucida Sans Unicode' },
            { value: 7, fontFamily: 'Tahoma' },
            { value: 8, fontFamily: 'Courier' },
            { value: 9, fontFamily: 'Trebuchet MS' },
            { value: 10, fontFamily: 'Palatino Linotype' },
        ];
        this.currentFontFamily = this.EMPTYSTRING;
    }

    ngOnInit() {
        this.currentTool = this.text;
    }

    select() {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
        this.showcase.display(this.currentTool);
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    selectFontSize(fontSize: string): void {
        if (this.text.element !== null) {
            this.text.element.setFontSize(fontSize);
        }
    }

    selectFontStyle(fontStyle: string): void {
        if (this.text.element !== null) {
            this.text.element.setFontStyle(fontStyle);
        }
    }

    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        if (this.text.element !== null) {
            this.text.element.setFontFamily(fontFamily);
        }
    }

    selectTextAlign(textAlign: string): void {
        this.disableAlign();
        if (textAlign === this.ALIGNLEFT) {
            this.isAlignLeft = true;
        } else if (textAlign === this.ALIGNCENTER) {
            this.isAlignCenter = true;
        } else if (textAlign === this.ALIGNRIGHT) {
            this.isAlignRight = true;
        }
        if (this.text.element !== null) {
            this.text.element.setTextAlign(textAlign);
        }
    }

    disableAlign() {
        this.isAlignLeft = false;
        this.isAlignCenter = false;
        this.isAlignRight = false;
    }

    toggleBold() {
        this.isBold = !this.isBold;
        if (this.text.element !== null) {
            if (this.isBold) {
                this.text.element.setFontWeight(this.BOLD);
            } else {
                this.text.element.setFontWeight(this.NORMAL);
            }
        }
    }

    toggleItalic() {
        this.isItalic = !this.isItalic;
        if (this.text.element !== null) {
            if (this.isItalic) {
                this.text.element.setFontStyle(this.ITALIC);
            } else {
                this.text.element.setFontStyle(this.NORMAL);
            }
    }
}
}
