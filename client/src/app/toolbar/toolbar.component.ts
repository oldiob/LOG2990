import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool/tool.service';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { DialogService } from "src/services/dialog/dialog.service"
import { PaletteService } from 'src/services/palette/palette.service';

export enum OptionType {
    TOOL = 0,
}

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    private FILE_LOCATION = '../../../assets/images/';

    currentDisplayedOption: OptionType;
    optionDisplayed: boolean;

    constructor(
        private paletteService: PaletteService,
        private dialogService: DialogService,
        private drawAreaService: DrawAreaService) {
        this.currentDisplayedOption = OptionType.TOOL;
        this.optionDisplayed = false;
    }

    ngOnInit() {
        //
    }

    private displayOption(optionType: OptionType): void {
        this.optionDisplayed = this.optionDisplayed === true ? this.currentDisplayedOption !== optionType : true;
        this.currentDisplayedOption = optionType;
    }

    newDrawingOption() {
        this.dialogService.openNewDrawing();
    }
    saveImage() {
        this.paletteService.selectPrimary(Math.floor(Math.random() * 4294967296));
        this.paletteService.selectSecondary(Math.floor(Math.random() * 4294967296));
        this.drawAreaService.save();
    }
}
