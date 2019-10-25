import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        const aColor = new Color(255, 255, 255, 1);
        component.isPrimary = true;
        component.onColorHEXChange();
        expect(service.getPrimary()).toBe(aColor.toString());

        component.isPrimary = false;
        component.onColorHEXChange();
        expect(service.getSecondary()).toBe(aColor.toString());
    });

    it('#onColorRGBAChange should update HEX color', () => {
        const aColor = new Color(255, 255, 255, 1);
        component.isPrimary = true;
        component.onColorRGBAChange();
        expect(service.getPrimary()).toBe(aColor.toString());

        component.isPrimary = false;
        component.onColorRGBAChange();
        expect(service.getSecondary()).toBe(aColor.toString());
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
});
