import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { SelectorOptionComponent } from './selector-option.component';

describe('SelectorOptionComponent', () => {
    let component: SelectorOptionComponent;
    let fixture: ComponentFixture<SelectorOptionComponent>;
    let renderer: Renderer2;
    const BUTTON = 'selector.png';
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectorOptionComponent],
            imports: [MatDialogModule, MatSnackBarModule, HttpClientModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;
        fixture = TestBed.createComponent(SelectorOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get image of selector tool', () => {
        component.getImage();
        expect(component.getImage()).toEqual(BUTTON);
    });

});
