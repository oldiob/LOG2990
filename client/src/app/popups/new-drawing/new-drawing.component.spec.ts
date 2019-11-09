import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatCheckboxModule, MatDialogModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';
import { SVGService } from 'src/services/svg/svg.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
    let component: NewDrawingComponent;
    let fixture: ComponentFixture<NewDrawingComponent>;
    let workZoneService: WorkZoneService;
    let svgService: SVGService;
    const elem = jasmine.createSpyObj('any', ['hasChildNodes', 'appendChild']);
    elem.hasChildNodes.and.returnValue(false);
    const entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    entry.nativeElement = elem;
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);

    beforeEach(async(() => {
        DOMRenderer.renderer = renderer;

        TestBed.configureTestingModule({
            imports: [MatDividerModule, MatCheckboxModule, BrowserAnimationsModule, BrowserDynamicTestingModule,
                MatDialogModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule],
            declarations: [NewDrawingComponent],
            providers: [SVGService, DrawAreaService,
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewDrawingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        svgService = TestBed.get(SVGService);
        workZoneService = new WorkZoneService();
        svgService.entry = entry;
        component.ngOnInit();
    });

    it('should create a new drawing component', () => {
        expect(component).toBeTruthy();
    });

    it('should create a form', () => {
        expect(component.newDrawingFrom).toBeTruthy();
    });

    it('#createForm should create a width, height and background color form input', () => {
        expect(component.newDrawingFrom.contains('width')).toBeTruthy();
        expect(component.newDrawingFrom.contains('height')).toBeTruthy();
        expect(component.newDrawingFrom.contains('backgroundColorHEX')).toBeTruthy();
    });

    it('should get width, height and background form input values', () => {
        expect(component.width).toEqual(component.newDrawingFrom.controls.width.value);
        expect(component.height).toEqual(component.newDrawingFrom.controls.height.value);
        expect(component.backgroundColorHEX).toEqual(component.newDrawingFrom.controls.backgroundColorHEX.value);
    });

    it('should change background color form control', () => {
        const backgroundColor = new Color(255, 255, 255, 1);
        component.chooseBackgroundColor(backgroundColor);
        expect(component.backgroundColor).toBe(backgroundColor);
        expect(component.backgroundColorHEX).toBe(backgroundColor.toHex());
    });

    it('should fetch default dimensions from work zone service and update its default dimensions', () => {
        workZoneService.currentMaxWidth.subscribe((maxWidth) => {
            component.newDrawingFrom.controls.width.setValue(maxWidth);
            expect(component.width).toBe(maxWidth);
        });
        workZoneService.currentMaxWidth.subscribe((maxHeight) => {
            component.newDrawingFrom.controls.height.setValue(maxHeight);
            expect(component.height).toBe(maxHeight);
        });
    });

    it('should return true if the create button is clicked', () => {
        component.onCreateClick();
        expect(component.displaySaveError).toBe(true);
    });

    it('should return false if the create button is not clicked', () => {
        expect(component.displaySaveError).toBe(false);
    });

    it('should update HEX to RGBA', () => {
        const backgroundColor = new Color(255, 255, 255, 1);
        component.chooseBackgroundColor(backgroundColor);
        component.onColorRGBAChange();
        component.onColorHEXChange();
        expect(component.backgroundColor).toEqual(backgroundColor);
    });

    it('should not get width error message', () => {
        expect(component.getWidthErrorMessage()).toBe('');
    });

    it('should not get height error message', () => {
        component.getHeightErrorMessage();
        expect(component.getHeightErrorMessage()).toBe('');
    });

    it('should get width error message', () => {
        component.newDrawingFrom.controls.width.setValue('');
        expect(component.getWidthErrorMessage()).toBe('You must enter a width');
    });

    it('should get height error message', () => {
        component.newDrawingFrom.controls.height.setValue('');
        expect(component.getHeightErrorMessage()).toBe('You must enter a height');
    });

    it('should get save error message', () => {
        component.getSaveErrorMessage();
        expect(component.getSaveErrorMessage()).toBe('Are you sure want to abandon your unsaved work?');
    });

    it('should be true if it shows color picker', () => {
        component.showColorPicker();
        expect(component.isShowColorPicker).toBe(true);
    });

    it('should be true if it shows color picker', () => {
        let color: Color;
        color = new Color(255, 255, 255, 1);
        component.onColorPick(color);
        expect(component.newDrawingFrom.controls.red.value).toBe(255);
        expect(component.newDrawingFrom.controls.green.value).toBe(255);
        expect(component.newDrawingFrom.controls.blue.value).toBe(255);
        expect(component.newDrawingFrom.controls.alpha.value).toBe(1);
    });

    it('should return false if height value did not change', () => {
        component.onHeightChange();
        expect(component.newDrawingFrom.controls.height.dirty).toBe(false);
    });

    it('should return true if height value change', () => {
        component.newDrawingFrom.controls.height.setValue(0);
        component.newDrawingFrom.controls.height.markAsDirty();
        component.onHeightChange();
        expect(component.newDrawingFrom.controls.height.dirty).toBeTruthy();
    });

    it('should return false if width value did not change', () => {
        component.onWidthChange();
        expect(component.newDrawingFrom.controls.width.dirty).toBe(false);
    });

    it('should return true if width value change', () => {
        component.newDrawingFrom.controls.width.setValue(0);
        component.newDrawingFrom.controls.width.markAsDirty();
        component.onWidthChange();
        expect(component.newDrawingFrom.controls.width.dirty).toBeTruthy();
    });
});
