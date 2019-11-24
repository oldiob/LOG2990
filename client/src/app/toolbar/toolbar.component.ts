import { ComponentType } from '@angular/cdk/portal';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ClipboardService } from 'src/services/clipboard/clipboard.service';
import { CmdService } from 'src/services/cmd/cmd.service';
import { DialogService } from 'src/services/dialog/dialog.service';
import { KeyService } from 'src/services/key/key.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { NewDrawingComponent } from '../popups/new-drawing/new-drawing.component';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { ClipboardOptionComponent } from './clipboard-option/clipboard-option.component';
import { ExportOptionComponent } from './export-option/export-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
import { GridOptionComponent } from './grid-option/grid-option.component';
import { ImportOptionComponent } from './import-option/import-option.component';
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

    @ViewChild(ClipboardOptionComponent, { static: true })
    clipboardOption: ClipboardOptionComponent;

    options: IOption<any>[];

    currentOption: IOption<any>;
    isDialogOpened: boolean;
    optionDisplayed: boolean;
    optionOpened: boolean;

    isUndosEmpty: boolean;
    isRedosEmpty: boolean;

    constructor(
        private dialogService: DialogService,
        private clipboard: ClipboardService,
        private keyService: KeyService) {
        this.isDialogOpened = false;
    }

    ngOnInit() {
        this.options = [this.toolOption, this.shapeOption,
        this.bucketOption, this.selectorOption, this.gridOption, this.textOption, this.clipboardOption];
        this.selectOption(this.toolOption);
        this.optionDisplayed = false;
        this.optionOpened = false;

        this.subscribeUndoRedo();
    }

    private subscribeUndoRedo() {
        CmdService.isEmptyUndosObservable.subscribe((isEmpty: boolean) => {
            this.isUndosEmpty = isEmpty;
        });
        CmdService.isEmptyRedosObservable.subscribe((isEmpty: boolean) => {
            this.isRedosEmpty = isEmpty;
        });
    }

    selectOption(option: IOption<any>): void {
        if (this.optionDisplayed) {
            this.optionDisplayed = this.currentOption !== option;
            this.optionOpened = false;
        } else {
            this.optionDisplayed = true;
            this.optionOpened = true;
        }
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
        this.openDialog(ImportOptionComponent);
    }

    saveImage(): void {
        this.openDialog(SaveOptionComponent);
    }

    openExportOption(): void {
        this.openDialog(ExportOptionComponent);
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
        if (!this.isUndosEmpty) {
            CmdService.undo();
        }
    }

    redo(): void {
        if (!this.isRedosEmpty) {
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
        this.keyService.enableKeys();
    }

    @HostListener('window: keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const keys: string = this.getComposedKey(event);
        const kbd: { [id: string]: callback } = {
            'C-o': () => { this.newDrawingOption(); },
            'C-s': () => { this.saveImage(); },
            'C-g': () => { this.openGalleryOption(); },
            'C-e': () => { this.openExportOption(); },
        };
        const func: callback | undefined = kbd[keys];
        if (func) {
            event.preventDefault();
            if (!this.isDialogOpened || this.keyService.isShortcutsEnabled) {
                func();
            }
        }
    }

    @HostListener('window: keyup', ['$event'])
    onKeyUp(event: KeyboardEvent): void {
        if (this.isDialogOpened || !this.keyService.isShortcutsEnabled) {
            return;
        }
        const kbd: { [id: string]: callback } = {
            c: () => this.selectToolFromOption(this.toolOption, 0),
            w: () => this.selectToolFromOption(this.toolOption, 1),
            l: () => this.selectToolFromOption(this.toolOption, 2),
            b: () => this.selectToolFromOption(this.bucketOption, 0),
            i: () => this.selectToolFromOption(this.bucketOption, 1),
            y: () => this.selectToolFromOption(this.toolOption, 4),
            e: () => this.selectToolFromOption(this.toolOption, 5),
            s: () => this.selectToolFromOption(this.selectorOption, 0),
            t: () => this.selectToolFromOption(this.textOption, 0),
            1: () => this.selectToolFromOption(this.shapeOption, 0),
            2: () => this.selectToolFromOption(this.shapeOption, 1),
            3: () => this.selectToolFromOption(this.shapeOption, 2),
            'C-z': () => { CmdService.undo(); },
            'C-S-z': () => { CmdService.redo(); },
            g: () => this.gridOption.toggleGrid(),
            '+': () => this.gridOption.addStep(),
            'S-+': () => this.gridOption.addStep(),
            '-': () => this.gridOption.reduceStep(),
            'C-x': () => this.clipboard.cut(),
            'C-c': () => this.clipboard.copy(),
            'C-v': () => this.clipboard.paste(),
        };

        const keys: string = this.getComposedKey(event);
        if (kbd[keys]) {
            const func: callback = kbd[keys];
            func();
        }
    }

    private selectToolFromOption(option: IOption<any>, toolNumber: number) {
        if (this.currentOption !== option) {
            this.selectOption(option);
        }
        this.optionDisplayed = true;
        (option as any).selectTool((option as any).tools[toolNumber]);
    }
}
