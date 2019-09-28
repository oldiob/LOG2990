import { Component, OnInit } from '@angular/core';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGService } from 'src/services/svg/svg.service';
import { Rectangle } from 'src/services/tool/tool-options/rectangle';

@Component({
    selector: 'app-shape-option',
    templateUrl: './shape-option.component.html',
    styleUrls: ['./shape-option.component.scss']
})
export class ShapeOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    thickness: number;
    currentlySelectedIndex: number;

    tools: ITool[];
    currentTool: ITool;

    constructor(private toolService: ToolService, rendererProvider: RendererProviderService, svgService: SVGService) {
        const rectangle: Rectangle = new Rectangle(rendererProvider.renderer);

        this.tools = [rectangle];
        this.selectTool(rectangle);
    }

    ngOnInit() {
        //
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + tool.FILENAME;
    }

}
