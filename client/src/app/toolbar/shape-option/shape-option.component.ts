import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IShapeTool, TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { RectangleTool } from 'src/services/tool/tool-options/rectangle';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';

@Component({
    selector: 'app-shape-option',
    templateUrl: './shape-option.component.html',
    styleUrls: ['./shape-option.component.scss', '../toolbar-option.scss'],
})
export class ShapeOptionComponent implements OnInit {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    TraceType = TraceType;
    traces: TraceType;

    @ViewChild(ShowcaseComponent, {static: true})
    showcase: ShowcaseComponent;

    tools: IShapeTool[];
    currentTool: IShapeTool;
    shapeForm: FormGroup;

    constructor(
        private toolService: ToolService,
        private rectangleTool: RectangleTool,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.tools = [this.rectangleTool];
        this.currentTool = this.tools[0];
        this.createForm();

        this.showcase.display(this.currentTool);
    }

    selectTool(tool: IShapeTool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;

        this.showcase.display(this.currentTool);
    }

    getFilesource(tool: IShapeTool): string {
        return this.FILE_LOCATION + tool.BUTTON_FILENAME;
    }

    private createForm() {
        const DEFAULT_TRACE_TYPE = TraceType.FillAndBorder;
        const validators = [Validators.min(0), Validators.required];

        this.shapeForm = this.formBuilder.group({
            traceType: [DEFAULT_TRACE_TYPE, validators],
        });
    }

    setWidth(width: number) {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
            this.showcase.display(this.currentTool);
        }
    }

    onTraceTypeChange() {
        this.currentTool.traceType = this.shapeForm.controls.traceType.value;

        this.showcase.display(this.currentTool);
    }
}
