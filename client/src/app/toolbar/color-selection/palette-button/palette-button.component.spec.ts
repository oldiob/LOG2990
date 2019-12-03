import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { PaletteButtonComponent } from './palette-button.component';

describe('PaletteButtonComponent', () => {
    let component: PaletteButtonComponent;
    let service: PaletteService;
    let formBuilder: FormBuilder;

    const RED = 255;
    const GREEN = 255;
    const BLUE = 255;
    const ALPHA = 1;
    const HEX = '#ffffff';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            providers: [PaletteService, FormBuilder],
            declarations: [PaletteButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        const renderer = jasmine.createSpyObj('Renderer2',
            ['createElement', 'appendChild', 'setAttribute',
                'setAttributes', 'setStyle', 'removeChild']);
        DOMRenderer.renderer = renderer;

        service = TestBed.get(PaletteService);
        component = new PaletteButtonComponent(service, formBuilder);
        formBuilder = TestBed.get(FormBuilder);
        component.currentColor = new Color(RED, GREEN, BLUE, ALPHA);
        component.colorsForm = formBuilder.group({
            red: [RED],
            green: [GREEN],
            blue: [BLUE],
            alpha: [ALPHA],
            colorHEX: [HEX],
        });

        component.colorsForm.controls.red.setValue(RED);
        component.colorsForm.controls.green.setValue(GREEN);
        component.colorsForm.controls.blue.setValue(BLUE);
        component.colorsForm.controls.alpha.setValue(ALPHA);
        component.colorsForm.controls.colorHEX.setValue(HEX);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onColorPick update current color', () => {
        const aColor = new Color(255, 255, 255, 1);
        component.onColorPick(aColor);
        expect(component.currentColor).toEqual(aColor);
    });

    it('#onColorHEXChange should update RGBA color', () => {
        const primary = new Color(30, 30, 30, 1);
        (component as any).isPrimaryColor = true;
        (component as any).isSecondaryColor = false;
        component.onColorHEXChange();
        expect(service.primary).toEqual(primary);

        const secondary = new Color(170, 170, 170, 1);
        (component as any).isPrimaryColor = false;
        (component as any).isSecondaryColor = true;
        component.onColorHEXChange();
        expect(service.secondary).toEqual(secondary);
    });

    it('#onColorRGBAChange should update HEX color', () => {
        const primary = new Color(30, 30, 30, 1);
        (component as any).isPrimaryColor = true;
        (component as any).isSecondaryColor = false;
        component.onColorRGBAChange();
        expect(service.primary).toEqual(primary);

        const secondary = new Color(170, 170, 170, 1);
        (component as any).isPrimaryColor = false;
        (component as any).isSecondaryColor = true;
        component.onColorRGBAChange();
        expect(service.secondary).toEqual(secondary);
    });

    it('#onAlphaChange should update alpha', () => {
        component.colorsForm.controls.alpha.setValue(ALPHA);

        (component as any).isPrimaryColor = true;
        (component as any).isSecondaryColor = false;
        component.currentColor = new Color(
            service.primary.red,
            service.primary.green,
            service.primary.blue,
            component.colorsForm.controls.alpha.value,
        );
        component.onAlphaChange();
        expect(service.primary.alpha).toBe(component.currentColor.alpha);

        (component as any).isPrimaryColor = false;
        (component as any).isSecondaryColor = true;
        component.currentColor = new Color(
            service.secondary.red,
            service.secondary.green,
            service.secondary.blue,
            component.colorsForm.controls.alpha.value,
        );
        component.onAlphaChange();
        expect(service.secondary.alpha).toBe(component.currentColor.alpha);
    });

    it('#setColor should set background color', () => {
        (component as any).isPrimaryColor = true;
        (component as any).isSecondaryColor = false;
        const backgroundColorString1 = component.setColor();
        expect(backgroundColorString1).toEqual({
            'background-color': `${service.getPrimary()}`,
        });

        (component as any).isPrimaryColor = false;
        (component as any).isSecondaryColor = true;
        const backgroundColorString2 = component.setColor();
        expect(backgroundColorString2).toEqual({
            'background-color': `${service.getSecondary()}`,
        });
    });

    it('#onMouseUp should update palette, hide Form and update color history', () => {
        spyOn(component, 'hideForm');

        component.onClose();

        expect(component.hideForm).toHaveBeenCalled();
        expect(component.colorsHistory).toEqual(service.getHistory());
    });

    it('#onOldColor should pick color, update palette and hide form', () => {
        spyOn(component, 'onColorPick');

        const color = new Color(255, 255, 255, 1);
        component.onOldColor(color);

        expect(component.onColorPick).toHaveBeenCalled();
    });

    it('#toggleForm should toggle form, emit isShowForm and update color history', () => {
        component.isSettingsShown = true;
        spyOn(component.open, 'emit');

        component.toggleForm();

        expect(component.isSettingsShown).toBeFalsy();
        expect(component.open.emit).toHaveBeenCalled();
        expect(component.colorsHistory).toEqual(service.getHistory());
    });

    it('#hideForm should put isShowForm to false', () => {
        component.isSettingsShown = true;
        component.hideForm();
        expect(component.isSettingsShown).toBeFalsy();
    });
});
