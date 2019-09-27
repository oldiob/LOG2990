import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool/tool.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { Pencil } from 'src/services/tool/tool-options/pencil';
import { Brush } from 'src/services/tool/tool-options/brush';
import { Bucket } from 'src/services/tool/tool-options/bucket';
import { SVGService } from 'src/services/svg/svg.service';

@Component({
    selector: 'app-tool-option',
    templateUrl: './tool-option.component.html',
    styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    thickness: number;
    currentlySelectedIndex: number;

    tools: ITool[];
    currentTool: ITool;

    constructor(private toolService: ToolService, rendererProvider: RendererProviderService, svgService: SVGService) {
        const pencil: Pencil = new Pencil(rendererProvider.renderer);
        const brush: Brush = new Brush(rendererProvider.renderer);
        const bucket: Bucket = new Bucket(svgService);

        this.tools = [pencil, brush, bucket];
        this.selectTool(pencil);
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
