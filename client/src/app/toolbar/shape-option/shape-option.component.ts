import { Component, OnInit } from '@angular/core';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { RectangleTool } from 'src/services/tool/tool-options/rectangle';

@Component({
    selector: 'app-shape-option',
    templateUrl: './shape-option.component.html',
    styleUrls: ['./shape-option.component.scss', '../toolbar-option.scss']
})
export class ShapeOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    thickness: number;

    tools: ITool[];
    currentTool: ITool;

    constructor(private toolService: ToolService, rectangleService: RectangleTool) {

        this.tools = [rectangleService];
        this.selectTool(this.tools[0]);
    }

    ngOnInit() {
        //
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + tool.BUTTON_FILENAME;
    }

}
