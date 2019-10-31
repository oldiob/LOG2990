import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SelectorTool } from 'src/services/tool/tool-options/selector';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { SelectorOptionComponent } from './selector-option.component';

describe('SelectorOptionComponent', () => {
    let component: SelectorOptionComponent;
    let fixture: ComponentFixture<SelectorOptionComponent>;
    let selector: SelectorTool;
    let renderer: Renderer2;
    const BUTTON = 'selector.png';
    const PATH = '../../../../assets/images/';
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
        selector = TestBed.get(SelectorTool);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should selector be the current tool', () => {
        expect(component.currentTool).toBe(selector);
    });

    it('should get image of selector tool', () => {
        component.getImage();
        expect(component.getImage()).toEqual(BUTTON);
    });

    it('should select current tool', () => {
        component.select();
        expect(component.currentTool).toEqual(selector);
    });

    it('should select selector tool', () => {
        component.selectTool(component.currentTool);
        expect(component.currentTool).toEqual(selector);
    });

    it('should return string to get file source and button image', () => {
        component.getFilesource(selector);
        expect(component.getFilesource(selector)).toEqual(PATH + BUTTON);
    });

});
