import { Component, OnInit } from '@angular/core';
import { BucketTool } from 'src/services/tool/tool-options/bucket';
import { DropperTool } from 'src/services/tool/tool-options/dropper';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
    selector: 'app-bucket-option',
    templateUrl: './bucket-option.component.html',
    styleUrls: ['./bucket-option.component.scss', '../toolbar-option.scss'],
})
export class BucketOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    tip = 'Bucket (B)';
    images = new Map<ITool, string>([
        [this.bucket, 'bucket.png'],
        [this.dropper, 'dropper.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    constructor(
        private toolService: ToolService,
        private bucket: BucketTool,
        private dropper: DropperTool) {

        this.tools = [bucket, dropper];
        this.currentTool = this.tools[0];
    }

    ngOnInit() {
        this.currentTool = this.bucket;
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
}
