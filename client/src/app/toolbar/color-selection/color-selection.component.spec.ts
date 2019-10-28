import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { PaletteService } from 'src/services/palette/palette.service';
import { ColorSelectionComponent } from './color-selection.component';

describe('ColorSelectionComponent', () => {
    let component: ColorSelectionComponent;
    let fixture: ComponentFixture<ColorSelectionComponent>;
    let service: PaletteService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ColorSelectionComponent],
            imports: [MatDialogModule],
            providers: [{
                provide: MatDialogRef,
                useValue: {
                    close: (dialogResult: any) => {
                        //
                    },
                },
            }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.get(PaletteService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onSwap should swap colors', () => {
        spyOn(service, 'swap');
        component.onSwap();
        expect(service.swap).toHaveBeenCalled();
    });

    it('#onOpen should open color button trough toggling isOpenPrimary or IsOpenSecondary', () => {
        const IS_SHOW_FORM = true;

        let isPrimary = true;
        component.onOpen(IS_SHOW_FORM, isPrimary);
        expect(component.isOpenPrimary).toBeTruthy();
        expect(component.isOpenSecondary).toBeFalsy();

        isPrimary = false;
        component.onOpen(IS_SHOW_FORM, isPrimary);
        expect(component.isOpenPrimary).toBeFalsy();
        expect(component.isOpenSecondary).toBeTruthy();
        // ! TEST FAILS HERE
    });

    it('#close should close color buttons through toggling isOpenPrimary or IsOpenSecondary', () => {
        component.isOpenPrimary = true;
        component.isOpenSecondary = true;
        component.close();
        expect(component.isOpenPrimary).toBeFalsy();
        expect(component.isOpenSecondary).toBeFalsy();
    });

});
