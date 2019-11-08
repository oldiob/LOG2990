import { ComponentType } from '@angular/cdk/portal';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CmdService } from 'src/services/cmd/cmd.service';
import { DialogService } from 'src/services/dialog/dialog.service';
import { KeyService } from 'src/services/key/key.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ImportComponent } from '../import/import.component';
import { NewDrawingComponent } from '../popups/new-drawing/new-drawing.component';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
import { GridOptionComponent } from './grid-option/grid-option.component';
import { SaveOptionComponent } from './save-option/save-option.component';
import { SelectorOptionComponent } from './selector-option/selector-option.component';
import { ShapeOptionComponent } from './shape-option/shape-option.component';
import { TextOptionComponent } from './text-option/text-option.component';
import { ToolOptionComponent } from './tool-option/tool-option.component';
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
    isDialogOpened: boolean;
    optionDisplayed: boolean;

    isEmptyUndos: boolean;
    isEmptyRedos: boolean;

    constructor(public keyService: KeyService, public dialogService: DialogService) {
        this.isDialogOpened = false;
    }

    ngOnInit() {
        this.options = [this.toolOption, this.shapeOption, this.bucketOption, this.selectorOption, this.gridOption, this.textOption];
        this.selectOption(this.toolOption);
        this.optionDisplayed = false;

        this.subscribeUndoRedo();
    }

    private subscribeUndoRedo() {
        CmdService.isEmptyUndosObservable.subscribe((isEmpty: boolean) => {
            this.isEmptyUndos = isEmpty;
        });
        CmdService.isEmptyRedosObservable.subscribe((isEmpty: boolean) => {
            this.isEmptyRedos = isEmpty;
        });
    }

    selectOption(option: IOption<any>): void {
        this.optionDisplayed = this.optionDisplayed === true ? this.currentOption !== option : true;
        this.currentOption = option;
        this.currentOption.select();
        this.dialogService.closeColorForms();
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
        // const fileData = JSON.stringify(serializeDrawArea(MyInjector.get(SVGService)));
        // saveFile('lol_file', fileData);

        this.openDialog(SaveOptionComponent);
    }

    private openDialog(component: ComponentType<any>): MatDialogRef<any> | null {
        if (!this.isDialogOpened) {
            const ref: any = this.dialogService.openDialog(component);
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

    undo(): void {
        if (!this.isEmptyUndos) {
            CmdService.undo();
        }
    }

    redo(): void {
        if (!this.isEmptyRedos) {
            CmdService.redo();
        }
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

    disableCurrentText() {
        this.keyService.disableTextEdit();
        this.keyService.enableShortcut();
    }

    @HostListener('window: keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (this.isDialogOpened || !this.keyService.isKeysEnabled) {
            return;
        }
        const kbd: { [id: string]: callback } = {
            'C-o': () => { this.newDrawingOption(); },
            'C-s': () => { this.saveImage(); },
            'C-g': () => { this.openGalleryOption(); },
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
        if (this.isDialogOpened || !this.keyService.isKeysEnabled) {
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
            'C-S-z': () => { CmdService.redo(); },
            g: () => this.gridOption.toggleGrid(),
            '+': () => this.gridOption.addStep(),
            'S-+': () => this.gridOption.addStep(),
            '-': () => this.gridOption.reduceStep(),
        };

        const keys: string = this.getComposedKey(event);
        if (kbd[keys]) {
            const func: callback = kbd[keys];
            func();
        }
    }
}
