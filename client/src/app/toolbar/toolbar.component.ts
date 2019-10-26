import { ComponentType } from '@angular/cdk/portal';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NewDrawingComponent } from 'src/app/new-drawing/new-drawing.component';
import { CmdService } from 'src/services/cmd/cmd.service';
import { DialogService } from 'src/services/dialog/dialog.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ImportComponent } from '../import/import.component';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
import { GridOptionComponent } from './grid-option/grid-option.component';
import { SaveOptionComponent } from './save-option/save-option.component';
import { SelectorOptionComponent } from './selector-option/selector-option.component';
import { ShapeOptionComponent } from './shape-option/shape-option.component';
import { TextOptionComponent } from './text-option/text-option.component';
import { ToolOptionComponent } from './tool-option/tool-option.component';
import { saveFile } from 'src/utils/filesystem';

declare type callback = () => void;

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

    @ViewChild(GridOptionComponent, { static: true })
    gridOption: GridOptionComponent;

    @ViewChild(TextOptionComponent, { static: true })
    textOption: TextOptionComponent;

    options: IOption<any>[];

    currentOption: IOption<any>;
    isDialogOpened = false;
    optionDisplayed: boolean;

    constructor(
        public dialogService: DialogService) { }

    ngOnInit() {
        this.options = [this.toolOption, this.shapeOption, this.bucketOption, this.selectorOption, this.gridOption, this.textOption];
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
        const ref: MatDialogRef<GalleryOptionComponent> | null = this.openDialog(GalleryOptionComponent);
        if (ref) {
            ref.componentInstance.load();
        }
    }

    newDrawingOption(): void {
        this.openDialog(NewDrawingComponent);
    }

    openImportOption(): void {
        this.openDialog(ImportComponent);
    }

    saveImage(): void {
        saveFile();
        //this.openDialog(SaveOptionComponent);
    }

    private openDialog(component: ComponentType<any>): MatDialogRef<any> | null {
        if (!this.isDialogOpened) {
            const ref: any = this.dialogService.open(component);
            if (ref) {
                this.isDialogOpened = true;
                ref.afterClosed().subscribe(() => {
                    this.isDialogOpened = false;
                });
                return ref;
            }
        }
        return null;
    }

    getImage(option: IOption<any>): string {
        return this.FILE_LOCATION + option.getImage();
    }


    private getComposedKey(event: KeyboardEvent): string {
        let keys = '';
        if (event.ctrlKey) {
            keys += 'C-';
        }
        if (event.shiftKey) {
            keys += 'S-';
        }
        keys += event.key.toLowerCase();
        return keys;
    }

    @HostListener('window: keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (this.isDialogOpened) {
            return;
        }
        const kbd: { [id: string]: callback } = {
            'C-o': () => { this.newDrawingOption(); },
            'C-s': () => { this.saveImage(); },
            'C-g': () => { this.openGalleryOption(); }
        };
        const keys: string = this.getComposedKey(event);
        if (kbd[keys]) {
            event.preventDefault();
            const func: callback = kbd[keys];
            func();
        }
    }

    @HostListener('window: keyup', ['$event'])
    onKeyUp(event: KeyboardEvent): void {
        if (this.isDialogOpened) {
            return;
        }
        const kbd: { [id: string]: callback } = {
            c: () => { this.toolOption.selectTool(this.toolOption.tools[0]); },
            w: () => { this.toolOption.selectTool(this.toolOption.tools[1]); },
            l: () => { this.toolOption.selectTool(this.toolOption.tools[2]); },
            b: () => { this.bucketOption.selectTool(this.bucketOption.tools[0]); },
            i: () => { this.bucketOption.selectTool(this.bucketOption.tools[1]); },
            1: () => { this.shapeOption.selectTool(this.shapeOption.tools[0]); },
            2: () => { this.shapeOption.selectTool(this.shapeOption.tools[1]); },
            3: () => { this.shapeOption.selectTool(this.shapeOption.tools[2]); },
            'C-z': () => { CmdService.undo(); },
            'C-S-z': () => { CmdService.redo(); }
        };

        const keys: string = this.getComposedKey(event);
        if (kbd[keys]) {
            const func: callback = kbd[keys];
            func();
        }
    }
}
