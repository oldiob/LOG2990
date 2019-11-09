
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { AbsColorButton } from './abs-color-button.component';

describe('AbsColorButton', () => {
    let service: PaletteService;
    let component: MockColorButton;
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
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(PaletteService);
        formBuilder = TestBed.get(FormBuilder);
        component = new MockColorButton(service, formBuilder);
        component.currentColor = new Color(RED, GREEN, BLUE, ALPHA);
        component.colorsForm = formBuilder.group({
            red: [RED],
            green: [GREEN],
            blue: [BLUE],
            alpha: [ALPHA],
            colorHEX: [HEX],
        });

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
        component.onColorHEXChange();
        const color = new Color(RED, GREEN, BLUE, ALPHA);
        expect(component.currentColor).toEqual(color);
    });

    it('#onColorRGBAChange should update HEX color', () => {
        component.onColorRGBAChange();
        const color = new Color(RED, GREEN, BLUE, ALPHA);
        expect(component.currentColor).toEqual(color);
    });

    it('#onMouseUp should update palette, hide Form and update color history', () => {
        spyOn(component, 'hideForm');
        spyOn(component as any, 'applyColor');

        component.onMouseUp();

        expect(component.hideForm).toHaveBeenCalled();
        expect((component as any).applyColor).toHaveBeenCalled();
        expect(component.colorsHistory).toEqual(service.getHistory());
    });

    it('#onOldColor should pick color, update palette and hide form', () => {
        spyOn(component, 'onColorPick');
        spyOn(component, 'hideForm');
        const color = new Color(255, 255, 255, 1);
        component.onOldColor(color);

        expect(component.onColorPick).toHaveBeenCalled();
        expect(component.hideForm).toHaveBeenCalled();
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

@Injectable()
class MockColorButton extends AbsColorButton {
    appliedColor: Color;

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder) {
        super(paletteService, formBuilder);
    }

    protected setupView(): void {
        this.tip = 'Mock Color';
    }

    protected setupColors(): void {
        //
    }

    protected applyColor(): void {
        this.appliedColor = new Color(
            this.currentColor.red,
            this.currentColor.green,
            this.currentColor.blue,
            this.currentColor.alpha,
        );
    }

    protected onAlphaChange(): void {
        //
    }

    protected setColor(): {} {
        return {};
    }
}
