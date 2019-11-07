import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { ColorButtonType } from './color-button-type';
import { ColorSelectionComponent } from './color-selection.component';

describe('ColorSelectionComponent', () => {
    let component: ColorSelectionComponent;
    let fixture: ComponentFixture<ColorSelectionComponent>;
    let paletteService: PaletteService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ColorSelectionComponent],
            imports: [MatDialogModule, MatSnackBarModule],
            providers: [DialogService, PaletteService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        paletteService = TestBed.get(PaletteService);
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onSwap should swap colors', () => {
        spyOn(paletteService, 'swap');
        component.onSwap();
        expect(paletteService.swap).toHaveBeenCalled();
    });

    it('#onOpen should open color button trough toggling isOpenPrimary or IsOpenSecondary', () => {
        const IS_SHOW_FORM = true;

        component.onOpen(IS_SHOW_FORM, ColorButtonType.PrimaryColor);
        expect(component.isPrimaryButtonOpened).toBeTruthy();
        expect(component.isSecondaryButtonOpened).toBeFalsy();
        expect(component.isBackgroundButtonOpened).toBeFalsy();

        component.onOpen(IS_SHOW_FORM, ColorButtonType.SecondaryColor);
        expect(component.isPrimaryButtonOpened).toBeFalsy();
        expect(component.isSecondaryButtonOpened).toBeTruthy();
        expect(component.isBackgroundButtonOpened).toBeFalsy();

        component.onOpen(IS_SHOW_FORM, ColorButtonType.BackgroundColor);
        expect(component.isPrimaryButtonOpened).toBeFalsy();
        expect(component.isSecondaryButtonOpened).toBeFalsy();
        expect(component.isBackgroundButtonOpened).toBeTruthy();

    });

    it('#close should close color buttons through toggling isOpenPrimary or IsOpenSecondary', () => {
        component.isPrimaryButtonOpened = true;
        component.isSecondaryButtonOpened = true;
        component.close();
        expect(component.isPrimaryButtonOpened).toBeFalsy();
        expect(component.isSecondaryButtonOpened).toBeFalsy();
    });

});
