import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
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

    @ViewChild(ToolOptionComponent, { static: true })
    toolOption: ToolOptionComponent;

    @ViewChild(BucketOptionComponent, { static: true })
    bucketOption: BucketOptionComponent;

    @ViewChild(ShapeOptionComponent, { static: true })
    shapeOption: ShapeOptionComponent;

    @ViewChild(GalleryOptionComponent, { static: true })
    galleryOption: GalleryOptionComponent;

    options: IOption<any>[];

    currentOption: IOption<any>;
    isDialogOpened = false;
    optionDisplayed: boolean;

    constructor(
        private dialogService: DialogService,
        private drawAreaService: DrawAreaService) { }

    ngOnInit() {
        this.options = [this.toolOption, this.shapeOption, this.bucketOption, this.galleryOption];
        this.selectOption(this.toolOption);
        this.optionDisplayed = false;
    }

    selectOption(option: IOption<any>): void {
        this.galleryOption.clearFilters();
        this.optionDisplayed = this.optionDisplayed === true ? this.currentOption !== option : true;
        this.currentOption = option;
        this.currentOption.select();
    }

    newDrawingOption(): void {
        if (!this.isDialogOpened) {
            this.isDialogOpened = true;
            this.dialogService.openNewDrawing().afterClosed().subscribe(() => {
                this.isDialogOpened = false;
            });
        }
    }

    saveImage(): void {
        this.drawAreaService.save();
    }

    getImage(option: IOption<any>): string {
        return this.FILE_LOCATION + option.getImage();
    }

    @HostListener('window: keydown', ['$event'])
    preventDefaults(event: KeyboardEvent) {
        event.preventDefault();
    }

    @HostListener('window: keyup', ['$event'])
    pressKeyboard(event: KeyboardEvent): void {
        const kbd: { [id: string]: callback } = {
            c: () => { this.toolOption.selectTool(this.toolOption.tools[0]); },
            w: () => { this.toolOption.selectTool(this.toolOption.tools[1]); },
            b: () => { this.bucketOption.selectTool(this.bucketOption.currentTool); },
            1: () => { this.shapeOption.selectTool(this.shapeOption.tools[0]); },
            'C-o': () => { this.newDrawingOption(); },
            'C-s': () => { this.saveImage(); },
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
