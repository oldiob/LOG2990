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

    currentFontSize: string;
    currentFontFamily: string;
    currentFontStyle: string;
    currentFontWeight: string;
    currentTextAlign: string;
    fontFamilies: any[];

    constructor(private toolService: ToolService, private text: TextTool) {

        this.tools = [text];
        this.currentTool = this.tools[0];
        this.currentFontSize = this.DEFAULT_SIZE;
        this.currentFontStyle = this.EMPTYSTRING;
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
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    setWidth(width: number): void {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
        }
    }

    selectFontSize(fontSize: string): void {
        this.currentFontSize = fontSize;
        this.text.setFontSize(fontSize);
        this.text.fontSize = this.currentFontSize;
    }

    selectFontStyle(fontStyle: string): void {
        this.currentFontStyle = fontStyle;
        this.text.setFontStyle(fontStyle);
        this.text.fontStyle = this.currentFontStyle;
    }

    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        this.text.setFont(fontFamily);
        this.text.fontFamily = this.currentFontFamily;
    }

    selectTextAlign(textAlign: string): void {
        this.disableAlign();
        if (textAlign === 'start') {
            this.isAlignLeft = true;
        } else if (textAlign === 'middle') {
            this.isAlignCenter = true;
        } else if (textAlign === 'end') {
            this.isAlignRight = true;
        }
        this.text.setTextAlign(textAlign);
    }

    disableAlign() {
        this.isAlignLeft = false;
        this.isAlignCenter = false;
        this.isAlignRight = false;
    }

    toggleBold() {
        this.isBold = !this.isBold;
        if (this.isBold) {
            this.text.setFontWeight(this.BOLD);
            this.currentFontWeight = this.BOLD;
            this.text.fontWeigth = this.BOLD;
        } else {
            this.text.setFontWeight(this.NORMAL);
            this.currentFontWeight = this.NORMAL;
            this.text.fontWeigth = this.NORMAL;
        }
    }

    toggleItalic() {
        this.isItalic = !this.isItalic;
        if (this.isItalic) {
            this.text.setFontStyle(this.ITALIC);
            this.currentFontStyle = this.ITALIC;
            this.text.fontStyle = this.ITALIC;
        } else {
            this.text.setFontStyle(this.NORMAL);
            this.currentFontStyle = this.NORMAL;
            this.text.fontStyle = this.NORMAL;
        }
    }
}
