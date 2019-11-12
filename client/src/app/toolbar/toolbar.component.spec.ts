import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCheckboxModule,
    MatDialogModule, MatDialogRef, MatFormFieldModule, MatMenuModule, MatOptionModule, MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardService } from 'src/services/clipboard/clipboard.service';
import { CmdService } from 'src/services/cmd/cmd.service';
import { DialogService } from 'src/services/dialog/dialog.service';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { NewDrawingComponent } from '../popups/new-drawing/new-drawing.component';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { ClipboardOptionComponent } from './clipboard-option/clipboard-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
import { GridOptionComponent } from './grid-option/grid-option.component';
import { SaveOptionComponent } from './save-option/save-option.component';
import { SelectorOptionComponent } from './selector-option/selector-option.component';
import { ShapeOptionComponent } from './shape-option/shape-option.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TextOptionComponent } from './text-option/text-option.component';
import { ToolOptionComponent } from './tool-option/tool-option.component';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let toolOption: ToolOptionComponent;
    let bucketOption: BucketOptionComponent;
    let shapeOption: ShapeOptionComponent;
    let dialogService: DialogService;
    let drawareaService: DrawAreaService;
    let selectorOption: SelectorOptionComponent;
    let textOption: TextOptionComponent;
    let gridOption: GridOptionComponent;
    let clipboardOption: ClipboardOptionComponent;
    let clipboardService: ClipboardService;
    let option: IOption<any>;
    let options: IOption<any>[];
    let renderer: Renderer2;

    dialogService = jasmine.createSpyObj('DialogService', ['openDialog', 'closeColorForms']);
    drawareaService = jasmine.createSpyObj('DrawAreaService', ['save', 'key']);
    clipboardService = jasmine.createSpyObj('ClipboardService', ['copy', 'paste', 'cut']);

    beforeEach(async(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    GalleryOptionComponent,
                    NewDrawingComponent,
                    SaveOptionComponent,
                ],
            },
        });
        TestBed.configureTestingModule({
            imports: [MatMenuModule, MatSelectModule, MatDialogModule, FormsModule,
                BrowserAnimationsModule, BrowserDynamicTestingModule,
                ReactiveFormsModule, MatButtonModule, MatCheckboxModule,
                MatOptionModule, MatFormFieldModule, MatSnackBarModule],
            declarations: [ToolbarComponent, ToolOptionComponent, BucketOptionComponent,
                ShapeOptionComponent, ShowcaseComponent, NewDrawingComponent, SaveOptionComponent,
                GalleryOptionComponent, SelectorOptionComponent, GridOptionComponent, TextOptionComponent, ClipboardOptionComponent],
            providers: [
                { provide: DrawAreaService, useValue: drawareaService },
                { provide: DialogService, useValue: dialogService },
                { provide: ClipboardService, useValue: clipboardService },
                { provide: MatDialogRef }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;
        textOption = jasmine.createSpyObj('TextOptionComponent', ['selectTool', 'tools']);
        gridOption = jasmine.createSpyObj('GridOptionComponent', ['selectTool', 'tools']);
        toolOption = jasmine.createSpyObj('ToolOptionComponent', ['selectTool', 'tools']);
        bucketOption = jasmine.createSpyObj('BucketOptionComponent', ['selectTool', 'tools']);
        shapeOption = jasmine.createSpyObj('ShapeOptionComponent', ['selectTool', 'tools']);
        selectorOption = jasmine.createSpyObj('SelectorOptionComponent', ['selectTool', 'tools']);
        clipboardOption = jasmine.createSpyObj('ClipboardOptionComponent', ['select', 'getImage']);
        option = jasmine.createSpyObj('IOption<any>', ['images', 'select', 'getImage']);
        options = jasmine.createSpyObj('IOption<any>[]', ['images', 'select', 'getImage']);
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.selectOption = option.select;
        component.options = options;
        component.currentOption = option;
        component.gridOption = gridOption;
        component.currentOption.select = option.select;
        component.toolOption = toolOption;
        component.bucketOption = bucketOption;
        component.shapeOption = shapeOption;
        component.bucketOption.currentTool = bucketOption.currentTool;
        component.selectorOption = selectorOption;
        component.textOption = textOption;
        component.clipboardOption = clipboardOption;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select tool option', () => {
        component.selectOption(toolOption);
        expect(toolOption).toEqual(component.toolOption);
    });

    it('should select shape option', () => {
        component.selectOption(shapeOption);
        expect(shapeOption).toEqual(component.shapeOption);
    });

    it('should select bucket option', () => {
        component.selectOption(bucketOption);
        expect(bucketOption).toEqual(component.bucketOption);
    });

    it('should select selector option', () => {
        component.selectOption(selectorOption);
        expect(selectorOption).toEqual(component.selectorOption);
    });

    it('should select grid option', () => {
        component.selectOption(gridOption);
        expect(gridOption).toEqual(component.gridOption);
    });

    it('should select text option', () => {
        component.selectOption(textOption);
        expect(textOption).toEqual(component.textOption);
    });

    it('should get image ', () => {
        component.getImage(option);
        expect(option.getImage).toHaveBeenCalled();
    });

    it('should save image ', () => {
        component.saveImage();
        expect(dialogService.openDialog).toHaveBeenCalled();
    });

    it('should return pencil when c is press on keyboard ', () => {
        const pressC = new KeyboardEvent('keypress', { key: 'c' });
        component.onKeyUp(pressC);
        expect(toolOption.selectTool).toHaveBeenCalled();
    });

    it('should return brush when w is press on keyboard ', () => {
        const pressW = new KeyboardEvent('keypress', { key: 'w' });
        component.onKeyUp(pressW);
        expect(toolOption.selectTool).toHaveBeenCalled();
    });

    it('should return bucket when b is press on keyboard ', () => {
        const pressB = new KeyboardEvent('keypress', { key: 'b' });
        component.onKeyUp(pressB);
        expect(bucketOption.selectTool).toHaveBeenCalled();
    });

    it('should return line when l is press on keyboard ', () => {
        const pressL = new KeyboardEvent('keypress', { key: 'l' });
        component.onKeyUp(pressL);
        expect(toolOption.selectTool).toHaveBeenCalled();
    });

    it('should return dropper when i is press on keyboard ', () => {
        const pressI = new KeyboardEvent('keypress', { key: 'i' });
        component.onKeyUp(pressI);
        expect(bucketOption.selectTool).toHaveBeenCalled();
    });

    it('should return rectangle when 1 is press on keyboard ', () => {
        const press1 = new KeyboardEvent('keyup', { key: '1' });
        component.onKeyUp(press1);
        expect(shapeOption.selectTool).toHaveBeenCalled();
    });

    it('should return ellipse when 2 is press on keyboard ', () => {
        const press2 = new KeyboardEvent('keyup', { key: '2' });
        component.onKeyUp(press2);
        expect(shapeOption.selectTool).toHaveBeenCalled();
    });

    it('should return polygone when 3 is press on keyboard ', () => {
        const press3 = new KeyboardEvent('keyup', { key: '3' });
        component.onKeyUp(press3);
        expect(shapeOption.selectTool).toHaveBeenCalled();
    });

    it('should not prevent default if S is press on keyboard ', () => {
        const pressS = new KeyboardEvent('keypress', { key: 's' });
        component.onKeyUp(pressS);
        expect(pressS.defaultPrevented).toBeFalsy();
    });

    it('#undo should undo last command', () => {
        spyOn(CmdService, 'undo');
        component.isEmptyUndos = false;
        component.undo();
        expect(CmdService.undo).toHaveBeenCalled();
    });

    it('#redo should redo last command', () => {
        spyOn(CmdService, 'redo');
        component.isEmptyRedos = false;
        component.redo();
        expect(CmdService.redo).toHaveBeenCalled();
    });
});
