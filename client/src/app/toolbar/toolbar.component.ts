import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { ShapeOptionComponent } from './shape-option/shape-option.component';
import { ToolOptionComponent } from './tool-option/tool-option.component';

declare type callback = () => void;
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

    @ViewChild(ColorOptionComponent, { static: true })
    colorOption: ColorOptionComponent;

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
        private drawAreaService: DrawAreaService) { }

    ngOnInit() {
        this.options = [this.toolOption, this.shapeOption, this.bucketOption];
        this.selectOption(this.toolOption);
    }

    selectOption(option: any): void {
        this.optionDisplayed = this.optionDisplayed === true ? this.currentOption !== option : true;
        this.currentOption = option;
        if (option !== this.colorOption) {
            this.currentOption.selectTool(this.currentOption.currentTool);
        }
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
        let imageLocation = '';
        if (option !== this.colorOption) {
            imageLocation = this.FILE_LOCATION + option.currentTool.BUTTON_FILENAME;
        }
        return imageLocation;
    }

    private rn(): number {
        return Math.trunc(Math.random() * 255);
    }

    @HostListener('window: keypress', ['$event'])
    @HostListener('window: keydown', ['$event'])
    pressKeyboard(event: KeyboardEvent): void {
        const kbd: { [id: string]: callback } = {
            c: () => {this.toolOption.selectTool(this.toolOption.tools[0]); },
            w: () => { this.toolOption.selectTool(this.toolOption.tools[1]); },
            b: () => {this.bucketOption.selectTool(this.bucketOption.currentTool); },
            1: () => { this.shapeOption.selectTool(this.shapeOption.tools[0]);  },
            'C-o': () => {this.newDrawingOption(); },
            'C-s': () => {this.saveImage();  },
        };
        let keys = '';
        if (event.ctrlKey) {
            event.preventDefault();
            keys += 'C-';
        }
        keys += event.key;
        if (kbd[keys]) {
            const func: callback = kbd[keys];
            func();
        }
    }
}
