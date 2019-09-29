import { Component, OnInit } from '@angular/core';
import { BlurTexture } from 'src/services/svg/element/texture/blur';
import { CircleTexture } from 'src/services/svg/element/texture/circle';
import { ITexture } from 'src/services/svg/element/texture/i-texture';
import { RectTexture } from 'src/services/svg/element/texture/rect';
import { BrushTool } from 'src/services/tool/tool-options/brush';
import { BucketTool } from 'src/services/tool/tool-options/bucket';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { PencilTool } from 'src/services/tool/tool-options/pencil';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
    selector: 'app-tool-option',
    templateUrl: './tool-option.component.html',
    styleUrls: ['./tool-option.component.scss', '../toolbar-option.scss'],
})
export class ToolOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    thickness: number;

    textures: ITexture[];
    tools: ITool[];
    currentTool: ITool;

    constructor(private toolService: ToolService, pencil: PencilTool, brush: BrushTool, bucket: BucketTool) {
        this.textures = [new BlurTexture(), new CircleTexture(), new RectTexture()];

        brush.texture = this.textures[2];

        this.tools = [ pencil, brush, bucket];
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
