import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { ColorOptionComponent } from './color-option.component';

describe('ColorOptionComponent', () => {
    let component: ColorOptionComponent;
    let fixture: ComponentFixture<ColorOptionComponent>;
    let service: PaletteService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ColorOptionComponent],
            providers: [PaletteService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.get(PaletteService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onColorPick emits color event and updates palette service', () => {
        spyOn(component.color, 'emit');
        const aColor = new Color(255, 255, 255, 1);
        component.isPrimary = true;
        component.onColorPick(aColor);
        expect(component.color.emit).toHaveBeenCalled();
        expect(component.color.emit).toHaveBeenCalledWith(aColor);
        expect(service.getPrimary()).toBe(aColor.toString());

        component.isPrimary = false;
        component.onColorPick(aColor);
        expect(component.color.emit).toHaveBeenCalled();
        expect(component.color.emit).toHaveBeenCalledWith(aColor);
        expect(service.getSecondary()).toBe(aColor.toString());
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

        const aColor = new Color(255, 255, 255, ALPHA);
        component.isPrimary = true;
        component.onAlphaChange();
        expect(service.getPrimary()).toBe(aColor.toString());

        component.isPrimary = false;
        component.onColorPick(aColor);
        component.onAlphaChange();
        expect(service.getSecondary()).toBe(aColor.toString());
    });

    it('#setColor should set background color', () => {
        const backgroundColorString = component.setColor();
        expect(backgroundColorString).toEqual({
            'background-color': `${service.getPrimary()}`,
        });
    });
});
