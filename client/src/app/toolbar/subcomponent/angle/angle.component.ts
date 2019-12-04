import { Component, OnInit } from '@angular/core';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';
import { InkTool } from 'src/services/tool/tool-options/ink';

@Component({
    selector: 'app-angle',
    templateUrl: './angle.component.html',
    styleUrls: ['./angle.component.scss'],
})
export class AngleComponent implements OnInit {
    private readonly MAX_ANGLE: number = 360.0;
    private readonly MIN_ANGLE: number = 0;
    private readonly DEFAULT_ANGLE: number = 0.0;

    private currentAngle: number;

    constructor(private toolService: ToolService) {
        this.currentAngle = this.DEFAULT_ANGLE;
    }

    ngOnInit() {
        //
    }

    get angle(): number {
        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof StampTool || currentTool instanceof InkTool) {
            this.currentAngle = currentTool.angle;
            ShowcaseSignal.emit();
        }

        return this.currentAngle;
    }

    set angle(angle: number) {
        if (angle <= this.MAX_ANGLE && angle >= this.MIN_ANGLE) {
            this.currentAngle = angle;
        }

        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof StampTool || currentTool instanceof InkTool) {
            currentTool.angle = angle;
            ShowcaseSignal.emit();
        }
    }
}
