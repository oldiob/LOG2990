
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { AbsColorButton } from './abs-color-button.component';

class MockColorButton extends AbsColorButton {
    protected setTip(): void {
        this.tip = 'Mock Color';
    }

    protected setupColors(): void {
        //
    }

    protected applyColor(): void {
        //
    }

    protected onAlphaChange(): void {
        //
    }

    protected setColor(): {} {
        return {};
    }
}

describe('AbsColorButton', () => {
    let service: PaletteService;
    let colorButton: MockColorButton;
    let formBuilder: FormBuilder;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            providers: [PaletteService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(PaletteService);
        formBuilder = TestBed.get(FormBuilder);
        colorButton = new MockColorButton(service, formBuilder);
    });

    it('should create', () => {
        expect(colorButton).toBeTruthy();
    });

    it('#onColorPick update current color', () => {
        const aColor = { red: 255, green: 255, blue: 255, alpha: 1 };
        colorButton.onColorPick(aColor);
        expect(colorButton.currentColor).toEqual(aColor);
    });

    it('#onColorHEXChange should update RGBA color', () => {
        const RED = 30;
        const GREEN = 30;
        const BLUE = 30;
        const ALPHA = 1;

        colorButton.colorsForm.controls.red.setValue(RED);
        colorButton.colorsForm.controls.green.setValue(GREEN);
        colorButton.colorsForm.controls.blue.setValue(BLUE);
        colorButton.colorsForm.controls.alpha.setValue(ALPHA);

        colorButton.onColorHEXChange();
        expect(service.getPrimary()).toBe(
            new Color(RED, GREEN, BLUE, ALPHA).toString(),
        );
    });

    it('#onColorRGBAChange should update HEX color', () => {
        const RED = 30;
        const GREEN = 30;
        const BLUE = 30;
        const ALPHA = 1;

        colorButton.colorsForm.controls.red.setValue(RED);
        colorButton.colorsForm.controls.green.setValue(GREEN);
        colorButton.colorsForm.controls.blue.setValue(BLUE);
        colorButton.colorsForm.controls.alpha.setValue(ALPHA);

        colorButton.onColorRGBAChange();
        expect(service.getPrimary()).toBe(
            new Color(RED, GREEN, BLUE, ALPHA).toString(),
        );
    });

    it('#onMouseUp should update palette, hide Form and update color history', () => {
        spyOn(colorButton, 'hideForm');

        colorButton.onMouseUp();

        expect(colorButton.hideForm).toHaveBeenCalled();
        expect(colorButton.colorsHistory).toEqual(service.getHistory());
    });

    it('#onOldColor should pick color, update palette and hide form', () => {
        spyOn(colorButton, 'onColorPick');
        spyOn(colorButton, 'hideForm');
        const color = new Color(255, 255, 255, 1);
        colorButton.onOldColor(color);

        expect(colorButton.onColorPick).toHaveBeenCalled();
        expect(colorButton.hideForm).toHaveBeenCalled();
    });

    it('#toggleForm should toggle form, emit isShowForm and update color history', () => {
        colorButton.isShowForm = true;
        spyOn(colorButton.open, 'emit');

        colorButton.toggleForm();

        expect(colorButton.isShowForm).toBeFalsy();
        expect(colorButton.open.emit).toHaveBeenCalled();
        expect(colorButton.colorsHistory).toEqual(service.getHistory());
    });

    it('#hideForm should put isShowForm to false', () => {
        colorButton.isShowForm = true;
        colorButton.hideForm();
        expect(colorButton.isShowForm).toBeFalsy();
    });

});
