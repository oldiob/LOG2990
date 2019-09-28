import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool/tool.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { PencilService } from 'src/services/tool/tool-options/pencil';
import { BrushService } from 'src/services/tool/tool-options/brush';
import { BucketService } from 'src/services/tool/tool-options/bucket';
import { SVGService } from 'src/services/svg/svg.service';

@Component({
    selector: 'app-tool-option',
    templateUrl: './tool-option.component.html',
    styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    thickness: number;

    tools: ITool[];
    currentTool: ITool;

    constructor(private toolService: ToolService, rendererProvider: RendererProviderService, svgService: SVGService,
        private pencilService: PencilService,
        private brushService: BrushService,
        private bucketService: BucketService) {

        this.tools = [this.pencilService, this.brushService, this.bucketService];
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
        return this.FILE_LOCATION + tool.FILENAME;
    }
}
