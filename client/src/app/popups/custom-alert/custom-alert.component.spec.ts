import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatSnackBarModule, MatSnackBarRef } from '@angular/material';
import { CustomAlertComponent } from './custom-alert.component';

describe('CustomAlertComponent', () => {
    let component: CustomAlertComponent;
    let fixture: ComponentFixture<CustomAlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomAlertComponent],
            imports: [MatDialogModule, MatSnackBarModule],
            providers: [{ provide: MatSnackBarRef, useValue: {} }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomAlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
