import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { ColorButtonComponent } from './color-button.component';

describe('ColorButtonComponent', () => {
    let component: ColorButtonComponent;
    let fixture: ComponentFixture<ColorButtonComponent>;
    let service: PaletteService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ColorButtonComponent],
            providers: [PaletteService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.get(PaletteService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onColorPick update current color', () => {
        const aColor = { red: 255, green: 255, blue: 255, alpha: 1 };
        component.onColorPick(aColor);
        expect(component.currentColor).toEqual(aColor);
    });

    it('#onColorHEXChange should update RGBA color', () => {
        const primary = new Color(30, 30, 30, 1);
        component.isPrimary = true;
        component.onColorHEXChange();
        expect(service.getPrimary()).toBe(primary.toString());

        const secondary = new Color(170, 170, 170, 1);
        component.isPrimary = false;
        component.onColorHEXChange();
        expect(service.getSecondary()).toBe(secondary.toString());
    });

    it('#onColorRGBAChange should update HEX color', () => {
        const primary = new Color(30, 30, 30, 1);
        component.isPrimary = true;
        component.onColorRGBAChange();
        expect(service.getPrimary()).toBe(primary.toString());

        const secondary = new Color(170, 170, 170, 1);
        component.isPrimary = false;
        component.onColorRGBAChange();
        expect(service.getSecondary()).toBe(secondary.toString());
    });

    it('#onAlphaChange should update alpha', () => {
        const ALPHA = 0.3;
        component.colorsForm.controls.alpha.setValue(ALPHA);

        component.isPrimary = true;
        component.currentColor = {
            red: service.primary.red,
            green: service.primary.green,
            blue: service.primary.blue,
            alpha: component.colorsForm.controls.alpha.value,
        };
        component.onAlphaChange();
        expect(service.primary.alpha).toBe(component.currentColor.alpha);

        component.isPrimary = false;
        component.currentColor = {
            red: service.secondary.red,
            green: service.secondary.green,
            blue: service.secondary.blue,
            alpha: component.colorsForm.controls.alpha.value,
        };
        component.onAlphaChange();
        expect(service.secondary.alpha).toBe(component.currentColor.alpha);
    });

    it('#setColor should set background color', () => {
        component.isPrimary = true;
        const backgroundColorString1 = component.setColor();
        expect(backgroundColorString1).toEqual({
            'background-color': `${service.getPrimary()}`,
        });

        component.isPrimary = false;
        const backgroundColorString2 = component.setColor();
        expect(backgroundColorString2).toEqual({
            'background-color': `${service.getSecondary()}`,
        });
    });

    it('#onMouseUp should update palette, hide Form and update color history', () => {
        spyOn(component, 'updatePalette');
        spyOn(component, 'hideForm');

        component.onMouseUp();

        expect(component.updatePalette).toHaveBeenCalled();
        expect(component.hideForm).toHaveBeenCalled();
        expect(component.colorsHistory).toEqual(service.getHistory());
    });

    it('#onOldColor should pick color, update palette and hide form', () => {
        spyOn(component, 'onColorPick');
        spyOn(component, 'updatePalette');
        spyOn(component, 'hideForm');
        const color = new Color(255, 255, 255, 1);
        component.onOldColor(color);

        expect(component.onColorPick).toHaveBeenCalled();
        expect(component.updatePalette).toHaveBeenCalled();
        expect(component.hideForm).toHaveBeenCalled();
    });

    it('#toggleForm should toggle form, emit isShowForm and update color history', () => {
        component.isShowForm = true;
        spyOn(component.open, 'emit');

        component.toggleForm();

        expect(component.isShowForm).toBeFalsy();
        expect(component.open.emit).toHaveBeenCalled();
        expect(component.colorsHistory).toEqual(service.getHistory());
    });

    it('#hideForm should put isShowForm to false', () => {
        component.isShowForm = true;
        component.hideForm();
        expect(component.isShowForm).toBeFalsy();
    });

});
