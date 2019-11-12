import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITool, JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { LineTool } from 'src/services/tool/tool-options/line';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

@Component({
    selector: 'app-line-tool',
    templateUrl: './line-tool.component.html',
    styleUrls: ['./line-tool.component.scss'],
})
export class LineToolComponent implements OnInit {

    LineType = LineType;
    JunctionType = JunctionType;

    lineForm: FormGroup;
    junctionForm: FormGroup;

    constructor(private toolService: ToolService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.createJunctionForm();
        this.createLineForm();
    }

    onLineTypeChange(): void {
        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof LineTool) {
            console.log('LINE TYPE LOL', currentTool, this.lineForm.controls.lineType.value);
            currentTool.lineType = this.lineForm.controls.lineType.value;
            ShowcaseSignal.emit();

        }
    }

    onJunctionTypeChange(): void {
        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof LineTool) {
            currentTool.junctionType = this.junctionForm.controls.junctionType.value;
            ShowcaseSignal.emit();
        }
    }

    setJunctionWidth(width: number): void {
        const currentTool: ITool = this.toolService.currentTool;
        if (currentTool instanceof LineTool) {
            currentTool.junctionWidth = width;
            ShowcaseSignal.emit();
        }
    }

    private createLineForm(): void {
        const DEFAULT_LINE_TYPE = LineType.FullLine;
        const validators = [Validators.min(0), Validators.required];

        this.lineForm = this.formBuilder.group({
            lineType: [DEFAULT_LINE_TYPE, validators],
        });
    }

    private createJunctionForm(): void {
        const DEFAULT_JUNCTION_TYPE = JunctionType.Angle;
        const validators = [Validators.min(0), Validators.required];

        this.junctionForm = this.formBuilder.group({
            junctionType: [DEFAULT_JUNCTION_TYPE, validators],
        });
    }

}
