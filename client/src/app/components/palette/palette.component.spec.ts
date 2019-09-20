import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaletteComponent } from './palette.component';

describe('PaletteComponent', () => {
    let component: PaletteComponent;
    let fixture: ComponentFixture<PaletteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaletteComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaletteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
