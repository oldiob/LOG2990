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

    currentDisplayedOption: OptionType;
    optionDisplayed: boolean;

    constructor(private toolService: ToolService, private paletteService: PaletteService) {
        this.currentDisplayedOption = OptionType.TOOL;
        this.optionDisplayed = false;
    }

    ngOnInit() {
        //
    }

    get primaryColor(): string {
        return this.paletteService.getPrimary();
    }

    get secondaryColor(): string {
        return this.paletteService.getSecondary();
    }

    get optionTopMargin(): number {
        return this.currentDisplayedOption * 48;
    }

    get toolCategory(): number {
        return this.toolService.getToolCategoryIndex();
    }

    chooseColor() {
        this.currentDisplayedOption = OptionType.COLOR;
        this.optionDisplayed = true;
    }

    chooseWorkingTool() {
        // TODO - Coverage me
        this.currentDisplayedOption = OptionType.TOOL;
        this.optionDisplayed = true;
        this.toolService.setToolCategoryIndex(0);
    }

    chooseShape() {
        // TODO - Coverage me
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
