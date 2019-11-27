import { Component, OnInit } from '@angular/core';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { InkTool } from 'src/services/tool/tool-options/ink';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

@Component({
    selector: 'app-angle',
    templateUrl: './angle.component.html',
    styleUrls: ['./angle.component.scss'],
})
export class AngleComponent implements OnInit {
    readonly MAX_ANGLE: number = 360.0;
    readonly MIN_ANGLE: number = 0;

    private mAngle: number;

    constructor(private toolService: ToolService) {
        this.mAngle = 0.0;
    }

    ngOnInit() {
        //
    }

    get angle(): number {
        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof StampTool || currentTool instanceof InkTool) {
            this.mAngle = currentTool.angle;
            ShowcaseSignal.emit();
        }

        return this.mAngle;
    }

    set angle(angle: number) {
        if (angle <= this.MAX_ANGLE && angle >= this.MIN_ANGLE ) {
            this.mAngle = angle;
        }

        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof StampTool || currentTool instanceof InkTool) {
            currentTool.angle = angle;
            ShowcaseSignal.emit();
        }
    }
}
