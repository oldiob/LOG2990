import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { TextTool } from 'src/services/tool/tool-options/text';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
    selector: 'app-text-option',
    templateUrl: './text-option.component.html',
    styleUrls: ['./text-option.component.scss', '../toolbar-option.scss'],
})
export class TextOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    tip = 'Text (T)';
    images = new Map<ITool, string>([
        [this.text, 'text.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    currentFontSize: string;
    currentFontFamily: string;
    currentFontStyle: string;

    constructor(private toolService: ToolService, private text: TextTool) {

        this.tools = [text];
        this.currentTool = this.tools[0];
        this.currentFontFamily = '';
        this.currentFontSize = '';
        this.currentFontStyle = '';
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

    selectFontSize(fontSize: string): void {
        this.currentFontSize = fontSize;
        this.text.fontSize = this.currentFontSize;
        // this.showcase.display(this.currentTool);
    }
    selectFontStyle(fontStyle: string): void {
        this.currentFontStyle = fontStyle;
        this.text.fontStyle = this.currentFontStyle;
        // this.showcase.display(this.currentTool);
    }
    selectFontFamily(fontFamily: string): void {
        this.currentFontFamily = fontFamily;
        this.text.fontFamily = this.currentFontFamily;
        // this.showcase.display(this.currentTool);
    }
}
