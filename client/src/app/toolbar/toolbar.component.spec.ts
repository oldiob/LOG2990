import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule,
         MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'src/services/dialog/dialog.service';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { BucketOptionComponent } from './bucket-option/bucket-option.component';
import { GalleryOptionComponent } from './gallery-option/gallery-option.component';
import { ShapeOptionComponent } from './shape-option/shape-option.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ToolOptionComponent } from './tool-option/tool-option.component';
import { ToolbarComponent } from './toolbar.component';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let toolOption: ToolOptionComponent;
    let bucketOption: BucketOptionComponent;
    let shapeOption: ShapeOptionComponent;
    let dialogService: DialogService;
    let drawareaService: DrawAreaService;
    let galleryOption: GalleryOptionComponent;
    let option: IOption<any>;
    let options: IOption<any>[];
    let renderer: Renderer2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatSelectModule, MatDialogModule, FormsModule,
                      BrowserAnimationsModule, BrowserDynamicTestingModule,
                      ReactiveFormsModule, MatButtonModule, MatCheckboxModule,
                      MatOptionModule, MatFormFieldModule],
            declarations: [ToolbarComponent, ToolOptionComponent, BucketOptionComponent,
                           ShapeOptionComponent, ShowcaseComponent, NewDrawingComponent,
                           GalleryOptionComponent],
            providers: [{provide: DialogService, useValue: dialogService},
                        {provide: DrawAreaService, useValue: drawareaService}],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        RendererProvider.renderer = renderer;

        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        drawareaService = jasmine.createSpyObj('DrawAreaService', ['save']);
        dialogService = jasmine.createSpyObj('DialogService', ['openNewDrawing']);
        toolOption = jasmine.createSpyObj('ToolOptionComponent', ['selectTool', 'tools']);
        bucketOption = jasmine.createSpyObj('BucketOptionComponent', ['selectTool', 'currentTool']);
        shapeOption = jasmine.createSpyObj('ShapeOptionComponent', ['selectTool', 'tools']);
        galleryOption = jasmine.createSpyObj('ShapeOptionComponent', ['selectTool', 'tools']);
        option = jasmine.createSpyObj('IOption<any>', ['images', 'select', 'getImage']);
        options = jasmine.createSpyObj('IOption<any>[]', ['images', 'select', 'getImage']);

        component.selectOption = option.select;
        component.options = options;
        component.currentOption = option;
        component.currentOption.select = option.select;
        component.saveImage = drawareaService.save;
        component.newDrawingOption = dialogService.openNewDrawing;
        component.toolOption = toolOption;
        component.bucketOption = bucketOption;
        component.shapeOption = shapeOption;
        component.bucketOption.currentTool = bucketOption.currentTool;
        component.galleryOption = galleryOption;
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

    it('should select gallery option', () => {
        component.selectOption(galleryOption);
        expect(galleryOption).toEqual(component.galleryOption);
    });

    it('should open new drawing pop up', () => {
        component.newDrawingOption();
        expect(dialogService.openNewDrawing).toHaveBeenCalled();
    });

    it('should save image ', () => {
        component.saveImage();
        expect(drawareaService.save).toHaveBeenCalled();
    });

    it('should get image ', () => {
        component.getImage(option);
        expect(option.getImage).toHaveBeenCalled();
    });

    it('should event be prevent when it is a keydown ', () => {
        const event = new KeyboardEvent('keydown', {
            key: 'd',
            cancelable: true,
        });
        component.preventDefaults(event);
        expect(event.defaultPrevented).toBeTruthy();
    });

    it('should return pencil when c is press on keyboard ', () => {
        const pressC = new KeyboardEvent('keypress', { key: 'c'});
        component.pressKeyboard(pressC);
        expect(component.pressKeyboard(pressC)).toEqual(component.toolOption.selectTool(toolOption.tools[0]));
    });

    it('should return brush when w is press on keyboard ', () => {
        const pressW = new KeyboardEvent('keypress', { key: 'w'});
        component.pressKeyboard(pressW);
        expect(component.pressKeyboard(pressW)).toEqual(component.toolOption.selectTool(toolOption.tools[1]));
    });

    it('should return bucket when b is press on keyboard ', () => {
        const pressB = new KeyboardEvent('keypress', { key: 'b'});
        component.pressKeyboard(pressB);
        expect(component.pressKeyboard(pressB)).toEqual(component.bucketOption.selectTool(bucketOption.currentTool));
    });

    it('should return rectangle when 1 is press on keyboard ', () => {
        const press1 = new KeyboardEvent('keypress', { key: '1'});
        component.pressKeyboard(press1);
        expect(component.pressKeyboard(press1)).toEqual(component.shapeOption.selectTool(shapeOption.tools[0]));
    });

    it('should return new drawing when (ctrl + o) is press on keyboard ', () => {
        const pressCtrlO = new KeyboardEvent('keypress', { key: 'C-o'});
        component.pressKeyboard(pressCtrlO);
        expect(component.pressKeyboard(pressCtrlO)).toEqual(component.newDrawingOption());
    });

    it('should return save when (ctrl + s) is press on keyboard ', () => {
        const pressCtrlS = new KeyboardEvent('keypress', { key: 'C-s'});
        component.pressKeyboard(pressCtrlS);
        expect(component.pressKeyboard(pressCtrlS)).toEqual(component.saveImage());
    });

    it('should not prevent default if S is press on keyboard ', () => {
        const pressS = new KeyboardEvent('keypress', { key: 's'});
        component.pressKeyboard(pressS);
        expect(pressS.defaultPrevented).toBeFalsy();
    });

});
