import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NewDrawingComponent } from 'src/app/new-drawing/new-drawing.component';
import { DialogService } from 'src/services/dialog/dialog.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
import { SaveOptionComponent } from './save-option/save-option.component';
import { SelectorOptionComponent } from './selector-option/selector-option.component';
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

    @ViewChild(SelectorOptionComponent, { static: true })
    selectorOption: SelectorOptionComponent;

    options: IOption<any>[];

    currentOption: IOption<any>;
    isDialogOpened: boolean;
    optionDisplayed: boolean;

    constructor(
        private dialogService: DialogService) { }

    ngOnInit() {
        this.options = [this.toolOption, this.shapeOption, this.bucketOption, this.selectorOption];
        this.selectOption(this.toolOption);
        this.optionDisplayed = false;
        this.isDialogOpened = false;
    }

    selectOption(option: IOption<any>): void {
        this.optionDisplayed = this.optionDisplayed === true ? this.currentOption !== option : true;
        this.currentOption = option;
        this.currentOption.select();
    }

    openGalleryOption(): void {
        const ref: MatDialogRef<GalleryOptionComponent> = this.dialogService.open(GalleryOptionComponent);
        ref.componentInstance.load();
    }

    newDrawingOption(): void {
        if (!this.isDialogOpened) {
            this.isDialogOpened = true;
            this.dialogService.open(NewDrawingComponent).afterClosed().subscribe(() => {
                this.isDialogOpened = false;
            });
        }
    }

    saveImage(): void {
        this.dialogService.open(SaveOptionComponent);
    }

    getImage(option: IOption<any>): string {
        return this.FILE_LOCATION + option.getImage();
    }

    @HostListener('window: keyup', ['$event'])
    pressKeyboard(event: KeyboardEvent): void {
        if (this.dialogService.keyEnable) {
            const kbd: { [id: string]: callback } = {
                c: () => { this.toolOption.selectTool(this.toolOption.tools[0]); },
                w: () => { this.toolOption.selectTool(this.toolOption.tools[1]); },
                l: () => { this.toolOption.selectTool(this.toolOption.tools[2]); },
                b: () => { this.bucketOption.selectTool(this.bucketOption.tools[0]); },
                i: () => { this.bucketOption.selectTool(this.bucketOption.tools[1]); },
                1: () => { this.shapeOption.selectTool(this.shapeOption.tools[0]); },
                2: () => { this.shapeOption.selectTool(this.shapeOption.tools[1]); },
                3: () => { this.shapeOption.selectTool(this.shapeOption.tools[2]); },
                'C-o': () => { if (this.dialogService.isClosed) {this.newDrawingOption(); } },
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
}
