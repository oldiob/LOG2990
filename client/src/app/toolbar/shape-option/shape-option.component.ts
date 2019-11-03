import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsShapeTool, TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { EllipseTool } from 'src/services/tool/tool-options/ellipse';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { PolygonTool } from 'src/services/tool/tool-options/polygon';
import { RectangleTool } from 'src/services/tool/tool-options/rectangle';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';

@Component({
    selector: 'app-shape-option',
    templateUrl: './shape-option.component.html',
    styleUrls: ['./shape-option.component.scss', '../toolbar-option.scss'],
})
export class ShapeOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    TraceType = TraceType;

    TOOL_TIP = 'Rectangle';
    images = new Map<ITool, string>([
        [this.rectangleTool, 'rectangle.png'],
        [this.ellipseTool, 'ellipse.png'],
        [this.polygonTool, 'polygon.png'],
    ]);

    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    tools: AbsShapeTool[];
    currentTool: AbsShapeTool;
    shapeForm: FormGroup;
    isPolygon = false;

    constructor(
        private toolService: ToolService,
        private rectangleTool: RectangleTool,
        private ellipseTool: EllipseTool,
        private polygonTool: PolygonTool,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.tools = [this.rectangleTool, this.ellipseTool, this.polygonTool];
        this.currentTool = this.tools[0];
        this.createForm();
        this.updateShowcase();
    }

    select() {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: AbsShapeTool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;

        this.updateShowcase();
        if (this.currentTool instanceof PolygonTool) {
            this.isPolygon = true;
        } else {
            this.isPolygon = false;
        }
    }

    getFilesource(tool: AbsShapeTool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    private createForm(): void {
        const DEFAULT_TRACE_TYPE = TraceType.FillAndBorder;
        const validators = [Validators.min(0), Validators.required];

        this.shapeForm = this.formBuilder.group({
            traceType: [DEFAULT_TRACE_TYPE, validators],
            polygonNSides: [this.polygonTool.nSides, validators],
        });
    }

    setWidth(width: number): void {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
            this.updateShowcase();
        }
    }

    onTraceTypeChange(): void {
        this.currentTool.traceType = this.shapeForm.controls.traceType.value;

        this.updateShowcase();
    }

    updateShowcase(): void {
        this.showcase.display(this.currentTool);
    }
}
