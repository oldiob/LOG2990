import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { IShapeTool, TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { PolygonTool } from 'src/services/tool/tool-options/polygon';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { EllipseTool } from 'src/services/tool/tool-options/ellipse';
import { RectangleTool } from 'src/services/tool/tool-options/rectangle';

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

    tools: AbsShapeTool[];
    currentTool: AbsShapeTool;
    shapeForm: FormGroup;

    isShowPrimary: boolean;
    isShowSecondary: boolean;
    isPolygon: boolean;
    primaryColor: string;
    secondaryColor: string;

    constructor(
        private paletteService: PaletteService,
        private toolService: ToolService,
        private rectangleTool: RectangleTool,
        private ellipseTool: EllipseTool,
        public polygonTool: PolygonTool) {
    }

    ngOnInit() {
        this.tools = [this.rectangleTool, this.ellipseTool, this.polygonTool];
        this.currentTool = this.tools[0];
        this.showcase.display(this.currentTool);

        this.isShowPrimary = false;
        this.isShowSecondary = false;
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
        if (this.currentTool instanceof PolygonTool) {
            this.isPolygon = true;
        } else {
            this.isPolygon = false;
        }
        this.showcase.display(this.currentTool);
    }

    getFilesource(tool: AbsShapeTool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
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

    set polygonNSides(nSides: number) {
        this.polygonTool.nSides = nSides;
        this.showcase.display(this.currentTool);
    }

    get polygonNSides(): number {
        return this.polygonTool.nSides;
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
