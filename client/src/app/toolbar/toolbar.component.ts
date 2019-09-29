import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { ShapeOptionComponent } from './shape-option/shape-option.component';
import { ToolOptionComponent } from './tool-option/tool-option.component';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';

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

    @ViewChild(ToolOptionComponent, { static: true })
    toolOption: ToolOptionComponent;

    @ViewChild(BucketOptionComponent, { static: true })
    bucketOption: BucketOptionComponent;

    @ViewChild(ShapeOptionComponent, { static: true })
    shapeOption: ShapeOptionComponent;

    options: any[];

    currentOption: any;
    optionDisplayed: boolean;

    constructor(
        private paletteService: PaletteService,
        private dialogService: DialogService,
        private drawAreaService: DrawAreaService) {

    }

    ngOnInit() {
        this.options = [this.toolOption,this.shapeOption, this.bucketOption];

        this.currentOption = this.toolOption;
        this.optionDisplayed = false;
    }

    selectOption(option: any): void {
        this.optionDisplayed = this.optionDisplayed === true ? this.currentOption !== option : true;
        this.currentOption = option;
        this.currentOption.selectTool(this.currentOption.currentTool);
    }

    newDrawingOption() {
        this.dialogService.openNewDrawing();
    }
    saveImage() {
        this.paletteService.selectPrimary(Math.floor(Math.random() * 4294967296));
        this.paletteService.selectSecondary(Math.floor(Math.random() * 4294967296));
        this.drawAreaService.save();
    }

    getImage(option: any) {
        return this.FILE_LOCATION + option.currentTool.BUTTON_FILENAME;
    }
}
