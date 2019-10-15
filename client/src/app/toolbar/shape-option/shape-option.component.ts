import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { IShapeTool, TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { EllipseTool } from 'src/services/tool/tool-options/ellipse';
import { RectangleTool } from 'src/services/tool/tool-options/rectangle';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';

@Component({
    selector: 'app-shape-option',
    templateUrl: './shape-option.component.html',
    styleUrls: ['./shape-option.component.scss', '../toolbar-option.scss'],
})
export class ShapeOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    TraceType = TraceType;

    images = new Map<ITool, string>([
        [this.rectangleTool, 'rectangle.png'],
        [this.ellipseTool, 'ellipse.png'],
    ]);

    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    tools: IShapeTool[];
    currentTool: IShapeTool;
    shapeForm: FormGroup;

    isShowPrimary: boolean;
    isShowSecondary: boolean;
    primaryColor: string;
    secondaryColor: string;

    private isShift: boolean;

    constructor(
        private paletteService: PaletteService,
        private toolService: ToolService,
        private rectangleTool: RectangleTool,
        private ellipseTool: EllipseTool,
        private formBuilder: FormBuilder,
        private rendererProvider: RendererProviderService) {
    }

    ngOnInit() {
        this.tools = [this.rectangleTool, this.ellipseTool];
        this.currentTool = this.tools[0];
        this.createForm();

        this.showcase.display(this.currentTool);

        this.isShowPrimary = false;
        this.isShowSecondary = false;

        this.isShift = false;

        this.rendererProvider.renderer.listen(document, 'keydown', (event) => {
            if (event.shiftKey && !this.isShift) {
                this.isShift = true;
                this.currentTool.onShift(this.isShift);
            }
        });

        this.rendererProvider.renderer.listen(document, 'keyup', (event) => {
            if (!event.shiftKey && this.isShift) {
                this.isShift = false;
                this.currentTool.onShift(this.isShift);
            }
        });
    }

    select() {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: IShapeTool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;

        this.showcase.display(this.currentTool);
    }

    getFilesource(tool: IShapeTool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    private createForm(): void {
        const DEFAULT_TRACE_TYPE = TraceType.FillAndBorder;
        const validators = [Validators.min(0), Validators.required];

        this.shapeForm = this.formBuilder.group({
            traceType: [DEFAULT_TRACE_TYPE, validators],
        });
    }

    setWidth(width: number): void {
        if (this.currentTool.width !== null) {
            this.currentTool.width = width;
            this.showcase.display(this.currentTool);
        }
    }

    onTraceTypeChange(): void {
        this.currentTool.traceType = this.shapeForm.controls.traceType.value;

        this.showcase.display(this.currentTool);
    }

    togglePrimaryColorPicker(): void {
        this.isShowSecondary = false;
        this.isShowPrimary = !this.isShowPrimary;
    }

    toggleSecondaryColorPicker(): void {
        this.isShowPrimary = false;
        this.isShowSecondary = !this.isShowSecondary;
    }

    onSwap(): void {
        this.paletteService.swap();
        this.setPrimaryColor();
        this.setSecondary();
    }

    onColorPick() {
        this.isShowPrimary ? this.setPrimaryColor() : this.setSecondary();
        this.hideColorPicker();
    }

    hideColorPicker() {
        this.isShowPrimary ? this.isShowPrimary = false
            : this.isShowSecondary = false;
    }

    private setPrimaryColor() {
        return {
            'background-color': this.paletteService.getPrimary(),
        };
    }

    private setSecondary() {
        return {
            'background-color': this.paletteService.getSecondary(),
        };
    }
}
