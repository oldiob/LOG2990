import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { ToolService } from 'src/services/tool/tool.service';

export enum OptionType {
    COLOR = 0,
    TOOL = 1,
    SHAPE = 2,
}

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

    private toolService: ToolService;
    private paletteService: PaletteService;

    currentDisplayedOption: OptionType;
    optionDisplayed: boolean;

    constructor(toolService: ToolService, paletteService: PaletteService) {
        this.toolService = toolService;
        this.paletteService = paletteService;
        this.currentDisplayedOption = OptionType.TOOL;
        this.optionDisplayed = false;
    }

    ngOnInit() {
        //
    }

    getPrimaryColor(): string {
        return this.paletteService.getPrimary();
    }

    getSecondaryColor(): string {
        return this.paletteService.getSecondary();
    }

    getOptionTopMargin(): number {
        return this.currentDisplayedOption * 48;
    }

    getToolCategory(): number {
        return this.toolService.getToolCategoryIndex();
    }

    chooseColor() {
        this.currentDisplayedOption = OptionType.COLOR;
        this.optionDisplayed = true;
    }

    chooseWorkingTool() {
        this.currentDisplayedOption = OptionType.TOOL;
        this.optionDisplayed = true;
        this.toolService.setToolCategoryIndex(0);
    }

    chooseShape() {
        this.currentDisplayedOption = OptionType.SHAPE;
        this.optionDisplayed = true;
        this.toolService.setToolCategoryIndex(1);
    }

    newDrawingOption() {
        //
    }
    saveImage() {
        //
    }
}
