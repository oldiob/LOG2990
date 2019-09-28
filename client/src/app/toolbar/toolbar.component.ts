import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { DialogService } from "src/services/dialog/dialog.service"
import { PaletteService } from 'src/services/palette/palette.service';
import { ToolOptionComponent } from './tool-option/tool-option.component';
import { ShapeOptionComponent } from './shape-option/shape-option.component';

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

    @ViewChild(ToolOptionComponent, {static: true})
    toolOption: ToolOptionComponent;

    @ViewChild(ShapeOptionComponent, {static: true})
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
        this.options = [ this.toolOption, this.shapeOption ];

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
        this.paletteService.selectPrimary(this.rn(), this.rn(), this.rn(), this.rn());
        this.paletteService.selectSecondary(this.rn(), this.rn(), this.rn(), this.rn());
        this.drawAreaService.save();
    }

    getImage(option: any) {
        return this.FILE_LOCATION + option.currentTool.FILENAME;
    }

    private rn(): number {
        return Math.trunc(Math.random() * 255);
    }
}
