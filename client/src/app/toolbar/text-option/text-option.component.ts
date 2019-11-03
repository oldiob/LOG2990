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

    currentFontSize: string;
    currentFontFamily: string;
    currentFontStyle: string;
    currentTextAlign: string;
    fontFamilies: any[];
    imageTextAlign: any[];
    imageFontStyle: any[];

    constructor(private toolService: ToolService, private text: TextTool) {

        this.tools = [text];
        this.currentTool = this.tools[0];
        this.currentFontSize = this.EMPTYSTRING;
        this.currentFontStyle = this.EMPTYSTRING;
        this.imageTextAlign = [] = [
            { png: './assets/images/left.png', textAlign: 'left'},
            { png: './assets/images/center.png', textAlign: 'center'},
            { png: './assets/images/right.png', textAlign: 'right'},
        ];
        this.imageFontStyle = [] = [
            { png: './assets/images/bold.png', fontStyle: 'bold'},
            { png: './assets/images/normal.png', fontStyle: 'normal'},
            { png: './assets/images/italic.png', fontStyle: 'italic'},
        ];
        this.fontFamilies = [] = [
        {value: 0, fontFamily: 'Arial'},
        {value: 1, fontFamily: 'Times New Roman'},
        {value: 2, fontFamily: 'Roboto'},
        {value: 3, fontFamily: 'Courrier New'},
        {value: 4, fontFamily: 'Verdana'},
        {value: 5, fontFamily: 'Garamond'},
        {value: 6, fontFamily: 'Bookman'},
        {value: 7, fontFamily: 'Comic Sans MS'},
        {value: 8, fontFamily: 'Impact'},
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
        this.text.fontSize = this.currentFontSize;
    }

    selectFontStyle(fontStyle: string): void {
        this.currentFontStyle = fontStyle;
        this.text.fontStyle = this.currentFontStyle;
    }

    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        this.text.fontFamily = this.currentFontFamily;
    }

    selectTextAlign(textAlign: string): void {
        this.currentTextAlign = textAlign;
        this.text.textAlign = this.currentTextAlign;
    }
}
