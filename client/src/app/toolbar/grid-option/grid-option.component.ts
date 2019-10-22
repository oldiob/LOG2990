import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridService } from 'src/services/grid/grid.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { GridTool } from 'src/services/tool/tool-options/grid';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { GridType, ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
@Component({
    selector: 'app-grid-option',
    templateUrl: './grid-option.component.html',
    styleUrls: ['./grid-option.component.scss', '../toolbar-option.scss'],
})
export class GridOptionComponent implements OnInit, IOption<ITool> {

    @ViewChild(ShowcaseComponent, { static: true })
    showcase: ShowcaseComponent;

    private readonly FILE_LOCATION = '../../../../assets/images/';

       images = new Map<ITool, string>([
        [this.gridTool, 'grid.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;
     backgroundColor = '#ffffffff';

    isShowPrimary: boolean;
    isShowSecondary: boolean;
    primaryColor: string;
    secondaryColor: string;
    height: number;
    width: number;
    GridType = GridType;
    gridForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private paletteService: PaletteService,
        private toolService: ToolService,
        public gridService: GridService,
        private gridTool: GridTool) {
        this.tools = [gridTool];
        this.currentTool = this.tools[0];
        this.gridService = new GridService();

    }

    ngOnInit() {
        this.isShowPrimary = false;
        this.isShowSecondary = false;
        this.createGridForm();
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

    gridOn(): void {
        this.gridService.opacity = 1.0;
    }

    gridOff(): void {
        this.gridService.opacity = 0.2;
    }

    getFilesource(tool: ITool): string {
         return this.FILE_LOCATION + this.images.get(tool) as string;
    }

    togglePrimaryColorPicker() {
        this.isShowSecondary = false;
        this.isShowPrimary = !this.isShowPrimary;
    }

    toggleSecondaryColorPicker() {
        this.isShowPrimary = false;
        this.isShowSecondary = !this.isShowSecondary;
    }

    onSwap() {
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

    onGridTypeChange(): void {
        if (this.currentTool instanceof GridTool) {
            this.currentTool.gridType = this.gridForm.controls.gridType.value;

            switch (this.currentTool.gridType) {
                case 0:
                    console.log('OFF', this.gridOff());
                    this.gridOff();
                    break;
                case 1:
                    console.log('ON', this.gridOn());
                    this.gridOn();
                    break;
            }
        }
    }

    private createGridForm(): void {
        const DEFAULT_GRID_TYPE = GridType.Off;
        const validators = [Validators.min(0), Validators.required];

        this.gridForm = this.formBuilder.group({
            gridType: [DEFAULT_GRID_TYPE, validators],
        });
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
